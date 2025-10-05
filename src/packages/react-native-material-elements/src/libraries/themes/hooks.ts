import { useContextSelector } from 'use-context-selector';
import { ThemeContext } from './V2ThemeContext';

export const themeErrorMsg = 'Please ensure the ThemeProvider is correctly wrapped around the application.';

export const useThemeFontSelector = () => {
  const themeFonts = useContextSelector(ThemeContext, values => values?.theme?.font);
  if (!themeFonts) {
    throw new Error(`Theme fonts are unavailable. ${themeErrorMsg}`);
  }
  return themeFonts;
};

export const useThemeColorsSelector = () => {
  const themeColors = useContextSelector(ThemeContext, values => values?.theme?.colors);
  if (!themeColors) {
    throw new Error(`Theme colors are unavailable. ${themeErrorMsg}`);
  }
  return themeColors;
};

export const useFontWeightSelector = () => {
  const themeFontWeight = useContextSelector(ThemeContext, values => values?.theme?.fontWeight);
  if (!themeFontWeight) {
    throw new Error(`Theme font weight are unavailable. ${themeErrorMsg}`);
  }
  return themeFontWeight;
};

export const useLatterSpacingSelector = () => {
  const latterSpacing = useContextSelector(ThemeContext, values => values?.theme?.latterSpacing);
  if (!latterSpacing) {
    throw new Error(`Theme latterSpacing are unavailable. ${themeErrorMsg}`);
  }
  return latterSpacing;
};

export const useLineHeightSelector = () => {
  const lineHeight = useContextSelector(ThemeContext, values => values?.theme?.lineHeight);
  if (!lineHeight) {
    throw new Error(`Theme lineHeight are unavailable. ${themeErrorMsg}`);
  }
  return lineHeight;
};

export const useThemeSpacingSelector = () => {
  const themeSpacing = useContextSelector(ThemeContext, values => values?.theme?.spacing);
  if (!themeSpacing) {
    throw new Error(`Theme spacing are unavailable. ${themeErrorMsg}`);
  }
  return themeSpacing;
};

export const useThemeTextConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.textProps);
};

export const useThemeBadgeConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.badgeProps);
};

export const useThemeButtonConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.buttonProps);
};
export const useThemeIconButtonConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.iconButtonProps);
};
export const useThemeCheckBoxConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.checkBoxProps);
};

export const useThemeChipConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.chipProps);
};

export const useThemeDividerConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.dividerProps);
};

export const useThemeListConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.listProps);
};

export const useThemeListItemConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.listItemProps);
};

export const useThemePaginationConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.paginationProps);
};

export const useThemeRadioConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.radioProps);
};

export const useThemeSwitchConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.switchProps);
};

export const useThemeTextFieldConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.textFieldProps);
};

export const useThemeIconInputConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.iconInputProps);
};
