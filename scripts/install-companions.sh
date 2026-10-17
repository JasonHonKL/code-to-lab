#!/bin/bash
# Link the vendored companion skills into local agent skill directories.
#
#   bash scripts/install-companions.sh [--force]
#
# Environment overrides:
#   CLAUDE_SKILLS=~/.claude/skills
#   OPENCODE_SKILLS=~/.config/opencode/skills
#   AGENTS_SKILLS=~/.agents/skills
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VENDOR="$ROOT/vendor"
FORCE=0

for arg in "$@"; do
  case "$arg" in
    --force) FORCE=1 ;;
    -h|--help)
      sed -n '2,12p' "$0"
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

echo "Installing companion skills from $VENDOR"
echo

# Single-skill companions.
link_skill "video-use" "$VENDOR/video-use"
link_skill "impeccable" "$VENDOR/impeccable/skill"

# Manim skills.
for src in "$VENDOR"/manim_skill/skills/*; do
  [ -f "$src/SKILL.md" ] || continue
  link_skill "$(basename "$src")" "$src"
done

# Matt Pocock's engineering + productivity skills.
while IFS= read -r -d '' file; do
  src="$(dirname "$file")"
  link_skill "$(basename "$src")" "$src"
done < <(find "$VENDOR/mattpocock-skills/skills/engineering" "$VENDOR/mattpocock-skills/skills/productivity" -name SKILL.md -print0)

echo
echo "Academic Research Skills is a multi-skill suite with shared contracts and scripts."
echo "Install it with its plugin manifest, pointing at the vendored suite:"
echo
echo "  /plugin marketplace add $VENDOR/academic-research-skills"
echo "  /plugin install academic-research-skills"
echo
echo "For other agents, follow: $VENDOR/academic-research-skills/README.md"
echo
echo "Prerequisites:"
echo "  video-use:  cd \"$VENDOR/video-use\" && uv sync   (plus FFmpeg and ELEVENLABS_API_KEY)"
echo "  manim:      pip install manim   (plus FFmpeg and LaTeX)"
echo "  impeccable: the skill launcher downloads its engine on first run"
echo
echo "Color themes is installed separately because upstream declares no license:"
echo "  bash $ROOT/scripts/install-color-themes.sh"
echo
echo "Restart your agent so it discovers the new skills."
