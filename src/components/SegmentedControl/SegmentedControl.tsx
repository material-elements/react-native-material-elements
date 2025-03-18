import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ColorValue,
  LayoutChangeEvent,
  LayoutRectangle,
  TextStyle,
  useColorScheme,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { grey } from '../../libraries';
import { styles } from './SegmentedControl.styles';
import { SegmentedControlContainer } from './SegmentedControlContainer';
import { SegmentedControlItem } from './SegmentedControlItem';

export interface SegmentedControlProps<T extends string | number> extends ViewProps {
  values: T[];
  selectedIndex: number;
  onChange?: (value: T) => void;
  activeSegmentDarkModeBackgroundColor?: string;
  activeSegmentLightModeBackgroundColor?: string;
  segmentItemStyles?: ViewStyle;
  applySegmentItemStyleIndex?: number;
  segmentTextStyle?: TextStyle;
  applySegmentItemTextStyleIndex?: number;
}

export const SegmentedControl = <T extends string | number>({
  values,
  onChange,
  activeSegmentDarkModeBackgroundColor,
  activeSegmentLightModeBackgroundColor,
  segmentItemStyles,
  segmentTextStyle,
  applySegmentItemStyleIndex,
  applySegmentItemTextStyleIndex,
  selectedIndex = 1,
  ...props
}: SegmentedControlProps<T>) => {
  const animatedSegmentWidth = useRef(new Animated.Value(0));
  const animatedTranslateX = useRef(new Animated.Value(0));
  const themeAnimation = useRef(new Animated.Value(0));

  const colorScheme = useColorScheme();

  const [selectedSegment, setSelectedSegment] = useState<T>(values[0]);
  const [segmentRect, setSegmentRect] = useState<LayoutRectangle | null>(null);

  const segmentedItemHandler = function (value: T) {
    if (selectedSegment !== value) {
      setSelectedSegment(value);
      if (onChange) {
        onChange(value);
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
    if (!applySegmentItemTextStyleIndex) {
      return segmentTextStyle;
    }
    return applySegmentItemTextStyleIndex && values.length && index === applySegmentItemTextStyleIndex - 1
      ? segmentTextStyle
      : undefined;
  };

  const backgroundColor = themeAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [activeSegmentLightModeBackgroundColor ?? grey[100], activeSegmentDarkModeBackgroundColor ?? grey[400]],
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
    if (segmentRect && values && values.length) {
      const width = segmentRect.width;
      animatedSegmentWidth.current.setValue(width);

      Animated.spring(animatedTranslateX.current, {
        useNativeDriver: false,
        toValue: width * (selectedIndex - 1),
      }).start();
    }

    if (selectedIndex && selectedIndex < values.length + 1) {
      setSelectedSegment(values[selectedIndex - 1]);
    }
  }, [segmentRect, selectedIndex, values]);

  return (
    <SegmentedControlContainer {...props}>
      <View style={styles.segmentContainer}>
        <Animated.View style={[styles.animatedSegmentContainer, animatedViewStyles]} />
        {values.map((value, index) => (
          <SegmentedControlItem
            onLayout={index === 0 ? onLayout : undefined}
            onPress={segmentedItemHandler}
            value={value}
            index={index}
            key={index}
            headingStyles={getSegmentItemHeadingStyle(index)}
            style={getSegmentItemStyle(index)}
          />
        ))}
      </View>
    </SegmentedControlContainer>
  );
};
