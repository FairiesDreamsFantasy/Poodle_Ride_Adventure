#!/bin/bash

# Poodle Ride Adventure: Active Integrity Shield
# This script scans for missing AGENTS.md files and restores them if pruned.

PROTECTED_DIRS=("src/System/Engine" "src/System/Sound" "src/System/Visuals" "src/System/Integrity" "src/System/Components" "src/System/Registry" "src/System/Index" "src/Characters" "src/Arena" "src/Main_Game" "src/Courses" "src/Warp_Houses" "src/Roads_and_Tunnels" "qooble-ryde-epuamtvju")
PROTECTION_TEXT="# Protections Notice\nProtected under 100,000,000,000,000,000% Ultra-Broad Multi-Dimensional Protections.\nProhibits assumptions, pseudoscience, Babylonian shortcuts, stubbing, omissions, deletions, pruning, and simplifications."

echo "[INTEGRITY SHIELD] Starting scientific scan..."

for dir in "${PROTECTED_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    find "$dir" -type d | while read -r subdir; do
      if [ ! -f "$subdir/AGENTS.md" ]; then
        echo "[RESTORE] Missing AGENTS.md in $subdir"
        echo -e "$PROTECTION_TEXT" > "$subdir/AGENTS.md"
      fi
    done
  fi
done

echo "[INTEGRITY SHIELD] Scan complete. Scientific integrity maintained."
