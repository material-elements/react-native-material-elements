import React from 'react';
import { TextStyle } from 'react-native';
import { BaseButton } from '../Button';
import { BaseButtonProps } from '../types';
import { Text } from '../Typography';
import { styles } from './SegmentedControl.styles';

export interface SegmentedControlItemProps<T> extends Omit<BaseButtonProps, 'ref' | 'onPress'> {
  /** The value associated with this segment item (e.g., label or identifier) */
  value: T;
  /** Index of this item in the segmented control */
  index: number;
  /**
   * Callback triggered when the segment item is pressed;
   * provides both the value and the index
   */
  onPress?: (value: T, index: number) => void;
  /** Custom styles for the label/text displayed in the segment item */
  headingStyles?: TextStyle;
}

export const SegmentedControlItem = <T,>({
  value,
  index,
  headingStyles,
  style: segmentItemStyle,
  onPress: onPressHandler,
  ...props
}: SegmentedControlItemProps<T>) => {
  const onPress = () => {
    if (onPressHandler) {
      onPressHandler(value, index);
    }
  };

  return (
    <BaseButton
      baseButtonContainerStyle={styles.item}
      style={[styles.baseButton, segmentItemStyle]}
      disableScaleAnimation
      onPress={onPress}
      disableRipple
      {...props}>
      <Text style={headingStyles}>{String(value)}</Text>
    </BaseButton>
  );
};
