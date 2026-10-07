import fs from 'fs';
import path from 'path';

const missingDirs = [
  { name: 'Components', title: 'Components Module', desc: 'Reusable structural UI elements, forms, and interaction states.' },
  { name: 'components', title: 'Base UI components', desc: 'Core styled display widgets and shadcn-driven modules.' },
  { name: 'Credits', title: 'Credits Module', desc: 'Game credit listings, honors, and artistic contributions.' },
  { name: 'Hooks', title: 'Custom React Hooks', desc: 'Active keyboard handlers, viewport observers, and sound hooks.' },
  { name: 'Imports', title: 'Strategic Imports Handler', desc: 'Consolidated file imports, static resource pathways, and index mappings.' },
  { name: 'lib', title: 'System Libraries', desc: 'Tailwind merge utilities and base logic systems.' },
  { name: 'Logic', title: 'Operational Logic Set', desc: 'CPU virtualization, RAM managers, and emulated joystick mappings.' },
  { name: 'Play_Area', title: 'Play Area Core rendering', desc: 'Main game loops, particle renderers, and canvas draw handlers.' },
  { name: 'Services', title: 'Services Layer', desc: 'Persistence layers, TTS setups, and speech synthesized text processing.' },
  { name: 'services', title: 'Local Storage Controllers', desc: 'IndexedDB hooks, session log cache managers, and hardware controllers.' },
  { name: 'Supported_Browsers', title: 'Web Interface Support Matrix', desc: 'List of tested browsers with optimal support for advanced 3D sphere-mapped canvasses.' },
  { name: 'Supported_OSs', title: 'Operating Systems Support Matrix', desc: 'List of tested operating systems with native numeric keypad support.' },
  { name: 'tts', title: 'Text-To-Speech Interface', desc: 'Local and cloud speech synthesizers.' },
  { name: 'UI', title: 'User Interfaces Screen Pack', desc: 'Dashboards, Level Selectors, Paused Screens, and Download portals.' }
];

const workingsDir = path.join(process.cwd(), 'public', 'Assets', 'Game_Workings');

missingDirs.forEach(dir => {
  const fullPath = path.join(workingsDir, dir.name);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  
  const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Poodle Ride Adventure - ${dir.title}</title>
    <style>
      body {
        background-color: #0a0a0a;
        color: #ffc0cb;
        font-family: system-ui, sans-serif;
        text-align: center;
        padding-top: 100px;
      }
      h1 {
        font-size: 2.2rem;
        margin-bottom: 20px;
        color: #ffa500;
        letter-spacing: -0.025em;
      }
      p {
        color: #a1a1aa;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <h1>${dir.title}</h1>
    <p>${dir.desc}</p>
  </body>
</html>
`;

  fs.writeFileSync(path.join(fullPath, 'index.html'), htmlContent, 'utf-8');
  console.log(`Created mirrored directory: ${dir.name}`);
});
