export interface KeyboardsAndControllersMasterIndex {
  engineModules: string[];
  keyboardLayouts: string[];
  initialized: boolean;
}

export const KEYBOARDS_AND_CONTROLLERS_INDEX_GENERAL: KeyboardsAndControllersMasterIndex = {
  engineModules: ['Assembly', 'C', 'CPP', 'CSharp', 'CSV', 'Cotlin', 'Java', 'PHP', 'Python', 'R', 'Rust', 'SQL', 'Swift', 'XML'],
  keyboardLayouts: ['Cedella', 'Arden Denis', 'Standard', 'Multitap', 'Common', 'Global'],
  initialized: true
};
