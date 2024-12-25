import { useContextSelector } from 'use-context-selector';
import { ThemeContext } from './V2ThemeContext';

const msg = 'Please ensure the ThemeProvider is correctly wrapped around the application.';

export const useThemeFontSelector = () => {
  const themeFonts = useContextSelector(ThemeContext, values => values?.theme?.font);
  if (!themeFonts) {
    throw new Error(`Theme fonts are unavailable. ${msg}`);
  }
  return themeFonts;
};

export const useThemeColorsSelector = () => {
  const themeColors = useContextSelector(ThemeContext, values => values?.theme?.colors);
  if (!themeColors) {
    throw new Error(`Theme colors are unavailable. ${msg}`);
  }
  return themeColors;
};
export const useThemeSpacingSelector = () => {
  const themeSpacing = useContextSelector(ThemeContext, values => values?.theme?.spacing);
  if (!themeSpacing) {
    throw new Error(`Theme spacing are unavailable. ${msg}`);
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
export const useThemeButtonGroupConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.buttonGroupProps);
};

export const useThemeCardConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.cardProps);
};
export const useThemeCardHeaderConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.cardHeaderProps);
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
