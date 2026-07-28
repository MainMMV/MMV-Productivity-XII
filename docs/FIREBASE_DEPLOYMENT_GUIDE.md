# 🔥 Firebase Deployment & Publishing Guide

This guide details how to publish, deploy, and update **MMV Productivity XII** on **Firebase Hosting** and **Firestore Security Rules**.

---

## ⚡ Quick 1-Command Deployment

### Option A: Local Workspace Deployment
```bash
# Run full local deployment (Build + Firebase Hosting + Firestore Rules)
./deploy.sh
```

### Option B: Clone/Pull from GitHub & Deploy to Firebase
```bash
# Pulls latest code from https://github.com/MainMMV/MMV-Productivity-XII.git, builds, & deploys to Firebase
./deploy-git-firebase.sh
```

Or using `npm` scripts:

```bash
# Deploy full app (Hosting + Firestore Rules)
npm run deploy:firebase

# Deploy Hosting only
npm run deploy:hosting

# Deploy Firestore Security Rules only
npm run deploy:rules
```

---

## 🛠️ Step-by-Step Manual Terminal Commands

### Step 1: Install Firebase CLI globally (if not installed)
```bash
npm install -g firebase-tools
```

### Step 2: Login to your Firebase Account
```bash
firebase login
```

### Step 3: Build Production Assets
```bash
npm run build
```

### Step 4: Deploy to Firebase
```bash
# Deploy everything (Hosting & Firestore Security Rules)
firebase deploy

# Or deploy Hosting only
firebase deploy --only hosting
```

---

## 🤖 Automated Deployments on `git push` via GitHub Actions

You can automatically publish updates to Firebase Hosting whenever you push changes to your GitHub repository (`https://github.com/MainMMV/MMV-Productivity-XII.git`).

1. Generate a Firebase service account token or deployment key:
   ```bash
   firebase init hosting:github
   ```
2. Add your `FIREBASE_SERVICE_ACCOUNT` secret to your GitHub repository settings under **Settings** ➔ **Secrets and variables** ➔ **Actions**.
3. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: publish application updates"
   git push origin main
   ```
