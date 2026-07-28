# 📱 Android Native APK Build & Responsive Mobile Guide

This document details how to turn **MMV Productivity XII** (`https://github.com/MainMMV/MMV-Productivity-XII.git`) into a **native Android APK** using **Capacitor** and **Android Studio**, or automated **GitHub Actions CI/CD**.

---

## 🎨 Mobile Responsiveness & Native APK UI Standards

This codebase is built to render seamlessly on mobile smartphones, foldables, and tablets as a native APK:

1. **Touch Targets & Gestures**:
   - Every interactive element (buttons, tabs, form controls) maintains a minimum **44×44px** touch area.
   - Pull-to-refresh gestures are enabled on primary feeds (Finance, Tasks, Calendar, Habits).

2. **Mobile Layout & Safe Area Insets**:
   - Uses dynamic viewport heights (`h-[100dvh]` and `min-h-screen`) to prevent mobile browser address bar jumps.
   - Includes top notch/status bar spacing (`pt-safe`) and bottom Android navigation bar padding (`pb-safe`).

3. **Adaptive Component Density**:
   - On screens under **640px**, complex tables convert to scannable card feeds.
   - Modals and forms display as bottom sheet drawers on mobile viewports for easy thumb reachability.

---

## 🛠️ Prerequisites

- **Node.js** v18 or higher
- **Git**
- **Android Studio** (Electric Eel or newer) installed on your computer *(Optional if using GitHub Actions)*

---

## 🚀 Native Capacitor APK Build (Local Machine)

Capacitor wraps your React + Vite frontend into a native Android runtime environment with hardware performance optimizations.

### Step 1: Clone Repository & Install Dependencies

```bash
git clone https://github.com/MainMMV/MMV-Productivity-XII.git
cd MMV-Productivity-XII
npm install
```

---

### Step 2: Install Capacitor Android Packages

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

---

### Step 3: Initialize Capacitor Project

Initialize the Capacitor configuration pointing to the Vite `dist` output directory:

```bash
npx cap init "MMV Productivity" com.mmv.productivity --web-dir dist
```

---

### Step 4: Build Web Assets & Sync Android Container

```bash
# Compile Vite production assets into /dist
npm run build

# Add native Android platform files
npx cap add android

# Sync web build assets into native Android app container
npx cap sync
```

---

### Step 5: Generate Debug or Release APK in Android Studio

Open the Android project directory inside Android Studio:

```bash
npx cap open android
```

1. Allow Gradle to finish indexing and syncing dependencies.
2. Go to top menu: **Build** ➔ **Build Bundle(s) / APK(s)** ➔ **Build APK(s)**.
3. Upon completion, click **locate** in the popup notification.
4. Your native Android APK will be at:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🤖 Automated Cloud APK Generation via GitHub Actions (No Android Studio Needed)

You can automatically generate installable `.apk` files on every `git push` to your GitHub repository.

The workflow template file is included in your project at `github-workflows-reference/build-apk.yml`.

To enable GitHub Actions automatic APK building:
1. In your GitHub repository, copy `github-workflows-reference/build-apk.yml` into `.github/workflows/build-apk.yml`.
2. Commit and push the change to GitHub.
3. Go to your repository on GitHub ➔ **Actions** tab ➔ Click **Build Android APK** ➔ Download your **MMV-Productivity-Android-APK artifact**!

---

## 🔄 Re-building After Code Changes

Whenever you modify components, screens, or themes in AI Studio or your codebase:

```bash
git pull
npm run build
npx cap sync
npx cap open android
```
Then select **Build** ➔ **Build APK(s)** in Android Studio!
