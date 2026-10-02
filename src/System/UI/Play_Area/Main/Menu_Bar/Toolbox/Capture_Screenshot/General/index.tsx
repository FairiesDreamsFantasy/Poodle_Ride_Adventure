import React from 'react';

export interface ScreenshotFormat {
  id: 'save-as' | 'png' | 'jpg';
  label: string;
  mimeType?: string;
}

export const SCREENSHOT_FORMATS: ScreenshotFormat[] = [
  { id: 'save-as', label: 'Save Image As...' },
  { id: 'png', label: 'Save as PNG', mimeType: 'image/png' },
  { id: 'jpg', label: 'Save as JPG', mimeType: 'image/jpeg' }
];
