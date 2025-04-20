import React from 'react';
import {
  ActivityIndicatorProps,
  Animated,
  ColorValue,
  DimensionValue,
  StyleProp,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { Theme } from '../../libraries/themes/v1/theme';
import { BoxProps } from '../Box/Box.types';
import { TextProps } from '../Typography/Text.types';

/**
 * Represents the variation options for a text field.
 */
export type TextFiledVariation = 'outlined' | 'filled';

/**
 * Defines the common props for a base input component.
 */
export interface BaseInputProps extends TextInputProps {
  /**
   * Indicates if there's an error in the input.
   */
  error?: boolean;
  /**
   * The color to use when the input is active or focused.
   */
  activeColor?: ColorValue;
  /**
   * Indicates if the input is focused.
   */
  isFocused?: boolean;
  /**
   * Color to use when there is an error.
   */
  errorColor?: ColorValue;
  /**
   * The variation type of the text field.
   */
  variant?: TextFiledVariation;
  /**
   * the opacity styles won't be applied when the input is non-editable
   */
  ignoreOpacityOnNonEditable?: boolean;
  /**
   * Override the root ignore opacity styles
   */
  overrideRootIgnoreOpacity?: boolean;
  /**
   * Change the shape of the input
   */
  square?: boolean;
  /**
   * Customize input height
   */
  height?: DimensionValue;
}

/**
 * Defines the props for an input label component.
 */
export interface InputLabelProps
  extends Pick<
      BaseInputProps,
      'placeholder' | 'activeColor' | 'errorColor' | 'variant' | 'editable' | 'ignoreOpacityOnNonEditable' | 'error'
    >,
    Omit<TextProps, 'children'> {
  /**
   * Animated view container styles.
   */
  labelContainerStyles?: ViewStyle;
  /**
   * Animated value for controlling label animation.
   */
  labelAnimatedValue?: Animated.Value;
  /**
   * Animated position for label translation.
   */
  translateYAnimatedPosition?: number;
  /**
   * Position of the placeholder when the label is active.
   */
  placeholderLeftPosition?: number;
}

/**
 * Defines the props for an outlined text field component.
 */
export interface TextFieldProps extends BaseInputProps {
  /**
   * Props for the input label component.
   */
  inputLabelProps?: InputLabelProps;
  /**
   * Duration of animation.
   */
  animatedDuration?: number;
  /**
   * Override root config animation duration
   */
  overrideRootAnimationDuration?: boolean;
  /**
   * React node for the end adornment.
   */
  endAdornment?: React.ReactNode;
  /**
   * Props for the end adornment container.
   */
  endAdornmentContainerProps?: Omit<BoxProps, 'children'>;
  /**
   * React node for the start adornment.
   */
  startAdornment?: React.ReactNode;
  /**
   * Props for the start adornment container.
   */
  startAdornmentContainerProps?: Omit<BoxProps, 'children'>;
  /**
   * Styles for the text input.
   */
  inputStyles?: StyleProp<TextStyle>;
  /**
   * Additional styles for the component.
   */
  sx?: BaseStyles;
  /**
   * Hide the text input label
   */
  hideLabel?: boolean;
  /**
   * Override root hide label configuration
   */
  overrideRootHideLabel?: boolean;
  /**
   * Test id for outline container
   */
  outlineContainerTestId?: string;
  /**
   * Outline container props
   */
  outlineProps?: OutlineProps;
  /**
   * Show the loading indicator
   */
  loading?: boolean;
  /**
   * Only show loading indicator when input is focused
   */
  showLoadingIndicatorWhenFocused?: boolean;
  /**
   * Loading indicator props
   */
  loadingIndicatorProps?: ActivityIndicatorProps;
}

/**
 * Defines the props for an outline component.
 */
export interface OutlineProps
  extends React.ComponentPropsWithRef<typeof View>,
    Pick<
      BaseInputProps,
      'error' | 'activeColor' | 'isFocused' | 'errorColor' | 'variant' | 'editable' | 'ignoreOpacityOnNonEditable' | 'square'
    > {}

/**
 * Represents the properties required to get label transformation styles.
 */
export interface LabelTransformStyleProps
  extends Pick<InputLabelProps, 'labelAnimatedValue' | 'translateYAnimatedPosition' | 'variant' | 'placeholderLeftPosition'> {
  colors: Theme;
  /**
   * Height of the text input.
   */
  textHeight: number;
}

/**
 * Represents the properties required to generate outline styles.
 */
export interface OutlineStyles
  extends Pick<
    OutlineProps,
    'error' | 'errorColor' | 'isFocused' | 'activeColor' | 'editable' | 'variant' | 'ignoreOpacityOnNonEditable' | 'square'
  > {
  colors: Theme;
}

/**
 * Represents the properties required to get text input styles.
 */
export interface TextInputStylesProps extends Pick<TextFieldProps, 'variant' | 'endAdornment' | 'startAdornment'> {}

export interface LabelTextStylesProps
  extends Pick<TextInputStylesProps, 'variant'>,
    Pick<BaseInputProps, 'ignoreOpacityOnNonEditable' | 'error' | 'errorColor'> {
  colors: Theme;
}

export interface BaseInputStylesProps extends Pick<BaseInputProps, 'variant' | 'height'> {
  colors: Theme;
}
