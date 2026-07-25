# 🤖 MMV Productivity Suite — Telegram Companion Bot & Mini App Integration

Deploy a stunning companion chatbot and immersive **Telegram Mini App (TMA)** experience. The chatbot and WebApp interact with your productive workspace seamlessly.

---

## 🌟 Key Commands & Functionalities
- **`/start`**: Welcome menu with quick command shortcuts and persistent **"💼 Open MMV Mini App"** button.
- **`/help`**: Detailed command guide, examples, and user manual.
- **`🌸 /habits`**: Lists active habit schedules and provides inline interactive ticking checkmarks to note daily completions.
- **`🎯 /tasks`**: Manages checklists and milestones. Add tasks inline via `/addtask <title>` or complete them via tapping inline buttons.
- **`➕ /addtask <title>`**: Quick-add a new task milestone directly from Telegram chat.
- **`📊 /finance`**: Instantly calculates expense logs, revenue streams, and clean net balance. Log them anywhere anytime using `/addexpense <amount> <category> [note]` and `/addincome <amount> <source> [note]`.
- **`💸 /addexpense <amount> <category> [note]`**: Log costs into your ledger.
- **`💰 /addincome <amount> <source> [note]`**: Log earnings into your ledger.
- **`📈 /goals`**: Draws beautiful progress sliders for target savings achievements with actual balance tallies.

---

## 🚀 Deployment Options

### Option A: Firebase Cloud Functions / Cloud Run (Recommended for Serverless)

You can host your Telegram Bot Webhook on Firebase Cloud Functions or Google Cloud Run for 24/7 reliability and auto-scaling.

#### 1. Setup Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

#### 2. Deploy Webhook to Cloud Run / Cloud Functions
Using Google Cloud Run (free tier included with 2 million requests/month):
```bash
cd telegram-bot
npm install
npm run build

# Deploy container directly to Cloud Run
gcloud run deploy mmv-telegram-bot \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN",TELEGRAM_WEBHOOK_DOMAIN="https://your-cloud-run-url.a.run.app"
```

#### 3. Register Webhook with Telegram
Once deployed, register your webhook with Telegram by visiting:
```text
https://YOUR_CLOUD_RUN_URL/setup-webhook
```
Or manually run:
```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://YOUR_CLOUD_RUN_URL/webhook/<YOUR_BOT_TOKEN>"
```

---

### Option B: Node.js Long-Polling (VPS / Local Server)

Run the bot on any server or local terminal using long-polling:

```bash
cd telegram-bot
npm install
npm run dev
```

---

## ⚙️ Environment Variables Reference

Create a `.env` file inside `telegram-bot/`:

```env
TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN_FROM_BOTFATHER"
TELEGRAM_WEBAPP_URL="https://your-app.web.app"
TELEGRAM_WEBHOOK_DOMAIN="https://your-webhook-domain.a.run.app"
TELEGRAM_WEBHOOK_SECRET_TOKEN="your_random_secret_token"
```

---

## 🤖 Registering with `@BotFather`
1. Open Telegram and search for [@BotFather](https://t.me/BotFather).
2. Send `/newbot` and follow the prompts to create your bot.
3. Copy your **HTTP API Token**.
4. Set up the WebApp menu button:
   - Send `/newapp` -> Select your bot -> Enter WebApp URL.
   - Send `/setmenubutton` -> Select your bot -> Attach WebApp link.
