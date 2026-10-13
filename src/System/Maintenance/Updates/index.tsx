export * from './Validator';
export * from './Ping';
export * from './Version_Check';

import validateGameBuild from './Validator';
import pingProductionServer from './Ping';
import checkForGameUpdates from './Version_Check';

export { default as validateGameBuild } from './Validator';
export { default as pingProductionServer } from './Ping';
export { default as checkForGameUpdates } from './Version_Check';

export const MaintenanceUpdates = {
  validateGameBuild,
  pingProductionServer,
  checkForGameUpdates,
};

export default MaintenanceUpdates;
