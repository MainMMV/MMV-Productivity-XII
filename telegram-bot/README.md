# 🤖 MMV Productivity Suite — Telegram Companion Bot & Mini App Integration

Deploy a stunning companion chatbot and immersive **Telegram Mini App (TMA)** experience. By pointing the codebase to your secure Supabase cluster, the chatbot and WebApp interact with the exact same database records seamlessly.

---

## 🌟 Key Functionalities Covered
- **Unified Sync Bridge**: Converts users' native Telegram IDs into unique securely hashed virtual credentials (`auth.users`) instantly upon starting the bot—allowing effortless database access and unified profiles.
- **`🌸 /habits`**: Lists active habit schedules and provides inline interactive ticking checkmarks to note daily completions.
- **`🎯 /tasks`**: Manages checklists and milestones. Add tasks inline via `/addtask <title>` or complete them via tapping inline buttons.
- **`📊 /finance`**: Instantly calculates and queries active month expense logs, revenue streams, and calculates balance. Log them anywhere anytime using `/addexpense <amount> <category> [note]` and `/addincome <amount> <source> [note]`.
- **`📈 /goals`**: Draws beautiful ASCII progress sliders pointing to target savings achievements with actual balance tallies.

---

## 🚀 Setup Steps & Execution

### Wake-Up / Database Keep-Alive
Because free-tier Supabase instances pause after periods of inactivity, your Telegram bot contains a built-in background ping. As long as your Node.js bot (or webhook process) is running, it will automatically query the database every 12 hours seamlessly, completely preventing the database from shutting down entirely!

### 1. Register with `@BotFather`
1. Open Telegram and search for [@BotFather](https://t.me/BotFather).
2. Input `/newbot` and designate a pleasant display name followed by a username ending in `bot` (for example, `MMVProductivityBot`).
3. Safely copy the outputted **HTTP API Token** (e.g. `123456789:ABCdefGhIJKlm...`).
4. Enable Mini App routing by issuing `/newapp`, selecting your bot, and inputting your hosted web application origin when prompted for the webapp URL:
   ```txt
   https://ais-pre-mtw7j2zdcu2mzlh4g6yogc-213490170517.asia-southeast1.run.app
   ```
5. Bind the Mini App shortcut to the persistent left menu button using `/setmenubutton`.

### 2. Configure Environment Variables
Inside your bot project folder, create a `.env` file containing:

```env
TELEGRAM_BOT_TOKEN="your_bot_token_copied_from_botfather"
SUPABASE_URL="https://ehtmrgfdyhnirleixviz.supabase.co"

# Service Role Key is recommended for Bot operations to safely authenticate virtual Telegram accounts:
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_secret"

# The hosted URL of your productive web dashboard:
TELEGRAM_WEBAPP_URL="https://ais-pre-mtw7j2zdcu2mzlh4g6yogc-213490170517.asia-southeast1.run.app"
```

### 3. Installation & Local Development
Run the following terminal commands to run the script locally or on a VPS:

```bash
# Navigate to the Bot workspace folder
cd telegram-bot

# Pull mandatory dependencies 
npm install

# Build/Compile the TypeScript configurations
npm run build

# Boot up the bot locally with Hot reload support!
npm run dev
```

---

## 🎨 Theme & Comfortable Aesthetics Adaptation
The MMV WebApp includes an inline CSS layout that detects whether you're loading the app from general Safari/Chrome browsers or directly inside Telegram. It uses Telegram's native theme parameters to adjust color palettes dynamically:

```javascript
// Automatically matching Telegram layout variables in code
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand(); // Auto expand to full immersive screen height
  const bg = tg.themeParams?.bg_color;
  const accent = tg.themeParams?.button_color;
  // Dynamic color assignments are applied gracefully!
}
```

This guarantees an adaptive, polished, and highly professional workspace where both WebApp and Telegram Bot feel like a single cohesive, unified productivity software.
