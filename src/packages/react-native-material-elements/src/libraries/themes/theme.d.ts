import {
  ButtonGroupProps,
  DividerColorThemeConfig,
  DividerProps,
  IconInputProps,
  RadioProps,
  RadioThemeConfig,
  SwitchProps,
  SwitchThemeConfig,
} from '../../components';
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
  ChipVariant,
  IconButtonProps,
  IconButtonVariations,
  ListItemProps,
  ListProps,
  PaginationProps,
  PaginationThemeConfig,
  TextFieldProps,
  TextFiledVariation,
  TextProps,
  TextVariationThemeConfig,
} from '../../components/types';
import { initialLightTheme } from './v1/colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './v1/sizes';
import { themeDimensions } from './V2ThemeContext';

/**
 * Interface representing a set of color shades, typically used for creating gradients or theme variations.
 * Each key represents a different level of color shade,  in the light theme mode the lightest values will be (50) and darkest will be (900) and in the dark theme mode the lightest value will the (900) and darkest value will be (50).
 */
export type ShadeNumbers = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type ColorShades = Record<ShadeNumbers, string>;
/**
 * Type representing the theme, based on the initial light theme.
 */
export type Theme = typeof initialLightTheme;
/**
 * Type for valid theme keys, excluding the 'mode' property.
 * Useful for referring to theme properties like colors, fonts, etc., but not the mode (dark/light).
 */
export type ThemeKeys = keyof Theme;
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
 * Type representing the overall theme structure, including colors and various design metrics.
 */
export type ThemeType = {
  colors: Theme & { [index: string]: ColorShades };
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
export type CreateColorShadesInterface<T> = { shades: Partial<ColorShades>; themePropertyName: ThemeKeys | T };

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
  | 'height'
>;
type TextFieldVariationConfig = Partial<
  Record<
    TextFiledVariation,
    Pick<TextFileThemeConfig, 'activeColor' | 'errorColor' | 'inputStyles' | 'style' | 'height'> | undefined
  >
>;
type ButtonThemeConfig = Pick<
  ButtonProps,
  | 'disableRipple'
  | 'labelStyles'
  | 'square'
  | 'labelColor'
  | 'disableScaleAnimation'
  | 'scaleAnimationValue'
  | 'rippleEdge'
  | 'buttonContainerStyle'
  | 'rippleProps'
  | 'style'
  | 'sizeConfig'
>;
type ButtonVariationConfig = Partial<Record<ButtonVariations, Pick<ButtonThemeConfig, 'labelStyles' | 'style'> | undefined>>;
type IconButtonThemeConfig = Pick<IconButtonProps, 'variation' | 'disableRipple' | 'rippleProps' | 'rippleEdge' | 'style'>;
type IconButtonVariationsConfig = Partial<Record<IconButtonVariations, Pick<IconButtonThemeConfig, 'style'> | undefined>>;
type ChipThemeConfig = Pick<ChipProps, 'chipWrapperContainerStyles' | 'square' | 'labelColor' | 'style'> & ChipColorThemeConfig;
type ChipVariationConfig = Partial<
  Record<ChipVariant, Pick<ChipThemeConfig, 'style' | 'chipWrapperContainerStyles'> | undefined>
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
  iconButtonProps: IconButtonThemeConfig & IconButtonVariationsConfig;
  buttonGroupProps: Pick<ButtonGroupProps, 'roundSize' | 'borderWidth' | 'disableRipple' | 'baseButtonStyles' | 'style'>;
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
  chipProps?: ChipThemeConfig & ChipVariationConfig;
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
  textFieldProps?: TextFileThemeConfig & TextFieldVariationConfig;
  iconInputProps?: Pick<IconInputProps, 'inputWrapperStyles' | 'endAdornmentContainerStyles' | 'startAdornmentContainerStyles'>;
};
/**
 * A higher-order type that allows adding component-specific configurations to a given component type.
 * This ensures that components can receive theme configurations specific to their role.
 */
export type WithThemeComponentConfig<K extends keyof ThemeComponentConfig, T> = T & {
  themeComponentConfig?: ThemeComponentConfig[K];
};
export interface ThemeConfigInterface {
  /**
   * Component configurations
   */
  components?: InnerPartial<ThemeComponentConfig>;
}
/**
 * Interface representing the theme context, including the current theme and a function to change the theme mode.
 */
export interface ThemeInterface<T> extends ThemeConfigInterface {
  /**
   * The current theme, extended with any additional properties
   */
  theme: ThemeType & T;
}
export interface ThemeProviderProps extends ThemeConfigInterface {
  /**
   * Child components to be wrapped by the provider
   */
  children: React.ReactNode;
  /**
   * Optional light theme, extended with additional properties
   */
  lightTheme?: Pick<ThemeType, 'colors'>;
  /**
   * Optional dark theme, extended with additional properties
   */
  darkTheme?: Pick<ThemeType, 'colors'>;
  /**
   * Optional theme dimensions values
   */
  dimensions?: ThemeDimensions;
}

export type CreateColorShades = ColorShades;
export type UseTheme = ThemeInterface<ThemeType>;
