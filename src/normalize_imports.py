import os
import re

def normalize_imports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                path = os.path.join(root, file)
                depth = len(path.split(os.sep)) - 1 # src is level 1, so depth is len-1
                # src/System/Engine/Core/E/Environment.tsx -> len 6. depth 5.
                # ../../../../ -> reaches src/ (4 steps)
                # Correct: depth - 1 steps reach src/
                
                steps_to_src = depth - 1
                src_prefix = "../" * steps_to_src

                with open(path, 'r') as f:
                    content = f.read()
                
                # Replace any long sequence of ../ reaching System, Characters, types, etc.
                # Regex matches one or more ../ followed by System, Characters, types, etc.
                def repl(match):
                    target = match.group(2)
                    return f"from '{src_prefix}{target}"

                new_content = re.sub(r"from '(\.\./)+(System|Characters|types|Arena|World|Building_Blocks|Items|AI|Keyboards_and_Controllers|Sound|DOM|setup_|Keyboards_and_Controllers)", repl, content)
                new_content = re.sub(r'from "(\.\./)+(System|Characters|types|Arena|World|Building_Blocks|Items|AI|Keyboards_and_Controllers|Sound|DOM|setup_|Keyboards_and_Controllers)', lambda m: f'from "{src_prefix}{m.group(2)}', new_content)

                if new_content != content:
                    with open(path, 'w') as f:
                        f.write(new_content)
                    print(f"Normalized {path}")

normalize_imports('src')
