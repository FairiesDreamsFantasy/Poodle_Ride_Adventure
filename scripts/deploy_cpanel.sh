#!/bin/bash
# Bulletproof cPanel Deployment Script for Poodle Ride Adventure
# This script handles different branch structures and ensures correct permissions.

set -e

# 1. Define Deployment Path
if [ -z "$DEPLOYPATH" ]; then
    echo "[ERROR] DEPLOYPATH is not set."
    exit 1
fi

echo "[INFO] Starting deployment to $DEPLOYPATH"

# 2. Ensure directory exists
mkdir -p "$DEPLOYPATH"

# 3. Identify Source and Deploy
if [ -d "Poodle_Ride_Adventure_Build" ]; then
    echo "[INFO] Detected build directory. Deploying from build..."
    # Copy all contents including hidden files
    cp -rf Poodle_Ride_Adventure_Build/. "$DEPLOYPATH/"
else
    echo "[INFO] Deploying from production branch root..."
    # Copy primary files
    [ -f index.html ] && cp -f index.html "$DEPLOYPATH/"
    [ -f sw.js ] && cp -f sw.js "$DEPLOYPATH/"
    [ -f .htaccess ] && cp -f .htaccess "$DEPLOYPATH/"
    
    # Copy Assets directory
    if [ -d Assets ]; then
        cp -rf Assets "$DEPLOYPATH/"
    fi
fi

# 4. Enforce Permissions
echo "[INFO] Enforcing 755 (dir) and 644 (file) permissions..."
find "$DEPLOYPATH" -type d -exec chmod 755 {} +
find "$DEPLOYPATH" -type f -exec chmod 644 {} +

echo "[SUCCESS] Deployment to $DEPLOYPATH completed successfully."
