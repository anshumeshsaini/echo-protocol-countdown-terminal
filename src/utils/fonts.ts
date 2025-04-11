import { loadLocalFonts } from './fontLoader';

/**
 * Font configuration and utilities for the application
 */

// Define the font option type
export interface FontOption {
  name: string;
  displayName: string;
  className: string;
}

// Available heading fonts
export const headingFonts: FontOption[] = [
  { name: 'steeler', displayName: 'Steeler', className: 'font-steeler' },
  { name: 'orbitron', displayName: 'Orbitron', className: 'font-orbitron' },
  { name: 'knight-warrior', displayName: 'Knight Warrior', className: 'font-knight-warrior' },
  { name: 'metal-mania', displayName: 'Metal Mania', className: 'font-metal-mania' },
  { name: 'street-cruiser', displayName: 'Street Cruiser', className: 'font-street-cruiser' },
];

// Preload fonts for better performance
export const preloadFonts = async () => {
  try {
    // Try to load local custom fonts
    await loadLocalFonts();
    
    // Also preload web fonts if needed
    document.documentElement.classList.add('fonts-loaded');
    return true;
  } catch (error) {
    console.error('Failed to preload fonts:', error);
    return false;
  }
};
