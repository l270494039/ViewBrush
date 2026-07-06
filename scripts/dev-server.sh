#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PIKTURA_PORT:-3001}"
HOST="${PIKTURA_HOST:-127.0.0.1}"
DISABLE_HMR="${DISABLE_HMR:-false}"
OUTPUT_DIR="$ROOT_DIR/output"
PID_FILE="$OUTPUT_DIR/piktura-${PORT}.pid"
LOG_FILE="$OUTPUT_DIR/piktura-${PORT}.log"
URL="http://${HOST}:${PORT}"
DEV_INFO_URL="${URL}/__dev-info"
SCREEN_SESSION="piktura_${PORT}_dev"
COMMAND="${1:-status}"
ATTACH_MODE="${2:-}"

mkdir -p "$OUTPUT_DIR"

find_listener_pids() {
  lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true
}

pid_is_running() {
  local pid="$1"
  kill -0 "$pid" 2>/dev/null
}

stop_pid() {
  local pid="$1"

  if ! pid_is_running "$pid"; then
    return
  fi

  kill "$pid" 2>/dev/null || true

  for _ in {1..40}; do
    if ! pid_is_running "$pid"; then
      return
    fi
    sleep 0.25
  done

  kill -9 "$pid" 2>/dev/null || true
}

stop_all_listeners() {
  local pids
  pids=("${(@f)$(find_listener_pids)}")

  for pid in "${pids[@]}"; do
    [[ -n "$pid" ]] || continue
    stop_pid "$pid"
  done
}

stop_screen_session() {
  if screen -list | rg -q "[[:space:]]${SCREEN_SESSION}[[:space:]]"; then
    screen -S "$SCREEN_SESSION" -X quit || true
  fi
}

wait_for_server() {
  for _ in {1..80}; do
    if curl -fsS "$DEV_INFO_URL" >/dev/null 2>&1; then
      return 0
    fi
    sleep 0.25
  done

  return 1
}

print_status() {
  echo "workspace: $ROOT_DIR"
  echo "port: $PORT"

  if [[ -f "$PID_FILE" ]]; then
    echo "pid_file: $(cat "$PID_FILE")"
  else
    echo "pid_file: missing"
  fi

  if curl -fsS "$DEV_INFO_URL" >/dev/null 2>&1; then
    echo "status: running"
    curl -fsS "$DEV_INFO_URL"
    echo
  else
    echo "status: stopped"
  fi
}

start_background() {
  cd "$ROOT_DIR"
  : >"$LOG_FILE"
  screen -dmS "$SCREEN_SESSION" zsh -lc "cd ${(q)ROOT_DIR} && env PORT=$PORT HOST=$HOST PIKTURA_PORT=$PORT PIKTURA_HOST=$HOST DISABLE_HMR=$DISABLE_HMR node --import tsx server.ts >> ${(q)LOG_FILE} 2>&1"

  if ! wait_for_server; then
    echo "Dev server failed to start. Check $LOG_FILE" >&2
    exit 1
  fi

  local server_pid
  server_pid="$(curl -fsS "$DEV_INFO_URL" | sed -n 's/.*\"pid\":\([0-9][0-9]*\).*/\1/p')"
  if [[ -n "$server_pid" ]]; then
    echo "$server_pid" >"$PID_FILE"
  fi

  print_status
}

start_attached() {
  cd "$ROOT_DIR"
  exec env PORT="$PORT" HOST="$HOST" PIKTURA_PORT="$PORT" PIKTURA_HOST="$HOST" DISABLE_HMR="$DISABLE_HMR" node --import tsx server.ts
}

stop_managed_server() {
  if [[ -f "$PID_FILE" ]]; then
    stop_pid "$(cat "$PID_FILE")"
    rm -f "$PID_FILE"
  fi

  stop_screen_session
  stop_all_listeners
}

case "$COMMAND" in
  start)
    stop_managed_server
    if [[ "$ATTACH_MODE" == "--attach" ]]; then
      start_attached
    else
      start_background
    fi
    ;;
  stop)
    stop_managed_server
    print_status
    ;;
  restart)
    stop_managed_server
    if [[ "$ATTACH_MODE" == "--attach" ]]; then
      start_attached
    else
      start_background
    fi
    ;;
  status)
    print_status
    ;;
  *)
    echo "Usage: zsh scripts/dev-server.sh [start|stop|restart|status] [--attach]" >&2
    exit 1
    ;;
esac
