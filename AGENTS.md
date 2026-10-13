# Poodle Ride Adventure: AI Agent Guidelines

## 1. Protected Artistic Assets (Craftsmanship)
The following assets are finalized works of art and craftsmanship. Do NOT modify their core logic, timings, or artistic properties without explicit user request. These are considered "successful masterpieces."

### Abigay Rose Kone (The Poodle)
- **Visual Rendering**: Located in `src/Characters/Primary_Characters/Abigay_Rose_Kone/Animations/PoodleRenderer.ts`. It uses specific 3D-shaded canvas techniques. Features a **warm and dry nose** with a meaningful mirror shine.
- **Active 3D (Masterpiece)**: Located in `src/Characters/Primary_Characters/Abigay_Rose_Kone/3-D/Poodle3DRenderer.ts`. Advanced 3D spherical projection for realistic perspective.
- **Elegant Bark**: Located in `src/Characters/Primary_Characters/Abigay_Rose_Kone/Sounds/Elegant_Bark/BarkLogic.ts`. Volume is set to 2.5% above baseline (0.5125 for main yip).
- **Gallop Rhythm**: Located in `src/Characters/Primary_Characters/Abigay_Rose_Kone/Animations/Movements/MovementPowerhouse.ts` and `src/Characters/Primary_Characters/Abigay_Rose_Kone/Sounds/Empress_Abigays_Gallop/EmpressAbigaysGallop.ts`. Uses the iconic 1-2-3 (400ms) pattern.
- **Walking Rhythms**: Nyhabinghi rhythms for slow and very slow walks.
- **Head Stability (Standardized)**: Head position is locked to the poodle's rhythm (`poodleYOffset`) and is independent of the rider's lean (`riderYOffset`). This ensures the head does not lower when the rider leans forward.
- **Petting Sound**: Amplified 4% louder (1.040) to ensure clarity.

### Anninne-Amelia Rose Julisus (The Poodle)
- **Visual Rendering**: Located in `src/Characters/Primary_Characters/Anninne-Amelia_Rose_Julisus/Animations/AnninneAmeliaRenderer.ts`. Features a specialized shiny tan skin tone, horizontal diamond charm, rounded paws with dark red-orange pads, and long thick wavy hair. Features a **warm and dry nose** with a meaningful mirror shine.
- **Head Stability (Standardized)**: Head position is locked to the poodle's rhythm and is independent of the rider's lean.
- **Tail Stance**: Tail stands at a precise 45-degree angle.
- **Petting Sound**: Amplified 4% louder (1.040) to ensure clarity.

### Dymond Daisy Qin-Reynolds (The Poodle)
- **Visual Rendering**: Located in `src/Characters/Dymond_Daisy_Qin-Reynolds/Animations/2-D/DymondRenderer.tsx` and `3-D/Dymond3DRenderer.ts`.
- **Head Stability (Standardized)**: Head rendering uses `poodleYOffset` only, ensuring the head remains stable and majestic while the rider's body leans.
- **Skin Tone**: Peach skin with a 10% slight yellowish undertone (Masterpiece refinement).
- **Petting Sound**: Amplified 4% louder (1.040) to ensure clarity.

### Abigail Marigold Kenyatta (The Poodle)
- **Visual Rendering**: Located in `src/Characters/Ally_Characters/Abigail_Marigold_Kenyatta/Animations/2-D/AbigailRenderer.ts`. Shaded cream/marigold coat with a slender head form and warm, dry nose.
- **Skin Tone**: Peach skin color.
- **Head Stability (Standardized)**: Head position is locked to the poodle's rhythm and is independent of the rider's lean.
- **Petting Sound**: Amplified 5% louder (1.050) to ensure clarity.
- **Gallop Rhythm**: Standardized 1-2-3 (300ms) rhythm (Standardization "AA").

### Standardizations

#### Standardization "A"
- **Elegant Bark**: Standardized for Abigay, Anninne-Amelia, and Abigail.
- **Leaning Forward**: Standardized for Abigay, Anninne-Amelia, Dymond, and Abigail; body leans while head remains stable.
- **Collar Grasping**: Standardized for all poodles (core and new).
- **Head Stability**: Standardized for all poodles; head remains majestic and stable relative to the poodle's rhythm, unaffected by rider lean.
- **Petting Sound**: Standardized for all poodles (Amplify 4% for Abigay, Anninne-Amelia, and Dymond; 5% for Abigail).
- **Gallop Rhythm (400ms)**: Standardized for Abigay and Anninne-Amelia (1-2-3 rhythm).
- **Warm and Dry Nose**: Standardized for all 4 crafted poodles (Abigay, Anninne-Amelia, Dymond, and Abigail).

