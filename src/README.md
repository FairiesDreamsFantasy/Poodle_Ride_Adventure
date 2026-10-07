# Poodle Ride Adventure - Table of Contents

This document provides an overview of the folder structure and files for the Poodle Ride Adventure game.

## Directory Structure

*   **`Accessibility/`**: Contains components and logic related to making the game accessible (e.g., screen readers, TTS).
*   **`Characters/`**: Contains definitions, logic, and rendering code for characters in the game (e.g., the Poodle, NPCs).
*   **`Components/`**: Reusable React components used throughout the game's UI.
*   **`Environment/`**: Logic and data related to the game world, such as different areas (Foyer, Garden, Cellar, etc.) and the Course Manager.
*   **`Graphics/`**: Code responsible for rendering the game visually, including canvas drawing functions and 3D/pseudo-3D rendering logic.
*   **`Hooks/`**: Custom React hooks used to manage game state, loops, audio, and time tracking.
    *   `useAudioEnvironment.ts`: Manages ambient sounds and obstacle beeps.
    *   `useGameLoop.ts`: The core game loop handling movement and updates.
    *   `useTimeTracking.ts`: Tracks elapsed time during gameplay.
*   **`Logic/`**: The core game logic, separated into subfolders for different areas and engine components.
    *   **`Adventure_Course/`**: Logic specific to the adventure course paths.
    *   **`Cellar/`**: Logic and collision detection for the Cellar and Cellar Ramp.
    *   **`Core/`**: Fundamental constants, types, and shared logic.
    *   **`Engine/`**: The main game engine logic, including collision detection, transitions, and environment rendering.
    *   **`Foyer/`**: Logic and collision detection for the Foyer.
    *   **`Garden/`**: Logic and collision detection for the Garden.
    *   **`Porch/`**: Logic and collision detection for the Porch.
*   **`Obstacles/`**: Logic for generating, managing, and detecting collisions with obstacles.
*   **`Physics/`**: Code handling movement physics, acceleration, deceleration, and jumping.
*   **`Sound/`**: The `SoundManager` and related audio assets/logic.
*   **`State/`**: State management, including level progress, memory, and scoring.
*   **`System/`**: System-level utilities and configurations.

## Main Entry Point

*   **`src/Play_Area/PoodleRideAdventure.tsx`**: The main React component that ties everything together, initializes the game state, and renders the UI and canvas.
