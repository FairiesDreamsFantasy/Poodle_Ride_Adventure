import { InputContext } from '../../../InputTypes';
import { STORY_PAGES } from '../../../Engine/Core/Storybook/StoryData';
import { 
  HEART_METER_TITLES, 
  MAPS_TITLES, 
  STORYBOOK_REGISTRY,
  INVENTORY_ITEMS_REGISTRY
} from '../../../Registry/UI/Inventory';

/**
 * Common Inventory and Storybook keyboard handling logic.
 * Shared across multiple keyboard layouts.
 */

export const handleCommonInventoryKeys = (e: KeyboardEvent, ctx: InputContext): boolean => {
  const { gameState: state, setGameState, audio, speak } = ctx;
  const isShift = e.shiftKey;

  if (!state.isInventoryOpen) return false;

  // Space and Escape keys are not needed in inventory. Swallow them to ensure
  // original functionality of the screen and prevent any unwanted movement/actions.
  if (e.code === 'Space' || e.code === 'Escape') {
    return true;
  }

  // System Status shortcut while in inventory (Allow it to pass through)
  if (isShift && e.code === 'KeyM') return false;

  const tabs: ('Items' | 'Heart' | 'Map' | 'Storybook' | 'Exit')[] = ['Items', 'Heart', 'Map', 'Storybook', 'Exit'];
  
  // Tab Navigation (Only when focus is on Tabs)
  if (state.inventoryFocus === 'Tabs') {
    if (e.code === 'ArrowRight') {
      const currentIndex = tabs.indexOf(state.inventoryTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setGameState(prev => ({ ...prev, inventoryTab: tabs[nextIndex] }));
      speak(`Tab: ${tabs[nextIndex]}`, 'EN_US');
      return true;
    }
    if (e.code === 'ArrowLeft') {
      const currentIndex = tabs.indexOf(state.inventoryTab);
      const nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setGameState(prev => ({ ...prev, inventoryTab: tabs[nextIndex] }));
      speak(`Tab: ${tabs[nextIndex]}`, 'EN_US');
      return true;
    }
    if (e.code === 'ArrowDown') {
      if (state.inventoryTab === 'Exit') return true;
      setGameState(prev => ({ ...prev, inventoryFocus: 'Content' }));
      speak("Focus moved to content area.", 'EN_US');
      return true;
    }
    
    // Activation keys for Tabs (Enter, KeyO, KeyE)
    if (e.code === 'Enter' || e.code === 'KeyO' || e.code === 'KeyE') {
      if (state.inventoryTab === 'Exit') {
        setGameState(prev => ({ ...prev, isInventoryOpen: false }));
        speak("Inventory closed.", 'EN_US');
      } else {
        setGameState(prev => ({ ...prev, inventoryFocus: 'Content' }));
        speak(`Focus moved to ${state.inventoryTab} content area.`, 'EN_US');
      }
      return true;
    }

    // Back / Close keys for Tabs (KeyX, KeyF)
    if (e.code === 'KeyX' || e.code === 'KeyF') {
      setGameState(prev => ({ ...prev, isInventoryOpen: false }));
      speak("Inventory closed.", 'EN_US');
      return true;
    }

    return true; // Swallow all other keys to protect the Tab interaction state
  }

  // Content Navigation
  if (state.inventoryFocus === 'Content') {
    // 1. Navigation (Up arrow)
    if (e.code === 'ArrowUp') {
      if (state.inventoryTab === 'Items') {
        if (state.isWalletOpen) {
          const wLength = state.characterName === 'Priscilla' ? 2 : 4;
          const nextIndex = (state.selectedWalletIndex - 1 + wLength) % wLength;
          setGameState(prev => ({ ...prev, selectedWalletIndex: nextIndex }));
          const walletItems = state.characterName === 'Priscilla'
            ? ['Priscilla ID Card', 'Priscilla Gold Card']
            : ['ID Card', 'Credit Card', 'Library Card', 'Photo of Abigay'];
          speak(walletItems[nextIndex], 'EN_US');
        } else if (state.inventoryMenuMode === 'Selection') {
          const nextIndex = Math.max(0, state.selectedInventoryIndex - 1);
          setGameState(prev => ({ ...prev, selectedInventoryIndex: nextIndex }));
          speak(state.inventory.items[nextIndex]?.name || "Empty", 'EN_US');
        } else {
          const item = state.inventory.items[state.selectedInventoryIndex];
          const actionCount = item?.id === 'umbrella' ? 5 : 4;
          const nextIndex = (state.selectedActionIndex - 1 + actionCount) % actionCount;
          setGameState(prev => ({ ...prev, selectedActionIndex: nextIndex }));
          let actions = ['Use', 'Check', 'Combine', 'Equip'];
          if (item?.id === 'umbrella') actions = INVENTORY_ITEMS_REGISTRY.umbrella.actions;
          speak(actions[nextIndex], 'EN_US');
        }
      } else if (state.inventoryTab === 'Heart') {
        const nextIndex = (state.selectedHeartDetailIndex - 1 + HEART_METER_TITLES.length) % HEART_METER_TITLES.length;
        setGameState(prev => ({ ...prev, selectedHeartDetailIndex: nextIndex }));
        speak(HEART_METER_TITLES[nextIndex], 'EN_US');
      } else if (state.inventoryTab === 'Map') {
        const nextIndex = (state.selectedMapDetailIndex - 1 + MAPS_TITLES.length) % MAPS_TITLES.length;
        setGameState(prev => ({ ...prev, selectedMapDetailIndex: nextIndex }));
        speak(MAPS_TITLES[nextIndex], 'EN_US');
      } else if (state.inventoryTab === 'Storybook') {
         const mode = state.storybookMenuMode;
         if (mode === 'Selection') {
           const nextIndex = (state.selectedStorybookItemIndex - 1 + STORYBOOK_REGISTRY.main.length) % STORYBOOK_REGISTRY.main.length;
           setGameState(prev => ({ ...prev, selectedStorybookItemIndex: nextIndex }));
           speak(STORYBOOK_REGISTRY.main[nextIndex], 'EN_US');
         } else if (mode === 'Pages') {
           const nextIndex = (state.selectedStorybookPageListIndex - 1 + STORY_PAGES.length) % STORY_PAGES.length;
           setGameState(prev => ({ ...prev, selectedStorybookPageListIndex: nextIndex }));
           speak(STORY_PAGES[nextIndex].title, 'EN_US');
         } else if (mode === 'PageContent') {
           const isWebpage = state.storybookLayoutMode === 'Webpage';
           const lines = isWebpage 
             ? STORY_PAGES.flatMap(p => [`[Heading: ${p.title}]`, ...p.content]) 
             : (STORY_PAGES[state.storybookPage]?.content || []);
             
           const nextIndex = Math.max(0, state.selectedStorybookContentIndex - 1);
           if (nextIndex === state.selectedStorybookContentIndex && state.selectedStorybookContentIndex === 0) {
             speak("Beginning of content.", 'EN_US');
           } else {
             setGameState(prev => ({ ...prev, selectedStorybookContentIndex: nextIndex }));
             speak(lines[nextIndex], 'EN_US');
           }
         } else if (mode === 'Layouts' || mode === 'Themes') {
           const limit = mode === 'Layouts' ? STORYBOOK_REGISTRY.layouts.length : STORYBOOK_REGISTRY.themes.length;
           const nextIndex = (state.storybookSecondaryIndex - 1 + limit) % limit;
           setGameState(prev => ({ ...prev, storybookSecondaryIndex: nextIndex }));
           const options = mode === 'Layouts' ? STORYBOOK_REGISTRY.layouts : STORYBOOK_REGISTRY.themes;
           speak(options[nextIndex], 'EN_US');
         }
      }
      return true;
    }

    // 2. Navigation (Down arrow)
    if (e.code === 'ArrowDown') {
      if (state.inventoryTab === 'Items') {
        if (state.isWalletOpen) {
          const wLength = state.characterName === 'Priscilla' ? 2 : 4;
          const nextIndex = (state.selectedWalletIndex + 1) % wLength;
          setGameState(prev => ({ ...prev, selectedWalletIndex: nextIndex }));
          const walletItems = state.characterName === 'Priscilla'
            ? ['Priscilla ID Card', 'Priscilla Gold Card']
            : ['ID Card', 'Credit Card', 'Library Card', 'Photo of Abigay'];
          speak(walletItems[nextIndex], 'EN_US');
        } else if (state.inventoryMenuMode === 'Selection') {
          const nextIndex = (state.selectedInventoryIndex + 1) % Math.max(1, state.inventory.items.length);
          setGameState(prev => ({ ...prev, selectedInventoryIndex: nextIndex }));
          speak(state.inventory.items[nextIndex]?.name || "Empty", 'EN_US');
        } else {
          const item = state.inventory.items[state.selectedInventoryIndex];
          const actionCount = item?.id === 'umbrella' ? 5 : 4;
          const nextIndex = (state.selectedActionIndex + 1) % actionCount;
          setGameState(prev => ({ ...prev, selectedActionIndex: nextIndex }));
          let actions = ['Use', 'Check', 'Combine', 'Equip'];
          if (item?.id === 'umbrella') actions = INVENTORY_ITEMS_REGISTRY.umbrella.actions;
          speak(actions[nextIndex], 'EN_US');
        }
      } else if (state.inventoryTab === 'Heart') {
        const nextIndex = (state.selectedHeartDetailIndex + 1) % HEART_METER_TITLES.length;
        setGameState(prev => ({ ...prev, selectedHeartDetailIndex: nextIndex }));
        speak(HEART_METER_TITLES[nextIndex], 'EN_US');
      } else if (state.inventoryTab === 'Map') {
        const nextIndex = (state.selectedMapDetailIndex + 1) % MAPS_TITLES.length;
        setGameState(prev => ({ ...prev, selectedMapDetailIndex: nextIndex }));
        speak(MAPS_TITLES[nextIndex], 'EN_US');
      } else if (state.inventoryTab === 'Storybook') {
         const mode = state.storybookMenuMode;
         if (mode === 'Selection') {
           const nextIndex = (state.selectedStorybookItemIndex + 1) % STORYBOOK_REGISTRY.main.length;
           setGameState(prev => ({ ...prev, selectedStorybookItemIndex: nextIndex }));
           speak(STORYBOOK_REGISTRY.main[nextIndex], 'EN_US');
         } else if (mode === 'Pages') {
           const nextIndex = (state.selectedStorybookPageListIndex + 1) % STORY_PAGES.length;
           setGameState(prev => ({ ...prev, selectedStorybookPageListIndex: nextIndex }));
           speak(STORY_PAGES[nextIndex].title, 'EN_US');
         } else if (mode === 'PageContent') {
           const isWebpage = state.storybookLayoutMode === 'Webpage';
           const lines = isWebpage 
             ? STORY_PAGES.flatMap(p => [`[Heading: ${p.title}]`, ...p.content]) 
             : (STORY_PAGES[state.storybookPage]?.content || []);

           const nextIndex = Math.min(lines.length - 1, state.selectedStorybookContentIndex + 1);
           if (nextIndex === state.selectedStorybookContentIndex && lines.length > 0) {
             speak("End of content.", 'EN_US');
           } else {
             setGameState(prev => ({ ...prev, selectedStorybookContentIndex: nextIndex }));
             speak(lines[nextIndex], 'EN_US');
           }
         } else if (mode === 'Layouts' || mode === 'Themes') {
           const limit = mode === 'Layouts' ? STORYBOOK_REGISTRY.layouts.length : STORYBOOK_REGISTRY.themes.length;
           const nextIndex = (state.storybookSecondaryIndex + 1) % limit;
           setGameState(prev => ({ ...prev, storybookSecondaryIndex: nextIndex }));
           const options = mode === 'Layouts' ? STORYBOOK_REGISTRY.layouts : STORYBOOK_REGISTRY.themes;
           speak(options[nextIndex], 'EN_US');
         }
      }
      return true;
    }

    // 3. Navigation (Left and Right arrows)
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
      if (state.inventoryTab === 'Storybook') {
        const mode = state.storybookMenuMode;
        if (mode === 'PageContent') {
          speak("Horizontal navigation not active in page content mode. Use up and down arrows.", 'EN_US');
        } else {
          speak("Use up and down arrows to browse items. Use Action Key to activate.", 'EN_US');
        }
        return true;
      }
      
      if (state.inventoryTab === 'Items' && state.inventoryMenuMode === 'Selection' && !state.isWalletOpen) {
        speak("Navigating within items area.");
      } else if (state.inventoryTab === 'Heart') {
        speak("Cycling through heart meter items.");
        const nextIndex = (state.selectedHeartDetailIndex + (e.code === 'ArrowRight' ? 1 : -1) + HEART_METER_TITLES.length) % HEART_METER_TITLES.length;
        setGameState(prev => ({ ...prev, selectedHeartDetailIndex: nextIndex }));
        speak(HEART_METER_TITLES[nextIndex]);
      } else if (state.inventoryTab === 'Map') {
        speak("Cycling through map information.");
        const nextIndex = (state.selectedMapDetailIndex + (e.code === 'ArrowRight' ? 1 : -1) + MAPS_TITLES.length) % MAPS_TITLES.length;
        setGameState(prev => ({ ...prev, selectedMapDetailIndex: nextIndex }));
        speak(MAPS_TITLES[nextIndex]);
      }
      return true;
    }

    // 4. Activations (Enter, KeyO, KeyE)
    if (e.code === 'Enter' || e.code === 'KeyO' || e.code === 'KeyE') {
      if (state.inventoryTab === 'Items') {
        if (state.isWalletOpen) {
          const walletItems = state.characterName === 'Priscilla'
            ? ['Priscilla ID Card', 'Priscilla Gold Card']
            : ['ID Card', 'Credit Card', 'Library Card', 'Photo of Abigay'];
          const item = walletItems[state.selectedWalletIndex];
          let desc = "A very important item kept safely in your wallet.";
          if (state.characterName === 'Priscilla') {
            if (item === 'Priscilla ID Card') {
              desc = "This is Priscilla's unique ID Card showing her name, address at the Vanity House, with no picture of Abigay.";
            } else if (item === 'Priscilla Gold Card') {
              desc = "This is a shiny solid-gold credit card designed for premium vanity and extreme financial greed.";
            }
          } else {
            if (item === 'Photo of Abigay') {
              desc = INVENTORY_ITEMS_REGISTRY.photoOfAbigay.description;
            } else if (item === 'ID Card') {
              desc = "This is your ID Card proving you are a certified poodle rider.";
            } else if (item === 'Credit Card') {
              desc = "A golden card with infinite credit for elite canine styling.";
            } else if (item === 'Library Card') {
              desc = "A laminated card allowing you to borrow books from the manor libraries.";
            }
          }
          speak(`Description of ${item}: ${desc}`);
          return true;
        }

        if (state.inventoryMenuMode === 'Selection') {
          const item = state.inventory.items[state.selectedInventoryIndex];
          if (item?.id === INVENTORY_ITEMS_REGISTRY.wallet.id) {
            setGameState(prev => ({ ...prev, isWalletOpen: true, selectedWalletIndex: 0 }));
            speak("Wallet opened. View items in wallet. Use arrows to navigate.");
            return true;
          }
          if (item) {
            setGameState(prev => ({ ...prev, inventoryMenuMode: 'Action', selectedActionIndex: 0 }));
            const actionMsg = item.id === INVENTORY_ITEMS_REGISTRY.umbrella.id
              ? `Action menu for Umbrella opened. It is currently ${state.isUmbrellaEquipped ? 'equipped' : 'not equipped'}. Use arrows to pick: Open, Close, Check, Combine, or Equip.`
              : "Action menu opened. Use, Check, Combine, or Equip.";
            speak(actionMsg);
          }
        } else {
          const item = state.inventory.items[state.selectedInventoryIndex];
          if (item) {
            let actions = ['Use', 'Check', 'Combine', 'Equip'];
            if (item.id === INVENTORY_ITEMS_REGISTRY.umbrella.id) actions = INVENTORY_ITEMS_REGISTRY.umbrella.actions;
            
            const action = actions[state.selectedActionIndex];
            
            if (item.id === INVENTORY_ITEMS_REGISTRY.umbrella.id) {
              if (action === 'Equip') {
                const nextEquipped = !state.isUmbrellaEquipped;
                setGameState(prev => ({ 
                  ...prev, 
                  isUmbrellaEquipped: nextEquipped,
                  inventoryMenuMode: 'Selection'
                }));
                const msg = nextEquipped ? "Umbrella equipped for your poodle ride." : "Umbrella put away.";
                speak(msg);
              } else if (action === 'Open' || action === 'Close') {
                if (!state.isUmbrellaEquipped) {
                  speak("You must equip the umbrella first before you can open or close it.");
                } else {
                  const nextOpen = action === 'Open';
                  setGameState(prev => ({ 
                    ...prev, 
                    isUmbrellaOpen: nextOpen,
                    inventoryMenuMode: 'Selection'
                  }));
                  speak(`Umbrella ${nextOpen ? 'opened' : 'closed'}.`);
                }
              } else {
                speak(`${action}ing ${item.name}`);
                setGameState(prev => ({ ...prev, inventoryMenuMode: 'Selection' }));
              }
            } else {
              speak(`${action}ing ${item.name}`);
              setGameState(prev => ({ ...prev, inventoryMenuMode: 'Selection' }));
            }
          }
        }
      } else if (state.inventoryTab === 'Heart') {
        speak(`Viewing Heart status: ${HEART_METER_TITLES[state.selectedHeartDetailIndex]}.`);
      } else if (state.inventoryTab === 'Map') {
        speak(`Viewing Map status: ${MAPS_TITLES[state.selectedMapDetailIndex]}.`);
      } else if (state.inventoryTab === 'Storybook') {
        const mode = state.storybookMenuMode;
        if (mode === 'Selection') {
          const items = STORYBOOK_REGISTRY.main;
          const selected = items[state.selectedStorybookItemIndex];
          if (selected === 'Reading') {
            setGameState(prev => ({ ...prev, storybookMenuMode: 'Pages', selectedStorybookPageListIndex: 0 }));
            speak("Story pages list. Use up and down arrows to browse.");
          } else if (selected === 'Layout') {
            setGameState(prev => ({ ...prev, storybookMenuMode: 'Layouts', storybookSecondaryIndex: 0 }));
            speak("Select layout layout: Webpage, or Emulated.");
          } else if (selected === 'Theme') {
            setGameState(prev => ({ ...prev, storybookMenuMode: 'Themes', storybookSecondaryIndex: 0 }));
            speak("Select theme: White, Cream, or Night.");
          }
        } else if (mode === 'Pages') {
          setGameState(prev => ({ 
            ...prev, 
            storybookMenuMode: 'PageContent', 
            storybookPage: state.selectedStorybookPageListIndex, 
            selectedStorybookContentIndex: 0 
          }));
          speak(`Opened chapter: ${STORY_PAGES[state.selectedStorybookPageListIndex].title}. Reading content.`);
        } else if (mode === 'Layouts') {
          const layouts = STORYBOOK_REGISTRY.layouts;
          const chosen = layouts[state.storybookSecondaryIndex] as 'Webpage' | 'Emulated';
          setGameState(prev => ({ ...prev, storybookLayoutMode: chosen, storybookMenuMode: 'Selection' }));
          speak(`Layout changed to ${chosen}.`);
        } else if (mode === 'Themes') {
          const themes = STORYBOOK_REGISTRY.themes;
          const chosen = themes[state.storybookSecondaryIndex] as 'White' | 'Cream' | 'Night';
          setGameState(prev => ({ ...prev, storybookTheme: chosen, storybookMenuMode: 'Selection' }));
          speak(`Theme changed to ${chosen}.`);
        }
      }
      return true;
    }

    // 5. Back / Exit (KeyX, KeyF)
    if (e.code === 'KeyX' || e.code === 'KeyF') {
      if (state.isWalletOpen) {
        setGameState(prev => ({ ...prev, isWalletOpen: false }));
        speak("Back to items list.");
      } else if (state.inventoryMenuMode === 'Action') {
        setGameState(prev => ({ ...prev, inventoryMenuMode: 'Selection' }));
        speak("Back to item selection.");
      } else if (state.inventoryTab === 'Storybook') {
        if (state.storybookMenuMode === 'PageContent') {
          setGameState(prev => ({ ...prev, storybookMenuMode: 'Pages' }));
          speak("Back to pages list.");
        } else if (state.storybookMenuMode !== 'Selection') {
          setGameState(prev => ({ ...prev, storybookMenuMode: 'Selection' }));
          speak("Back to storybook menu.");
        } else {
          setGameState(prev => ({ ...prev, inventoryFocus: 'Tabs' }));
          speak("Back to tabs navigation.");
        }
      } else {
        setGameState(prev => ({ ...prev, inventoryFocus: 'Tabs' }));
        speak("Back to tabs navigation.");
      }
      return true;
    }

    return true; // Swallow arrow keys and other keys in content to protect input flow
  }

  return false;
};
