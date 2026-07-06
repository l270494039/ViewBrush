#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"
export PIKTURA_PORT="${PIKTURA_PORT:-3001}"
export PIKTURA_HOST="${PIKTURA_HOST:-127.0.0.1}"
export DISABLE_HMR="${DISABLE_HMR:-false}"

exec "$ROOT_DIR/scripts/dev-server.sh" restart --attach
