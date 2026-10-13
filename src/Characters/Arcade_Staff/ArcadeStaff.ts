import { metadata as m1, drawVariant1 } from './Variant_1/ArcadeStaff_1';
import { metadata as m2, drawVariant2 } from './Variant_2/ArcadeStaff_2';
import { metadata as m3, drawVariant3 } from './Variant_3/ArcadeStaff_3';
import { metadata as m4, drawVariant4 } from './Variant_4/ArcadeStaff_4';
import { metadata as m5, drawVariant5 } from './Variant_5/ArcadeStaff_5';
import { metadata as m6, drawVariant6 } from './Variant_6/ArcadeStaff_6';
import { metadata as m7, drawVariant7 } from './Variant_7/ArcadeStaff_7';
import { metadata as m8, drawVariant8 } from './Variant_8/ArcadeStaff_8';

export interface ArcadeStaffMember {
  id: number;
  name: string;
  gender: 'Female' | 'Male';
  heightFeet: number;
  religion: string;
  attire: string;
  draw: (ctx: CanvasRenderingContext2D, scale: number, time: number) => void;
}

export const ARCADE_STAFF_MEMBERS: ArcadeStaffMember[] = [
  { id: 1, ...m1, gender: m1.gender as any, draw: drawVariant1 },
  { id: 2, ...m2, gender: m2.gender as any, draw: drawVariant2 },
  { id: 3, ...m3, gender: m3.gender as any, draw: drawVariant3 },
  { id: 4, ...m4, gender: m4.gender as any, draw: drawVariant4 },
  { id: 5, ...m5, gender: m5.gender as any, draw: drawVariant5 },
  { id: 6, ...m6, gender: m6.gender as any, draw: drawVariant6 },
  { id: 7, ...m7, gender: m7.gender as any, draw: drawVariant7 },
  { id: 8, ...m8, gender: m8.gender as any, draw: drawVariant8 }
];

export function drawArcadeStaff(
  ctx: CanvasRenderingContext2D,
  id: number,
  x: number,
  y: number,
  scale: number,
  time: number
) {
  const member = ARCADE_STAFF_MEMBERS.find(m => m.id === id) || ARCADE_STAFF_MEMBERS[0];
  ctx.save();
  ctx.translate(x, y);
  member.draw(ctx, scale, time);
  ctx.restore();
}
