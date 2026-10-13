const fs = require('fs');
let content = fs.readFileSync('src/System/Engine/Core/C/Collision.ts', 'utf8');
content = content.replace(
  "const porchResult = handlePorchCollision(area as any, nextX, nextY);",
  "const porchResult = handlePorchCollision(area as any, nextX, nextY, currentDims);"
);
fs.writeFileSync('src/System/Engine/Core/C/Collision.ts', content);

let physics = fs.readFileSync('src/System/Engine/Science/Physics/General/index.tsx', 'utf8');
physics = physics.replace(
  "export function handlePorchCollision(area: string, nextX: number, nextY: number): any {",
  "export function handlePorchCollision(area: string, nextX: number, nextY: number, currentDims?: {width: number, height: number}): any {"
).replace(
  "if (nextX <= 1) {",
  "if (nextX <= 1) {"
).replace(
  "} else if (nextX >= 999) {",
  "} else if (nextX >= (currentDims ? currentDims.width - 1 : 999)) {"
).replace(
  "} else if (nextY >= 149) {",
  "} else if (nextY >= (currentDims ? currentDims.height - 1 : 149)) {"
);
fs.writeFileSync('src/System/Engine/Science/Physics/General/index.tsx', physics);
