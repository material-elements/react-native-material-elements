import { renderHook } from '@testing-library/react-hooks';
import { ThemeWrapper } from '../../../../../__test__/test-utils';
import { initialLightTheme } from '../colors';
import {
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
import { font, fontWeight, latterSpacing, lineHeight, spacing } from '../sizes';

describe('Theme Hooks', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  describe('useThemeFontSelector', () => {
    it('should return the theme font config', () => {
      const { result } = renderHook(() => useThemeFontSelector(), { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(font));
    });
  });

  describe('useThemeColorsSelector', () => {
    it('should return the theme colors config', () => {
      const { result } = renderHook(() => useThemeColorsSelector(), { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(initialLightTheme));
    });
  });

  describe('useFontWeightSelector', () => {
    it('should return the theme font weight config', () => {
      const { result } = renderHook(() => useFontWeightSelector(), { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(fontWeight));
    });
  });

  describe('useLatterSpacingSelector', () => {
    it('should return the theme latter spacing config', () => {
      const { result } = renderHook(() => useLatterSpacingSelector(), { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(latterSpacing));
    });
  });

  describe('useLineHeightSelector', () => {
    it('should return the theme line height config', () => {
      const { result } = renderHook(() => useLineHeightSelector(), { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(lineHeight));
    });
  });

  describe('useThemeSpacingSelector', () => {
    it('should return the theme spacing config', () => {
      const { result } = renderHook(() => useThemeSpacingSelector(), { wrapper: ThemeWrapper });
      expect(result.current).toEqual(expect.objectContaining(spacing));
    });
  });

  describe('useThemeTextConfigSelector', () => {
    it('Should return undefined for the theme text component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(() => useThemeTextConfigSelector(), { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeBadgeConfigSelector', () => {
    it('Should return undefined for the theme badge component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(() => useThemeBadgeConfigSelector(), { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeButtonConfigSelector', () => {
    it('Should return undefined for the theme button component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeButtonConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
    });
  });

  describe('useThemeIconButtonConfigSelector', () => {
    it('Should return undefined for the theme icon button component configuration when the theme wrapper does not provide a component config.', () => {
      const { result } = renderHook(useThemeIconButtonConfigSelector, { wrapper: ThemeWrapper });
      expect(result.current).toEqual(undefined);
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
