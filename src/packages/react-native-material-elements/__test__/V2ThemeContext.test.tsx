import { renderHook, render as themeRender } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import {
  createColorShades,
  createTheme,
  createThemeDimensions,
  defaultLightTheme,
  Text,
  themeDimensions,
  ThemeProvider,
  useTheme,
} from '../src';
import { ThemeInterface, ThemeType } from '../src/libraries/types';
import { render, ThemeWrapper } from './test-utils';
import { TextVariationThemeConfig } from '../src/types';

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

  describe('ThemeProvider component config', () => {
    describe('textProps', () => {
      const mockTextThemeConfig: TextVariationThemeConfig = {
        body1: { fontSize: 10, fontWeight: '100' },
        body2: { fontSize: 15, fontWeight: '200' },
        h1: { fontSize: 20, fontWeight: '300' },
        h2: { fontSize: 30, fontWeight: '400' },
        h3: { fontSize: 40, fontWeight: '500' },
        h4: { fontSize: 50, fontWeight: '600' },
        h5: { fontSize: 60, fontWeight: '700' },
        h6: { fontSize: 70, fontWeight: '800' },
      };

      it('should adopted theme text (body1) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="body1">Hello</Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 10, fontWeight: '100' }));
      });

      it('should should override theme text (body1) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="body1" fontWeight={200} fontSize={30}>
              Hello
            </Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 30, fontWeight: 200 }));
      });

      it('should adopted theme text (body2) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="body2">Hello</Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 15, fontWeight: '200' }));
      });

      it('should override theme text (body2) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="body2" fontWeight={300} fontSize={29}>
              Hello
            </Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 29, fontWeight: 300 }));
      });

      it('should adopted theme text (h1) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h1">Hello</Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 20, fontWeight: '300' }));
      });

      it('should override theme text (h1) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h1" fontWeight={100} fontSize={10}>
              Hello
            </Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 10, fontWeight: 100 }));
      });

      it('should adopted theme text (h2) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h2">Hello</Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 30, fontWeight: '400' }));
      });

      it('should override theme text (h2) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h2" fontSize={10} fontWeight={200}>
              Hello
            </Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 10, fontWeight: 200 }));
      });

      it('should adopted theme text (h3) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h3">Hello</Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 40, fontWeight: '500' }));
      });

      it('should override theme text (h3) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h3" fontWeight={200} fontSize={10}>
              Hello
            </Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 10, fontWeight: 200 }));
      });

      it('should adopted theme text (h4) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h4">Hello</Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 50, fontWeight: '600' }));
      });

      it('should override theme text (h4) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h4" fontSize={20} fontWeight={900}>
              Hello
            </Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 20, fontWeight: 900 }));
      });

      it('should adopted theme text (h5) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h5">Hello</Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 60, fontWeight: '700' }));
      });

      it('should override theme text (h5) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h5" fontSize={10} fontWeight={300}>
              Hello
            </Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 10, fontWeight: 300 }));
      });

      it('should adopted theme text (h6) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h6">Hello</Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 70, fontWeight: '800' }));
      });

      it('should override theme text (h6) config', () => {
        const { getByText } = themeRender(
          <ThemeProvider
            components={{
              textProps: mockTextThemeConfig,
            }}>
            <Text variation="h6" fontSize={20} fontWeight={200}>
              Hello
            </Text>
          </ThemeProvider>,
        );

        const text = getByText('Hello');
        const fattenStyles = StyleSheet.flatten(text.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ fontSize: 20, fontWeight: 200 }));
      });
    });
  });
});
