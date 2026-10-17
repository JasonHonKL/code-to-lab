#!/bin/bash
# Install the color-themes companion by reference.
#
#   bash scripts/install-color-themes.sh [--force]
#
# The upstream repo (archibate/dotfiles-opencode) declares no license, so this
# script keeps a sparse checkout in a local cache and links it into the agent
# skill directories. It does not copy the upstream files into this repository.
#
# Environment overrides:
#   CLAUDE_SKILLS=~/.claude/skills
#   OPENCODE_SKILLS=~/.config/opencode/skills
#   AGENTS_SKILLS=~/.agents/skills
#   COLOR_THEMES_CACHE=~/.cache/code-to-lab/color-themes-src
set -euo pipefail

UPSTREAM="https://github.com/archibate/dotfiles-opencode.git"
CACHE="${COLOR_THEMES_CACHE:-${XDG_CACHE_HOME:-$HOME/.cache}/code-to-lab/color-themes-src}"
FORCE=0

for arg in "$@"; do
  case "$arg" in
    --force) FORCE=1 ;;
    -h|--help)
      sed -n '2,16p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 2
      ;;
  esac
done

TARGETS=(
  "${CLAUDE_SKILLS:-$HOME/.claude/skills}"
  "${OPENCODE_SKILLS:-$HOME/.config/opencode/skills}"
  "${AGENTS_SKILLS:-$HOME/.agents/skills}"
)

if [ -d "$CACHE/.git" ]; then
  echo "Updating color-themes cache: $CACHE"
  git -C "$CACHE" fetch --depth 1 origin main
  git -C "$CACHE" reset --hard origin/main
  git -C "$CACHE" sparse-checkout set skills/color-themes
else
  echo "Fetching color-themes into: $CACHE"
  mkdir -p "$(dirname "$CACHE")"
  git clone --depth 1 --filter=blob:none --sparse "$UPSTREAM" "$CACHE"
  git -C "$CACHE" sparse-checkout set skills/color-themes
fi

SRC="$CACHE/skills/color-themes"
[ -f "$SRC/SKILL.md" ] || { echo "missing $SRC/SKILL.md" >&2; exit 1; }

echo
echo "Installing color-themes from $SRC"
for target in "${TARGETS[@]}"; do
  mkdir -p "$target"
  dest="$target/color-themes"
  if [ -e "$dest" ] || [ -L "$dest" ]; then
    if [ -L "$dest" ]; then
      ln -sfn "$SRC" "$dest"
      echo "  linked color-themes → $target"
    elif [ "$FORCE" -eq 1 ]; then
      rm -rf -- "$dest"
      ln -sfn "$SRC" "$dest"
      echo "  replaced color-themes → $target"
    else
      echo "  skipped color-themes (existing directory at $dest; use --force)"
    fi
  else
    ln -sfn "$SRC" "$dest"
    echo "  linked color-themes → $target"
  fi
done

echo
echo "Upstream declares no license; this is an install-by-reference, not a vendored copy."
echo "Palettes: $SRC/themes (158 TOML files). Default: Tokyo Night."
echo "Restart your agent so it discovers the skill."
