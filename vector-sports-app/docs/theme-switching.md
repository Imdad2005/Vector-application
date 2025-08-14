# Theme Switching Feature Documentation

## Overview

The Vector Sports App now includes a theme switching feature that allows users to toggle between light and dark themes, as well as select system preference. This document explains how the feature was implemented and how to use it.

## Implementation Details

The theme switching functionality is powered by the `next-themes` library, which provides a simple way to add theme support to Next.js applications. The implementation consists of:

1. A `ThemeProvider` wrapping the application (already present in the app)
2. A custom `ThemeToggle` component for switching themes
3. Integration across all major app pages

## Key Components

### ThemeProvider

Located in `components/theme-provider.tsx`, this component wraps the entire application in `app/layout.tsx` and provides theming context.

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
  {children}
</ThemeProvider>
```

### ThemeToggle

Located in `components/theme-toggle.tsx`, this component provides a dropdown menu with theme options:
- Light mode
- Dark mode
- System preference

## Usage

The theme toggle appears as a sun/moon icon button in the following locations:

1. **Dashboard** - In the top navigation bar
2. **Devices** - In the top navigation area
3. **Calendar** - Next to the exit button
4. **Wellness** - In the top navigation bar
5. **Messages** - In the top navigation bar
6. **Login** - Next to the logo
7. **Signup** - Next to the logo
8. **Forgot Password** - Next to the logo

## Theme Options

- **Light Theme**: Default theme with light backgrounds and dark text
- **Dark Theme**: Inverse of light theme with dark backgrounds and light text
- **System**: Automatically matches the user's system preferences

## Technical Notes

- Theme preferences are stored in localStorage for persistence
- The toggle button shows a sun icon in light mode and a moon icon in dark mode
- CSS variables and Tailwind's dark mode are used for styling

## Future Enhancements

Potential improvements for the theme switching feature:

1. Add custom theme options (e.g., high contrast, colorblind-friendly)
2. Allow users to save theme preferences to their account
3. Add automatic theme switching based on time of day
