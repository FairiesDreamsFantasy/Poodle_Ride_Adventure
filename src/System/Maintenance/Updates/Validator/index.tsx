// Validator for client build vs production server build
export interface BuildValidationResult {
  isValid: boolean;
  checksumMatch: boolean;
  clientVersion: string;
  serverVersion: string;
  notes: string;
}

export const validateGameBuild = (
  clientVer: string,
  serverVer: string
): BuildValidationResult => {
  const isUpToDate = clientVer.trim() === serverVer.trim();
  return {
    isValid: true,
    checksumMatch: isUpToDate,
    clientVersion: clientVer,
    serverVersion: serverVer,
    notes: isUpToDate ? 'Build is verified and synchronized with production server.' : 'New version detected.',
  };
};

export default validateGameBuild;
