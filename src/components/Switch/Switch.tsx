import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useThemeColorsSelector, useThemeSwitchConfigSelector } from '../../libraries';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { DefaultVariationOptions, generateElementStyles, getVariant, VariantTypes, VariationThemeConfig } from '../../utils';
import { getSwitchSizes } from './utils';

export type SwitchThemeConfig = {
  colors?: VariationThemeConfig<DefaultVariationOptions>;
};

/**
 * Define a union type for the possible size of a switch component
 */
export type SwitchSize = 'small' | 'medium' | 'large';

export interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof TouchableWithoutFeedback>, 'onPress' | 'style'> {
  /**
   * Callback function that is called when the switch is toggled.
   */
  onToggle?: () => void;

  /**
   * Duration of the toggle animation in milliseconds.
   * Controls how long the animation takes to transition from one state to another. Defaults to 200ms.
   */
  toggleDuration?: number;

  /**
   * Override root toggle duration config
   */
  overrideRootToggleDuration?: boolean;

  /**
   * Duration of the toggle wrapper animation in milliseconds.
   * Controls how long the animation takes to transition from one state to another. Defaults to 200ms.
   */
  toggleWrapperBgDuration?: number;

  /**
   * Override root toggle bg duration config
   */
  overrideRootToggleBgDuration?: boolean;

  /**
   * Active background color of the switch component
   */
  wrapperDefaultBgColor?: string;

  /**
   * Default background color of the switch component
   */
  wrapperActiveBgColor?: string;

  /**
   * Custom styles for the thumb (the movable part) of the switch.
   * Accepts a style object to customize the appearance of the thumb.
   */
  thumbStyles?: ViewStyle;

  /**
   * Custom styles for the switch container.
   * Accepts a style object to customize the appearance of the switch container.
   */
  style?: ViewStyle;

  /**
   * Additional styles that can be applied to the switch component.
   * This property allows for the inclusion of any base styles, making the component more flexible.
   */
  sx?: BaseStyles;

  /**
   * including 'primary', 'secondary', 'success', 'error', 'info', or 'warning'.
   */
  variant?: VariantTypes;

  /**
   * including 'small', 'medium', 'large',
   */
  size?: SwitchSize;

  /**
   * testID for the switch container
   */
  containerTestID?: string;

  /**
   * testID for the switch thumb
   */
  thumbTestID?: string;

  /**
   * Active state of the switch
   */
  isActive?: boolean;
}

export interface GetSwitchSizesArgs extends Pick<SwitchProps, 'size'> {}

export const Switch = React.forwardRef<View, SwitchProps>(
  (
    {
      onToggle,
      wrapperActiveBgColor,
      wrapperDefaultBgColor,
      thumbStyles,
      style,
      sx,
      containerTestID,
      thumbTestID,
      variant = 'primary',
      size = 'medium',
      overrideRootToggleBgDuration = false,
      toggleWrapperBgDuration = 200,
      toggleDuration = 220,
      overrideRootToggleDuration = false,
      isActive = false,
      ...props
    },
    ref,
  ) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const switchWrapperBgAnimatedValue = useRef(new Animated.Value(0)).current;

    const [containerWidth, setContainerWidth] = useState(0);
    const [thumbWidth, setThumbWidth] = useState(0);

    const themeColors = useThemeColorsSelector();
    const switchThemeConfig = useThemeSwitchConfigSelector();

    const switchWrapperDefaultBgColor = wrapperDefaultBgColor ?? switchThemeConfig?.wrapperDefaultBgColor;
    const switchWrapperActiveBgColor = wrapperActiveBgColor ?? switchThemeConfig?.wrapperActiveBgColor;

    const switchToggleBgDuration = () => {
      if (overrideRootToggleBgDuration) {
        return toggleDuration;
      }
      return switchThemeConfig?.toggleWrapperBgDuration ?? toggleWrapperBgDuration;
    };

    const switchToggleDuration = () => {
      if (overrideRootToggleDuration) {
        return toggleDuration;
      }
      return switchThemeConfig?.toggleDuration ?? toggleDuration;
    };

    const { colors: themeColorScheme } = switchThemeConfig || {};

    useEffect(() => {
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: isActive ? 1 : 0,
          duration: switchToggleDuration(),
          useNativeDriver: true,
        }),
        Animated.timing(switchWrapperBgAnimatedValue, {
          toValue: isActive ? 1 : 0,
          duration: switchToggleBgDuration(),
          useNativeDriver: true,
        }),
      ]).start();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    const handleContainerLayout = (event: LayoutChangeEvent) => {
      setContainerWidth(event.nativeEvent.layout.width);
    };

    const handleThumbLayout = (event: LayoutChangeEvent) => {
      setThumbWidth(event.nativeEvent.layout.width);
    };

    const switchThumbAnimationStyles: ViewStyle = {
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, containerWidth - thumbWidth - 4],
          }),
        },
      ],
    };

    const backgroundColorInterpolation = switchWrapperBgAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        switchWrapperDefaultBgColor ?? themeColors.grey[300],
        switchWrapperActiveBgColor ?? (getVariant({ variant, colors: themeColors, config: themeColorScheme }) as string),
      ],
    });

    return (
      <View ref={ref}>
        <TouchableWithoutFeedback onPress={onToggle} {...props}>
          <Animated.View
            style={StyleSheet.flatten([
              styles.switchContainer,
              getSwitchSizes({ size }).thumbContainerStyles,
              { backgroundColor: backgroundColorInterpolation },
              switchThemeConfig?.style,
              style,
              sx && generateElementStyles(sx),
            ])}
            onLayout={handleContainerLayout}
            testID={containerTestID}>
            <Animated.View
              style={StyleSheet.flatten([
                styles.thumb,
                getSwitchSizes({ size }).thumbStyles,
                switchThumbAnimationStyles,
                switchThemeConfig?.thumbStyles,
                thumbStyles,
              ])}
              onLayout={handleThumbLayout}
              testID={thumbTestID}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  },
);
Switch.displayName = 'Switch';

const styles = StyleSheet.create({
  switchContainer: {
    borderRadius: 15,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    borderRadius: 13,
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
