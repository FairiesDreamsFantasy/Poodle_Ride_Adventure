const fs = require('fs');
let content = fs.readFileSync('src/System/UI/Play_Area/Main/Menu_Bar/Accessibility/index.tsx', 'utf8');

content = content.replace("UniversalAccess", "Accessibility");
content = content.replace("<UniversalAccess", "<Accessibility");

fs.writeFileSync('src/System/UI/Play_Area/Main/Menu_Bar/Accessibility/index.tsx', content);
