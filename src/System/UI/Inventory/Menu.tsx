import React from 'react';
import { motion } from 'motion/react';
import { GameState } from '../../Engine/Core/Types';

import { STORY_PAGES } from '../../Engine/Core/Storybook/StoryData';

interface InventoryMenuProps {
  state: GameState;
}

export const InventoryMenu: React.FC<InventoryMenuProps> = ({ state }) => {
  if (!state.isInventoryOpen) return null;

  const tabs = ['Items', 'Heart', 'Map', 'Storybook', 'Exit'];
  const actions = ['Use', 'Check', 'Combine', 'Equip'];
  const walletItems = state.characterName === 'Priscilla'
    ? ['Priscilla ID Card', 'Priscilla Gold Card']
    : ['ID Card', 'Credit Card', 'Library Card', 'Photo of Abigay'];
  const storybookItems = ['Reading', 'Layout', 'Theme'];
  const themes = ['White', 'Cream', 'Night'];
  const layouts = ['Webpage', 'Emulated'];
  const pages = STORY_PAGES.map(p => p.title);

  const getStorybookContent = () => {
    const item = storybookItems[state.selectedStorybookItemIndex];
    const mode = state.storybookMenuMode;

    if (item === 'Reading') {
      if (mode === 'Selection') {
        return (
          <div className="space-y-4">
            <h3 className="text-orange-500 font-black text-xl uppercase tracking-tighter">Reading Menu</h3>
            <p className="text-zinc-300 leading-relaxed italic">
              Select "Reading" and press Enter to browse pages.
            </p>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center text-3xl">📖</div>
              <div className="flex-1 space-y-1">
                <p className="text-white font-bold">The Grand Manor Adventure</p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Storybook Collection</p>
              </div>
            </div>
          </div>
        );
      } else if (mode === 'Pages') {
        return (
          <div className="space-y-4">
            <h3 className="text-orange-500 font-black text-xl uppercase tracking-tighter">Select a Page</h3>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto scrollbar-hide p-1">
              {pages.map((p, i) => (
                <div 
                  key={p} 
                  id={`storybook-page-${i}`}
                  className={`p-3 rounded-xl font-bold transition-all border-2 ${state.selectedStorybookPageListIndex === i ? 'bg-orange-600 text-white border-orange-400' : 'bg-white/5 text-zinc-500 border-transparent'}`}
                >
                  {p}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Select a page to read its contents</p>
          </div>
        );
      } else if (mode === 'PageContent') {
        const isWebpage = state.storybookLayoutMode === 'Webpage';
        const pageContentLines = isWebpage 
          ? STORY_PAGES.flatMap(p => [`[Heading: ${p.title}]`, ...p.content]) 
          : (STORY_PAGES[state.storybookPage]?.content || []);
        
        return (
          <div className="space-y-4">
            <h3 className="text-orange-500 font-black text-xl uppercase tracking-tighter">
              {isWebpage ? 'Storybook Webpage View' : `Reading: Page ${state.storybookPage + 1}`}
            </h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 max-h-40 overflow-y-auto scrollbar-hide space-y-2">
              {pageContentLines.map((line, i) => {
                const isHeading = line.startsWith('[Heading:');
                const isGraphic = line.startsWith('[Graphic:');
                const cleanLine = line.replace(/^\[Heading: /, '').replace(/\]$/, '').replace(/^\[Graphic: /, '').replace(/\]$/, '');

                return (
                  <div 
                    key={i} 
                    id={`storybook-content-line-${i}`}
                    className={`p-2 rounded-lg transition-all text-sm leading-relaxed ${
                      state.selectedStorybookContentIndex === i ? 'bg-white text-black font-medium' : 'text-zinc-300 opacity-60'
                    } ${isHeading ? 'text-lg font-black text-orange-400 mt-4 border-b border-orange-500/30' : ''} ${isGraphic ? 'italic text-zinc-400 border-l-2 border-zinc-700 pl-4' : ''}`}
                  >
                    {isHeading && <span className="mr-2">📄</span>}
                    {isGraphic && <span className="mr-2">🖼️</span>}
                    {cleanLine}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                {isWebpage ? 'End of Storybook Webpage' : 'End of Page Content'}
              </span>
              <span className="text-[10px] text-orange-500 font-black">
                {isWebpage ? 'X: Back to menu' : 'X: Back to pages'}
              </span>
            </div>
          </div>
        );
      }
    } else if (item === 'Layout') {
      if (mode === 'Selection') {
        return (
          <div className="space-y-4">
            <h3 className="text-orange-500 font-black text-xl uppercase tracking-tighter">Layout Settings</h3>
            <p className="text-zinc-300 leading-relaxed italic">
              Configure how the storybook looks.
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Active Layout</span>
              <span className="text-white font-black text-lg">{state.storybookLayoutMode}</span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="space-y-4">
            <h3 className="text-orange-500 font-black text-xl uppercase tracking-tighter">Choose Layout</h3>
            <div className="space-y-2">
              {layouts.map((l, i) => (
                <div 
                  key={l} 
                  id={`storybook-layout-option-${i}`}
                  className={`p-3 rounded-xl font-bold transition-all border-2 ${state.storybookSecondaryIndex === i ? 'bg-orange-600 text-white border-orange-400' : 'bg-white/5 text-zinc-500 border-transparent'}`}
                >
                  {l} Mode {state.storybookLayoutMode === l ? '(Current)' : ''}
                </div>
              ))}
            </div>
          </div>
        );
      }
    } else if (item === 'Theme') {
      if (mode === 'Selection') {
        return (
          <div className="space-y-4">
            <h3 className="text-orange-500 font-black text-xl uppercase tracking-tighter">Theme Settings</h3>
            <p className="text-zinc-300 leading-relaxed italic">
              Personalize the artistic colors.
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Active Theme</span>
              <span className="text-white font-black text-lg">{state.storybookTheme}</span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="space-y-4">
            <h3 className="text-orange-500 font-black text-xl uppercase tracking-tighter">Select Theme</h3>
            <div className="space-y-2">
              {themes.map((t, i) => (
                <div 
                  key={t} 
                  id={`storybook-theme-option-${i}`}
                  className={`p-3 rounded-xl font-bold transition-all border-2 ${state.storybookSecondaryIndex === i ? 'bg-orange-600 text-white border-orange-400' : 'bg-white/5 text-zinc-500 border-transparent'}`}
                >
                  {t} Theme {state.storybookTheme === t ? '(Current)' : ''}
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm pointer-events-none"
    >
      {/* Top Tabs */}
      <div className="flex justify-center gap-4 p-4">
        {tabs.map((tab) => (
          <div 
            key={tab}
            id={`inventory-tab-${tab.toLowerCase()}`}
            className={`px-6 py-2 rounded-full font-black tracking-widest text-sm transition-all shadow-lg ${
              state.inventoryTab === tab 
                ? (state.inventoryFocus === 'Tabs' ? 'bg-white text-black scale-110 ring-4 ring-orange-500' : 'bg-white text-black scale-110')
                : 'bg-zinc-900/80 text-zinc-500'
            }`}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex p-8 gap-8 items-end transition-opacity ${state.inventoryFocus === 'Content' ? 'opacity-100' : 'opacity-60'}`}>
        {/* Left Side: Information / Description */}
        <div className="flex-1 h-72 bg-zinc-900/90 border-2 border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-center">
          {state.inventoryTab === 'Items' && (
            <>
              {state.isWalletOpen ? (
                <div className="space-y-4">
                  <h3 className="text-orange-500 font-black text-xl uppercase tracking-tighter">Wallet Contents</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Viewing: <span className="text-white font-bold">{walletItems[state.selectedWalletIndex]}</span>. 
                    Press O to read more about this item. Press X to return.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-orange-500 font-black text-xl uppercase tracking-tighter">
                    {state.inventory.items[state.selectedInventoryIndex]?.name || 'No Item Selected'}
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    {state.inventory.items[state.selectedInventoryIndex]?.description || 'Select an item to see its details.'}
                  </p>
                  {state.inventory.items[state.selectedInventoryIndex]?.id === 'wallet' && (
                    <p className="text-xs text-zinc-500 italic">Press O to view contents.</p>
                  )}
                </div>
              )}
            </>
          )}

          {state.inventoryTab === 'Storybook' && getStorybookContent()}

          {state.inventoryTab === 'Heart' && (
            <div className="space-y-4">
              <h3 className="text-red-500 font-black text-xl uppercase tracking-tighter">Heart Meter Status</h3>
              <div className="space-y-2">
                {(state.characterName === 'Priscilla'
                  ? [
                      { label: "Kindness Level", value: "Empty" },
                      { label: "Heart Count", value: "0 Hearts" },
                      { label: "Recent Deeds", value: "Vain posturing, collecting possessions." }
                    ]
                  : [
                      { label: "Kindness Level", value: state.heartMeter > 5 ? "Saintly" : "Developing" },
                      { label: "Heart Count", value: `${state.heartMeter} Hearts` },
                      { label: "Recent Deeds", value: "Helped a poodle navigate the manor." }
                    ]
                ).map((detail, i) => (
                  <div 
                    key={detail.label}
                    className={`p-2 rounded-lg transition-all ${state.selectedHeartDetailIndex === i ? 'bg-red-600/20 border-l-4 border-red-600 pl-4' : 'opacity-60'}`}
                  >
                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">{detail.label}</span>
                    <span className="text-white font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {state.inventoryTab === 'Map' && (
            <div className="space-y-4">
              <h3 className="text-blue-500 font-black text-xl uppercase tracking-tighter">Area Map</h3>
              <div className="space-y-2">
                {[
                  { label: "Current Building", value: state.area.includes('Manor') ? "Allison's Manor" : "Rasta Manor" },
                  { label: "Nearby Landmarks", value: "The grand foyer and the north ramps." },
                  { label: "Area Description", value: `You are currently in the ${state.area}.` }
                ].map((detail, i) => (
                  <div 
                    key={detail.label}
                    className={`p-2 rounded-lg transition-all ${state.selectedMapDetailIndex === i ? 'bg-blue-600/20 border-l-4 border-blue-600 pl-4' : 'opacity-60'}`}
                  >
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">{detail.label}</span>
                    <span className="text-white font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Item Grid / Selection */}
        <div className="w-80 space-y-4">
          {state.inventoryTab === 'Items' && (
            <div className="bg-zinc-900/90 border-2 border-white/10 rounded-2xl p-4 shadow-2xl">
              {state.isWalletOpen ? (
                <div className="grid grid-cols-1 gap-2">
                  {walletItems.map((item, index) => (
                    <div 
                      key={item}
                      id={`wallet-item-${index}`}
                      className={`p-3 rounded-xl font-bold transition-all ${
                        state.selectedWalletIndex === index 
                          ? 'bg-white text-black translate-x-2' 
                          : 'text-zinc-500'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {state.inventory.items.map((item, index) => (
                    <div 
                      key={item.id}
                      id={`inventory-item-${index}`}
                      className={`p-3 rounded-xl font-bold flex justify-between items-center transition-all ${
                        state.selectedInventoryIndex === index 
                          ? 'bg-orange-600 text-white translate-x-2' 
                          : 'bg-zinc-800/50 text-zinc-400'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-xs opacity-50">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {state.inventoryTab === 'Storybook' && (
             <div className="bg-zinc-900/90 border-2 border-white/10 rounded-2xl p-4 shadow-2xl space-y-2">
               {storybookItems.map((item, index) => (
                 <div 
                   key={item}
                   id={`storybook-item-${index}`}
                   className={`p-3 rounded-xl font-bold transition-all ${
                     state.selectedStorybookItemIndex === index 
                       ? 'bg-orange-600 text-white translate-x-2' 
                       : 'bg-zinc-800/50 text-zinc-400'
                   }`}
                 >
                   {item}
                 </div>
               ))}
             </div>
          )}

          {/* Action Menu Overlay */}
          {state.inventoryMenuMode === 'Action' && !state.isWalletOpen && (
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white text-black rounded-2xl p-4 shadow-2xl space-y-1"
            >
              {(state.inventory.items[state.selectedInventoryIndex]?.id === 'umbrella' 
                ? (state.isUmbrellaEquipped ? ['Unequip', 'Open', 'Close', 'Check'] : ['Equip', 'Check'])
                : actions
              ).map((action, index) => (
                <div 
                  key={action}
                  className={`p-2 rounded-lg font-black text-center uppercase tracking-tighter text-sm ${
                    state.selectedActionIndex === index ? 'bg-black text-white' : 'text-zinc-400'
                  }`}
                >
                  {action}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-4 bg-black/40 text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex justify-center gap-8">
        <span>Arrows: Navigate / Tabs</span>
        <span>O: Select / Action</span>
        <span>X: Back / Exit</span>
      </div>
    </motion.div>
  );
};
