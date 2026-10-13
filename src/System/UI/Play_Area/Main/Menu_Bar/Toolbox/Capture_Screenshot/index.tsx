import React, { useState } from 'react';
import { Camera, Image, Download, Save } from 'lucide-react';
import { SCREENSHOT_FORMATS } from './General';

export const CaptureScreenshotUtility: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerCapture = (formatId: 'save-as' | 'png' | 'jpg') => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      const msg = "Game canvas not found. Make sure you are in an active gameplay area!";
      console.warn(msg);
      // We assume announceToScreenReader is available or we use a fallback
      return;
    }

    try {
      // Choose type
      const mimeType = formatId === 'jpg' ? 'image/jpeg' : 'image/png';
      const extension = formatId === 'jpg' ? 'jpg' : 'png';
      
      // Request screenshot
      const dataUrl = canvas.toDataURL(mimeType, formatId === 'jpg' ? 0.9 : undefined);
      
      if (formatId === 'save-as') {
        // In browsers, save-as is standard download prompt or opens new tab with content for save-as
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(`<iframe src="${dataUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
        } else {
          // Fallback to normal download
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `poodle_screenshot_${Date.now()}.${extension}`;
          link.click();
        }
      } else {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `poodle_screenshot_${Date.now()}.${extension}`;
        link.click();
      }
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
    setIsOpen(false);
  };

  return (
    <div id="screenshot-tool-container" className="px-2 py-1 flex flex-col gap-1">
      <button
        id="screenshot-rainbow-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-3 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider text-white transition-all bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 hover:opacity-90 active:scale-98 flex justify-between items-center shadow-[0_0_12px_rgba(234,179,8,0.2)]"
      >
        <div id="rainbow-btn-label-group" className="flex items-center gap-1.5">
          <Camera size={13} id="rainbow-camera-icon" />
          <span>Capture Screenshot</span>
        </div>
        <span id="rainbow-btn-arrow" className="text-[10px] opacity-80">{isOpen ? '▼' : '▶'}</span>
      </button>

      {isOpen && (
        <div id="screenshot-submenu-panel" className="mt-1 pl-2 border-l border-zinc-800 flex flex-col gap-1 bg-zinc-950/60 p-1.5 rounded">
          <button
            id="screenshot-opt-save-as"
            onClick={() => triggerCapture('save-as')}
            className="w-full text-left px-2 py-1 text-xs font-mono hover:text-white text-zinc-400 flex items-center gap-1.5 hover:bg-zinc-900 rounded"
          >
            <Save size={11} className="text-pink-500" />
            <span>Save Image As...</span>
          </button>
          
          <button
            id="screenshot-opt-png"
            onClick={() => triggerCapture('png')}
            className="w-full text-left px-2 py-1 text-xs font-mono hover:text-white text-zinc-400 flex items-center gap-1.5 hover:bg-zinc-900 rounded"
          >
            <Download size={11} className="text-emerald-500" />
            <span>Save as PNG</span>
          </button>

          <button
            id="screenshot-opt-jpg"
            onClick={() => triggerCapture('jpg')}
            className="w-full text-left px-2 py-1 text-xs font-mono hover:text-white text-zinc-400 flex items-center gap-1.5 hover:bg-zinc-900 rounded"
          >
            <Image size={11} className="text-amber-500" />
            <span>Save as JPG</span>
          </button>
        </div>
      )}
    </div>
  );
};
