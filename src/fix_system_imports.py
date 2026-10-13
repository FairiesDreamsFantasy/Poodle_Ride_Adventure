import os
import re

def fix_system_to_system_imports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                path = os.path.join(root, file)
                # We are in src/System/...
                # We want to reach src/System/
                # src/System/X/Y/Z/index.tsx (depth 5)
                # ../ reaches Y (3)
                # ../../ reaches X (2)
                # ../../../ reaches System (1)
                
                parts = path.split(os.sep)
                # src, System, ...
                # parts[0] is src, parts[1] is System
                # To get from parts[N] to parts[1], we need N-1 steps?
                # index.tsx (N) -> Z (N-1) -> Y (N-2) -> X (N-3) -> System (1)
                # Steps: N-1 - 1 = N-2?
                # No.
                # src/System/Engine/Drawing.ts (N=3)
                # Drawing.ts -> Engine (2) -> System (1)
                # Steps: 1 (../)
                
                # Wait.
                # src/System/Engine/Drawing.ts
                # ./ is Engine/
                # ../ is System/
                # So depth 3 needs 1 step to reach System/.
                # src/System/Engine/Scientific_Imports/D/Drawing.ts (depth 5)
                # ./ is D/
                # ../ is Scientific_Imports/
                # ../../ is Engine/
                # ../../../ is System/
                # So depth 5 needs 3 steps.
                # Rule: steps = depth - 2.
                
                depth = len(parts) - 1
                steps_to_system = depth - 2
                system_prefix = "../" * steps_to_system if steps_to_system > 0 else "./"

                with open(path, 'r') as f:
                    content = f.read()
                
                # Replace imports reaching AI, Engine, Registry, Sound, etc. within System
                targets = "AI|Engine|Registry|Sound|State|UI|Items|Building_Blocks|DOM|InputHandler|InputTypes|Keyboards_and_Controllers|HardwareOptimization|Diagnostics|Automation|Screen_Reader"
                
                def repl(match):
                    target = match.group(2)
                    return f"from '{system_prefix}{target}"

                new_content = re.sub(rf"from '(\.\./)+({targets})", repl, content)
                new_content = re.sub(rf'from "(\.\./)+({targets})', lambda m: f'from "{system_prefix}{m.group(2)}', new_content)

                if new_content != content:
                    with open(path, 'w') as f:
                        f.write(new_content)
                    print(f"Fixed {path}")

fix_system_to_system_imports('src/System')
