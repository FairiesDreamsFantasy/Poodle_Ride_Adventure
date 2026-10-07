import { GameState } from '../Types';
import { MANOR_OBJECTS } from '../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/InteractiveObjects';
import { addItemToInventory, removeItemFromInventory } from '../../../UI/Inventory/InventoryManager';

export function handleInteraction(state: GameState, speak: (msg: string, lang: string) => void, audio: any): GameState {
  const { gridX, gridY, area } = state;
  
  // Find nearby interactive objects
  const nearbyObject = MANOR_OBJECTS.find(obj => 
    obj.area === area &&
    Math.abs(obj.x - gridX) < 10 &&
    Math.abs(obj.y - gridY) < 10
  );

  if (nearbyObject) {
    if (nearbyObject.type === 'item') {
      if (nearbyObject.name === 'Rainbow Coin') {
        speak("Collected a Rainbow Coin!", 'EN_US');
        audio.playPointEarned();
        return nearbyObject.onInteract(state);
      }
      speak(`Picked up ${nearbyObject.name}.`, 'EN_US');
      let newState = addItemToInventory(state, {
        id: nearbyObject.id,
        name: nearbyObject.name,
        description: nearbyObject.description,
        type: 'misc'
      });
      // In a real app, we'd remove the object from the world too
      return newState;
    }

    if (nearbyObject.type === 'lever') {
      const isDown = !state.isLeverDown;
      speak(isDown ? "Pulled the lever down. A door opens at the second floor." : "Pushed the lever up. The door closes.", 'EN_US');
      audio.playCustomBeep(isDown ? 440 : 220); // Placeholder for lever sound
      return { ...state, isLeverDown: isDown };
    }
  }

  // Special case for Barn Door (Automatic Key Usage Algorithm)
  if (area === 'ElevatedPath' && gridY > 980) {
    const hasKey = state.inventory.items.some(i => i.id === 'barn_house_key');
    if (hasKey) {
      speak("Using Barn House Key automatically. The door is now unlocked.", 'EN_US');
      audio.playDoorOpen();
      return state;
    } else {
      speak("The barn door is locked. You need the Barn House Key.", 'EN_US');
      return state;
    }
  }

  // Simulated Garden Sliding Door Interaction
  if ((area === 'MeditationHall' && gridY > 980 && gridX >= 980 && gridX <= 1020) ||
      (area === 'SimulatedGardenArea' && gridY < 20 && gridX >= 980 && gridX <= 1020)) {
    const isOpening = !state.isSimulatedGardenDoorOpen;
    speak(isOpening ? "Opening the sliding door. It glides with a magical Tarsis shimmer." : "Closing the sliding door.", 'EN_US');
    audio.playSimulatedGardenSlidingDoorSound(gridX, gridY);
    return { ...state, isSimulatedGardenDoorOpen: isOpening };
  }

  // Elevator Door Interaction
  const isNearElevatorDoor = (area === 'LobbyStairwayAndRamps' || area === 'SouthwestMezzanineStairwayAndRamps') &&
                             gridX >= 970 && gridX <= 985 && gridY >= 980 && gridY <= 1000;
  
  if (isNearElevatorDoor) {
    const isOpening = !state.isElevatorDoorOpen;
    speak(isOpening ? "Opening the elevator door." : "Closing the elevator door.", 'EN_US');
    audio.playElevatorButtonIntersection(gridX, gridY); // Using button click for door? Or separate sound?
    // User wants "special sound that is pre-recorded or mathematically" - I generated a click.
    return { ...state, isElevatorDoorOpen: isOpening };
  }

  speak("Nothing to interact with here.", 'EN_US');
  return state;
}
