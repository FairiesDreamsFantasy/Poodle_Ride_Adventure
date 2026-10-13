/**
 * Game DOM General Utilities and Helpers.
 */

import { DOMEngineGeneral } from '../Engine/General';

export class GeneralDOM {
  public static getElement(id: string): HTMLElement | null {
    return DOMEngineGeneral.getElementFast(id);
  }

  public static addClass(id: string, className: string) {
    const el = this.getElement(id);
    if (el && !el.classList.contains(className)) {
      el.classList.add(className);
    }
  }

  public static removeClass(id: string, className: string) {
    const el = this.getElement(id);
    if (el && el.classList.contains(className)) {
      el.classList.remove(className);
    }
  }

  /**
   * Focuses an element by ID.
   */
  public static focusElement(id: string) {
    const el = this.getElement(id);
    if (el && typeof el.focus === 'function') {
      el.focus();
    }
  }

  /**
   * Triggers focus mode for screen readers by focusing a container with role="application".
   * [SCIENTIFIC FOCUS MANAGEMENT: ENSURES ACCESSIBILITY WITHOUT ARBITRARY ANNOUNCEMENTS]
   */
  public static triggerFocusMode(id: string) {
    const el = this.getElement(id);
    if (el) {
      // YouTube-style focus management: Ensure role is set correctly
      if (el.getAttribute('role') !== 'application') {
        el.setAttribute('role', 'application');
      }
      
      // Ensure the element is focusable
      if (el.tabIndex < 0 && el.tabIndex !== -1) {
        el.tabIndex = 0; 
      }
      
      // Perform a clean focus trigger
      if (document.activeElement !== el) {
        el.blur(); // Clear existing focus to ensure a fresh trigger
        setTimeout(() => {
          el.focus({ preventScroll: true });
          
          // Double-check if focus stuck, otherwise try again
          if (document.activeElement !== el) {
            el.focus({ preventScroll: true });
          }
        }, 10);
      }
    }
  }
}


