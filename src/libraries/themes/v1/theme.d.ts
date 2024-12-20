import {
  ButtonGroupProps,
  DividerColorThemeConfig,
  DividerProps,
  IconInputProps,
  RadioProps,
  RadioThemeConfig,
  SwitchProps,
  SwitchThemeConfig,
} from '../../../components';
import {
  BadgeProps,
  BadgeVariationThemeConfig,
  ButtonProps,
  ButtonVariations,
  CardHeaderProps,
  CardProps,
  CheckBoxProps,
  CheckBoxVariationThemeConfig,
  ChipColorThemeConfig,
  ChipProps,
  IconButtonProps,
  ListItemProps,
  ListProps,
  PaginationProps,
  PaginationThemeConfig,
  TextFieldProps,
  TextFiledVariation,
  TextProps,
  TextVariationThemeConfig,
} from '../../../components/types';
import { initialLightTheme } from './colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './sizes';
import { themeDimensions } from './V2ThemeContext';

/**
 * Interface representing a set of color shades, typically used for creating gradients or theme variations.
 * Each key represents a different level of color shade, from lightest (50) to darkest (900).
 */
export interface ColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}
/**
 * Type representing the theme, based on the initial light theme.
 */
export type Theme = typeof initialLightTheme;
/**
 * Type for valid theme keys, excluding the 'mode' property.
 * Useful for referring to theme properties like colors, fonts, etc., but not the mode (dark/light).
 */
export type ThemeKeys = keyof Omit<Theme, 'mode'>;
/**
 * Enum-like type representing theme modes.
 * Can be either 'dark' or 'light'.
 */
export type ThemMode = 'dark' | 'light';
/**
 * Type for defining theme-related design dimensions such as fonts, spacing, and line heights.
 * These properties help maintain consistent spacing and typography throughout the application.
 */
export type ThemeDimensions = {
  font: typeof font;
  spacing: typeof spacing;
  latterSpacing: typeof latterSpacing;
  lineHeight: typeof lineHeight;
  fontWeight: typeof fontWeight;
};
/**
 * Interface representing the required structure of the theme, which includes the theme object.
 * The theme object is of type `ThemeType`, which defines the full theme structure.
 */
export interface RequiredTheme {
  theme: ThemeType;
}
/**
 * Type representing the overall theme structure, including colors and various design metrics.
 */
export type ThemeType = {
  mode: ThemMode;
  colors: Theme;
} & ThemeDimensions;
export type ThemeSpacingType = typeof themeDimensions;
/**
 * A utility type that makes all properties of an object type `T` optional,
 * while keeping the nested objects partially optional.
 */
export type InnerPartial<T> = {
  [K in keyof T]?: T[k] extends object ? Partial<T[K]> : T[K];
};
/**
 * Type used to create a theme with only the 'colors' property from `ThemeType`,
 * allowing a minimal theme structure to be defined.
 */
export type CreateThemeType = Pick<InnerPartial<ThemeType>, 'colors'>;
/**
 * Type used to define the return values when creating a theme, including the mode and colors.
 */
export type CreateThemeReturnValues = Pick<ThemeType, 'colors' | 'mode'>;
/**
 * Type used to define theme dimensions when creating a new theme.
 * This is useful when adjusting spacing, font sizes, and other layout values.
 */
export type CreateThemeDimensions = InnerPartial<ThemeDimensions>;
/**
 * Type representing the return values for theme dimensions creation,
 * including both the full dimensions and any partial updates.
 */
export type CreateThemeDimensionsReturnValues = ThemeDimensions & InnerPartial<ThemeDimensions>;
/**
 * Interface for creating color shades dynamically within the theme,
 * with support for specifying the theme property name (e.g., 'primary' or 'secondary') for each shade.
 */
export type CreateColorShadesInterface = { shades: Partial<ColorShades>; themePropertyName: ThemeKeys };
type TextFileThemeConfig = Pick<
  TextFieldProps,
  | 'animatedDuration'
  | 'inputStyles'
  | 'style'
  | 'hideLabel'
  | 'activeColor'
  | 'errorColor'
  | 'ignoreOpacityOnNonEditable'
  | 'square'
>;
/**
 * Define a configuration map for TextField variations.
 * Each key corresponds to a specific TextField variation (e.g., 'outlined', 'filled'), and the value is a partial configuration specific to that variation.
 */
type TextFieldVariationConfig = Partial<
  Record<TextFiledVariation, Pick<TextFileThemeConfig, 'activeColor' | 'errorColor' | 'inputStyles' | 'style'> | undefined>
>;
type ButtonThemeConfig = Pick<
  ButtonProps,
  | 'disableRipple'
  | 'labelStyles'
  | 'square'
  | 'labelColor'
  | 'baseButtonStyles'
  | 'disableScaleAnimation'
  | 'scaleAnimationValue'
  | 'rippleEdge'
  | 'baseButtonContainerStyle'
  | 'rippleProps'
  | 'style'
