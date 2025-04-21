import React from 'react';
import { useThemeColorsSelector } from '../libraries';
import { Theme } from '../libraries/themes/types';

export type ThemedIconProp = ((theme: Theme) => React.ReactNode) | React.ReactNode;
type ThemedProp<T = any> = T | ((themeColors: ReturnType<typeof useThemeColorsSelector>) => T);

export const useThemedProps = <T extends Record<string, ThemedProp>>(props: T) => {
  const themeColors = useThemeColorsSelector();

  const resolvedProps = {} as {
    [K in keyof T]: React.ReactNode;
  };

  for (const key in props) {
    const value = props[key];
    if (value && typeof value === 'function') {
      resolvedProps[key] = value(themeColors);
    } else {
      resolvedProps[key] = value;
    }
  }

  return resolvedProps;
};
