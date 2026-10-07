import os
import json
import hashlib
from datetime import datetime

# Define targets
TARGET_ROOTS = [
    "src",
    "src/System",
    "src/Characters",
    "src/Arena"
]

PROGRESS_FILE = ".integrity_progress.json"

def calculate_sha256(file_path):
    sha256 = hashlib.sha256()
    try:
        with open(file_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256.update(byte_block)
        return sha256.hexdigest()
    except Exception:
        return None

def get_all_directories():
    all_dirs = set()
    # Add src root itself
    all_dirs.add("src")
    
    # Add all subdirectories of System, Characters, Arena recursively
    subroots = ["src/System", "src/Characters", "src/Arena"]
    for subroot in subroots:
        if os.path.exists(subroot):
            all_dirs.add(subroot)
            for root, dirs, files in os.walk(subroot):
                for d in dirs:
                    full_path = os.path.join(root, d)
                    all_dirs.add(full_path)
    return sorted(list(all_dirs))

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE, "r") as f:
                return json.load(f)
        except Exception:
            pass
    return {"processed": []}

def save_progress(progress):
    with open(PROGRESS_FILE, "w") as f:
        json.dump(progress, f, indent=2)

def generate_for_directory(dir_path):
    if not os.path.exists(dir_path):
        return None
    
    files_in_dir = []
    subdirs_in_dir = []
    
    try:
        for entry in os.scandir(dir_path):
            # Skip integrity file itself
            if entry.name == ".integrity.json":
                continue
            if entry.is_file():
                files_in_dir.append(entry.name)
            elif entry.is_dir():
                subdirs_in_dir.append(entry.name)
    except Exception as e:
        print(f"Error scanning {dir_path}: {e}")
        return None

    # Calculate hashes for files
    file_hashes = {}
    for filename in sorted(files_in_dir):
        full_path = os.path.join(dir_path, filename)
        h = calculate_sha256(full_path)
        if h:
            file_hashes[filename] = h

    # Create the sorted metadata
    metadata = {
        "directory": dir_path,
        "timestamp": datetime.now().isoformat() + "-07:00",
        "version": "1.0.0",
        "securedBy": "Poodle Ride Adventure Cryptographic Integrity System",
        "algorithm": "SHA-256",
        "files": file_hashes,
        "subdirectories": sorted(subdirs_in_dir),
        "totalFiles": len(file_hashes)
    }

    # Generate Payload signature over files sorted list
    payload_str = "".join(f"{k}:{v}" for k, v in sorted(file_hashes.items()))
    payload_sign = hashlib.sha256(payload_str.encode("utf-8")).hexdigest()
    metadata["payloadSign"] = payload_sign

    # Write .integrity.json in that folder
    integrity_file = os.path.join(dir_path, ".integrity.json")
    try:
        with open(integrity_file, "w") as f:
            json.dump(metadata, f, indent=2)
        return True
    except Exception as e:
        print(f"Error writing integrity file in {dir_path}: {e}")
        return False

def main():
    import sys
    batch_size = 50
    if len(sys.argv) > 1:
        try:
            batch_size = int(sys.argv[1])
        except ValueError:
            pass

    all_dirs = get_all_directories()
    progress = load_progress()
    processed_set = set(progress["processed"])

    pending_dirs = [d for d in all_dirs if d not in processed_set]
    
    print(f"Total target directories: {len(all_dirs)}")
    print(f"Already processed: {len(processed_set)}")
    print(f"Pending: {len(pending_dirs)}")

    if not pending_dirs:
        print("🎉 All directories are already secured with .integrity.json!")
        return

    # Process batch
    batch = pending_dirs[:batch_size]
    print(f"🚀 Processing next batch of {len(batch)} directories...")

    success_count = 0
    for d in batch:
        if generate_for_directory(d):
            progress["processed"].append(d)
            success_count += 1

    save_progress(progress)
    print(f"✅ Successfully secured {success_count}/{len(batch)} directories in this batch.")
    print(f"📊 Remaining pending: {len(pending_dirs) - success_count}")

if __name__ == "__main__":
    main()
