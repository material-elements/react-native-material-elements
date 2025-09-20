import {
  useFontWeightSelector,
  useLatterSpacingSelector,
  useLineHeightSelector,
  useThemeFontSelector,
  useThemeSpacingSelector,
} from '../libraries';
import { ThemeDimensions } from '../libraries/types';

export const useThemeDimensions = (): ThemeDimensions => {
  const themeSpacing = useThemeSpacingSelector();
  const themeFont = useThemeFontSelector();
  const themeFontWeight = useFontWeightSelector();
  const themeLetterSpacing = useLatterSpacingSelector();
  const themeLineHeight = useLineHeightSelector();

  return {
    spacing: themeSpacing,
    font: themeFont,
    fontWeight: themeFontWeight,
    latterSpacing: themeLetterSpacing,
    lineHeight: themeLineHeight,
  };
};
