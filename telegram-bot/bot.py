#!/usr/bin/env python3
"""
🤖 MMV XII Productivity Suite — Python Telegram Companion Bot
===========================================================
A feature-packed Python Telegram Bot with:
1. Security Access Code Registration (Code: 9309).
2. Real-time Web App Notification Dispatcher (Tasks, Notes, Finance, Habits, Goals).
3. Interactive Bot Commands & Mini App launcher.
"""

import os
import sys
import json
import time
import io
import colorsys
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
import telebot
from telebot import types

try:
    from PIL import Image, ImageDraw, ImageFont
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

# ---------------------------------------------------------------------------
# CONFIGURATION & CONSTANTS
# ---------------------------------------------------------------------------
BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8430563840:AAGj9vAUe6Kx7inbWklfy8xUrFF7NeDfHRo")
ACCESS_CODE = "9309"
WEBAPP_URL = os.environ.get("TELEGRAM_WEBAPP_URL", "https://ais-pre-mtw7j2zdcu2mzlh4g6yogc-213490170517.asia-southeast1.run.app")
HTTP_PORT = int(os.environ.get("PORT", 5000))
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "authorized_users.json")

# Initialize Bot
bot = telebot.TeleBot(BOT_TOKEN, parse_mode="HTML")

DEFAULT_SETTINGS = {
    "theme_mode": "dark",
    "theme_preset": "slate",
    "theme_hue": 220,
    "border_radius_percentage": 35,
    "currency_primary": "USD",
    "currency_secondary": "UZS",
    "uzs_rate": 12200,
    "notifications_enabled": True,
    "daily_reminder_10am": True
}

def get_user_settings(chat_id):
    chat_id = str(chat_id)
    if chat_id not in authorized_users:
        return DEFAULT_SETTINGS.copy()
    if "settings" not in authorized_users[chat_id]:
        authorized_users[chat_id]["settings"] = DEFAULT_SETTINGS.copy()
        save_authorized_users(authorized_users)
    return authorized_users[chat_id]["settings"]

def hsl_to_rgb(h, s, l):
    r, g, b = colorsys.hls_to_rgb(h / 360.0, l / 100.0, s / 100.0)
    return (int(r * 255), int(g * 255), int(b * 255))

def generate_theme_preview_image(settings):
    """
    Generates a 640x420 PNG visual preview card of the MMV XII UI theme
    with active theme preset, primary accent color, dark/light canvas,
    and rounded corner styling.
    """
    if not HAS_PIL:
        return None

    try:
        is_dark = settings.get("theme_mode", "dark") == "dark"
        preset = settings.get("theme_preset", "slate")
        hue = int(settings.get("theme_hue", 220))
        radius_pct = int(settings.get("border_radius_percentage", 35))

        corner_radius = int((radius_pct / 100.0) * 32)

        preset_colors = {
            "slate": ("#090d16", "#111827", "#f8fafc") if is_dark else ("#f8fafc", "#ffffff", "#0f172a"),
            "sand": ("#18120c", "#241c14", "#faf8f5") if is_dark else ("#faf8f5", "#ffffff", "#1c120c"),
            "mint": ("#081610", "#0f241a", "#f0fdf4") if is_dark else ("#f0fdf4", "#ffffff", "#052e16"),
            "obsidian": ("#030303", "#0f0f10", "#ffffff") if is_dark else ("#f4f4f5", "#ffffff", "#09090b"),
            "mindora": ("#192428", "#243338", "#e6f2f0") if is_dark else ("#edf5f3", "#ffffff", "#122023"),
        }
        bg_hex, card_hex, text_hex = preset_colors.get(preset, preset_colors["slate"])

        primary_rgb = hsl_to_rgb(hue, 90, 60)

        width, height = 640, 420
        img = Image.new("RGB", (width, height), bg_hex)
        draw = ImageDraw.Draw(img)

        # Header Bar
        draw.rectangle([0, 0, width, 56], fill=card_hex)
        draw.ellipse([24, 18, 42, 36], fill=primary_rgb)
        draw.text((54, 18), "MMV XII Workspace Suite", fill=text_hex)

        # Main Card Container
        card_box = [32, 76, width - 32, height - 24]
        draw.rounded_rectangle(card_box, radius=corner_radius, fill=card_hex, outline=primary_rgb, width=2)

        # Card Title
        draw.text((56, 96), f"Theme Preset: {preset.upper()} ({'Dark 🌙' if is_dark else 'Light ☀️'})", fill=text_hex)
        draw.text((56, 120), f"Primary Accent Hue: {hue}° | Radius: {radius_pct}% ({corner_radius}px)", fill=primary_rgb)

        # Sample Task Card
        task_box = [56, 156, width - 56, 216]
        draw.rounded_rectangle(task_box, radius=max(4, corner_radius - 6), fill=bg_hex, outline=primary_rgb, width=1)
        draw.rectangle([68, 172, 84, 188], fill=primary_rgb)
        draw.text((96, 172), "🎯 Complete Daily High Priority Targets", fill=text_hex)
        draw.text((96, 192), "Due Today • Status: Active", fill=primary_rgb)

        # Sample Financial Ledger Card
        bal_box = [56, 232, width - 56, 292]
        draw.rounded_rectangle(bal_box, radius=max(4, corner_radius - 6), fill=bg_hex)
        draw.text((72, 244), "📊 Monthly Financial Ledger Summary", fill=text_hex)
        draw.text((72, 264), f"Primary Currency: {settings.get('currency_primary', 'USD')} | Balance: +$1,079.50", fill=primary_rgb)

        # Accent Action Button
        btn_box = [56, 312, 250, 352]
        draw.rounded_rectangle(btn_box, radius=max(4, corner_radius - 4), fill=primary_rgb)
        draw.text((80, 324), "✨ Applied Theme", fill="#ffffff")

        buf = io.BytesIO()
        img.save(buf, format="PNG")
        buf.seek(0)
        return buf
    except Exception as err:
        print(f"⚠️ Error generating theme preview image: {err}")
        return None

