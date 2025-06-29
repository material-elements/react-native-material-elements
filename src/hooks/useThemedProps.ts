import _ from 'lodash';
import React, { isValidElement, useMemo } from 'react';
import { useThemeColorsSelector } from '../libraries';
import { Theme } from '../libraries/themes/types';

export type ThemedIconProp = ((theme: Theme) => React.ReactNode) | React.ReactNode;
type ThemedProp<T = any> = T | ((themeColors: ReturnType<typeof useThemeColorsSelector>) => T);

export const useThemedProps = <T extends Record<string, ThemedProp>>(props: T) => {
  const themeColors = useThemeColorsSelector();

  return useMemo(() => {
    const resolvedProps = {} as {
      [K in keyof T]: React.ReactNode;
    };

    if (!_.isEmpty(props)) {
      for (const key in props) {
        const value = props[key];

        if (value === null || value === undefined) {
          continue;
        }

        if (value && typeof value === 'function') {
          resolvedProps[key] = value(themeColors);
        } else if (isValidElement(value)) {
          resolvedProps[key] = value;
        } else {
          console.warn('icon prop must be either <Icon /> or () => <Icon />. Other values are not valid.');
          continue;
        }
      }
    }

    return resolvedProps;
  }, [props, themeColors]);
};
