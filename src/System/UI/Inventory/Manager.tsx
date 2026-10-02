import React, { useState, useEffect } from 'react';
import { GameState } from '../../Engine/Core/Types';
import { InventoryItem } from '../../AI/In-Game/Logic/Inventory/InventoryLogic';
import { Heart, Coins, X } from 'lucide-react';

/**
 * System/UI/Inventory/index.tsx
 * Centralized inventory manager component.
 */

interface InventoryManagerProps {
  gameState: GameState;
  onClose: () => void;
  onUseItem: (item: InventoryItem) => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({ gameState, onClose, onUseItem }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  
  const items = gameState.inventory.items;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedAction) {
        if ((gameState.keyboardLayout === 'Cedella' && e.code === 'KeyX') || 
            (gameState.keyboardLayout === 'Arden Denis' && e.code === 'KeyF')) {
          setSelectedAction(null);
        }
        return;
      }

      const isRightKey = e.code === 'ArrowRight' || (gameState.keyboardLayout === 'Arden Denis' && e.code === 'KeyD');
      const isLeftKey = e.code === 'ArrowLeft' || (gameState.keyboardLayout === 'Arden Denis' && e.code === 'KeyA');
      const isDownKey = e.code === 'ArrowDown' || (gameState.keyboardLayout === 'Arden Denis' && e.code === 'KeyS');
      const isUpKey = e.code === 'ArrowUp' || (gameState.keyboardLayout === 'Arden Denis' && e.code === 'KeyW');

      if (isRightKey) {
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (isLeftKey) {
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (isDownKey) {
        setSelectedIndex(prev => Math.min(prev + 4, items.length - 1));
      } else if (isUpKey) {
        setSelectedIndex(prev => Math.max(prev - 4, 0));
      } else if ((gameState.keyboardLayout === 'Cedella' && e.code === 'KeyO') || 
                 (gameState.keyboardLayout === 'Arden Denis' && e.code === 'KeyE')) {
        if (items.length > 0) {
          setSelectedAction('menu');
        }
      } else if ((gameState.keyboardLayout === 'Cedella' && e.code === 'KeyX') || 
                 (gameState.keyboardLayout === 'Arden Denis' && e.code === 'KeyF')) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length, selectedAction, gameState.keyboardLayout, onClose]);

  const handleAction = (action: string) => {
    const item = items[selectedIndex];
    if (!item) return;

    if (action === 'use') {
      onUseItem(item);
      if (item.type === 'key') {
        onClose();
      }
    } else if (action === 'equip') {
      // Equip logic
    } else if (action === 'combine') {
      // Combine logic
    }
    setSelectedAction(null);
  };

  return (
    <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center font-sans text-white">
      <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-6 w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-6 border-b border-zinc-700 pb-4">
          <h2 className="text-3xl font-bold tracking-widest text-zinc-100">INVENTORY</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg">
              <Coins className="text-yellow-400" />
              <span className="text-xl font-mono">{gameState.inventory.coins}</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg relative">
              <div className="w-10 h-10 bg-pink-200 rounded-t-full relative flex items-center justify-center border-b-4 border-amber-700">
                <Heart className="text-red-500 fill-red-500 w-6 h-6 z-10 drop-shadow-md" />
              </div>
              <span className="text-xl font-mono">{gameState.score}%</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex gap-6">
          <div className="flex-1 grid grid-cols-4 gap-4 content-start">
            {Array.from({ length: gameState.inventory.maxItems }).map((_, i) => {
              const item = items[i];
              const isSelected = i === selectedIndex;
              return (
                <div 
                  key={i} 
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center p-4 transition-all
                    ${isSelected ? 'border-emerald-400 bg-emerald-400/10 shadow-[0_0_15px_rgba(52,211,153,0.3)]' : 'border-zinc-700 bg-zinc-800/50'}
                    ${item ? 'cursor-pointer' : 'opacity-50'}
                  `}
                >
                  {item && (
                    <div className="text-center">
                      <div className="text-sm font-medium">{item.name}</div>
                      {item.quantity > 1 && <div className="text-xs text-zinc-400 mt-1">x{item.quantity}</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-80 bg-zinc-800 rounded-lg p-6 flex flex-col border border-zinc-700">
            {items[selectedIndex] ? (
              <>
                <h3 className="text-2xl font-bold mb-2 text-emerald-400">{items[selectedIndex].name}</h3>
                <p className="text-zinc-300 flex-1">{items[selectedIndex].description}</p>
                
                {selectedAction === 'menu' && (
                  <div className="flex flex-col gap-2 mt-4">
                    <button onClick={() => handleAction('equip')} className="bg-zinc-700 hover:bg-zinc-600 py-2 rounded font-bold transition-colors">Equip</button>
                    <button onClick={() => handleAction('use')} className="bg-zinc-700 hover:bg-zinc-600 py-2 rounded font-bold transition-colors">Use</button>
                    <button onClick={() => handleAction('combine')} className="bg-zinc-700 hover:bg-zinc-600 py-2 rounded font-bold transition-colors">Combine</button>
                    <button onClick={() => setSelectedAction(null)} className="bg-red-900/50 hover:bg-red-900/80 text-red-200 py-2 rounded font-bold transition-colors mt-2">Go Back</button>
                  </div>
                )}
                {!selectedAction && (
                  <div className="mt-4 text-sm text-zinc-500 text-center">
                    Press {gameState.keyboardLayout === 'Cedella' ? 'O' : 'E'} to interact
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500">
                Empty Slot
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center text-zinc-500 text-sm">
          Press {gameState.keyboardLayout === 'Cedella' ? 'X' : 'F'} to {selectedAction ? 'go back' : 'close inventory'}
        </div>
      </div>
    </div>
  );
};
