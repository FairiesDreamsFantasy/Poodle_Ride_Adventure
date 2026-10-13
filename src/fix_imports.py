import os
import re

def fix_imports(directory, depth_increase=2):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                # Replace relative imports that go up 2 or more levels
                # We add depth_increase number of '../' to them
                def repl(match):
                    dots = match.group(1)
                    # Only increase if it's going up at least 2 levels (../../)
                    # Because ../ might be a sibling which is still a sibling after move
                    if dots.count('../') >= 2:
                        return "from '" + "../" * depth_increase + dots
                    return match.group(0)

                new_content = re.sub(r"from '(\.\./\.\./[^']*)", repl, content)
                new_content = re.sub(r'from "(\.\./\.\./[^"]*)', lambda m: 'from "' + "../" * depth_increase + m.group(1), new_content)

                if new_content != content:
                    with open(path, 'w') as f:
                        f.write(new_content)
                    print(f"Fixed {path}")

fix_imports('src/World/0/Levels')
fix_imports('src/World/1/Levels')
fix_imports('src/World/Levels')
