const fs = require('fs');

let playAreaHeader = fs.readFileSync('src/System/UI/Play_Area/Header/index.tsx', 'utf8');
playAreaHeader = playAreaHeader.replace(
  `      {onGoToLanding && (
        <button
          id="header-home-button"
          onClick={onGoToLanding}
          className="flex items-center gap-2 px-3 py-1.5 bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 hover:text-white border border-pink-500/30 rounded-lg text-sm font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
          title="Return to Landing Page"
          aria-label="Return to Landing Page"
        >
          <Home className="w-4 h-4" />
          <span>Landing Page</span>
        </button>
      )}`,
  ""
);
fs.writeFileSync('src/System/UI/Play_Area/Header/index.tsx', playAreaHeader);

let generalHeader = fs.readFileSync('src/System/UI/Play_Area/Header/General/index.tsx', 'utf8');
generalHeader = generalHeader.replace(
  `      <button
        id="header-avatar-button"
        onClick={handleClick}
        className="w-12 h-12 bg-pink-600 hover:bg-pink-500 rounded-full flex items-center justify-center border-2 border-white transition-transform active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
        title="Return to Landing Page"
        aria-label="Return to Landing Page"
      >
        <DogIcon id="header-dog-icon" className="text-white w-8 h-8" />
      </button>`,
  ""
);
generalHeader = generalHeader.replace("import { Rabbit as DogIcon } from 'lucide-react';", "");
fs.writeFileSync('src/System/UI/Play_Area/Header/General/index.tsx', generalHeader);

