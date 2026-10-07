import os
import zipfile
from datetime import datetime

def perform_mirror_backup():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_filename = f"mirror_backup_{timestamp}.zip"
    source_dir = os.path.join(os.getcwd(), "src")
    
    print(f"[MIRROR BACKUP] Initializing backup of {source_dir}...")
    
    with zipfile.ZipFile(backup_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, os.getcwd())
                zipf.write(file_path, arcname)
    
    print(f"[MIRROR BACKUP] Backup successfully created: {backup_filename}")

if __name__ == "__main__":
    perform_mirror_backup()
