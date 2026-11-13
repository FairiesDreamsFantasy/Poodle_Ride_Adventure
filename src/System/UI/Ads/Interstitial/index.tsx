import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Clock, Heart, DollarSign, Gift } from 'lucide-react';
import { speak } from '../../../Sound/ttsService';
import { InterstitialAdThemeDecoration } from '../../../Theme/Interstitial_Ad_Specific';

/**
 * System/UI/Ads/Interstitial/index.tsx
 * Centralized interstitial ad component using modular themes.
 */

interface InterstitialAdProps {
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

            {isAdBlocked && (
              <div className="mt-8 text-left space-y-6 text-stone-300 text-sm max-w-2xl bg-red-900/20 p-8 rounded-2xl border border-red-500/30 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-red-400 font-bold uppercase tracking-widest text-xs">Ad Blocker Detected</p>
                </div>
                
                <div className="space-y-4 leading-relaxed">
                  <p>We treat our game what we make as art, and heavily rely on craftsmanship. Hosting our game on our website is not free because, we heavily rely on our own servers as a way to ensure you have the best experience when playing our games with this collection.</p>
                  <p>If you don't mind ads, you can whitelist our website by using these setting of your ad blocker extension by adding <code className="bg-red-500/20 px-2 py-0.5 rounded text-red-300 font-mono">arcade.fairiesdreamsfantasy.com</code> to your list! And refreshing your browser!! Once you confirm these ads appear, we can get support from these ad networks what we use as a tool for monetization. If you still have privacy concerns, find a mechanism to opt out of personal ads from your browser. Alternatively, you can use a private browser,--if you prefer to block ads on a normal browser.</p>
                  <p>Thanks for whitelisting our website, and fulljoy your experience.</p>
                </div>

                <div className="pt-6 border-t border-red-500/20 flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://paypal.me" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-stone-200 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    <DollarSign className="w-4 h-4" />
                    Support via PayPal
                  </a>
                  <a 
                    href="https://liberapay.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border border-white/10 transition-all"
                  >
                    <Gift className="w-4 h-4" />
                    Support via LiberaPay
                  </a>
                </div>
              </div>
            )}
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
