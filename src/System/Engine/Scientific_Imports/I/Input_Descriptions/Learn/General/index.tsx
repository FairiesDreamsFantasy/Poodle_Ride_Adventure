export function getInputLearnDescription(code: string, layout: string, isShift: boolean): string {
  switch(code) {
    case 'ArrowUp': return "Move Forward"; 
    case 'KeyW':
      if (layout === 'Arden Denis') return "Move Forward";
      if (layout === 'Cedella') return "Toggle Movement Mode (Gallop, Canter, Trot, Walk, Slow Walk, Very Slow Walk)";
      return "";
    case 'KeyR':
      if (layout === 'Cedella') return "Announce Riding Animal";
      return "";
    case 'ArrowDown': return "Move Reverse"; 
    case 'KeyS':
      return layout === 'Arden Denis' ? "Move Reverse" : "Poodle's Elegant Bark";
    case 'KeyO':
      if (layout === 'Arden Denis') return "Bark";
      return "";
    case 'KeyU':
      if (layout === 'Arden Denis') return "Get Information";
      return "";
    case 'KeyQ':
      if (layout === 'Arden Denis') return "Information";
      return "";
    case 'KeyI':
      if (layout === 'Arden Denis') return "Increase Target Speed (Cruise Control)";
      return "Information";
    case 'KeyK':
      if (layout === 'Arden Denis') return "Decrease Target Speed (Cruise Control)";
      return "";
    case 'Backslash':
      if (layout === 'Arden Denis') return "Toggle TTS";
      return "";
    case 'ArrowLeft': return "Turn Left"; 
    case 'KeyA':
      if (layout === 'Arden Denis') return "Turn Left";
      return "Information / Position (Multi-tap)";
    case 'ArrowRight': return "Turn Right"; 
    case 'KeyD':
      if (layout === 'Arden Denis') return "Turn Right";
      return "";
    case 'Space': return "Jump";
    case 'KeyP': return "Pet Poodle";
    case 'KeyL': return "Toggle Lean Forward";
    case 'KeyC': return "Grasp Poodle's Collar";
    case 'KeyV': return "Toggle Visual Descriptions";
    case 'Digit0': return isShift ? "Toggle CST Clock" : "0 key";
    case 'KeyE': return isShift ? "Toggle TTS Engine (Double tap)" : "E key";
    case 'KeyZ': return isShift ? "Toggle TTS (Double tap)" : "Z key";
    case 'KeyM': return isShift ? "System Status" : "M key";
    case 'Digit6': return "Toggle Strafing";
    case 'BracketLeft':
      if (layout === 'Cedella') return "Decrease Target Speed";
      return "";
    case 'BracketRight':
      if (layout === 'Cedella') return "Increase Target Speed";
      return "";
    case 'KeyG': return (isShift) ? "Developer Mode: Toggle Grid" : "G key";
    case 'KeyH': return (isShift) ? "Developer Mode: System Status" : "Show Love";
    default: return "";
  }
}
