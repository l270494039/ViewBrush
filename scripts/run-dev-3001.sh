#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"
export VIEWBRUSH_PORT="${VIEWBRUSH_PORT:-3001}"
export VIEWBRUSH_HOST="${VIEWBRUSH_HOST:-127.0.0.1}"
export DISABLE_HMR="${DISABLE_HMR:-false}"

exec "$ROOT_DIR/scripts/dev-server.sh" restart --attach
