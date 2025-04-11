/**
 * Font loader utility to dynamically load local fonts
 */

export const loadLocalFonts = async () => {
  try {
    if (!('FontFace' in window)) {
      console.warn('FontFace API not supported in this browser');
      return false;
    }

    // Create and load the font objects
    const knightWarriorFont = new FontFace(
      'KnightWarrior',
      `url(/fonts/KnightWarrior.otf) format('opentype')`,
      { 
        display: 'swap',
        weight: '400 700',
        style: 'normal'
      }
    );
    
    const steelerFont = new FontFace(
      'Steeler',
      `url(/fonts/Steelar.otf) format('opentype')`,
      { 
        display: 'swap',
        weight: '400 700',
        style: 'normal'
      }
    );
    
    const streetCruiserFont = new FontFace(
      'StreetCruiser',
      `url(/fonts/StreetCruiserRegular.ttf) format('opentype')`,
      { 
        display: 'swap',
        weight: '400 700',
        style: 'normal'
      }
    );

    // Load all fonts in parallel
    const loadedFonts = await Promise.all([
      knightWarriorFont.load(),
      steelerFont.load(),
      streetCruiserFont.load()
    ]);
    
    // Add the loaded fonts to the document
    loadedFonts.forEach(font => {
      document.fonts.add(font);
    });
    
    console.log('Custom fonts loaded successfully!');
    return true;
  } catch (error) {
    console.error('Error loading custom fonts:', error);
    return false;
  }
};
