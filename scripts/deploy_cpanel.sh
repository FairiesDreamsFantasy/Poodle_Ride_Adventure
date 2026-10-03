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

# 3. Identify Source Structure
# If we are in a dev environment with a build folder:
if [ -d "Poodle_Ride_Adventure_Build" ]; then
    echo "[INFO] Detected build directory. Copying contents..."
    cp -rf Poodle_Ride_Adventure_Build/. "$DEPLOYPATH/"
else
    # If we are on dist-deploy branch (pre-compiled files at root)
    echo "[INFO] No build directory found. Copying individual production assets from root..."
    
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
echo "[INFO] Enforcing 755 permissions for web access..."
chmod -R 755 "$DEPLOYPATH"

echo "[SUCCESS] Deployment completed successfully."
