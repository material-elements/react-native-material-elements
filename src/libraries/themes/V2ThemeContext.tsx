import _ from 'lodash';
import React, { useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { createContext, useContext } from 'use-context-selector';
import { initialDarkTheme, initialLightTheme } from './v1/colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './v1/sizes';
import {
  CreateColorShades,
  CreateColorShadesInterface,
  CreateThemeDimensions,
  CreateThemeDimensionsReturnValues,
  CreateThemeType,
  ThemeDimensions,
  ThemeInterface,
  ThemeKeys,
  ThemeProviderProps,
  ThemeType,
  UseTheme,
} from './theme';

export const themeDimensions: ThemeDimensions = {
  font: font,
  spacing: spacing,
  latterSpacing: latterSpacing,
  lineHeight: lineHeight,
  fontWeight: fontWeight,
};

export const defaultLightTheme = {
  colors: initialLightTheme,
};

export const defaultDarkTheme = {
  colors: initialDarkTheme,
};

export const ThemeContext = createContext<ThemeInterface<ThemeType> | undefined>(undefined);

/**
 * Function to create color shades by merging default theme colors with custom shades
 * @returns ColorShades
 *
 * @example
 * ```tsx
 * const colors = createColorShades({
 *    shades: { 400: '#000000' },
 *    themePropertyName: 'green'
 * })
 */
export const createColorShades = <T extends string>({
  shades,
  themePropertyName,
}: CreateColorShadesInterface<T>): CreateColorShades => ({
  ...defaultLightTheme.colors[themePropertyName as ThemeKeys],
  ...shades,
});

/**
 * Function to create them dimensions by merging default dimensions with custom dimensions.
 * @returns CreateThemeDimensionsReturnValues
 *
 * @example
 * ```tsx
 * const themeDimensions = createThemeDimensions({
 *    spacing: {
 *      xs: 10
 *  },
 * });
 */
export const createThemeDimensions = (dimensions: CreateThemeDimensions): CreateThemeDimensionsReturnValues =>
  _.merge({}, themeDimensions, dimensions);

/**
 * Function to create a theme based on the specified mode (light or dark) and additional theme configurations.
 * Merges the base theme (either light or dark) with the custom theme configurations
 * @param mode ColorSchemeName
 * @param theme CreateThemeType
 * @returns CreateThemeReturnValues
 *
 * @example
 * ```tsx
 * const lightTheme = createTheme('light', {
 * colors: {
 *    green: createColorShades({
 *      shades: { 400: '#000000' },
 *      themePropertyName: 'green'
 *    })
 *  }
 * });
 */
export const createTheme = function <T>(mode: ColorSchemeName, theme: CreateThemeType & T) {
  const isLightTheme = mode === 'light';
  return _.merge({}, isLightTheme ? defaultLightTheme : defaultDarkTheme, theme);
};

/**
 * The ThemeProvider is used to provide theming capabilities to your application, allowing you to switch between light and dark
 * themes and customize various style properties.
 *
 * @param {React.ReactNode} props.children - The child components that will receive theme context.
 * @param {Theme} props.lightTheme - The theme object used in light mode.
 * @param {Theme} props.darkTheme - The theme object used in dark mode.
 * @param {Dimensions} [props.dimensions] - Optional dimensions for theme calculations.
 * @param {Record<string, any>} [props.components={}] - Custom component styles merged with the theme.
 *
 * @returns {JSX.Element} A ThemeContext provider that wraps the application.
 *
 * @example
 * ```tsx
 * const lightTheme = createTheme('light', {
 * colors: {
 *    green: createColorShades({
 *      shades: { 400: '#000000' },
 *      themePropertyName: 'green'
 *    })
 *  }
 * });
 *
 * const darkTheme = createTheme('light', {
 * colors: {
 *    green: createColorShades({
 *      shades: { 400: '#d54d4d' },
 *      themePropertyName: 'green',
 *    }),
 *  }
 * });
 *
 * const themeDimensions = createThemeDimensions({
 *    spacing: {
 *      xs: 10
 *  },
 * });
 *
 * <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme} dimensions={themeDimensions}>{children}</ThemeProvider>
 */
export const ThemeProvider = ({
  children,
  lightTheme,
  darkTheme,
  dimensions,
  components = {},
}: ThemeProviderProps): JSX.Element => {
  const colorScheme = useColorScheme();

  const initialTheme = useMemo(() => {
    if (colorScheme === 'dark') {
      return darkTheme ?? defaultDarkTheme;
    }
    return lightTheme ?? defaultLightTheme;
  }, [lightTheme, darkTheme, colorScheme]);

  const mergedTheme = useMemo(() => ({ ...initialTheme, ...(dimensions || themeDimensions) }), [initialTheme, dimensions]);
  const themeValues = useMemo(() => ({ theme: mergedTheme, components }), [mergedTheme, components]);

  return <ThemeContext.Provider value={themeValues}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): UseTheme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Theme context must be used within a ThemeProvider');
  }
  return context;
};
