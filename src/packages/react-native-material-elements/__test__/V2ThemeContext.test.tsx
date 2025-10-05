import { renderHook, render as themeRender } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import {
  Badge,
  createColorShades,
  createTheme,
  createThemeDimensions,
  defaultLightTheme,
  Divider,
  DividerColorThemeConfig,
  IconInput,
  Text,
  themeDimensions,
  ThemeProvider,
  useTheme,
} from '../src';
import { ThemeInterface, ThemeType } from '../src/libraries/types';
import { render, ThemeWrapper } from './test-utils';
import { BadgeVariationThemeConfig, TextVariationThemeConfig } from '../src/types';

describe('V2ThemeContext', () => {
  const mockLightColors = { 400: '#000000', '100': '#be3434', '200': '#2f63be' };
  const mockDarkColors = { 400: '#a31a1a', '100': '#3464be', '200': '#76be2f' };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

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
    const iconInputWrapperTestId = 'icon-input-test-id';

    describe('iconInputProps', () => {
      it('should adopted theme inputWrapperStyles prop', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider
            components={{ iconInputProps: { inputWrapperStyles: { width: 100, height: 100, backgroundColor: 'red' } } }}>
            <IconInput testID={iconInputWrapperTestId} />
          </ThemeProvider>,
        );

        const inputWrapper = getByTestId(`${iconInputWrapperTestId}-wrapper`);
        const flattenStyles = StyleSheet.flatten(inputWrapper.props.style);
        expect(flattenStyles).toEqual(expect.objectContaining({ width: 100, height: 100, backgroundColor: 'red' }));
      });

      it('should marge theme inputWrapperStyles prop and inputWrapperStyles component prop', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider
            components={{ iconInputProps: { inputWrapperStyles: { width: 100, height: 100, backgroundColor: 'red' } } }}>
            <IconInput testID={iconInputWrapperTestId} inputWrapperStyles={{ width: 10, backgroundColor: 'green' }} />
          </ThemeProvider>,
        );

        const inputWrapper = getByTestId(`${iconInputWrapperTestId}-wrapper`);
        const flattenStyles = StyleSheet.flatten(inputWrapper.props.style);
        expect(flattenStyles).toEqual(expect.objectContaining({ width: 10, backgroundColor: 'green' }));
      });
    });

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

    describe('dividerProps', () => {
      const startLineTestId = 'divider-start-line-testid';
      const endLineTestId = 'divider-end-line-testid';
      const dividerTestId = 'divider-testid';

      const mockDividerColorThemeConfig: DividerColorThemeConfig = {
        colors: {
          primary: {
            color: 'green',
          },
          secondary: {
            color: 'red',
          },
          success: {
            color: 'pink',
          },
          error: {
            color: 'blue',
          },
          info: {
            color: 'white',
          },
          warning: {
            color: 'pink',
          },
          gray: {
            color: 'gray',
          },
          lightGray: {
            color: 'green',
          },
        },
      };

      it('should adopted the theme lightGray color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: mockDividerColorThemeConfig }}>
            <Divider color="lightGray" startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'green' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(endLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'green' }));
      });

      it('should adopted the theme gray color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: mockDividerColorThemeConfig }}>
            <Divider color="gray" startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'gray' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(endLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'gray' }));
      });

      it('should adopted the theme warning color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: mockDividerColorThemeConfig }}>
            <Divider color="warning" startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'pink' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(endLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'pink' }));
      });

      it('should adopted the theme info color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: mockDividerColorThemeConfig }}>
            <Divider color="info" startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'white' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(endLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'white' }));
      });

      it('should adopted the theme error color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: mockDividerColorThemeConfig }}>
            <Divider color="error" startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'blue' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(endLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'blue' }));
      });

      it('should adopted the theme success color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: mockDividerColorThemeConfig }}>
            <Divider color="success" startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'pink' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(endLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'pink' }));
      });

      it('should adopted the theme primary color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: mockDividerColorThemeConfig }}>
            <Divider color="primary" startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'green' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(endLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'green' }));
      });

      it('should adopted the theme secondary color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: mockDividerColorThemeConfig }}>
            <Divider color="secondary" startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'red' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(endLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
      });

      it('should adopted the theme startLineStyles', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: { startLineStyles: { borderWidth: 10, borderRadius: 10 } } }}>
            <Divider startLineTestId={startLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);

        const flattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(flattenStyles).toEqual(expect.objectContaining({ borderWidth: 10, borderRadius: 10 }));
      });

      it('should override the theme startLineStyles', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: { startLineStyles: { borderWidth: 10, borderRadius: 10 } } }}>
            <Divider startLineStyles={{ borderWidth: 30, borderRadius: 50 }} startLineTestId={startLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);

        const flattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(flattenStyles).toEqual(expect.objectContaining({ borderWidth: 30, borderRadius: 50 }));
      });

      it('should adopted the theme endLineStyles', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: { endLineStyles: { borderWidth: 10, borderRadius: 10 } } }}>
            <Divider endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(endLineTestId);

        const flattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(flattenStyles).toEqual(expect.objectContaining({ borderWidth: 10, borderRadius: 10 }));
      });

      it('should override the theme endLineStyles', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: { endLineStyles: { borderWidth: 10, borderRadius: 10 } } }}>
            <Divider endLineStyles={{ borderWidth: 30, borderRadius: 50 }} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(endLineTestId);

        const flattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(flattenStyles).toEqual(expect.objectContaining({ borderWidth: 30, borderRadius: 50 }));
      });

      it('should adopted the theme borderColor', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: { backgroundColor: 'red' } }}>
            <Divider startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'red' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(endLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
      });

      it('should override the theme borderColor', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: { backgroundColor: 'red' } }}>
            <Divider backgroundColor="green" startLineTestId={startLineTestId} endLineTestId={endLineTestId} />
          </ThemeProvider>,
        );

        const startLine = getByTestId(startLineTestId);
        const startLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(startLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'green' }));

        const endLine = getByTestId(endLineTestId);
        const endLineFlattenStyles = StyleSheet.flatten(startLine.props.style);
        expect(endLineFlattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'green' }));
      });

      it('should adopted the theme styles', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: { style: { borderWidth: 10 } } }}>
            <Divider testID={dividerTestId} />
          </ThemeProvider>,
        );

        const divider = getByTestId(dividerTestId);
        const flattenStyles = StyleSheet.flatten(divider.props.style);
        expect(flattenStyles).toEqual(expect.objectContaining({ borderWidth: 10 }));
      });

      it('should override the theme styles', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ dividerProps: { style: { borderWidth: 10 } } }}>
            <Divider testID={dividerTestId} style={{ borderWidth: 100 }} />
          </ThemeProvider>,
        );

        const divider = getByTestId(dividerTestId);
        const flattenStyles = StyleSheet.flatten(divider.props.style);
        expect(flattenStyles).toEqual(expect.objectContaining({ borderWidth: 100 }));
      });
    });

    describe('badgeProps', () => {
      const badgeTestId = 'badge-testid';

      const mockDividerColorThemeConfig: BadgeVariationThemeConfig = {
        colors: {
          primary: {
            color: 'green',
          },
          secondary: {
            color: 'red',
          },
          success: {
            color: 'pink',
          },
          error: {
            color: 'blue',
          },
          info: {
            color: 'white',
          },
          warning: {
            color: 'pink',
          },
          gray: {
            color: 'gray',
          },
          lightGray: {
            color: 'green',
          },
        },
      };

      it('should adopted theme lightGray color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: mockDividerColorThemeConfig }}>
            <Badge variation="lightGray" testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'green' }));
      });

      it('should adopted theme gray color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: mockDividerColorThemeConfig }}>
            <Badge variation="gray" testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'gray' }));
      });

      it('should adopted theme warning color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: mockDividerColorThemeConfig }}>
            <Badge variation="warning" testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'pink' }));
      });

      it('should adopted theme info color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: mockDividerColorThemeConfig }}>
            <Badge variation="info" testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'white' }));
      });

      it('should adopted theme error color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: mockDividerColorThemeConfig }}>
            <Badge variation="error" testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'blue' }));
      });

      it('should adopted theme success color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: mockDividerColorThemeConfig }}>
            <Badge variation="success" testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'pink' }));
      });

      it('should adopted theme secondary color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: mockDividerColorThemeConfig }}>
            <Badge variation="secondary" testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
      });

      it('should adopted theme primary color', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: mockDividerColorThemeConfig }}>
            <Badge variation="primary" testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ backgroundColor: 'green' }));
      });

      it('should adopted the theme config max prop', () => {
        const { getByText } = themeRender(
          <ThemeProvider components={{ badgeProps: { max: 10 } }}>
            <Badge badgeContent={20} />
          </ThemeProvider>,
        );

        const label = getByText('9+');
        expect(label).toBeDefined();
      });

      it('should override the theme config max prop', () => {
        const { getByText } = themeRender(
          <ThemeProvider components={{ badgeProps: { max: 10 } }}>
            <Badge badgeContent={30} max={20} shouldOverrideRootMaxValue />
          </ThemeProvider>,
        );

        const label = getByText('19+');
        expect(label).toBeDefined();
      });

      it('should adopted the theme anchorOrigin prop with badge variant', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: { anchorOrigin: { vertical: 'top', horizontal: 'left' } } }}>
            <Badge badgeContent={10} testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);

        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ top: -4, left: -4 }));
      });

      it('should override the theme anchorOrigin prop with badge variant', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: { anchorOrigin: { vertical: 'top', horizontal: 'left' } } }}>
            <Badge
              shouldOverrideRootAnchor
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={10}
              testID={badgeTestId}
            />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);

        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ bottom: -4, right: -4 }));
      });

      it('should adopted the theme anchorOrigin prop with dot variant', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: { anchorOrigin: { vertical: 'top', horizontal: 'left' } } }}>
            <Badge badgeContent={10} variant="dot" testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);

        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ top: 0, left: 0 }));
      });

      it('should override the theme anchorOrigin prop with dot variant', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider components={{ badgeProps: { anchorOrigin: { vertical: 'top', horizontal: 'left' } } }}>
            <Badge
              shouldOverrideRootAnchor
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={10}
              variant="dot"
              testID={badgeTestId}
            />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);

        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(expect.objectContaining({ bottom: 0, right: 0 }));
      });

      it('should apply the theme badge style config', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider
            components={{
              badgeProps: {
                style: {
                  borderRadius: 2,
                  backgroundColor: 'red',
                  borderWidth: 1,
                  borderColor: 'grey',
                },
              },
            }}>
            <Badge testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(
          expect.objectContaining({
            borderRadius: 2,
            backgroundColor: 'red',
            borderWidth: 1,
            borderColor: 'grey',
          }),
        );
      });

      it('should merge the theme badge style config with badge component style prop', () => {
        const { getByTestId } = themeRender(
          <ThemeProvider
            components={{
              badgeProps: {
                style: {
                  borderRadius: 2,
                  backgroundColor: 'red',
                  borderWidth: 1,
                  borderColor: 'grey',
                },
              },
            }}>
            <Badge style={{ backgroundColor: 'green', borderColor: 'red' }} testID={badgeTestId} />
          </ThemeProvider>,
        );

        const badge = getByTestId(badgeTestId);
        const fattenStyles = StyleSheet.flatten(badge.props.style);
        expect(fattenStyles).toEqual(
          expect.objectContaining({
            borderRadius: 2,
            backgroundColor: 'green',
            borderWidth: 1,
            borderColor: 'red',
          }),
        );
      });
    });
  });
});
