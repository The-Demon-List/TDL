import os
import subprocess
import json
from datetime import datetime

# This looks at every commit that changed files in your /data/ folder
# and saves them into the format our website needs.

def snapshot_history():
    # Get a list of all commits that touched the 'data' folder
    cmd = 'git log --reverse --pretty=format:"%H %ai" -- data/'
    commits = subprocess.check_output(cmd, shell=True).decode().split('\n')

    for commit in commits:
        if not commit: continue
        parts = commit.split(' ')
        sha = parts[0]
        date_str = parts[1] # YYYY-MM-DD
        
        target_dir = f"data/{date_str}"
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)
            
            # Extract the _list.json from that specific commit
            try:
                content = subprocess.check_output(f"git show {sha}:data/_list.json", shell=True)
                with open(f"{target_dir}/_list.json", "wb") as f:
                    f.write(content)
                print(f"Archived history for {date_str}")
            except:
                pass

snapshot_history()
