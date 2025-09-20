import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ColorValue,
  LayoutChangeEvent,
  LayoutRectangle,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { gray } from '../../libraries';
import { styles } from './SegmentedControl.styles';
import { SegmentedControlContainer, SegmentedControlContainerProps } from './SegmentedControlContainer';
import {
  SegmentedControlItem,
  SegmentedControlDataInterface,
  SegmentItemPressType,
  SegmentedControlItemProps,
} from './SegmentedControlItem';

export interface SegmentedControlProps
  extends SegmentedControlContainerProps,
    Pick<SegmentedControlItemProps, 'segmentItemContainerStyles'> {
  /** Array of values to be displayed in the segmented control */
  data: SegmentedControlDataInterface[];
  /** Index of the currently selected segment */
  selectedIndex: number;
  /** Callback triggered when a segment is selected; returns the selected value */
  onChange?: SegmentItemPressType;
  /** Background color for the active segment in dark mode */
  activeSegmentDarkModeBackgroundColor?: string;
  /** Background color for the active segment in light mode */
  activeSegmentLightModeBackgroundColor?: string;
  /** Style to apply to each segment item (e.g., padding, borderRadius) */
  segmentItemStyles?: ViewStyle;
  /**
   * Index of the segment where `segmentItemStyles` should be applied;
   * if undefined, style is applied to all segments
   */
  applySegmentItemStyleIndex?: number;
  /** Text style to apply to each segment label (e.g., fontSize, color) */
  segmentTextStyle?: TextStyle;
  /**
   * Index of the segment where `segmentTextStyle` should be applied;
   * if undefined, style is applied to all segment labels
   */
  applySegmentItemTextStyleIndex?: number;
  /** View styles for animated segment */
  animatedSegmentStyle?: ViewStyle;
}

export const SegmentedControl = ({
  data,
  onChange,
  activeSegmentDarkModeBackgroundColor,
  activeSegmentLightModeBackgroundColor,
  segmentItemStyles,
  segmentTextStyle,
  applySegmentItemStyleIndex,
  applySegmentItemTextStyleIndex,
  animatedSegmentStyle,
  segmentItemContainerStyles,
  selectedIndex = 0,
  ...props
}: SegmentedControlProps) => {
  const animatedSegmentWidth = useRef(new Animated.Value(0));
  const animatedTranslateX = useRef(new Animated.Value(0));
  const themeAnimation = useRef(new Animated.Value(0));

  const colorScheme = useColorScheme();

  const [selectedSegment, setSelectedSegment] = useState<Partial<SegmentedControlDataInterface>>(data[0]);
  const [segmentRect, setSegmentRect] = useState<LayoutRectangle | null>(null);

  const segmentedItemHandler = function (value: Partial<SegmentedControlDataInterface>, index: number) {
    if (selectedSegment !== value) {
      setSelectedSegment(value);
      if (onChange) {
        onChange(value, index);
      }
    }
  };

  const onLayout = function (event: LayoutChangeEvent) {
    const { layout } = event.nativeEvent;
    setSegmentRect(layout);
  };

  const getSegmentItemStyle = (index: number) => {
    if (!applySegmentItemStyleIndex) {
      return segmentItemStyles;
    }
    return applySegmentItemStyleIndex && index === applySegmentItemStyleIndex - 1 ? segmentItemStyles : undefined;
  };

  const getSegmentItemHeadingStyle = function (index: number) {
    if (applySegmentItemTextStyleIndex === null || applySegmentItemTextStyleIndex === undefined) {
      return segmentTextStyle;
    }

    return data.length && index === applySegmentItemTextStyleIndex ? segmentTextStyle : undefined;
  };

  const backgroundColor = themeAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [activeSegmentLightModeBackgroundColor ?? gray[100], activeSegmentDarkModeBackgroundColor ?? gray[400]],
  }) as unknown as ColorValue;

  const animatedViewStyles: ViewStyle = {
    backgroundColor: backgroundColor,
    width: animatedSegmentWidth.current,
    transform: [{ translateX: animatedTranslateX.current }],
  };

  useEffect(() => {
    Animated.timing(themeAnimation.current, {
      useNativeDriver: false,
      toValue: colorScheme === 'dark' ? 1 : 0,
      duration: 50,
    }).start();
  }, [colorScheme]);

  useEffect(() => {
    if (segmentRect && data.length) {
      const width = segmentRect.width;
      animatedSegmentWidth.current.setValue(width);

      Animated.spring(animatedTranslateX.current, {
        useNativeDriver: false,
        toValue: width * selectedIndex,
      }).start();
    }

    if (selectedIndex && selectedIndex < data.length) {
      setSelectedSegment(data[selectedIndex]);
    }
  }, [segmentRect, selectedIndex, data]);

  return (
    <SegmentedControlContainer {...props}>
      <View style={styles.segmentContainer}>
        <Animated.View style={[styles.animatedSegmentContainer, animatedViewStyles, animatedSegmentStyle]} />
        {data.map((value, index) => (
          <SegmentedControlItem
            onLayout={index === 0 ? onLayout : undefined}
            onPress={segmentedItemHandler}
            data={value}
            index={index}
            key={index}
            headingStyles={getSegmentItemHeadingStyle(index)}
            style={getSegmentItemStyle(index)}
            segmentItemContainerStyles={segmentItemContainerStyles}
          />
        ))}
      </View>
    </SegmentedControlContainer>
  );
};
