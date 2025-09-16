import React, { useCallback } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { BaseButton } from '../Button';
import { BaseButtonProps } from '../types';
import { Text } from '../Typography';
import { styles } from './SegmentedControl.styles';
import _ from 'lodash';

export type SegmentedControlDataInterface =
  | string
  | number
  | {
      title: string;
      startIcon?: React.ReactNode;
      endIcon?: React.ReactNode;
      startIconContainerStyles?: StyleProp<ViewStyle>;
      endIconContainerStyles?: StyleProp<ViewStyle>;
      containerStyles?: StyleProp<ViewStyle>;
    };

export type SegmentItemPressType = (value: Partial<SegmentedControlDataInterface>, index: number) => void;

export interface SegmentedControlItemProps extends Omit<BaseButtonProps, 'ref' | 'onPress'> {
  /** The value associated with this segment item (e.g., label or identifier) */
  data: SegmentedControlDataInterface;
  /** Index of this item in the segmented control */
  index: number;
  /**
   * Callback triggered when the segment item is pressed;
   * provides both the value and the index
   */
  onPress?: SegmentItemPressType;
  /** Custom styles for the label/text displayed in the segment item */
  headingStyles?: TextStyle;
  /** Segment wrapper container styles */
  segmentItemContainerStyles?: StyleProp<ViewStyle>;
}

export const SegmentedControlItem = ({
  data,
  index,
  headingStyles,
  style: segmentItemStyle,
  onPress: onPressHandler,
  segmentItemContainerStyles,
  ...props
}: SegmentedControlItemProps) => {
  const onPress = () => {
    if (onPressHandler) {
      if (typeof data === 'string' || typeof data === 'number') {
        onPressHandler(data, index);
      } else {
        onPressHandler(_.omit(data, ['endIcon', 'startIcon', 'startIconContainerStyles', 'endIconContainerStyles']), index);
      }
    }
  };

  const renderValue = useCallback(() => {
    if (typeof data === 'string' || typeof data === 'number') {
      return <Text style={headingStyles}>{String(data)}</Text>;
    } else if (typeof data === 'object') {
      return (
        <View style={[styles.itemValueContainer, data.containerStyles, segmentItemContainerStyles]}>
          {data?.startIcon && <View style={[styles.iconContainer, data.startIconContainerStyles]}>{data.startIcon}</View>}
          <Text style={headingStyles}>{data.title}</Text>
          {data?.endIcon && <View style={[styles.iconContainer, data.endIconContainerStyles]}>{data.endIcon}</View>}
        </View>
      );
    }
    return null;
  }, [data, headingStyles]);

  return (
    <BaseButton
      baseButtonContainerStyle={styles.item}
      style={[styles.baseButton, segmentItemStyle]}
      disableScaleAnimation
      onPress={onPress}
      disableRipple
      {...props}>
      {renderValue()}
    </BaseButton>
  );
};
