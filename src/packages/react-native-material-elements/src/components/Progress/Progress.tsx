import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, ColorValue, DimensionValue, I18nManager, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { useRestyle } from '../../hooks';
import { useThemeColorsSelector } from '../../libraries';
import { StyledProps } from '../../libraries/style/styleTypes';
import { Theme } from '../../libraries/types';
import { VariantTypes } from '../../utils';
import { AnimatedView } from '../Box';
import { getProgressBarContainerStyles, getProgressBarIndicatorStyles } from './utils';

export interface ProgressBarProps extends React.ComponentPropsWithRef<typeof View>, StyledProps {
  /**
   * Hight of the progress bar container
   */
  height?: DimensionValue;
  /**
   * The current progress value of the progress bar.
   * Should be a number between 0 and 1 (e.g., 0.5 represents 50% progress).
   * Optional. Default behavior assumes no progress value is specified.
   */
  progress?: number;

  /**
   * The visual style or theme variant of the progress bar.
   * Use this to define a pre-defined styling variation (e.g., primary, secondary).
   */
  variant?: VariantTypes;

  /**
   * The color of the border surrounding the progress bar.
   * Accepts any valid ColorValue (e.g., hex, rgba, or named colors).
   */
  borderColor?: ColorValue;

  /**
   * The background color of the progress bar.
   * Specifies the unfilled portion's color behind the progress indicator.
   */
  backgroundColor?: ColorValue;

  /**
   * Determines whether to remove the border from the progress bar.
   * Set to `true` to hide the border entirely.
   */
  removeBorder?: boolean;

  /**
   * The width of the border around the progress bar.
   * Only applied when `removeBorder` is false.
   */
  borderWidth?: number;

  /**
   * Indicates whether the progress bar operates in an indeterminate mode.
   * When `true`, the bar animates to show an ongoing activity without a defined progress value.
   */
  indeterminate?: boolean;

  /**
   * Border radius of the progress bar
   */
  borderRadius?: number;
}
export interface ProgressBarContainerStylesParams
  extends Pick<ProgressBarProps, 'borderColor' | 'removeBorder' | 'borderWidth' | 'height' | 'borderRadius'> {
  colors: Theme;
  variant?: VariantTypes;
}
export interface ProgressBarIndicatorStylesParams
  extends Pick<ProgressBarContainerStylesParams, 'colors' | 'variant'>,
    Pick<ProgressBarProps, 'backgroundColor'> {}

const INDETERMINATE_DURATION = 2000;
const INDETERMINATE_MAX_WIDTH = 0.6;
const { isRTL } = I18nManager;

export const ProgressBar = React.forwardRef<View, ProgressBarProps>(
  (
    {
      style,
      borderColor,
      backgroundColor,
      testID,
      height = 9,
      indeterminate = false,
      variant = 'secondary',
      removeBorder = false,
      borderWidth = 0.6,
      progress = 0,
      borderRadius = 3,
      ...rest
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const { getStyleFromProps } = useRestyle(rest);

    const animatedWidth = useRef(new Animated.Value(0)).current;
    const indeterminateAnimation = React.useRef<Animated.CompositeAnimation | null>(null);

    const [width, setWidth] = useState(0);
    const [prevWidth, setPrevWidth] = useState(0);

    const progressBarContainerStyles = useMemo(() => {
      return getProgressBarContainerStyles({
        colors: themeColors,
        variant,
        borderColor,
        removeBorder,
        borderWidth,
        height,
        borderRadius,
      });
    }, [themeColors, variant, borderColor, removeBorder, borderWidth, height, borderRadius]);

    const progressBarIndicatorStyles = useMemo(() => {
      return getProgressBarIndicatorStyles({ variant, colors: themeColors, backgroundColor });
    }, [themeColors, variant, backgroundColor]);

    const startAnimation = useCallback(() => {
      if (indeterminate) {
        indeterminateAnimation.current ??= Animated.timing(animatedWidth, {
          duration: INDETERMINATE_DURATION,
          toValue: 1,
          useNativeDriver: true,
          isInteraction: false,
        });

        animatedWidth.setValue(0);

        Animated.loop(indeterminateAnimation.current).start();
      } else {
        Animated.spring(animatedWidth, {
          toValue: progress || 0,
          useNativeDriver: true,
          isInteraction: false,
        }).start();
      }
    }, [animatedWidth, indeterminate, progress]);

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
        return animatedWidth.interpolate(
          indeterminate
            ? {
                inputRange: [0, 0.5, 1],
                outputRange: [
                  (isRTL ? 1 : -1) * 0.5 * width,
                  (isRTL ? 1 : -1) * 0.5 * INDETERMINATE_MAX_WIDTH * width,
                  (isRTL ? -1 : 1) * 0.7 * width,
                ],
              }
            : {
                inputRange: [0, 1],
                outputRange: [(isRTL ? 1 : -1) * 0.5 * width, 0],
              },
        );
      };

      const getScaleX = () => {
        return animatedWidth.interpolate(
          indeterminate
            ? {
                inputRange: [0, 0.5, 1],
                outputRange: [0.0001, INDETERMINATE_MAX_WIDTH, 0.0001],
              }
            : {
                inputRange: [0, 1],
                outputRange: [0.0001, 1],
              },
        );
      };

      return [{ translateX: getTranslateX() }, { scaleX: getScaleX() }];
    }, [animatedWidth, indeterminate, width]);

    return (
      <View onLayout={onLayout} accessible testID={testID} ref={ref} {...rest}>
        <AnimatedView style={[styles.container, progressBarContainerStyles, getStyleFromProps(), style]}>
          {width ? (
            <AnimatedView
              testID={`${testID}-progress-indicator`}
              style={[styles.progressBar, progressBarIndicatorStyles, { width, transform: getTransformStyles() }]}
            />
          ) : null}
        </AnimatedView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  progressBar: {
    flex: 1,
  },
});
