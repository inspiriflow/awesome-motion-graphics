#!/usr/bin/env bash
# Usage: bash render-gif.sh <effect-id>  -> ../previews/<effect-id>.gif (270x480, 12 fps)
set -euo pipefail
id="$1"
npx remotion render src/index.ts "$id" "out/$id.mp4" --log=error --concurrency=3
ffmpeg -v error -y -i "out/$id.mp4" -vf "fps=12,scale=270:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=sierra2_4a" "../previews/$id.gif"
ls -lh "../previews/$id.gif"
