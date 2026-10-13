import React from 'react';
import { LandingPageContainer } from '../../Registry/Landing_Page';

/**
 * PoodleLandingPage - Modular entry point for the landing page.
 * Safely extracted and modularized into System/Registry/Landing_Page.
 */
export const PoodleLandingPage: React.FC<any> = (props) => {
  return <LandingPageContainer {...props} />;
};
