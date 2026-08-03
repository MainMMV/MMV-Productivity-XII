#!/usr/bin/env bash
set -e

echo "🤖 Launching MMV XII Python Telegram Bot..."

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BOT_DIR="$SCRIPT_DIR/telegram-bot"

if [ -d "$BOT_DIR" ]; then
  cd "$BOT_DIR"
fi

# Install dependencies if needed
if [ -f "requirements.txt" ]; then
  echo "📦 Checking and installing Python requirements..."
  pip install -q -r requirements.txt || pip3 install -q -r requirements.txt
fi

export TELEGRAM_BOT_TOKEN="8430563840:AAGj9vAUe6Kx7inbWklfy8xUrFF7NeDfHRo"
export PORT="${PORT:-5000}"

echo "🚀 Starting Telegram Bot (Security Code: 9309)..."
python3 bot.py || python bot.py
