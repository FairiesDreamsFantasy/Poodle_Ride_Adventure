import React, { useState } from 'react';
import { 
  LandingPageNavigation, 
  GraphicsDisplay, 
  LandingPageContent, 
  LandingPageVersion, 
  BlackOwnedStatement,
  StartGameTrigger,
  InsertAITrigger,
  KeyboardCommandsTrigger,
  OfflineDownloadsTrigger,
  LandingPageFooter
} from './index';
import { CreditsModal, InsertAIModal } from '../../Modal';

interface PoodleLandingPageProps {
  onStart: (viewMode: 'Rider' | 'POV') => void;
  onBack?: () => void;
  onOpenKeyboardModal: () => void;
  onOpenDownloads?: () => void;
  isExternalModalOpen?: boolean;
}

export const LandingPageContainer: React.FC<PoodleLandingPageProps> = ({
  onStart,
  onBack,
  onOpenKeyboardModal,
  onOpenDownloads,
  isExternalModalOpen
}) => {
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'Rider' | 'POV'>('Rider');

  const testSpeakerSettings = async () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const convolver = audioCtx.createConvolver();
    
    const sampleRate = audioCtx.sampleRate;
    const length = sampleRate * 1.5;
    const impulse = audioCtx.createBuffer(2, length, sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }
    convolver.buffer = impulse;
    convolver.connect(audioCtx.destination);

    const channels = ["Front Left", "Front Center", "Front Right", "Back Left", "Back Right", "Back Center"];
    
    for (const channel of channels) {
      const utterance = new SpeechSynthesisUtterance(channel);
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices.find(v => v.name.includes('Female')) || voices[0];
      utterance.rate = 0.8;
      
      window.speechSynthesis.speak(utterance);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    audioCtx.close();
  };

  return (
    <div 
      className="min-h-screen bg-black text-white flex flex-col items-center p-6 font-sans overflow-y-auto w-full"
      aria-hidden={isCreditsOpen || isExternalModalOpen}
    >
      <header id="Header" className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-black text-pink-500 uppercase italic leading-none tracking-tighter">
          Poodle Ride<br/>Adventure
        </h1>
      </header>

      <LandingPageNavigation />
      
      <main className="max-w-4xl w-full space-y-12">
        <GraphicsDisplay viewMode={viewMode} onViewModeChange={setViewMode} />
        
        <LandingPageContent />
        
        <LandingPageVersion />
        
        <BlackOwnedStatement />
        
        <div className="flex flex-wrap gap-4 justify-center py-8">
          <div className="flex flex-col gap-4 items-center">
            <StartGameTrigger onClick={() => onStart(viewMode)} />
            <InsertAITrigger onClick={() => setIsAIModalOpen(true)} />
          </div>
          <div className="flex flex-col gap-4">
            <button 
              onClick={testSpeakerSettings}
              className="px-10 py-4 bg-stone-700 hover:bg-stone-600 text-white rounded-full font-bold text-xl transition-all shadow-lg shadow-stone-600/20 active:scale-95"
            >
              Test Speaker Settings
            </button>
            <KeyboardCommandsTrigger onClick={onOpenKeyboardModal} />
            <button 
              onClick={() => setIsCreditsOpen(true)}
              className="px-10 py-4 bg-stone-800 hover:bg-stone-700 text-white rounded-full font-bold text-xl transition-all shadow-lg shadow-stone-800/20 active:scale-95 text-center border border-pink-500/20"
            >
              Credits
            </button>
            {onOpenDownloads && <OfflineDownloadsTrigger onClick={onOpenDownloads} />}
          </div>
        </div>
        
        <CreditsModal isOpen={isCreditsOpen} onClose={() => setIsCreditsOpen(false)} />
        <InsertAIModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
      </main>

      <LandingPageFooter />
    </div>
  );
};
