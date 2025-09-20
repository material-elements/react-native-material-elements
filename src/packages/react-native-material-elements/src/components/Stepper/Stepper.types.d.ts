import React from 'react';
import { GestureResponderEvent, View, ViewProps, ViewStyle } from 'react-native';
import { StyledProps } from '../../libraries/style/styleTypes';
import { TextProps } from '../Typography/Text.types';

export interface QuantityStepperProps extends React.ComponentPropsWithRef<typeof View>, StyledProps {
  /**
   * The current value of the quantity stepper.
   * It should represent the number that is being incremented or decremented.
   */
  value: number;

  /**
   * Props to be passed to the label text component, excluding the 'children' prop.
   * This can be used to style and configure the label that displays the current value.
   */
  labelProps?: Omit<TextProps, 'children'>;

  /**
   * Props to be passed to the label wrapper view component, excluding the 'children' prop.
   * This can be used to style and configure the container of the label.
   */
  labelWrapperProps?: Omit<ViewProps, 'children'>;

  /**
   * Callback function that is called when the increment button is pressed.
   * Receives the gesture event as a parameter.
   */
  onIncrement?: (event: GestureResponderEvent) => void;

  /**
   * Test id for increment touch wrapper element.
   */
  onIncrementTestId?: string;

  /**
   * Callback function that is called when the decrement button is pressed.
   * Receives the gesture event as a parameter.
   */
  onDecrement?: (event: GestureResponderEvent) => void;

  /**
   * Test id for decrement touch wrapper element.
   */
  onDecrementTestId?: string;

  /**
   * Style to be applied to the increment button view.
   * This can be used to customize the appearance of the increment button.
   */
  incrementButtonStyle?: ViewStyle;

  /**
   * Style to be applied to the decrement button view.
   * This can be used to customize the appearance of the decrement button.
   */
  decrementButtonStyle?: ViewStyle;

  /**
   * Determines whether the increment button is disabled.
   * If true, the increment button will be non-interactive.
   */
  disabledIncrement?: boolean;

  /**
   * Determines whether the decrement button is disabled.
   * If true, the decrement button will be non-interactive.
   */
  disabledDecrement?: boolean;

  /**
   * Specifies the maximum limit for the value when incrementing.
   * If provided, the value cannot exceed this limit when the increment button is pressed.
   */
  maxIncrement?: number;

  /**
   * Specifies the minimum limit for the value when decrementing.
   * If provided, the value cannot go below this limit when the decrement button is pressed.
   */
  minDecrement?: number;

  /**
   * different options for button styles.
   */
  buttonType?: 'square' | 'round';

  /**
   * Custom icon for the decrement button
   */
  decrementIcon?: React.ReactNode;

  /**
   * Custom icon for the increment button
   */
  incrementIcon?: React.ReactNode;

  /**
   * stop calculating the max increment
   */
  allowInfiniteIncrement?: boolean;

  /**
   * stop calculating the min increment
   */
  allowInfiniteDecrement?: boolean;
}
