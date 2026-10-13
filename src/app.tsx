import React, { useState } from 'react';
import PoodleRideAdventure from './System/UI/Play_Area';

import { OfflineDownloadsModal as DownloadsView } from './System/Modal';

export default function App() {
  const [view, setView] = useState<'main' | 'downloads'>('main');

  return (
    <div className="relative min-h-screen bg-black">
      {view === 'main' ? (
        <div className="relative">
          <PoodleRideAdventure onOpenDownloads={() => setView('downloads')} />
        </div>
      ) : (
        <DownloadsView isOpen={true} onClose={() => setView('main')} />
      )}
    </div>
  );
}
