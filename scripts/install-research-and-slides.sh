#!/bin/bash
# Install the research and slide companions by reference.
#
#   bash scripts/install-research-and-slides.sh [--force]
#
# Clones shallow copies into a local cache and links them into the agent skill
# directories. It does not copy the upstream files into this repository.
#
# Environment overrides:
#   CLAUDE_SKILLS=~/.claude/skills
#   OPENCODE_SKILLS=~/.config/opencode/skills
#   AGENTS_SKILLS=~/.agents/skills
#   RESEARCH_SLIDES_CACHE=~/.cache/code-to-lab
set -euo pipefail

CACHE="${RESEARCH_SLIDES_CACHE:-${XDG_CACHE_HOME:-$HOME/.cache}/code-to-lab}"
DEEP_RESEARCH_REPO="https://github.com/sanjay3290/ai-skills.git"
FRONTEND_SLIDES_REPO="https://github.com/zarazhangrui/frontend-slides.git"
FORCE=0

for arg in "$@"; do
  case "$arg" in
    --force) FORCE=1 ;;
    -h|--help)
      sed -n '2,13p' "$0"
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

link_skill() {
  local name="$1" src="$2"
  [ -e "$src" ] || { echo "  missing source: $src"; return; }
  for target in "${TARGETS[@]}"; do
    mkdir -p "$target"
    local dest="$target/$name"
    if [ -e "$dest" ] || [ -L "$dest" ]; then
      if [ -L "$dest" ]; then
        ln -sfn "$src" "$dest"
        echo "  linked $name → $target"
      elif [ "$FORCE" -eq 1 ]; then
        rm -rf -- "$dest"
        ln -sfn "$src" "$dest"
        echo "  replaced $name → $target"
      else
        echo "  skipped $name (existing directory at $dest; use --force)"
      fi
    else
      ln -sfn "$src" "$dest"
      echo "  linked $name → $target"
    fi
  done
}

update_or_clone() {
  local repo="$1" dest="$2" sparse="$3"
  if [ -d "$dest/.git" ]; then
    echo "Updating cache: $dest"
    git -C "$dest" fetch --depth 1 origin main
    git -C "$dest" reset --hard origin/main
    if [ -n "$sparse" ]; then
      git -C "$dest" sparse-checkout set "$sparse"
    fi
  else
    echo "Fetching into: $dest"
    mkdir -p "$(dirname "$dest")"
    if [ -n "$sparse" ]; then
      git clone --depth 1 --filter=blob:none --sparse "$repo" "$dest"
      git -C "$dest" sparse-checkout set "$sparse"
    else
      git clone --depth 1 "$repo" "$dest"
    fi
  fi
}

echo "Installing research and slide companions into $CACHE"
echo

DEEP_DIR="$CACHE/ai-skills"
SLIDES_DIR="$CACHE/frontend-slides"

update_or_clone "$DEEP_RESEARCH_REPO" "$DEEP_DIR" "skills/deep-research"
update_or_clone "$FRONTEND_SLIDES_REPO" "$SLIDES_DIR" ""

DEEP_SRC="$DEEP_DIR/skills/deep-research"
SLIDES_SRC="$SLIDES_DIR"

[ -f "$DEEP_SRC/SKILL.md" ] || { echo "missing $DEEP_SRC/SKILL.md" >&2; exit 1; }
[ -f "$SLIDES_SRC/SKILL.md" ] || { echo "missing $SLIDES_SRC/SKILL.md" >&2; exit 1; }

echo
link_skill "deep-research" "$DEEP_SRC"
link_skill "frontend-slides" "$SLIDES_SRC"

echo
echo "Prerequisites:"
echo "  deep-research:"
echo "    python3 -m pip install -r \"$DEEP_SRC/requirements.txt\""
echo "    cp \"$DEEP_SRC/.env.example\" \"$DEEP_SRC/.env\"   # add GEMINI_API_KEY"
echo "    Each research run costs roughly \$2–5; ask before the first run."
echo "  frontend-slides: no dependencies (single-file HTML output)."
echo
echo "Restart your agent so it discovers the new skills."