>;
type ButtonVariationConfig = Partial<
  Record<ButtonVariations, Pick<ButtonThemeConfig, 'labelStyles' | 'baseButtonStyles' | 'style'> | undefined>
>;
/**
 * Configuration type for customizing the look and feel of themeable components.
 * These configurations allow for easy styling adjustments for various components.
 */
export type ThemeComponentConfig = {
  textProps: Pick<TextProps, 'gutterBottomSpace' | 'maxLength' | 'errorColor' | 'activeColor' | 'color' | 'style'> &
    TextVariationThemeConfig;
  badgeProps: Pick<BadgeProps, 'max' | 'badgeAnimationDuration' | 'anchorOrigin' | 'style'> & BadgeVariationThemeConfig;
  buttonProps: ButtonThemeConfig & ButtonVariationConfig;
  iconButtonProps: Pick<
    IconButtonProps,
    'variation' | 'disableRipple' | 'rippleProps' | 'rippleEdge' | 'baseButtonContainerStyle' | 'style'
  >;
  buttonGroupProps: Pick<
    ButtonGroupProps,
    'roundSize' | 'borderWidth' | 'removeBorders' | 'disableRipple' | 'baseButtonStyles' | 'style'
  >;
  cardProps?: Pick<CardProps, 'style'>;
  cardHeaderProps?: Pick<CardHeaderProps, 'style'>;
  checkBoxProps?: Pick<
    CheckBoxProps,
    | 'checkBoxColor'
    | 'checkBoxWrapperStyles'
    | 'adornmentContainerStyles'
    | 'labelStyles'
    | 'subLabelStyles'
    | 'labelContainerStyles'
  > &
    CheckBoxVariationThemeConfig;
  chipProps?: Pick<ChipProps, 'chipWrapperContainerStyles' | 'square' | 'labelColor' | 'style'> & ChipColorThemeConfig;
  dividerProps?: Pick<DividerProps, 'startLineStyles' | 'endLineStyles' | 'borderColor' | 'gap' | 'variantSpacing' | 'style'> &
    DividerColorThemeConfig;
  listProps?: Pick<ListProps, 'subheaderContainerStyles' | 'disablePadding' | 'style'>;
  listItemProps?: Pick<
    ListItemProps,
    | 'listContainerStyles'
    | 'endAdornmentContainerStyles'
    | 'startAdornmentContainerStyles'
    | 'selectedColor'
    | 'disableBottomSpacing'
    | 'outlineColor'
    | 'style'
  >;
  paginationProps?: Pick<PaginationProps, 'dotStyles' | 'itemShape' | 'style'> & PaginationThemeConfig;
  radioProps?: Pick<
    RadioProps,
    'labelContainerStyles' | 'radioItemContainerStyles' | 'baseButtonStyles' | 'sizeConfig' | 'style'
  > &
    RadioThemeConfig;
  switchProps?: Pick<
    SwitchProps,
    'toggleDuration' | 'toggleWrapperBgDuration' | 'wrapperDefaultBgColor' | 'wrapperActiveBgColor' | 'thumbStyles' | 'style'
  > &
    SwitchThemeConfig;
  textFieldProps?: TextFiledConfig & TextFieldVariationConfig;
  iconInputProps?: Pick<IconInputProps, 'inputWrapperStyles' | 'endAdornmentContainerStyles' | 'startAdornmentContainerStyles'>;
};
/**
 * A higher-order type that allows adding component-specific configurations to a given component type.
 * This ensures that components can receive theme configurations specific to their role.
 */
export type WithThemeComponentConfig<K extends keyof ThemeComponentConfig, T> = T & {
  themeComponentConfig?: ThemeComponentConfig[K];
};
/**
 * Interface representing the theme context, including the current theme and a function to change the theme mode.
 */
export interface ThemeInterface<T extends object> {
  /**
   * The current theme, extended with any additional properties
   */
  theme: ThemeType & T;
  /**
   * Component configurations
   */
  components?: InnerPartial<ThemeComponentConfig>;
}
/**
 * Interface representing the theme context type.
 */
export interface ThemeContextType {
  theme: ThemeInterface;
}
export interface ThemeProviderProps<T extends Object> {
  /**
   * Child components to be wrapped by the provider
   */
  children: React.ReactNode;
  /**
   * Optional light theme, extended with additional properties
   */
  lightTheme?: Pick<ThemeType, 'mode' | 'colors'> & T;
  /**
   * Optional dark theme, extended with additional properties
   */
  darkTheme?: Pick<ThemeType, 'mode' | 'colors'> & T;
  /**
   * Optional theme dimensions values
   */
  dimensions?: ThemeDimensions;
  /**
   * Component configurations
   */
  components?: InnerPartial<ThemeComponentConfig>;
}
