import React from 'react';
import { MasterSystemDefaults } from '../../../../Registry/AI/In-Game/Category/System_Defaults';

export function GeneralFooter() {
  const currentYear = new Date().getFullYear();
  const { copyright, license } = MasterSystemDefaults.ui;

  return (
    <div id="general-footer-content" className="w-full text-center py-4 border-t border-white/10 text-xs text-white/50 font-mono">
      <p id="copyright-text">
        &copy; {currentYear} {copyright}. {license}.
      </p>
    </div>
  );
}

