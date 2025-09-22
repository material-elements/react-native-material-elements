import React from 'react';
import { renderHook } from '@testing-library/react-native';
import {
  createColorShades,
  createTheme,
  createThemeDimensions,
  defaultLightTheme,
  themeDimensions,
  ThemeProvider,
  useTheme,
} from '../src';
import { render, ThemeWrapper } from './test-utils';
import { ThemeInterface, ThemeType } from '../src/libraries/types';

describe('V2ThemeContext', () => {
  const mockLightColors = { 400: '#000000', '100': '#be3434', '200': '#2f63be' };
  const mockDarkColors = { 400: '#a31a1a', '100': '#3464be', '200': '#76be2f' };

  describe('createColorShades', () => {
    it('should customized the theme color shades', () => {
      const colors = createColorShades({
        shades: mockLightColors,
        themePropertyName: 'green',
      });
      expect(colors).toEqual(expect.objectContaining(mockLightColors));
    });
  });

  describe('createTheme', () => {
    it('should return customized theme', () => {
      const lightTheme = createTheme('light', {
        colors: {
          green: createColorShades({
            shades: mockLightColors,
            themePropertyName: 'green',
          }),
        },
      });
      expect(lightTheme.colors.green).toEqual(expect.objectContaining(mockLightColors));
    });
  });

  describe('useTheme', () => {
    it('should return theme values', () => {
      const { result } = renderHook(useTheme, { wrapper: ThemeWrapper });
      expect(result.current.theme).toEqual({
        ...defaultLightTheme,
        ...themeDimensions,
      });
    });

    it('should return customized theme', () => {
      const lightTheme = createTheme('light', {
        colors: {
          green: createColorShades({
            shades: mockLightColors,
            themePropertyName: 'green',
          }),
        },
      });

      const darkTheme = createTheme('light', {
        colors: {
          green: createColorShades({
            shades: mockDarkColors,
            themePropertyName: 'green',
          }),
        },
      });

      const _themeDimensions = createThemeDimensions({
        spacing: {
          xs: 30,
          sm: 40,
          md: 10,
          lg: 20,
          xl: 40,
        },
      });

      let contextValues: ThemeInterface<ThemeType>;

      const TestComponent = () => {
        contextValues = useTheme();
        return null;
      };

      render(
        <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme} dimensions={_themeDimensions}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(contextValues!.theme.colors.green).toEqual(expect.objectContaining(mockLightColors));
      expect(contextValues!.theme.spacing).toEqual(expect.objectContaining({ xs: 30, sm: 40, md: 10, lg: 20, xl: 40 }));
    });

    it('should throw error when used outside ThemeProvider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      try {
        renderHook(useTheme);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error?.message).toBe('Theme context must be used within a ThemeProvider');
        }
      }
      consoleSpy.mockRestore();
    });
  });
});
