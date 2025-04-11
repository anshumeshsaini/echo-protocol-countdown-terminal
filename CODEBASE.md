# IntrusionX Countdown Terminal - Code Overview

## Project Structure

- **src/**
  - **components/** - UI components
    - **Timeline.tsx** - The main timeline component 
    - **TimelineCard.tsx** - Individual event cards
    - **TestControls.tsx** - Time testing controls for development
    - **icons/** - SVG icon components
  - **App.tsx** - Main application component
  - **App.css** - Application styles (organized by section)
  - **index.css** - Global styles and Tailwind configuration
  - **index.tsx** - Application entry point

## Key Features

1. **Time Management**
   - Real-time clock with countdown
   - Test mode with adjustable time speed

2. **Timeline Display**
   - Interactive event timeline
   - Event cards with past/present/future states
   - Auto-scrolling to current event

3. **Visual Effects**
   - Glitch text effect for the header
   - Cyberpunk-inspired design with glow effects
   - Responsive layout for different screen sizes

## CSS Organization

The CSS is organized into logical sections:
- Global utility styles
- Animations
- Header glitch effect
- Timeline styles
- Test controls

## How to Extend

### Adding New Events

To add or modify events, edit the `createEvents` function in `Timeline.tsx`:

```tsx
const createEvents = () => {
  // Setup dates
  const startDate = new Date();
  startDate.setHours(12, 0, 0, 0);
  
  return [
    { time: new Date(startDate), title: 'Event Title', description: 'Description' },
    // Add more events...
  ];
};
```

### Styling Modifications

- **Colors**: The primary accent color is cyan (#22D3EE). To change it, search for this color code.
- **Fonts**: The application uses Orbitron for UI text and Metal Mania for the header.
- **Animations**: Most animations are defined in App.css with clear naming conventions.

### Test Mode

Press Shift+T to toggle the test controls. This allows you to:
- Adjust the current time
- Speed up or slow down time progression
- Test how the UI responds to different states