# ---------------------------------------------------------------------------
# CONFIGURATION & CONSTANTS
# ---------------------------------------------------------------------------
BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8430563840:AAGj9vAUe6Kx7inbWklfy8xUrFF7NeDfHRo")
ACCESS_CODE = "9309"
WEBAPP_URL = os.environ.get("TELEGRAM_WEBAPP_URL", "https://ais-pre-mtw7j2zdcu2mzlh4g6yogc-213490170517.asia-southeast1.run.app")
HTTP_PORT = int(os.environ.get("PORT", 5000))
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "authorized_users.json")

# Initialize Bot
bot = telebot.TeleBot(BOT_TOKEN, parse_mode="HTML")

# ---------------------------------------------------------------------------
# PERSISTENT AUTHORIZED USERS STORAGE
# ---------------------------------------------------------------------------
def load_authorized_users():
    """Load authorized chat IDs from local JSON store."""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"⚠️ Error loading authorized users: {e}")
            return {}
    return {}

def save_authorized_users(users_dict):
    """Save authorized chat IDs to local JSON store."""
    try:
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(users_dict, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"⚠️ Error saving authorized users: {e}")

authorized_users = load_authorized_users()

# In-memory mock database for inline Telegram commands
memory_db = {}

def get_user_memory(chat_id):
    if chat_id not in memory_db:
        memory_db[chat_id] = {
            "tasks": [
                {"id": "t1", "title": "Welcome to MMV XII Productivity", "priority": "High", "status": "Pending", "due": "Today"},
                {"id": "t2", "title": "Test Web App & Bot Notification Sync", "priority": "Medium", "status": "Pending", "due": "Today"}
            ],
            "habits": [
                {"id": "h1", "title": "Morning Routine & Hydration", "streak": 5, "done": False},
                {"id": "h2", "title": "Deep Focus Work Session", "streak": 3, "done": False}
            ],
            "finance": {
                "income": 1500.00,
                "expenses": 420.50,
            },
            "goals": [
                {"title": "Emergency Financial Reserve", "current": 850, "target": 1000},
                {"title": "Productivity Hardware Upgrade", "current": 400, "target": 600}
            ]
        }
    return memory_db[chat_id]

# ---------------------------------------------------------------------------
# HTTP WEBHOOK NOTIFICATION SERVER (Receives Web App Updates)
# ---------------------------------------------------------------------------
class NotificationWebhookHandler(BaseHTTPRequestHandler):
    """HTTP Server to listen for POST /notify events from Web App."""

    def do_POST(self):
        if self.path in ["/notify", "/api/notify"]:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode('utf-8'))
                entity = payload.get("entity", "Workspace").capitalize()
                action = payload.get("action", "Updated").capitalize()
                title = payload.get("title", "Item Changed")
                details = payload.get("details", "")

                notification_msg = f"""
🔔 <b>MMV XII Web App Update Notification</b>

📌 <b>[{entity.upper()}] {action}</b>
• <b>Title:</b> {title}
{f'• <b>Details:</b> {details}\n' if details else ''}• <b>Time:</b> {time.strftime('%Y-%m-%d %H:%M:%S')}
""".strip()

                # Broadcast notification to all authorized users
                delivered_count = 0
                for cid in list(authorized_users.keys()):
                    try:
                        bot.send_message(int(cid), notification_msg)
                        delivered_count += 1
                    except Exception as err:
                        print(f"⚠️ Failed to deliver message to chat {cid}: {err}")

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = json.dumps({"status": "success", "delivered_to": delivered_count})
                self.wfile.write(response.encode('utf-8'))

            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        html_content = f"""
        <html>
        <head><title>MMV XII Bot Listener</title></head>
        <body style="font-family: system-ui, sans-serif; padding: 2rem; background: #090d16; color: #fff;">
            <h2>🤖 MMV XII Telegram Bot Webhook Server</h2>
            <p>Status: <b style="color: #4ade80;">Active & Online</b></p>
            <p>Registered Devices/Users: <b>{len(authorized_users)}</b></p>
        </body>
        </html>
        """
        self.wfile.write(html_content.encode('utf-8'))

