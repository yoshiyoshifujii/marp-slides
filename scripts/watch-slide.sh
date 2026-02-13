#!/usr/bin/env sh
set -eu

# Accept both:
# - SLIDE=path npm run watch
# - npm run watch SLIDE=path
for arg in "$@"; do
  case "$arg" in
    SLIDE=*)
      SLIDE="${arg#SLIDE=}"
      ;;
  esac
done

if [ -z "${SLIDE:-}" ]; then
  echo "SLIDE を指定してください:"
  echo "  SLIDE=slides/2026/2026-02-10-kickoff/slide.md npm run watch"
  echo "  npm run watch SLIDE=slides/2026/2026-02-10-kickoff/slide.md"
  echo "  pnpm watch SLIDE=slides/2026/2026-02-10-kickoff/slide.md"
  exit 1
fi

mkdir -p dist
tailwindcss -i ./themes/tailwind.input.css -o ./themes/tailwind.css --minify
base="$(basename "${SLIDE%.*}")"
exec marp --config marp.config.mjs --watch --output "dist/${base}.html" "$SLIDE"
