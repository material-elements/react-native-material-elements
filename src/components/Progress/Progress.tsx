import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, ColorValue, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Theme } from '../../libraries/themes/types';
import { VariantTypes } from '../../utils';
import { AnimatedView } from '../Box';
import { getProgressBarContainerStyles, getProgressBarIndicatorStyles } from './utils';

export interface ProgressBarProps extends React.ComponentPropsWithRef<typeof View> {
  progress?: number;
  variant?: VariantTypes;
  borderColor?: ColorValue;
  backgroundColor?: ColorValue;
}
export interface ProgressBarContainerStylesParams extends Pick<ProgressBarProps, 'borderColor'> {
  colors: Theme;
  variant?: VariantTypes;
}
export interface ProgressBarIndicatorStylesParams
  extends Pick<ProgressBarContainerStylesParams, 'colors' | 'variant'>,
    Pick<ProgressBarProps, 'backgroundColor'> {}

export const ProgressBar = React.forwardRef<View, ProgressBarProps>(
  ({ progress = 0, style, borderColor, backgroundColor, variant = 'secondary', testID, ...rest }, ref) => {
    const themeColors = useThemeColorsSelector();

    const animatedWidth = useRef(new Animated.Value(0)).current;
    const [width, setWidth] = useState(0);
    const [prevWidth, setPrevWidth] = useState(0);

    const progressBarContainerStyles = useMemo(() => {
      return getProgressBarContainerStyles({ colors: themeColors, variant, borderColor });
    }, [themeColors, variant, borderColor]);

    const progressBarIndicatorStyles = useMemo(() => {
      return getProgressBarIndicatorStyles({ variant, colors: themeColors, backgroundColor });
    }, [themeColors, variant, backgroundColor]);

    const startAnimation = useCallback(() => {
      Animated.spring(animatedWidth, {
        toValue: progress || 0,
        useNativeDriver: true,
        isInteraction: false,
      }).start();
    }, [animatedWidth, progress]);

    useEffect(() => {
      startAnimation();
    }, [startAnimation]);

    useEffect(() => {
      if (prevWidth === 0) {
        startAnimation();
      }
    }, [prevWidth, startAnimation]);

    const onLayout = (event: LayoutChangeEvent) => {
      setPrevWidth(width);
      setWidth(event.nativeEvent.layout.width);
    };

    const getTransformStyles = React.useCallback(() => {
      const getTranslateX = () => {
        return animatedWidth.interpolate({ inputRange: [0, 1], outputRange: [-1 * 0.5 * width, 0] });
      };

      const getScaleX = () => {
        return animatedWidth.interpolate({ inputRange: [0, 1], outputRange: [0.0001, 1] });
      };

      return [{ translateX: getTranslateX() }, { scaleX: getScaleX() }];
    }, [animatedWidth, width]);

    return (
      <View onLayout={onLayout} accessible testID={testID} ref={ref} {...rest}>
        <AnimatedView style={StyleSheet.flatten([styles.container, progressBarContainerStyles, style])}>
          {width ? (
            <AnimatedView
              testID={`${testID}-progress-indicator`}
              style={StyleSheet.flatten([
                styles.progressBar,
                progressBarIndicatorStyles,
                { width, transform: getTransformStyles() },
              ])}
            />
          ) : null}
        </AnimatedView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: 9,
    overflow: 'hidden',
    borderWidth: 0.6,
  },
  progressBar: {
    flex: 1,
  },
});