def start_webhook_server():
    server_address = ('', HTTP_PORT)
    httpd = HTTPServer(server_address, NotificationWebhookHandler)
    print(f"🚀 Notification Webhook Listener running on port {HTTP_PORT}...")
    httpd.serve_forever()

# ---------------------------------------------------------------------------
# TELEGRAM BOT HANDLERS & REGISTRATION FLOW (CODE: 9309)
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# SETTINGS & THEME CUSTOMIZATION KEYBOARDS
# ---------------------------------------------------------------------------
def build_main_settings_keyboard(settings):
    markup = types.InlineKeyboardMarkup(row_width=2)
    mode_str = "🌙 Dark Mode" if settings.get("theme_mode") == "dark" else "☀️ Light Mode"
    btn_mode = types.InlineKeyboardButton(f"Toggle {mode_str}", callback_data="cfg_toggle_mode")
    btn_preset = types.InlineKeyboardButton(f"🎨 Preset: {settings.get('theme_preset', 'slate').capitalize()}", callback_data="cfg_preset_menu")
    btn_hue = types.InlineKeyboardButton(f"🌈 Hue: {settings.get('theme_hue', 220)}°", callback_data="cfg_hue_menu")
    btn_radius = types.InlineKeyboardButton(f"⭕ Radius: {settings.get('border_radius_percentage', 35)}%", callback_data="cfg_radius_menu")
    btn_currency = types.InlineKeyboardButton(f"💱 Currency: {settings.get('currency_primary', 'USD')}", callback_data="cfg_currency_menu")
    
    notify_str = "ON ✅" if settings.get("notifications_enabled", True) else "OFF ❌"
    btn_notify = types.InlineKeyboardButton(f"🔔 Alerts: {notify_str}", callback_data="cfg_notify_toggle")
    
    btn_preview = types.InlineKeyboardButton("🖼️ Send Visual Theme Preview", callback_data="cfg_preview")

    markup.add(btn_mode)
    markup.add(btn_preset, btn_hue)
    markup.add(btn_radius, btn_currency)
    markup.add(btn_notify)
    markup.add(btn_preview)
    return markup

def build_preset_keyboard():
    markup = types.InlineKeyboardMarkup(row_width=2)
    presets = [("Slate 🌑", "slate"), ("Sand 🏖️", "sand"), ("Mint 🌿", "mint"), ("Obsidian 💎", "obsidian"), ("Mindora 🌲", "mindora")]
    btns = [types.InlineKeyboardButton(name, callback_data=f"cfg_set_preset:{code}") for name, code in presets]
    markup.add(*btns)
    markup.add(types.InlineKeyboardButton("🔙 Back to Settings", callback_data="cfg_main"))
    return markup

def build_hue_keyboard():
    markup = types.InlineKeyboardMarkup(row_width=3)
    hues = [("Red 0°", "0"), ("Amber 45°", "45"), ("Emerald 120°", "120"), ("Cyan 180°", "180"), ("Blue 220°", "220"), ("Violet 260°", "260"), ("Pink 310°", "310")]
    btns = [types.InlineKeyboardButton(name, callback_data=f"cfg_set_hue:{val}") for name, val in hues]
    markup.add(*btns)
    markup.add(types.InlineKeyboardButton("🔙 Back to Settings", callback_data="cfg_main"))
    return markup

def build_radius_keyboard():
    markup = types.InlineKeyboardMarkup(row_width=3)
    radii = [("Square 0%", "0"), ("Subtle 20%", "20"), ("Round 35%", "35"), ("Pill 50%", "50"), ("Soft 70%", "70"), ("Full 100%", "100")]
    btns = [types.InlineKeyboardButton(name, callback_data=f"cfg_set_radius:{val}") for name, val in radii]
    markup.add(*btns)
    markup.add(types.InlineKeyboardButton("🔙 Back to Settings", callback_data="cfg_main"))
    return markup

def build_currency_keyboard():
    markup = types.InlineKeyboardMarkup(row_width=3)
    currs = [("USD $", "USD"), ("UZS so'm", "UZS"), ("EUR €", "EUR"), ("GBP £", "GBP"), ("RUB ₽", "RUB")]
    btns = [types.InlineKeyboardButton(name, callback_data=f"cfg_set_currency:{code}") for name, code in currs]
    markup.add(*btns)
    markup.add(types.InlineKeyboardButton("🔙 Back to Settings", callback_data="cfg_main"))
    return markup

