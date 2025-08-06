'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

// Updated ThemeProviderProps to include the missing properties
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  // These props are now recognized by your ThemeProvider
  attribute?: string; // e.g., "class" or "data-theme"
  enableSystem?: boolean; // Whether to enable system theme detection
  disableTransitionOnChange?: boolean; // Whether to disable transitions when theme changes
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  attribute = 'class', // Default to 'class' if not provided
  enableSystem = true, // Default to true if not provided
  disableTransitionOnChange = false, // Default to false if not provided
  ...props // This collects any other props not explicitly destructured
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (typeof window !== 'undefined' && localStorage.getItem(storageKey)) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Apply disableTransitionOnChange logic if needed (e.g., adding/removing a class)
    if (disableTransitionOnChange) {
      root.classList.add('no-transition'); // You'd need to define this CSS class
    }

    // Remove existing theme classes based on the 'attribute' prop
    // This assumes 'attribute' is 'class' and themes are applied as classes
    root.classList.remove('light', 'dark'); // Assuming these are your theme classes

    let currentTheme = theme;
    if (enableSystem && theme === 'system') {
      currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    // Apply the theme using the specified attribute
    // If attribute is 'class', it adds a class. If 'data-theme', it sets a data attribute.
    if (attribute === 'class') {
      root.classList.add(currentTheme);
    } else {
      root.setAttribute(attribute, currentTheme);
    }

    // Clean up no-transition class after theme change, if used
    if (disableTransitionOnChange) {
      // Use a timeout to allow the class to be applied before removing
      const timeoutId = setTimeout(() => {
        root.classList.remove('no-transition');
      }, 0); // Small delay to ensure class is applied and then removed
      return () => clearTimeout(timeoutId);
    }

  }, [theme, attribute, enableSystem, disableTransitionOnChange]); // Add new props to dependency array

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    // The `...props` here will pass any *remaining* props to the Context Provider,
    // though typically ThemeProviderContext.Provider only expects `value` and `children`.
    // The `attribute`, `enableSystem`, `disableTransitionOnChange` props are now handled
    // within the ThemeProvider component's logic.
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
