import React from 'react';

export interface ToolboxOption {
  id: string;
  label: string;
  description: string;
}

export const TOOLBOX_OPTIONS: ToolboxOption[] = [
  { id: 'diagnostics', label: 'Diagnostics Hide/Show', description: 'Toggle performance telemetry overlays' },
  { id: 'screenshot', label: 'Capture Screenshot', description: 'Open image exporting utility' }
];
