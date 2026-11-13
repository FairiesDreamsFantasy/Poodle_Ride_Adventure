import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Clock } from 'lucide-react';
import { speak } from '@/src/System/Sound/ttsService';
import { InterstitialAdThemeDecoration } from '@/src/System/Theme/Interstitial_Ad_Specific';
import { AdBlockerDetected } from '@/src/System/AI/In-Game/Category/UI/Ads/Interstitial/Ad_Blocker_Detected';

/**
 * System/AI/In-Game/Category/UI/Ads/Interstitial/index.tsx
 * Modular Interstitial Ad component with auto-timers, theme decorations, and ad-blocker detection.
 */

export interface InterstitialAdProps {
  onClose: () => void;
  adContent?: React.ReactNode;
  levelTheme?: 'Level0' | 'Level1' | 'Default';
}

export const InterstitialAd: React.FC<InterstitialAdProps> = ({ onClose, levelTheme = 'Default' }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [canSkip, setCanSkip] = useState(false);
  const [skipTimer, setSkipTimer] = useState(30);

  const [isAdBlocked, setIsAdBlocked] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//ads.fairiesdreamsfantasy.com/adserver/www/delivery/asyncjs.php";
    script.async = true;
    
    script.onerror = () => {
      setIsAdBlocked(true);
      speak("Ad blocker detected. Please consider whitelisting our site or making a donation to support independent development.");
    };
    
    document.body.appendChild(script);

    const checkBlocked = setTimeout(() => {
      // @ts-ignore
      if (!window.hasOwnProperty('reviveAsync')) {
        const ins = document.querySelector('ins[data-revive-zoneid="13"]');
        if (ins && (ins.clientHeight === 0 || ins.innerHTML === "")) {
          setIsAdBlocked(true);
        }
      }
    }, 2000);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const skipInterval = setInterval(() => {
      setSkipTimer((prev) => {
        if (prev <= 1) {
          clearInterval(skipInterval);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(skipInterval);
      clearTimeout(checkBlocked);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onClose]);

  useEffect(() => {
    if (timeLeft === 0) {
      onClose();
    }
  }, [timeLeft, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-6 text-white overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Advertisement"
    >
      <InterstitialAdThemeDecoration theme={levelTheme} />

      <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest">
          <Clock className="w-4 h-4 text-emerald-500" />
          <span>Auto-continue in {formatTime(timeLeft)}</span>
        </div>
        
        {canSkip ? (
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-emerald-900/20"
          >
            <X className="w-4 h-4" />
            Skip Ad
          </button>
        ) : (
          <div className="bg-white/5 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-500 border border-white/5">
            Skip in {skipTimer}s
          </div>
        )}
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center space-y-12 z-10">
        <div className="text-center space-y-4 w-full">
          <h2 className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.4em]">Sponsor Message</h2>
          <div className="w-full max-w-4xl bg-stone-900/50 rounded-3xl border border-white/10 flex flex-col items-center justify-center overflow-hidden relative group p-8">
            <div 
              style={{ textAlign: 'center', verticalAlign: 'middle', display: 'block', padding: '0px', marginTop: '5%', marginBottom: '5%', borderWidth: '0px' }} 
              title="Advertisement"
            >
              <ins data-revive-zoneid="13" data-revive-id="fe1f19a638c05881542e31deb5ef01ad"></ins>
            </div>

            {isAdBlocked && <AdBlockerDetected />}
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-stone-600 uppercase tracking-[0.2em] font-bold">
            Babylon-Free Production | No Paid AI Features Used
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InterstitialAd;
