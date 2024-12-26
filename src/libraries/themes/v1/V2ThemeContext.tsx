import _ from 'lodash';
import React, { useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { createContext, useContext } from 'use-context-selector';
import { initialDarkTheme, initialLightTheme } from './colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './sizes';
import {
  ColorShades,
  CreateColorShadesInterface,
  CreateThemeDimensions,
  CreateThemeDimensionsReturnValues,
  CreateThemeType,
  ThemeDimensions,
  ThemeInterface,
  ThemeKeys,
  ThemeProviderProps,
  ThemeType,
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
 */
export const createColorShades = <T extends string>({
  shades,
  themePropertyName,
}: CreateColorShadesInterface<T>): ColorShades => ({
  ...defaultLightTheme.colors[themePropertyName as ThemeKeys],
  ...shades,
});

/**
 * Function to create them dimensions by merging default dimensions with custom dimensions.
 * @returns CreateThemeDimensionsReturnValues
 */
export const createThemeDimensions = (dimensions: CreateThemeDimensions): CreateThemeDimensionsReturnValues =>
  _.merge({}, themeDimensions, dimensions);

/**
 * Function to create a theme based on the specified mode (light or dark) and additional theme configurations.
 * Merges the base theme (either light or dark) with the custom theme configurations
 * @param mode ColorSchemeName
 * @param theme CreateThemeType
 * @returns CreateThemeReturnValues
 */
export const createTheme = function <T>(mode: ColorSchemeName, theme: CreateThemeType & T) {
  const isLightTheme = mode === 'light';
  return _.merge({}, isLightTheme ? defaultLightTheme : defaultDarkTheme, theme);
};

export const ThemeProvider = ({ children, lightTheme, darkTheme, dimensions, components = {} }: ThemeProviderProps) => {
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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Theme context must be used within a ThemeProvider');
  }
  return context;
};