@bot.message_handler(commands=['start'])
def handle_start(message):

    chat_id = str(message.chat.id)
    first_name = message.from_user.first_name or "User"

    if chat_id in authorized_users:
        markup = types.InlineKeyboardMarkup(row_width=1)
        webapp_btn = types.InlineKeyboardButton("💼 Open MMV XII Web App", url=WEBAPP_URL)
        markup.add(webapp_btn)

        welcome_text = f"""
👋 <b>Welcome back, {first_name}!</b>

You are registered and authorized on <b>MMV XII Productivity Suite</b>.

⚡ <b>Command Shortcuts:</b>
⚙️ /settings - UI theme & settings panel with live visual preview
🎯 /tasks - View active tasks
➕ /addtask &lt;title&gt; - Quick add task
🌸 /habits - View daily habits
📊 /finance - Financial dashboard
💸 /addexpense &lt;amount&gt; &lt;category&gt; [note] - Log expense
💰 /addincome &lt;amount&gt; &lt;source&gt; [note] - Log income
📈 /goals - Milestone tracker
ℹ️ /status - Check device registration
❓ /help - Usage manual
"""
        bot.send_message(chat_id, welcome_text, reply_markup=markup)
    else:
        text = f"""
🔒 <b>MMV XII Security Verification Required</b>

Welcome, <b>{first_name}</b>! To register and link your Telegram account with the MMV XII Productivity Suite, please enter your 4-digit security code:

👉 <code>enter code: ...</code>
"""
        bot.send_message(chat_id, text)