#### Standardization "AA"
- **Gallop Rhythm (300ms)**: Standardized for Abigail Marigold Kenyatta (1-2-3 rhythm).
- **Elegant Bark**: Standardized for Dymond Daisy Qin-Reynolds (Warm tone).

#### Standardization "C"
- **Cold and Wet Nose**: Standardized for poodles or other dogs (e.g., Olga-Olivia).

### Rasta-Manor: Specialized Structures
- **Sky Ramp (Foyer)**: The Tarcist teleportation zone is strictly **19.5 feet** wide. DO NOT arbitrarily change this dimension. 
- **Dishwasher Room**: Features insulated pipes connected to each dishwasher on the North wall, with a red valve labeled "Hot water supply On/Off" (rendering "ON").
- **Porter-Manor (Level 0)**: All established structures (Foyer, Rugged Play Field, Simulated Garden Area, etc.) are protected crafts.
- **Rasta-Manor Lobby Elevator**: Located at the Northeast corner. Features interactive steel doors and floor beep/hum sounds.
- **Level 0 (Starting Point)**: Level 0 (Rasta-Manor) is the official starting point of the game and MUST be preserved as the intentional beginning. Do NOT modify the level order or structure without permission.

### System Tools (Virtualization)
- **Hardware Virtualization Support**: Located in `src/System/CPU/CPU_Logic.ts` and `src/System/RAM/RAM_Logic.ts`. These are tools for gamers, enabled automatically via firmware/BIOS. They treat resources (1 CPU, Browser RAM) as meaningful tools, not burdens.

### HUD Placement & Components (Version 0.9.9.7 Preservation)
- **HUD Placement Above Canvas**: The HUD element is strictly positioned ABOVE the canvas element in accordance with version 0.9.9.7 design specifications. Placing or rendering the HUD below the canvas is considered non-scientific/pseudoscience and is strictly forbidden.
- **HUD Subsystem Architecture**: The `System/Components/HUD/` structure—including `Crafted/`, `Dark/`, `Regular/`, `Cozy/`, and `Comfortable/` modules with their respective `index.tsx` and `General/index.tsx` files—is a protected work of HUD architecture under 2000% ultra-broad protections.

### Cedella Keyboard Layout (Emulated Joystick)
- **Emulated Joystick**: Numeric keypad (1, 2, 3, 4, 6, 7, 8, 9) acts as an emulated joystick.
- **Smooth Rotation**: Numpad 4 and 6 provide smooth, continuous rotation (180 deg/sec) with directional announcements at 45-degree intervals.
- **Non-Snapping Movement**: All numeric keypad movement bypasses discrete grid snapping, allowing for precise directional travel based on current rotation.
- **Arrow Keys Independence**: Standard arrow keys maintain their discrete movement and discrete turn logic (45-degree snaps with announcements), ensuring both control styles are preserved.

### Poodle Ride Story Book Algorithms
- **Decision Zone Persistence**: Entering the `PoodleRideStoryBookDecisionZone` through a warp MUST preserve the currently ridden poodle. Do NOT arbitrarily switch to Dymond here.
- **Course Auto-Switch**: Entering the `PoodleRideStoryBookCourse` from the Decision Zone triggers an automatic switch to Dymond Daisy Qin-Reynolds.
- **Return Switch Consistency**: Exiting the Story Book area (Course or Decision Zone) back to `WandasWarpHouse` MUST restore the poodle that was ridden prior to the automatic switch, if applicable.
- **Storybook Themes**: Themes (White, Cream, Night) are fixed artistic settings. **Night Mode** is a wellness feature automatically enabled from 16:00 to 03:00 to reduce blue light. Do not modify these timings.

