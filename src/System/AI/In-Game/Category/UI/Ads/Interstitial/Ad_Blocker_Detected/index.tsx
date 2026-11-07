import React from 'react';
import { Heart, DollarSign, Gift } from 'lucide-react';

/**
 * System/AI/In-Game/Category/UI/Ads/Interstitial/Ad_Blocker_Detected/index.tsx
 * Dedicated Ad Blocker Detection & Whitelist Notice Component.
 */

export const AdBlockerDetected: React.FC = () => {
  return (
    <div className="mt-8 text-left space-y-6 text-stone-300 text-sm max-w-2xl bg-red-900/20 p-8 rounded-2xl border border-red-500/30 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-500/20 rounded-lg">
          <Heart className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-red-400 font-bold uppercase tracking-widest text-xs">
          Ad Blocker Detected
        </p>
      </div>
      
      <div className="space-y-4 leading-relaxed">
        <p>
          We treat our game what we make as art, and heavily rely on craftsmanship. Hosting our game on our website is not free because, we heavily rely on our own servers as a way to ensure you have the best experience when playing our games with this collection.
        </p>
        <p>
          If you don't mind ads, you can whitelist our website by using these setting of your ad blocker extension by adding{' '}
          <code className="bg-red-500/20 px-2 py-0.5 rounded text-red-300 font-mono">
            arcade.fairiesdreamsfantasy.com
          </code>{' '}
          to your list! And refreshing your browser!! Once you confirm these ads appear, we can get support from these ad networks what we use as a tool for monetization. If you still have privacy concerns, find a mechanism to opt out of personal ads from your browser. Alternatively, you can use a private browser,--if you prefer to block ads on a normal browser.
        </p>
        <p>
          Thanks for whitelisting our website, and fulljoy your experience.
        </p>
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
  );
};

export default AdBlockerDetected;
