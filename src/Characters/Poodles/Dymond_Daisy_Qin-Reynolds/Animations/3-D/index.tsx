/**
 * POODLE 3-D RENDERER
 * Advanced 3-D spherical projection rendering for Dymond Daisy Qin-Reynolds.
 */

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Sphere3D {
  center: Point3D;
  radius: number;
  color: string;
}

const rotateY = (p: Point3D, angle: number): Point3D => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x * cos - p.z * sin,
    y: p.y,
    z: p.x * sin + p.z * cos
  };
};

const renderSphere3D = (
  ctx: CanvasRenderingContext2D,
  sphere: Sphere3D,
  rotation: number,
  viewWidth: number,
  viewHeight: number,
  fov: number = 800
) => {
  const rotatedCenter = rotateY(sphere.center, rotation);
  const scale = fov / (fov + rotatedCenter.z);
  const projX = viewWidth / 2 + rotatedCenter.x * scale;
  const projY = viewHeight / 2 + rotatedCenter.y * scale;
  const projRadius = sphere.radius * scale;

  if (projRadius <= 0) return;

  ctx.save();
  const grad = ctx.createRadialGradient(
    projX - projRadius * 0.3,
    projY - projRadius * 0.3,
    projRadius * 0.1,
    projX,
    projY,
    projRadius
  );
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(1, sphere.color);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(projX, projY, projRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

export function drawDymond3D(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  angleY: number = 0
) {
  const breathing = Math.sin(time * 2.5) * 3;
  const gallopBounce = Math.sin(time * 15.7) * 4; 
  
  const components: Sphere3D[] = [
    {
      center: { x: 0, y: 100 + gallopBounce, z: 80 },
      radius: 110 + breathing,
      color: "#fffff0"
    },
    {
      center: { x: 0, y: 80 + gallopBounce, z: -80 },
      radius: 120 + breathing * 1.2,
      color: "#fffff0"
    },
    {
      center: { x: 0, y: -120 + gallopBounce, z: -150 },
      radius: 95,
      color: "#fffff0"
    },
    {
      center: { x: -100, y: -100 + gallopBounce, z: -140 },
      radius: 50,
      color: "#fffff0"
    },
    {
      center: { x: 100, y: -100 + gallopBounce, z: -140 },
      radius: 50,
      color: "#fffff0"
    }
  ];

  const sortedComponents = components
    .map(c => ({ ...c, rotatedZ: rotateY(c.center, angleY).z }))
    .sort((a, b) => b.rotatedZ - a.rotatedZ);

  sortedComponents.forEach(sphere => {
    renderSphere3D(ctx, sphere, angleY, width, height);
  });
}
