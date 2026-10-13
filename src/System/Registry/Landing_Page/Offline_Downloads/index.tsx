import React from 'react';

interface OfflineDownloadsTriggerProps {
  onClick: () => void;
}

export const OfflineDownloadsTrigger: React.FC<OfflineDownloadsTriggerProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="px-10 py-4 bg-white/10 text-white/50 hover:bg-white hover:text-black font-bold rounded-full transition-all backdrop-blur-sm border border-white/10 uppercase tracking-widest text-lg"
      id="footer-downloads-btn"
    >
      Offline Downloads
    </button>
  );
};