@bot.message_handler(commands=['help'])
def handle_help(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 <b>Access Denied.</b> Please register by entering code: <code>9309</code>")
        return

    help_text = """
📖 <b>MMV XII Telegram Bot Manual</b>

⚙️ <b>SETTINGS & THEME CUSTOMIZATION</b>
• <code>/settings</code> — Interactive theme settings panel
• Reply with theme keywords or numbers: <code>slate</code>, <code>sand</code>, <code>mint</code>, <code>obsidian</code>, <code>mindora</code>, <code>dark</code>, <code>light</code>, <code>hue 260</code>, <code>radius 50</code> or send any number (e.g. <code>220</code> for hue, <code>35</code> for radius).
• Dynamic visual theme preview cards are rendered and sent automatically!

🎯 <b>TASKS</b>
• <code>/tasks</code> — View pending tasks
• <code>/addtask &lt;title&gt;</code> — Create a new task

🌸 <b>HABITS</b>
• <code>/habits</code> — View daily habit checklist & streak progress

💰 <b>FINANCE</b>
• <code>/finance</code> — Summary of income, expenses, and net balance
• <code>/addexpense &lt;amount&gt; &lt;category&gt; [note]</code> — Log expense
• <code>/addincome &lt;amount&gt; &lt;source&gt; [note]</code> — Log income

📈 <b>GOALS</b>
• <code>/goals</code> — Check milestone progress

📲 <b>WEB SYNC & NOTIFICATIONS</b>
Every action performed on the Web App (creating or updating tasks, notes, finances, habits) is automatically broadcasted to this chat in real time!
"""
    bot.send_message(chat_id, help_text)

@bot.message_handler(commands=['status'])
def handle_status(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 <b>Access Denied.</b> Enter code: <code>9309</code>")
        return

    u_data = authorized_users.get(chat_id, {})
    status_text = f"""
ℹ️ <b>MMV XII Registration Status</b>

• <b>Status:</b> ✅ Authorized
• <b>Chat ID:</b> <code>{chat_id}</code>
• <b>Registered Name:</b> {u_data.get('first_name', 'User')}
• <b>Username:</b> @{u_data.get('username', 'N/A')}
• <b>Registered Date:</b> {u_data.get('registered_at', 'Active')}
• <b>Total Registered Bot Users:</b> {len(authorized_users)}
"""
    bot.send_message(chat_id, status_text)

@bot.message_handler(commands=['tasks'])
def handle_tasks(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 Please enter code <code>9309</code> first.")
        return

    mem = get_user_memory(chat_id)
    tasks = mem["tasks"]

    if not tasks:
        bot.send_message(chat_id, "🎉 <b>No pending tasks!</b> All clear.")
        return

    res = "🎯 <b>Active Target Tasks:</b>\n\n"
    for t in tasks:
        res += f"• <b>{t['title']}</b>\n  └ Priority: {t['priority']} | Status: {t['status']} | Due: {t['due']}\n\n"

    bot.send_message(chat_id, res)

@bot.message_handler(commands=['addtask'])
def handle_addtask(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 Please enter code <code>9309</code> first.")
        return

    title = message.text.replace("/addtask", "").strip()
    if not title:
        bot.send_message(chat_id, "Usage: <code>/addtask Task title here</code>")
        return

    mem = get_user_memory(chat_id)
    new_task = {"id": f"t_{int(time.time())}", "title": title, "priority": "Medium", "status": "Pending", "due": "Today"}
    mem["tasks"].append(new_task)

    bot.send_message(chat_id, f"✅ Task <b>\"{title}\"</b> added successfully!")

@bot.message_handler(commands=['habits'])
def handle_habits(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 Please enter code <code>9309</code> first.")
        return

    mem = get_user_memory(chat_id)
    habits = mem["habits"]

    res = "🌸 <b>Daily Habit Progress:</b>\n\n"
    for h in habits:
        status = "✅ Completed" if h["done"] else "⬜ Pending"
        res += f"• <b>{h['title']}</b>\n  └ Streak: {h['streak']} days | Status: {status}\n\n"

    bot.send_message(chat_id, res)

@bot.message_handler(commands=['finance'])
def handle_finance(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 Please enter code <code>9309</code> first.")
        return

    mem = get_user_memory(chat_id)
    fin = mem["finance"]
    net = fin["income"] - fin["expenses"]

    res = f"""
📊 <b>Financial Ledger Summary:</b>

💰 <b>Total Income:</b> ${fin['income']:,.2f}
💸 <b>Total Expenses:</b> ${fin['expenses']:,.2f}
⚖️ <b>Net Balance:</b> ${net:,.2f} {'📈' if net >= 0 else '📉'}
"""
    bot.send_message(chat_id, res)

@bot.message_handler(commands=['addexpense'])
def handle_addexpense(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 Please enter code <code>9309</code> first.")
        return

    parts = message.text.replace("/addexpense", "").strip().split(maxsplit=2)
    if len(parts) < 2:
        bot.send_message(chat_id, "Usage: <code>/addexpense &lt;amount&gt; &lt;category&gt; [note]</code>\nExample: <code>/addexpense 15.50 Food Lunch</code>")
        return

    try:
        amt = float(parts[0])
        cat = parts[1]
        note = parts[2] if len(parts) > 2 else ""

        mem = get_user_memory(chat_id)
        mem["finance"]["expenses"] += amt

        bot.send_message(chat_id, f"💸 Logged expense of <b>${amt:.2f}</b> under <b>{cat}</b>!")
    except ValueError:
        bot.send_message(chat_id, "❌ Invalid amount number.")

@bot.message_handler(commands=['addincome'])
def handle_addincome(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 Please enter code <code>9309</code> first.")
        return

    parts = message.text.replace("/addincome", "").strip().split(maxsplit=2)
    if len(parts) < 2:
        bot.send_message(chat_id, "Usage: <code>/addincome &lt;amount&gt; &lt;source&gt; [note]</code>\nExample: <code>/addincome 500 Project Client Payment</code>")
        return

    try:
        amt = float(parts[0])
        src = parts[1]

        mem = get_user_memory(chat_id)
        mem["finance"]["income"] += amt

        bot.send_message(chat_id, f"💰 Logged income of <b>${amt:.2f}</b> from <b>{src}</b>!")
    except ValueError:
        bot.send_message(chat_id, "❌ Invalid amount number.")

@bot.message_handler(commands=['goals'])
def handle_goals(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 Please enter code <code>9309</code> first.")
        return

    mem = get_user_memory(chat_id)
    goals = mem["goals"]

    res = "📈 <b>Active Milestone Goals:</b>\n\n"
    for g in goals:
        pct = min(100, int((g['current'] / g['target']) * 100))
        filled = "■" * (pct // 10)
        empty = "□" * (10 - (pct // 10))
        res += f"• <b>{g['title']}</b>\n  └ <code>[{filled}{empty}]</code> {pct}%\n  └ Progress: ${g['current']} / ${g['target']}\n\n"

    bot.send_message(chat_id, res)

@bot.message_handler(commands=['settings'])
def handle_settings(message):
    chat_id = str(message.chat.id)
    if chat_id not in authorized_users:
        bot.send_message(chat_id, "🔒 Please enter code <code>9309</code> first.")
        return

    st = get_user_settings(chat_id)
    text = f"""
⚙️ <b>MMV XII Workspace Settings Panel</b>

🎨 <b>Active Theme:</b> {st['theme_preset'].capitalize()} ({st['theme_mode'].capitalize()})
🌈 <b>Primary Hue:</b> {st['theme_hue']}°
⭕ <b>Border Radius:</b> {st['border_radius_percentage']}%
💱 <b>Primary Currency:</b> {st['currency_primary']}
🔔 <b>Real-time Telegram Alerts:</b> {'Active ✅' if st['notifications_enabled'] else 'Disabled ❌'}

👇 <i>Click inline buttons below or reply with any numbers/text (e.g. <code>hue 260</code> or <code>radius 50</code> or <code>mint</code> or <code>dark</code>) to customize your UI theme:</i>
"""
    bot.send_message(chat_id, text, reply_markup=build_main_settings_keyboard(st))

@bot.callback_query_handler(func=lambda call: call.data.startswith("cfg_"))
def handle_settings_callbacks(call):
    chat_id = str(call.message.chat.id)
    if chat_id not in authorized_users:
        bot.answer_callback_query(call.id, "🔒 Authorization required (enter code 9309).")
        return

    st = get_user_settings(chat_id)
    data = call.data

    if data == "cfg_main":
        text = f"⚙️ <b>MMV XII Workspace Settings Panel</b>\n\n🎨 <b>Theme:</b> {st['theme_preset'].capitalize()} ({st['theme_mode']})\n🌈 <b>Hue:</b> {st['theme_hue']}° | ⭕ <b>Radius:</b> {st['border_radius_percentage']}%\n💱 <b>Currency:</b> {st['currency_primary']}"
        bot.edit_message_text(text, chat_id, call.message.message_id, reply_markup=build_main_settings_keyboard(st), parse_mode="HTML")

    elif data == "cfg_toggle_mode":
        st["theme_mode"] = "light" if st["theme_mode"] == "dark" else "dark"
        save_authorized_users(authorized_users)
        bot.answer_callback_query(call.id, f"Theme mode set to {st['theme_mode'].capitalize()}!")
        text = f"⚙️ <b>MMV XII Workspace Settings Panel</b>\n\n🎨 <b>Theme:</b> {st['theme_preset'].capitalize()} ({st['theme_mode']})\n🌈 <b>Hue:</b> {st['theme_hue']}° | ⭕ <b>Radius:</b> {st['border_radius_percentage']}%\n💱 <b>Currency:</b> {st['currency_primary']}"
        bot.edit_message_text(text, chat_id, call.message.message_id, reply_markup=build_main_settings_keyboard(st), parse_mode="HTML")

    elif data == "cfg_preset_menu":
        bot.edit_message_text("🎨 <b>Select a Visual Theme Preset:</b>", chat_id, call.message.message_id, reply_markup=build_preset_keyboard(), parse_mode="HTML")

    elif data.startswith("cfg_set_preset:"):
        preset = data.split(":")[1]
        st["theme_preset"] = preset
        save_authorized_users(authorized_users)
        bot.answer_callback_query(call.id, f"Applied preset: {preset.capitalize()}")
        text = f"⚙️ <b>MMV XII Workspace Settings Panel</b>\n\n🎨 <b>Theme:</b> {st['theme_preset'].capitalize()} ({st['theme_mode']})\n🌈 <b>Hue:</b> {st['theme_hue']}° | ⭕ <b>Radius:</b> {st['border_radius_percentage']}%\n💱 <b>Currency:</b> {st['currency_primary']}"
        bot.edit_message_text(text, chat_id, call.message.message_id, reply_markup=build_main_settings_keyboard(st), parse_mode="HTML")

    elif data == "cfg_hue_menu":
        bot.edit_message_text("🌈 <b>Select Primary Accent Hue Angle:</b>\n<i>Or type any number 0-360 in chat (e.g. 260)</i>", chat_id, call.message.message_id, reply_markup=build_hue_keyboard(), parse_mode="HTML")

    elif data.startswith("cfg_set_hue:"):
        hue_val = int(data.split(":")[1])
        st["theme_hue"] = hue_val
        save_authorized_users(authorized_users)
        bot.answer_callback_query(call.id, f"Accent Hue set to {hue_val}°")
        text = f"⚙️ <b>MMV XII Workspace Settings Panel</b>\n\n🎨 <b>Theme:</b> {st['theme_preset'].capitalize()} ({st['theme_mode']})\n🌈 <b>Hue:</b> {st['theme_hue']}° | ⭕ <b>Radius:</b> {st['border_radius_percentage']}%\n💱 <b>Currency:</b> {st['currency_primary']}"
        bot.edit_message_text(text, chat_id, call.message.message_id, reply_markup=build_main_settings_keyboard(st), parse_mode="HTML")

    elif data == "cfg_radius_menu":
        bot.edit_message_text("⭕ <b>Select Corner Border Radius:</b>\n<i>Or type any percentage 0-100 in chat (e.g. 50%)</i>", chat_id, call.message.message_id, reply_markup=build_radius_keyboard(), parse_mode="HTML")

    elif data.startswith("cfg_set_radius:"):
        rad_val = int(data.split(":")[1])
        st["border_radius_percentage"] = rad_val
        save_authorized_users(authorized_users)
        bot.answer_callback_query(call.id, f"Border radius set to {rad_val}%")
        text = f"⚙️ <b>MMV XII Workspace Settings Panel</b>\n\n🎨 <b>Theme:</b> {st['theme_preset'].capitalize()} ({st['theme_mode']})\n🌈 <b>Hue:</b> {st['theme_hue']}° | ⭕ <b>Radius:</b> {st['border_radius_percentage']}%\n💱 <b>Currency:</b> {st['currency_primary']}"
        bot.edit_message_text(text, chat_id, call.message.message_id, reply_markup=build_main_settings_keyboard(st), parse_mode="HTML")

    elif data == "cfg_currency_menu":
        bot.edit_message_text("💱 <b>Select Primary Workspace Currency:</b>", chat_id, call.message.message_id, reply_markup=build_currency_keyboard(), parse_mode="HTML")

    elif data.startswith("cfg_set_currency:"):
        curr = data.split(":")[1]
        st["currency_primary"] = curr
        save_authorized_users(authorized_users)
        bot.answer_callback_query(call.id, f"Currency set to {curr}")
        text = f"⚙️ <b>MMV XII Workspace Settings Panel</b>\n\n🎨 <b>Theme:</b> {st['theme_preset'].capitalize()} ({st['theme_mode']})\n🌈 <b>Hue:</b> {st['theme_hue']}° | ⭕ <b>Radius:</b> {st['border_radius_percentage']}%\n💱 <b>Currency:</b> {st['currency_primary']}"
        bot.edit_message_text(text, chat_id, call.message.message_id, reply_markup=build_main_settings_keyboard(st), parse_mode="HTML")

    elif data == "cfg_notify_toggle":
        st["notifications_enabled"] = not st.get("notifications_enabled", True)
        save_authorized_users(authorized_users)
        bot.answer_callback_query(call.id, f"Notifications {'Activated' if st['notifications_enabled'] else 'Deactivated'}")
        text = f"⚙️ <b>MMV XII Workspace Settings Panel</b>\n\n🎨 <b>Theme:</b> {st['theme_preset'].capitalize()} ({st['theme_mode']})\n🌈 <b>Hue:</b> {st['theme_hue']}° | ⭕ <b>Radius:</b> {st['border_radius_percentage']}%\n💱 <b>Currency:</b> {st['currency_primary']}"
        bot.edit_message_text(text, chat_id, call.message.message_id, reply_markup=build_main_settings_keyboard(st), parse_mode="HTML")

    elif data == "cfg_preview":
        bot.answer_callback_query(call.id, "🎨 Rendering theme visual preview image...")
        img_buf = generate_theme_preview_image(st)
        if img_buf:
            caption = f"🖼️ <b>MMV XII Theme Preview Card</b>\n\n🎨 Preset: <b>{st['theme_preset'].upper()}</b>\n🌙 Mode: <b>{st['theme_mode'].capitalize()}</b>\n🌈 Accent Hue: <b>{st['theme_hue']}°</b>\n⭕ Border Radius: <b>{st['border_radius_percentage']}%</b>"
            bot.send_photo(chat_id, img_buf, caption=caption, parse_mode="HTML")
        else:
            bot.send_message(chat_id, "⚠️ Preview image generator requires Pillow library.")

# ---------------------------------------------------------------------------
# CATCH-ALL REGISTRATION & TEXT INPUT SETTINGS HANDLER
# ---------------------------------------------------------------------------
@bot.message_handler(func=lambda msg: True)
def handle_text_messages(message):
    chat_id = str(message.chat.id)
    text = message.text.strip()
    first_name = message.from_user.first_name or "User"
    username = message.from_user.username or ""

    # Check authorization state
    if chat_id not in authorized_users:
        if ACCESS_CODE in text:
            # Register user!
            authorized_users[chat_id] = {
                "first_name": first_name,
                "username": username,
                "registered_at": time.strftime("%Y-%m-%d %H:%M:%S")
            }
            save_authorized_users(authorized_users)

            success_text = f"""
✅ <b>Access Granted! Code {ACCESS_CODE} Verified.</b>

Welcome, <b>{first_name}</b>! Your Telegram account is now registered with MMV XII Productivity Suite.

📲 <b>Real-Time Web Updates Active:</b>
Whenever you add or update Tasks, Notes, Finances, Habits, or Goals on the Web App, instant alert details will be delivered directly to this chat!

Type /help, /settings or /tasks to begin exploring.
"""
            bot.send_message(chat_id, success_text)
        else:
            bot.send_message(
                chat_id,
                "❌ <b>Incorrect Access Code!</b>\n\nTo unlock MMV XII Bot, please enter your registration code:\n\n<code>enter code: 9309</code>"
            )
        return

    # Check if text is a direct settings adjustment (e.g. number, hue 260, radius 50, dark, light, slate, sand, mint, obsidian, mindora)
    st = get_user_settings(chat_id)
    lower_text = text.lower()

    setting_updated = False
    update_msg = ""

    if lower_text in ["dark", "light"]:
        st["theme_mode"] = lower_text
        setting_updated = True
        update_msg = f"🌙 Mode set to {lower_text.capitalize()}!"

    elif lower_text in ["slate", "sand", "mint", "obsidian", "mindora"]:
        st["theme_preset"] = lower_text
        setting_updated = True
        update_msg = f"🎨 Theme preset changed to {lower_text.capitalize()}!"

    elif lower_text.startswith("hue") or lower_text.startswith("hue:"):
        try:
            val = int("".join(filter(str.isdigit, lower_text)))
            st["theme_hue"] = max(0, min(360, val))
            setting_updated = True
            update_msg = f"🌈 Accent Hue angle updated to {st['theme_hue']}°!"
        except ValueError:
            pass

    elif lower_text.startswith("radius") or lower_text.startswith("radius:") or "%" in lower_text:
        try:
            val = int("".join(filter(str.isdigit, lower_text)))
            st["border_radius_percentage"] = max(0, min(100, val))
            setting_updated = True
            update_msg = f"⭕ Border Radius percentage set to {st['border_radius_percentage']}%!"
        except ValueError:
            pass

    elif text.isdigit():
        num = int(text)
        if 0 <= num <= 100:
            st["border_radius_percentage"] = num
            setting_updated = True
            update_msg = f"⭕ Border Radius percentage set to {num}%!"
        elif 101 <= num <= 360:
            st["theme_hue"] = num
            setting_updated = True
            update_msg = f"🌈 Accent Hue angle set to {num}°!"

    if setting_updated:
        save_authorized_users(authorized_users)
        bot.send_message(chat_id, f"✅ <b>Settings Updated:</b> {update_msg}", parse_mode="HTML")
        # Auto-send dynamic visual preview image
        img_buf = generate_theme_preview_image(st)
        if img_buf:
            caption = f"🖼️ <b>Live Theme Preview Card</b>\n\n🎨 Preset: <b>{st['theme_preset'].upper()}</b> ({st['theme_mode']})\n🌈 Accent Hue: <b>{st['theme_hue']}°</b>\n⭕ Border Radius: <b>{st['border_radius_percentage']}%</b>"
            bot.send_photo(chat_id, img_buf, caption=caption, parse_mode="HTML", reply_markup=build_main_settings_keyboard(st))
        return

    # If user is authorized and sent general text
    bot.send_message(chat_id, "💡 Send /help or /settings to configure theme options or view available commands.")


# ---------------------------------------------------------------------------
# MAIN ENTRYPOINT
# ---------------------------------------------------------------------------
def start_reminder_scheduler():
    """Background scheduler that fires daily reminders at 10:00 AM and task deadline alerts."""
    print("⏰ Starting MMV XII Daily 10:00 AM Reminder Scheduler...")
    last_10am_sent_date = ""

    while True:
        try:
            now_str = time.strftime("%Y-%m-%d")
            time_hm = time.strftime("%H:%M")

            # 1. Daily 10:00 AM Morning Brief Trigger
            if time_hm == "10:00" and last_10am_sent_date != now_str:
                last_10am_sent_date = now_str
                print(f"☀️ [10:00 AM REMINDER] Dispatching daily morning brief for {now_str}...")

                for cid in list(authorized_users.keys()):
                    try:
                        mem = get_user_memory(cid)
                        tasks = mem.get("tasks", [])
                        habits = mem.get("habits", [])

                        pending_habits = [h for h in habits if not h.get("done")]
                        pending_tasks = [t for t in tasks if t.get("status") != "Completed" and t.get("status") != "done"]

                        habit_lines = "\n".join([f"  • {h['title']} (🔥 Streak: {h.get('streak', 0)}d)" for h in pending_habits]) or "  • All habits completed!"
                        task_lines = "\n".join([f"  • {t['title']} (Priority: {t.get('priority', 'Normal')})" for t in pending_tasks]) or "  • No pending tasks for today!"

                        morning_brief = f"""
☀️ <b>MMV XII Daily Morning Reminder (10:00 AM)</b>

🌸 <b>Habits to Complete Today:</b>
{habit_lines}

🎯 <b>Tasks Pending for Today:</b>
{task_lines}

💪 <i>Stay focused and make today productive! Open the Web App or type /tasks to check off items.</i>
""".strip()

                        bot.send_message(int(cid), morning_brief)
                    except Exception as err:
                        print(f"⚠️ Failed 10:00 AM reminder for chat {cid}: {err}")

            time.sleep(30)
        except Exception as e:
            print(f"⚠️ Scheduler error: {e}")
            time.sleep(10)

if __name__ == "__main__":
    print("=" * 60)
    print("🤖 MMV XII Python Telegram Bot Starting...")
    print(f"🔑 Security Code: {ACCESS_CODE}")
    print(f"👥 Currently Authorized Chat IDs: {len(authorized_users)}")
    print("=" * 60)

    # Start notification webhook listener in background thread
    server_thread = threading.Thread(target=start_webhook_server, daemon=True)
    server_thread.start()

    # Start daily 10:00 AM scheduler thread
    scheduler_thread = threading.Thread(target=start_reminder_scheduler, daemon=True)
    scheduler_thread.start()

    # Start Telegram Long Polling
    while True:
        try:
            print("📡 Starting bot polling listener...")
            bot.infinity_polling(timeout=20, long_polling_timeout=20)
        except Exception as err:
            print(f"⚠️ Polling connection error: {err}. Retrying in 5s...")
            time.sleep(5)
