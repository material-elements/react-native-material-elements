import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { View } from 'react-native';
import { ThemeWrapper } from '../../../../__test__/test-utils';
import { initialLightTheme } from '../v1/colors';
import {
  themeErrorMsg,
  useFontWeightSelector,
  useLatterSpacingSelector,
  useLineHeightSelector,
  useThemeBadgeConfigSelector,
  useThemeButtonConfigSelector,
  useThemeButtonGroupConfigSelector,
  useThemeCardConfigSelector,
  useThemeCardHeaderConfigSelector,
  useThemeCheckBoxConfigSelector,
  useThemeChipConfigSelector,
  useThemeColorsSelector,
  useThemeDividerConfigSelector,
  useThemeFontSelector,
  useThemeIconButtonConfigSelector,
  useThemeIconInputConfigSelector,
  useThemeListConfigSelector,
  useThemeListItemConfigSelector,
  useThemePaginationConfigSelector,
  useThemeRadioConfigSelector,
  useThemeSpacingSelector,
  useThemeSwitchConfigSelector,
  useThemeTextConfigSelector,
  useThemeTextFieldConfigSelector,
} from '../hooks';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from '../v1/sizes';
import { ThemeProviderProps } from '../theme';

describe('Theme Hooks', () => {
  const mockChildren = <View />;

  beforeAll(() => {
    jest.clearAllMocks();
  });

  describe('useThemeFontSelector', () => {
    it('should return the theme font config', () => {
      const { result } = renderHook(useThemeFontSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(font));
    });

    it('should throw error when theme not provided', () => {
      try {
        renderHook(useThemeFontSelector);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).toEqual(`Theme fonts are unavailable. ${themeErrorMsg}`);
        }
      }
    });
  });

  describe('useThemeColorsSelector', () => {
    it('should return the theme colors config', () => {
      const { result } = renderHook(useThemeColorsSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(initialLightTheme));
    });

    it('should throw error when theme not provided', () => {
      try {
        renderHook(useThemeColorsSelector);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).toEqual(`Theme fonts are unavailable. ${themeErrorMsg}`);
        }
      }
    });
  });

  describe('useFontWeightSelector', () => {
    it('should return the theme font weight config', () => {
      const { result } = renderHook(useFontWeightSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(fontWeight));
    });

    it('should throw error when theme not provided', () => {
      try {
        renderHook(useFontWeightSelector);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).toEqual(`Theme fonts are unavailable. ${themeErrorMsg}`);
        }
      }
    });
  });

  describe('useLatterSpacingSelector', () => {
    it('should return the theme latter spacing config', () => {
      const { result } = renderHook(useLatterSpacingSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(latterSpacing));
    });

    it('should throw error when theme not provided', () => {
      try {
        renderHook(useLatterSpacingSelector);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).toEqual(`Theme fonts are unavailable. ${themeErrorMsg}`);
        }
      }
    });
  });

  describe('useLineHeightSelector', () => {
    it('should return the theme line height config', () => {
      const { result } = renderHook(useLineHeightSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(lineHeight));
    });

    it('should throw error when theme not provided', () => {
      try {
        renderHook(useLineHeightSelector);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).toEqual(`Theme fonts are unavailable. ${themeErrorMsg}`);
        }
      }
    });
  });

  describe('useThemeSpacingSelector', () => {
    it('should return the theme spacing config', () => {
      const { result } = renderHook(useThemeSpacingSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(spacing));
    });

    it('should throw error when theme not provided', () => {
      try {
        renderHook(useThemeSpacingSelector);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).toEqual(`Theme fonts are unavailable. ${themeErrorMsg}`);
        }
      }
    });
  });

  describe('useThemeTextConfigSelector', () => {
    it('Should return undefined for the theme text component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeTextConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });

    it('should return the correct text component configuration from theme provider', () => {
      const props: ThemeProviderProps = {
        components: {
          textProps: {
            gutterBottomSpace: 10,
            maxLength: 10,
            errorColor: 'red',
            activeColor: 'green',
            color: 'green',
            style: { fontWeight: '800', fontSize: 20 },
          },
        },
        children: mockChildren,
      };

      const { result } = renderHook(useThemeTextConfigSelector, {
        wrapper: ThemeWrapper,
        initialProps: props,
      });

      expect(result.current).toEqual(props.components!.textProps);
    });
  });

  describe('useThemeBadgeConfigSelector', () => {
    it('Should return undefined for the theme badge component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeBadgeConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });

    it('should return the correct badge component configuration from theme provider', () => {
      const props: ThemeProviderProps = {
        components: {
          badgeProps: {
            max: 100,
            badgeAnimationDuration: 200,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            style: { backgroundColor: 'red' },
          },
        },
        children: mockChildren,
      };

      const { result } = renderHook(useThemeBadgeConfigSelector, {
        wrapper: ThemeWrapper,
        initialProps: props,
      });

      expect(result.current).toEqual(props.components!.badgeProps);
    });
  });

  describe('useThemeButtonConfigSelector', () => {
    it('Should return undefined for the theme button component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeButtonConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });

    it('should return the correct button component configuration from theme provider', () => {
      const props: ThemeProviderProps = {
        components: {
          buttonProps: {
            disableRipple: true,
            square: true,
            labelColor: 'green',
            scaleAnimationValue: 100,
            rippleEdge: 'bottomRight',
            baseButtonContainerStyle: { borderWidth: 100 },
            rippleProps: {
              rippleStyles: { backgroundColor: 'red' },
              rippleAnimationStyles: { backgroundColor: 'red' },
              rippleContainerStyles: { backgroundColor: 'green' },
            },
          },
        },
        children: mockChildren,
      };

      const { result } = renderHook(useThemeButtonConfigSelector, {
        wrapper: ThemeWrapper,
        initialProps: props,
      });

      expect(result.current).toEqual(props.components!.buttonProps);
    });
  });

  describe('useThemeIconButtonConfigSelector', () => {
    it('Should return undefined for the theme icon button component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeIconButtonConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });

    it('should return the correct icon button component configuration from theme provider', () => {
      const props: ThemeProviderProps = {
        components: {
          iconButtonProps: {
            style: { backgroundColor: 'red' },
            disableRipple: true,
            rippleEdge: 'bottomRight',
            baseButtonContainerStyle: { backgroundColor: 'red' },
          },
        },
        children: mockChildren,
      };

      const { result } = renderHook(useThemeIconButtonConfigSelector, {
        wrapper: ThemeWrapper,
        initialProps: props,
      });

      expect(result.current).toEqual(props.components!.iconButtonProps);
    });
  });

  describe('useThemeButtonGroupConfigSelector', () => {
    it('Should return undefined for the theme button group component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeButtonGroupConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeCardConfigSelector', () => {
    it('Should return undefined for the theme card component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeCardConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeCardHeaderConfigSelector', () => {
    it('Should return undefined for the theme card header component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeCardHeaderConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeCheckBoxConfigSelector', () => {
    it('Should return undefined for the theme check box component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeCheckBoxConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeChipConfigSelector', () => {
    it('Should return undefined for the theme chip component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeChipConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeDividerConfigSelector', () => {
    it('Should return undefined for the theme divider component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeDividerConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeListConfigSelector', () => {
    it('Should return undefined for the theme list component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeListConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeListItemConfigSelector', () => {
    it('Should return undefined for the theme list item component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeListItemConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemePaginationConfigSelector', () => {
    it('Should return undefined for the theme pagination component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemePaginationConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeRadioConfigSelector', () => {
    it('Should return undefined for the theme radio component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeRadioConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeSwitchConfigSelector', () => {
    it('Should return undefined for the theme switch component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeSwitchConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeTextFieldConfigSelector', () => {
    it('Should return undefined for the theme text field component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeTextFieldConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeIconInputConfigSelector', () => {
    it('Should return undefined for the theme icon input component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeIconInputConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });
});
