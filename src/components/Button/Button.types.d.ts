import React from 'react';
import { ColorValue, TextStyle, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { Theme, ThemeDimensions } from '../../libraries/themes/v1/theme';
import { VariantTypes } from '../../utils';
import { RipplePosition, RippleProps } from '../Ripple/Ripple.types';

export type ButtonSizeVariant = 'small' | 'medium' | 'large';
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

  baseButtonContainerStyle?: ViewStyle;

  /**
   * button scale animation duration
   */
  scaleAnimationDuration?: number;
  fullWidth?: boolean;
}

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
   * Base button styles
   */
  baseButtonStyles?: ViewStyle;
  /**
   * Button container flex style
   */
  flex?: number;
  /**
   * Base button sx styles
   */
  baseButtonSx?: BaseButtonProps['sx'];
  /**
   * Override root disable scale animation
   */
  overrideRootDisableScaleAnimation?: boolean;
  /**
   * Override root scale animation value
   */
  overrideRootScaleAnimationValue?: boolean;
  /**
   * Override root ripple edge
   */
  overrideRootRippleEdge?: boolean;
  /**
   * Button background color
   */
  backgroundColor?: ColorValue;
  /**
   * Button size variant
   */
  size?: ButtonSizeVariant;
}
export interface ButtonRootContainerStylesInterface extends Pick<ButtonProps, 'flex'> {}

/**
 * Defines variations of IconButton component.
 * This type restricts the allowed variations to 'roundedIconButton' or 'squareIconButton'.
 */
export type IconButtonVariations = 'roundedIconButton' | 'squareIconButton';

/**
 * Defines the props interface for the IconButton component.
 * Extends React's ComponentPropsWithRef<typeof TouchableWithoutFeedback>.
 */
export interface IconButtonProps extends Omit<BaseButtonProps, 'sx' | 'fullWidth' | 'size'> {
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
}

export type ButtonVariationsType = ButtonVariations | IconButtonVariations;
export interface GetButtonStylesProps extends Omit<ButtonProps, 'sx' | 'children' | 'ripple'> {
  themeColors: Theme;
  spacing: ThemeDimensions['spacing'];
  variation?: ButtonVariationsType;
}
export interface BaseButtonStylesParams extends Pick<BaseButtonProps, 'fullWidth'> {}
