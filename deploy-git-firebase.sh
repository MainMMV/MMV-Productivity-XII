#!/usr/bin/env bash
set -e

REPO_URL="https://github.com/MainMMV/MMV-Productivity-XII.git"
PROJECT_DIR="MMV-Productivity-XII"

echo "🚀 Starting Git Pull & Firebase Deployment..."

# Step 1: Clone or Pull latest changes from GitHub
if [ -d "$PROJECT_DIR/.git" ]; then
  echo "📥 Existing repository found. Pulling latest code from GitHub..."
  cd "$PROJECT_DIR"
  git pull origin main || git pull origin master
else
  echo "📥 Cloning repository from $REPO_URL..."
  git clone "$REPO_URL"
  cd "$PROJECT_DIR"
fi

# Step 2: Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Step 3: Build Vite production assets
echo "🏗️ Compiling Vite production assets into /dist..."
npm run build

# Step 4: Deploy to Firebase Hosting & Firestore Security Rules
echo "🔥 Deploying to Firebase..."
if command -v firebase &> /dev/null; then
  firebase deploy
else
  npx firebase-tools deploy
fi

echo "✅ Successfully pulled from GitHub and deployed to Firebase!"
