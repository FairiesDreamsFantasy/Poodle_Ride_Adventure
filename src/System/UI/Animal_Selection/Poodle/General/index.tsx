import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GameState } from '../../../../Engine/Core/Types/GameState';
import { POODLES, RegisteredPoodle } from '../../../../Registry/UI/Animal_Selection';
import { handlePoodleAboutAI } from '@/src/System/AI/In-Game/Category/Animal/Poodle/General';

interface PoodleSelectionMenuProps {
  state: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  speak: (msg: string) => void;
  audio: any;
}

type TabType = 'Crafted' | 'Classic';

export const General: React.FC<PoodleSelectionMenuProps> = ({ state, setGameState, speak, audio }) => {
  const currentArea = state.area;
  const [activeTab, setActiveTab] = useState<TabType>('Crafted');
  const [activeFocus, setActiveFocus] = useState<'Tabs' | 'Grid'>('Tabs');
  
  const allAvailablePoodles = POODLES.filter(p => !p.isSpecial || p.requiredArea?.includes(currentArea as any));
  const availablePoodles = allAvailablePoodles.filter(p => p.category === activeTab);

  const { selectedPoodleIndex, poodleMenuMode, selectedPoodleActionIndex, poodleBarkType } = state;

  // Ensure index is within bounds when switching tabs
  const validSelectedIndex = selectedPoodleIndex >= -1 && selectedPoodleIndex < availablePoodles.length ? selectedPoodleIndex : -1;

  const selectedPoodle = availablePoodles[validSelectedIndex];
  const actions: string[] = ["Ride Now", "About"];
  if (selectedPoodle && selectedPoodle.supportsBarkToggle !== false) {
    actions.push("Bark Type");
  }
  actions.push("Go Back");

  const handleSelection = () => {
    if (activeFocus === 'Tabs') {
      setActiveFocus('Grid');
      setGameState(prev => ({ ...prev, selectedPoodleIndex: -1 }));
      speak("Go Back");
      return;
    }

    if (poodleMenuMode === 'Selection') {
      if (validSelectedIndex === -1) { // Go Back option
         setActiveFocus('Tabs');
         speak(activeTab);
      } else {
        setGameState(prev => ({ ...prev, poodleMenuMode: 'Action', selectedPoodleActionIndex: 0 }));
        speak("Ride Now");
      }
    } else {
      // Action Mode
      const poodle = availablePoodles[validSelectedIndex];
      const isCurrentlyRiding = poodle.name === state.ridingAnimal;
      const currentAction = actions[selectedPoodleActionIndex];

      switch (currentAction) {
        case "Ride Now":
          if (isCurrentlyRiding) {
            speak(`Already riding ${poodle.name}`);
          } else {
            handleRideNow(poodle.name);
          }
          break;
        case "About":
          handlePoodleAboutAI(poodle.id, speak);
          break;
        case "Bark Type":
          if (poodle.supportsBarkToggle) {
             const currentTypeIdx = poodle.barkTypes!.indexOf(poodleBarkType);
             const nextType = poodle.barkTypes![(currentTypeIdx + 1) % poodle.barkTypes!.length];
             setGameState(prev => ({ ...prev, poodleBarkType: nextType as any }));
             const displayName = nextType === 'Generic' ? 'Classic' : nextType;
             speak(displayName);
          } else {
            speak("Classic");
          }
          break;
        case "Go Back":
          setGameState(prev => ({ ...prev, poodleMenuMode: 'Selection' }));
          speak(poodle.name);
          break;
      }
    }
  };

  const handleRideNow = (name: string) => {
    audio.playMagicWand(); 
    
    // 2-second delay for the effect
    setTimeout(() => {
      setGameState(prev => ({ 
        ...prev, 
        ridingAnimal: name, 
        isPoodleSelectionOpen: false,
        poodleMenuMode: 'Selection'
      }));
      speak(`${name} is now ready to ride!`);
    }, 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!state.isPoodleSelectionOpen) return;

      // Prevent steering and other game inputs
      e.stopPropagation();
      
      const isSelectKey = e.code === 'Enter' || e.code === 'Space' || 
                          (state.keyboardLayout === 'Cedella' && e.code === 'KeyO') ||
                          (state.keyboardLayout === 'Arden Denis' && e.code === 'KeyE');

      const isBackKey = e.code === 'Escape' || 
                        (state.keyboardLayout === 'Cedella' && e.code === 'KeyX') ||
                        (state.keyboardLayout === 'Arden Denis' && e.code === 'KeyF');

      const isUpKey = e.code === 'ArrowUp' || (state.keyboardLayout === 'Arden Denis' && e.code === 'KeyW');
      const isDownKey = e.code === 'ArrowDown' || (state.keyboardLayout === 'Arden Denis' && e.code === 'KeyS');
      const isLeftKey = e.code === 'ArrowLeft' || (state.keyboardLayout === 'Arden Denis' && e.code === 'KeyA');
      const isRightKey = e.code === 'ArrowRight' || (state.keyboardLayout === 'Arden Denis' && e.code === 'KeyD');

      if (activeFocus === 'Tabs') {
         if (isLeftKey || isRightKey) {
             e.preventDefault();
             const newTab = activeTab === 'Crafted' ? 'Classic' : 'Crafted';
             setActiveTab(newTab);
             speak(newTab);
         } else if (isSelectKey) {
             e.preventDefault();
             setActiveFocus('Grid');
             setGameState(prev => ({ ...prev, selectedPoodleIndex: -1 }));
             speak("Go Back");
         } else if (isBackKey) {
             e.preventDefault();
             setGameState(prev => ({ ...prev, isPoodleSelectionOpen: false }));
             speak("Closing");
         }
         return;
      }

      if (isUpKey) {
        e.preventDefault();
        if (poodleMenuMode === 'Selection') {
          if (validSelectedIndex > -1) {
            const next = validSelectedIndex - 1;
            setGameState(prev => ({ ...prev, selectedPoodleIndex: next }));
            speak(next === -1 ? "Go Back" : availablePoodles[next].name);
          }
        } else {
          if (selectedPoodleActionIndex > 0) {
            const next = selectedPoodleActionIndex - 1;
            setGameState(prev => ({ ...prev, selectedPoodleActionIndex: next }));
            speak(actions[next]);
          }
        }
      } else if (isDownKey) {
        e.preventDefault();
        if (poodleMenuMode === 'Selection') {
          if (validSelectedIndex < availablePoodles.length - 1) {
            const next = validSelectedIndex + 1;
            setGameState(prev => ({ ...prev, selectedPoodleIndex: next }));
            speak(availablePoodles[next].name);
          }
        } else {
          if (selectedPoodleActionIndex < actions.length - 1) {
            const next = selectedPoodleActionIndex + 1;
            setGameState(prev => ({ ...prev, selectedPoodleActionIndex: next }));
            speak(actions[next]);
          }
        }
      } else if (isLeftKey || isRightKey) {
        e.preventDefault();
        // Ignore left/right inside the grid for now, just allow vertical scrolling
      } else if (isSelectKey) {
        e.preventDefault();
        handleSelection();
      } else if (isBackKey) {
        e.preventDefault();
        if (poodleMenuMode === 'Action') {
          setGameState(prev => ({ ...prev, poodleMenuMode: 'Selection' }));
          speak(availablePoodles[validSelectedIndex].name);
        } else if (poodleMenuMode === 'Selection') {
          setActiveFocus('Tabs');
          speak(activeTab);
        }
      } else {
        // Disable other keyboard inputs by catching them here
        if (['ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
            e.preventDefault();
        }
      }
    };

    // Use capture phase to ensure we intercept before game logic
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [state.isPoodleSelectionOpen, poodleMenuMode, validSelectedIndex, selectedPoodleActionIndex, poodleBarkType, activeFocus, activeTab, actions]);

  const tabs: TabType[] = ['Crafted', 'Classic'];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-8">
      {/* Tabs Menu */}
      <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <div 
            key={tab} 
            className={`px-8 py-3 rounded-t-xl border-4 text-2xl font-bold uppercase transition-all duration-300 shadow-xl ${
              activeTab === tab 
                ? 'bg-neutral-800 border-pink-500 text-pink-400' 
                : 'bg-neutral-900 border-neutral-700 text-neutral-500 opacity-50'
            } ${
              activeFocus === 'Tabs' && activeTab === tab
                ? 'ring-4 ring-pink-500/50 scale-105'
                : ''
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`w-full max-w-5xl h-[70vh] bg-neutral-900 border-4 border-neutral-700 rounded-3xl overflow-hidden flex shadow-2xl relative ${
          activeFocus === 'Grid' ? 'ring-inset ring-4 ring-pink-500/50' : ''
        }`}
      >
        {/* Left Side: Selection Grid */}
        <div className="w-1/2 border-r-4 border-neutral-700 flex flex-col">
          <div className="p-6 bg-neutral-800 border-b-4 border-neutral-700">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500 rounded-full animate-pulse"></span>
              POODLE SELECTION
            </h2>
            <p className="text-neutral-400 mt-2 text-lg">Use Up/Down to navigate. Press Select to choose.</p>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <button
              className={`w-full p-6 rounded-2xl text-left transition-all flex items-center gap-4 ${
                validSelectedIndex === -1 && activeFocus === 'Grid' 
                  ? 'bg-white text-black scale-[1.02]' 
                  : 'bg-neutral-800 text-neutral-400'
              }`}
              onClick={() => {
                setGameState(prev => ({ ...prev, selectedPoodleIndex: -1 }));
                setActiveFocus('Grid');
                // Don't auto-handleSelection on click for consistency, wait for enter. Or do it.
                // handleSelection(); 
              }}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${validSelectedIndex === -1 ? 'border-black' : 'border-neutral-600'}`}>
                ←
              </div>
              <span className="text-xl font-bold uppercase tracking-widest">Go Back</span>
            </button>

            {availablePoodles.map((poodle, idx) => {
              const isCurrentlyRiding = poodle.name === state.ridingAnimal;
              const isSelected = validSelectedIndex === idx && activeFocus === 'Grid';
              return (
                <button
                  key={poodle.id}
                  className={`w-full p-6 rounded-2xl text-left transition-all flex items-center gap-4 ${
                    isSelected 
                      ? 'bg-white text-black scale-[1.02]' 
                      : 'bg-neutral-800 text-neutral-400'
                  } ${isCurrentlyRiding ? 'opacity-40 grayscale-[0.5]' : ''}`}
                  onClick={() => {
                     setGameState(prev => ({ ...prev, selectedPoodleIndex: idx }));
                     setActiveFocus('Grid');
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full border-2 border-current shadow-inner flex-shrink-0"
                    style={{ backgroundColor: poodle.color }}
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold uppercase tracking-tight">{poodle.name}</span>
                    {isCurrentlyRiding && (
                      <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Currently Riding</span>
                    )}
                    {isSelected && poodleMenuMode === 'Action' && (
                      <div className="mt-2 flex gap-2">
                         {actions.map((action, i) => {
                           let label = action;
                           if (action === "Ride Now") {
                             label = isCurrentlyRiding ? "Currently Riding" : "Ride";
                           } else if (action === "About") {
                             label = "Info";
                           } else if (action === "Bark Type") {
                             if (!poodle.supportsBarkToggle) {
                               label = "Bark: Classic";
                             } else {
                               label = `Bark: ${poodleBarkType === 'Generic' ? 'Classic' : 'BOW'}`;
                             }
                           } else if (action === "Go Back") {
                             label = "Exit";
                           }
                           return (
                             <span key={action} className={`px-2 py-1 text-xs rounded border ${selectedPoodleActionIndex === i ? 'bg-black text-white' : 'border-neutral-500'}`}>
                               {label}
                             </span>
                           );
                         })}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>


        {/* Right Side: Picture & Info */}
        <div className="w-1/2 bg-neutral-950 flex flex-col p-12 relative overflow-hidden">
           {validSelectedIndex !== -1 && availablePoodles[validSelectedIndex] ? (
             <>
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <div className="text-9xl font-black text-white uppercase rotate-90 origin-top-right whitespace-nowrap">
                     {availablePoodles[validSelectedIndex].name}
                  </div>
               </div>

               <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 z-10">
                  <div 
                    className="w-64 h-64 rounded-full shadow-2xl border-8 border-white/10 flex items-center justify-center"
                    style={{ backgroundColor: availablePoodles[validSelectedIndex].color }}
                  >
                     <div className="text-8xl">🐩</div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                       {availablePoodles[validSelectedIndex].name}
                    </h3>
                    <p className="text-neutral-400 text-lg leading-relaxed max-w-md mx-auto line-clamp-4">
                       {availablePoodles[validSelectedIndex].description}
                    </p>
                  </div>
               </div>
             </>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
                <div className="text-6xl font-black text-white/20">BACK</div>
                <p className="text-neutral-400 text-lg mt-4">Select to close the menu.</p>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
};
