import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from '../src';
import { ThemeProviderProps } from '../src/libraries/types';

export const ThemeWrapper: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: ThemeWrapper, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
