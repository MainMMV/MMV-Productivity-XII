# 🚀 MMV Productivity XII

A full-featured productivity suite built with React 18, Vite, Tailwind CSS, and Firebase.

## ✨ Features
- 📊 **Finance & Wealth Tracker**: Income/expense streams, monthly subscription manager, category breakdown charts, and privacy balance toggle.
- 📅 **Calendar & Event Planner**: Agenda layout, drag-and-drop support, month/week views.
- 📝 **Notes & Rich Text Editor**: Auto-saving notes, categorization, markdown support.
- 🎯 **Habit & Goal Tracker**: Daily streaks, completion logs, visual heatmaps.
- ⏳ **Focus & Pomodoro Timer**: Ambient timer, sound effects, session history.
- ⚙️ **Custom Design System**: Light/Dark modes, custom theme hue accents, container layout widths, multi-user Firestore settings sync.

---

## 📱 Mobile Android APK
Want to compile and install this application on your Android smartphone as a native **.apk**?  
Check out our detailed guide: **[Mobile APK & Responsiveness Guide](./docs/MOBILE_APK_GUIDE.md)**.

---

## 🛠️ Local Development Setup

```bash
# Clone the repository
git clone https://github.com/MainMMV/MMV-Productivity-XII.git
cd MMV-Productivity-XII

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🔒 Environment Variables

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