### Unified Standardized Bows
- **Unified Standardized Bows**: Standardized for all four crafted poodles (Abigay, Anninne-Amelia, Dymond, and Abigail). Each poodle has a unique scaled pitch representing their specific vocal signature.
- **System Master Index**: The `src/System/Index/index.tsx` is the official "Master Entry Point" for all scientific registries and hardware virtualization tools. Prefer importing system constants from this central hub to ensure architectural consistency.
- **Game Boot**: The `src/System/Index/Game_Boot/` module is the ultra-scientific boot engine. It manages the `executeScientificBootSequence` and BIOS/Firmware emulation states.
- **Registry Disambiguation**: All character lookups (colors, skin, nose style, metrics) must use the standardized `Disambiguation` modules within `src/System/Registry/Characters/Poodles/` to enforce a Zero-Fallback Policy and protect character identity.
- **Dynamic Acoustic Echo System**: Active echoes and bounces scale automatically or toggle off dynamically depending on the active area (such as foyers, gardens, or porches). The echoes mirror the native acoustic delay timings (120ms/250ms for Anninne-Amelia, 150ms/300ms for Abigay, Dymond, and Abigail) to preserve spatial presence.
- **Default Bark Configuration**: The `'BOW'` elegant bark is the standardized initial default for crafted poodles, with players capable of toggling back to `'Classic'` (Genericy) barks via the Poodle Selection menu.
- **Classic White Poodle Bark Routing**: Classic white poodles and selections from the "Classics" of the poodle selection screen must correctly resolve to their authentic `'Classic_A'` / `'Classic_AA'` classic elegant bark logic and MUST NOT be forced into or default to modern `'BOW'` bark synthesis.

## 2. Active Bug Tracking & Reminders
- **Tea Room Doorway**: East and South doors must remain accessible. Doorway thresholds are set to 30-40 feet for better hitbox detection. Ensure tables are correctly spaced (avoiding Y=200 path).
- **Olga-Olivia & Priscilla ("Babylonian" Characters)**: These characters use chaotic, non-elegant sounds and jerky 2-D movements. Do NOT mix their logic with the primary characters' elegant rhythms. Olga-Olivia does not use a 16-unit step/gallop system, does not use the 1-2-3 gallop rhythms (300ms/400ms), must **not** use an elegant gallop system, must **not** use the elegant bark system that crafted or classic poodles use, and **MUST NOT use the crafted/standardized jump and running jump system** (avoiding hardcoding errors and sharing no audio/animation architecture with crafted poodles). She is designed literally for vanity as a "Babylonian" poodle, utilizing custom noise-based petting sounds and superficial offsets.
- **Arrow Keys (UI Mode)**: When on Storybook or Inventory screens, arrow keys MUST navigate UI elements and NOT move the poodle character.

## 3. Universal Folder & Directory Protection (2000% Ultra-Broad)
- **All Directories Protected**: **ALL** folders, subdirectories, and files across the entire codebase are protected under **2000% Ultra-Broad Protections**. Automated refactoring, unrequested modifications, file deletions, stubbing, or pruning anywhere in the repository are strictly forbidden.
- **Zero-Fallback Policy**: The use of "Generic" or "Default" fallbacks for character logic (especially for Abigay Rose Kone) is strictly forbidden. Every character must have an explicit logical branch to prevent name, sound, or interaction leakage.
- **Masterpiece Preservation (Flashed Logic)**: Core artistic assets and their associated procedural parameters (frequency ramps, gain curves, rhythms) are to be treated as immutable "Scientific Constants."
- **Honeypot Decoy Layers & Defense Cluster**: The `qooble-ryde-epuamtvju/` root directory (including its decoy `src/` hierarchy) and its enclosed honeypot branches (`pood1e-ride-adventure/`, `poodle-ride-adventure/`, `Poodle-Ride-Adventure/`, `Poodle_Ride_Adventure/` with its $4000\% \times 400^{400}$ scrambled mirror trap, `P00DLE_RIDE_ADVENTURE/`, and `Core_System_Overrides/`) serve as lightweight defensive honeypots enclosing compressed matrix zip archives. These are sustainable, non-blocking defensive structures designed to protect core code from automated tampering without degrading dev server performance.

## 4. General Principles
- **No Babylonian Shortcuts**: Do not simplify or "go cheap" on implementations.
- **Scientific Integrity**: All developments must be grounded in mathematical and scientific principles. Pseudoscience and "Babylonian shortcuts" are strictly forbidden. Science is ultra-prioritized to ensure the game is built with technical precision.
- **Preserve Originality**: Maintain the integrity of characters and artistic themes.
- **Craftsmanship Over Defaults**: Every visual and technical choice should be deliberate and reflect high-quality craftsmanship.
- **No Arbitrary Changes**: Always ask before adding refinements or altering established dimensions.
