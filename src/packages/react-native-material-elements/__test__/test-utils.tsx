import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from '../src';
import { ThemeProviderProps } from '../src/libraries/types';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  themeProps?: Partial<ThemeProviderProps>;
}

export const ThemeWrapper: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export const customRender = (ui: React.ReactElement, options?: CustomRenderOptions) => {
  const { themeProps, ...rest } = options || {};
  return render(ui, {
    wrapper: wrapperProps => <ThemeWrapper {...themeProps}>{wrapperProps.children}</ThemeWrapper>,
    ...rest,
  });
};

export * from '@testing-library/react-native';
export { customRender as render };
