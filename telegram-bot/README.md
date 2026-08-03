# 🤖 MMV XII Productivity Suite — Python Telegram Companion Bot

Full Python implementation for the MMV XII companion bot with security code verification (`9309`) and real-time Web App change notifications.

---

## 🌟 Features & Capabilities

1. **🔒 Security Registration Flow (Code `9309`)**:
   - On `/start`, the bot prompts the user: `enter code: ...`
   - Only when the user inputs `9309`, access is granted and their `chat_id` is registered in `authorized_users.json`.
   - Unregistered users are blocked from running commands or receiving notifications.

2. **📲 Real-time Web App Event Notifications**:
   - Web changes (creating/updating/deleting Tasks, Notes, Finances, Habits, Goals, Subscriptions) trigger instant notifications containing detailed item titles and metadata directly to Telegram.

3. **🎯 Interactive Bot Commands**:
   - `/start` — Check authorization status or request code `9309`
   - `/help` — View full user manual
   - `/status` — View device registration & authorized users count
   - `/tasks` — View active tasks
   - `/addtask <title>` — Add a new task
   - `/habits` — Daily habit checklist & streak progress
   - `/finance` — Summary of income, expenses, and net balance
   - `/addexpense <amount> <category> [note]` — Log expense
   - `/addincome <amount> <source> [note]` — Log income
   - `/goals` — Check milestone progress

---

## 🚀 How to Run the Python Bot

### 1. Install Dependencies
```bash
cd telegram-bot
pip install -r requirements.txt
```

### 2. Set Environment Variables (Optional)
Create a `.env` file or export environment variables:
```bash
export TELEGRAM_BOT_TOKEN="8430563840:AAGj9vAUe6Kx7inbWklfy8xUrFF7NeDfHRo"
export PORT=5000
```

### 3. Start the Bot
```bash
python bot.py
```
*(Or `python3 bot.py`)*

---

## 🔒 Registration & Code Verification

1. Open Telegram and start your bot: `@YourBot`
2. Send `/start`. The bot will ask:
   ```text
   enter code: ...
   ```
3. Type `9309` and press send.
4. The bot responds:
   ```text
   ✅ Access Granted! Code 9309 Verified.
   Welcome! Real-time notifications for Web App changes are active.
   ```
