#!/bin/bash
# Bulletproof cPanel Deployment Script for Poodle Ride Adventure
# Handles file deployment and keeps local working directory clean.

set -e

# 1. Define Deployment Path
DEPLOYPATH="${DEPLOYPATH:-/home/fairiesd/public_html/Arcade/Poodle_Ride_Adventure}"

echo "[INFO] Starting deployment to $DEPLOYPATH"

# 2. Ensure target deployment directory exists
mkdir -p "$DEPLOYPATH"

# 3. Identify Source and Deploy
if [ -d "Poodle_Ride_Adventure_Build" ] && [ -f "Poodle_Ride_Adventure_Build/index.html" ]; then
    echo "[INFO] Detected build directory. Deploying from build..."
    cp -rf Poodle_Ride_Adventure_Build/. "$DEPLOYPATH/"
    if [ ! -f "$DEPLOYPATH/.htaccess" ] && [ -f public/.htaccess ]; then
        cp -f public/.htaccess "$DEPLOYPATH/"
    fi
    if [ ! -f "$DEPLOYPATH/sw.js" ] && [ -f public/sw.js ]; then
        cp -f public/sw.js "$DEPLOYPATH/"
    fi
else
    echo "[INFO] Deploying from production branch root..."
    if [ -f index.html ]; then
        cp -f index.html "$DEPLOYPATH/"
    fi
    if [ -f sw.js ]; then
        cp -f sw.js "$DEPLOYPATH/"
    elif [ -f public/sw.js ]; then
        cp -f public/sw.js "$DEPLOYPATH/"
    fi
    if [ -f .htaccess ]; then
        cp -f .htaccess "$DEPLOYPATH/"
    elif [ -f public/.htaccess ]; then
        cp -f public/.htaccess "$DEPLOYPATH/"
    fi
    if [ -d Assets ]; then
        cp -rf Assets "$DEPLOYPATH/"
    fi
fi

# 4. Enforce Permissions
echo "[INFO] Enforcing 755 (dir) and 644 (file) permissions..."
find "$DEPLOYPATH" -type d -exec chmod 755 {} +
find "$DEPLOYPATH" -type f -exec chmod 644 {} +

# 5. Clean Repository Working Directory to prevent "uncommitted changes" warning
if git rev-parse --is-inside-work-tree &> /dev/null; then
    echo "[INFO] Cleaning repository working copy to maintain pristine status..."
    git reset --hard HEAD || true
    git clean -fd || true
fi

echo "[SUCCESS] Deployment to $DEPLOYPATH completed successfully."
