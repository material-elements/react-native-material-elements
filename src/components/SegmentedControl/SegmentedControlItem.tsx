import React from 'react';
import { BaseButton } from '../Button';
import { BaseButtonProps } from '../types';
import { Text } from '../Typography';
import { styles } from './SegmentedControl.styles';
import { StyleSheet, TextStyle } from 'react-native';

export interface SegmentedControlItemProps<T> extends Omit<BaseButtonProps, 'ref' | 'onPress'> {
  value: T;
  index: number;
  onPress?: (value: T, index: number) => void;
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
      style={StyleSheet.flatten([styles.baseButton, segmentItemStyle])}
      disableScaleAnimation
      onPress={onPress}
      disableRipple
      {...props}>
      <Text style={headingStyles}>{String(value)}</Text>
    </BaseButton>
  );
};
