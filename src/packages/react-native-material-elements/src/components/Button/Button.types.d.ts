import React from 'react';
import {
  ActivityIndicatorProps,
  ColorValue,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { ThemedIconProp } from '../../hooks';
import { BaseStyles, StyledProps } from '../../libraries/style/styleTypes';
import { Theme } from '../../libraries/themes/theme';
import { VariantTypes } from '../../utils';
import { RipplePosition, RippleProps } from '../Ripple/Ripple.types';

export type ButtonSizeVariant = 'small' | 'medium' | 'large';
export type ButtonSizeConfig = Partial<{
  [k in ButtonSizeVariant]: Partial<{
    height: number;
    fontSize: number;
  }>;
}>;

export interface BaseButtonProps extends React.ComponentPropsWithRef<typeof TouchableWithoutFeedback> {
  /**
   * Custom styles to apply to the Box component.
   */
  sx?: BaseStyles;
  /**
   * Determines whether the ripple effect is disabled.
   */
  disableRipple?: boolean;

  /**
   * Props for configuring the ripple effect.
   */
  rippleProps?: RippleProps;

  /**
   * Determines the position of the ripple effect relative to the button.
   */
  rippleEdge?: RipplePosition;

  /**
   * stop scale animation when the button is clicked
   */
  disableScaleAnimation?: boolean;

  /**
   * button scale animation when the button is clicked
   */
  scaleAnimationValue?: number;

  buttonContainerStyle?: StyleProp<ViewStyle>;

  /**
   * button scale animation duration
   */
  scaleAnimationDuration?: number;

  /**
   * Button child component wrapper props
   */
  componentWrapperProps?: ViewProps;
  /**
   * Full width button
   */
  fullWidth?: boolean;
}

export type BaseButtonStyles = Pick<BaseButtonProps, 'fullWidth'>;

/**
 * Define a union type for the possible variations of a button component,
 * including 'contained', 'outlined', or 'text'.
 */
export type ButtonVariations = 'contained' | 'outlined' | 'text';

/**
 * Define the properties that can be passed to the Button component,
 * extending from React's TouchableWithoutFeedback component props.
 */
export interface ButtonProps extends Omit<BaseButtonProps, 'sx'> {
  /**
   * Custom styles to apply to the Box component.
   */
  sx?: BaseStyles;
  /**
   * Optional property to specify the visual style variation of the button.
   * Can only accept values defined in ButtonVariations type.
   */
  variation?: ButtonVariations;

  /**
   * Boolean flag to disable the ripple effect.
   */
  disableRipple?: boolean;

  /**
   * Optional property to specify the color variation of the button.
   */
  buttonColor?: VariantTypes;

  /**
   * show the loading indicator when the button is clicked
   */
  loading?: boolean;
  /**
   * loader test id
   */
  loaderTestId?: string;
  /**
   * Button label
   */
  label?: string;
  /**
   * Custom styles for button label component
   */
  labelStyles?: TextStyle;
  /**
   * Change the button radius
   */
  square?: boolean;
  /**
   * Override square root configuration
   */
  overrideRootSquareConfig?: boolean;
  /**
   * Change the button label color
   */
  labelColor?: ColorValue;
  /**
   * Button background color
   */
  backgroundColor?: ColorValue;
  /**
   * Button size variant
   */
  size?: ButtonSizeVariant;
  /**
   * Button size config
   */
  sizeConfig?: ButtonSizeConfig;
  /**
   * Button start icon
   */
  startIcon?: ThemedIconProp;
  /**
   * Start icon container styles
   */
  startIconContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Button end icon
   */
  endIcon?: ThemedIconProp;
  /**
   * End icon container styles
   */
  endIconContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Loading spinner color
   */
  loadingIndicatorColor?: ColorValue;
  /**
   * Loading spinner variants
   */
  loadingIndicatorVariant?: VariantTypes;
  /**
   * Switch light and dark mode of spinner component
   */
  switchSpinnerMode?: boolean;
  /**
   * Spinner size
   */
  loadingIndicatorSize?: ActivityIndicatorProps['size'];
}

/**
 * Defines variations of IconButton component.
 * This type restricts the allowed variations to 'roundedIconButton' or 'squareIconButton'.
 */
export type IconButtonVariations = 'roundedIconButton' | 'squareIconButton';

/**
 * Defines the props interface for the IconButton component.
 * Extends React's ComponentPropsWithRef<typeof TouchableWithoutFeedback>.
 */
export interface IconButtonProps extends Omit<BaseButtonProps, 'sx' | 'size'>, StyledProps {
  /**
   * Specifies the variation of the IconButton.
   * Can be either 'roundedIconButton' or 'squareIconButton'.
   */
  variation?: IconButtonVariations;
  /**
   * Override the root variation config
   */
  overrideRootVariation?: boolean;
  /**
   * Override root disable ripple effect
   */
  overrideRootDisableRippleEffect?: boolean;
  /**
   * Override root ripple edge
   */
  overrideRootRippleEdge?: boolean;
  /**
   * Icon button icon component
   * */
  icon?: ThemedIconProp;
}

export type ButtonVariationsType = ButtonVariations | IconButtonVariations;
export interface GetButtonStylesProps extends Omit<ButtonProps, 'sx' | 'children' | 'ripple'> {
  themeColors: Theme;
  variation?: ButtonVariationsType;
}
export interface ButtonLabelStylesParams extends Pick<ButtonProps, 'size' | 'sizeConfig'> {}
