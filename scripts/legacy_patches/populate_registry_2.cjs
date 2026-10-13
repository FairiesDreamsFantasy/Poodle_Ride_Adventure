const fs = require('fs');

// Abigay
fs.writeFileSync('src/System/Registry/Characters/Poodles/Abigay_Rose_Kone/General/index.tsx', `
import { POODLE_CORE, ABIGAY_DESCRIPTION, GAME_CORE_FEATURES } from '../../../../../../Characters/Poodles/Abigay_Rose_Kone/General';

export const AbigayGeneralRegistry = {
  POODLE_CORE,
  ABIGAY_DESCRIPTION,
  GAME_CORE_FEATURES
};
export { POODLE_CORE, ABIGAY_DESCRIPTION, GAME_CORE_FEATURES };
`);

fs.writeFileSync('src/System/Registry/Characters/Poodles/Abigay_Rose_Kone/Description/index.tsx', `
export * from './Dimensions';
import { ABIGAY_DESCRIPTION } from '../../../../../../../Characters/Poodles/Abigay_Rose_Kone/General';

export const AbigayDescriptionRegistry = {
  description: ABIGAY_DESCRIPTION
};
`);

fs.writeFileSync('src/System/Registry/Characters/Poodles/Abigay_Rose_Kone/Description/Dimensions/index.tsx', `
import { POODLE_CORE } from '../../../../../../../../Characters/Poodles/Abigay_Rose_Kone/General';

export const AbigayDimensionsRegistry = {
  dimensions: POODLE_CORE.design.dimensions
};
`);

// Anninne-Amelia
fs.writeFileSync('src/System/Registry/Characters/Poodles/Anninne-Amelia_Rose_Julisus/General/index.tsx', `
import { POODLE_CORE, ANNINNE_AMELIA_DESCRIPTION } from '../../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/General';

export const AnninneAmeliaGeneralRegistry = {
  POODLE_CORE,
  ANNINNE_AMELIA_DESCRIPTION
};
export { POODLE_CORE, ANNINNE_AMELIA_DESCRIPTION };
`);

fs.writeFileSync('src/System/Registry/Characters/Poodles/Anninne-Amelia_Rose_Julisus/Description/index.tsx', `
export * from './Dimensions';
import { ANNINNE_AMELIA_DESCRIPTION } from '../../../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/General';

export const AnninneAmeliaDescriptionRegistry = {
  description: ANNINNE_AMELIA_DESCRIPTION
};
`);

fs.writeFileSync('src/System/Registry/Characters/Poodles/Anninne-Amelia_Rose_Julisus/Description/Dimensions/index.tsx', `
import { POODLE_CORE } from '../../../../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/General';

export const AnninneAmeliaDimensionsRegistry = {
  dimensions: POODLE_CORE.design.dimensions
};
`);

// Abigail
fs.writeFileSync('src/System/Registry/Characters/Poodles/Abigail_Marigold_Kenyatta/General/index.tsx', `
import { POODLE_CORE, ABIGAIL_DESCRIPTION } from '../../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/General';

export const AbigailGeneralRegistry = {
  POODLE_CORE,
  ABIGAIL_DESCRIPTION
};
export { POODLE_CORE, ABIGAIL_DESCRIPTION };
`);

fs.writeFileSync('src/System/Registry/Characters/Poodles/Abigail_Marigold_Kenyatta/Description/index.tsx', `
export * from './Dimensions';
import { ABIGAIL_DESCRIPTION } from '../../../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/General';

export const AbigailDescriptionRegistry = {
  description: ABIGAIL_DESCRIPTION
};
`);

fs.writeFileSync('src/System/Registry/Characters/Poodles/Abigail_Marigold_Kenyatta/Description/Dimensions/index.tsx', `
import { POODLE_CORE } from '../../../../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/General';

export const AbigailDimensionsRegistry = {
  dimensions: POODLE_CORE.design.dimensions
};
`);

// Dymond
fs.writeFileSync('src/System/Registry/Characters/Poodles/Dymond_Daisy_Qin_Reynolds/General/index.tsx', `
import { POODLE_CORE, DYMOND_DESCRIPTION } from '../../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/General';

export const DymondGeneralRegistry = {
  POODLE_CORE,
  DYMOND_DESCRIPTION
};
export { POODLE_CORE, DYMOND_DESCRIPTION };
`);

fs.writeFileSync('src/System/Registry/Characters/Poodles/Dymond_Daisy_Qin_Reynolds/Description/index.tsx', `
export * from './Dimensions';
import { DYMOND_DESCRIPTION } from '../../../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/General';

export const DymondDescriptionRegistry = {
  description: DYMOND_DESCRIPTION
};
`);

fs.writeFileSync('src/System/Registry/Characters/Poodles/Dymond_Daisy_Qin_Reynolds/Description/Dimensions/index.tsx', `
import { POODLE_CORE } from '../../../../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/General';

export const DymondDimensionsRegistry = {
  dimensions: POODLE_CORE.design.dimensions
};
`);

// Classic White Poodle
fs.writeFileSync('src/System/Registry/Characters/Poodles/Classic/White_Poodle/General/index.tsx', `
import { CLASSIC_WHITE_POODLE_NAME, CLASSIC_WHITE_POODLE_FUR_COLOR } from '../../../../../../../Characters/Poodles/Classic/White_Poodle/General';

export const ClassicWhitePoodleGeneralRegistry = {
  CLASSIC_WHITE_POODLE_NAME,
  CLASSIC_WHITE_POODLE_FUR_COLOR
};
export { CLASSIC_WHITE_POODLE_NAME, CLASSIC_WHITE_POODLE_FUR_COLOR };
`);
