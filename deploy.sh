#!/usr/bin/env bash
set -e

echo "🚀 Starting Deployment Process for MMV Productivity XII..."

# Step 1: Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing npm dependencies..."
  npm install
fi

# Step 2: Lint and typecheck
echo "🔍 Running code checks..."
npm run lint

# Step 3: Build production web bundle
echo "🏗️ Building Vite production assets into /dist..."
npm run build

# Step 4: Deploy to Firebase Hosting & Firestore Security Rules
echo "🔥 Deploying application to Firebase Hosting & Firestore..."
if command -v firebase &> /dev/null; then
  firebase deploy
elif command -v npx &> /dev/null; then
  npx firebase-tools deploy
else
  echo "❌ Error: Firebase CLI is not installed. Run 'npm install -g firebase-tools' first."
  exit 1
fi

echo "✅ Deployment complete! Your app is live on Firebase."
