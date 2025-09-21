import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Box } from '../Box';
import { Ripple } from '../Ripple';
import { RippleInterface } from '../Ripple/Ripple.types';
import { BaseButtonProps } from './Button.types';

export const BaseButton = React.forwardRef<View, BaseButtonProps>(
  (
    {
      disableRipple,
      disabled,
      children,
      rippleProps,
      rippleEdge,
      style,
      sx,
      baseButtonContainerStyle,
      onLayout: onLayoutHandler,
      onPress: onPressHandler,
      onLongPress: onLongPressHandler,
      componentWrapperProps,
      scaleAnimationValue = 0.99,
      disableScaleAnimation = false,
      scaleAnimationDuration = 200,
      ...props
    },
    ref,
  ) => {
    const rippleRef = useRef<RippleInterface>(null);
    const [buttonLayoutRectangle, setButtonLayoutRectangle] = useState<LayoutRectangle>();
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.timing(scaleValue, {
        toValue: scaleAnimationValue,
        duration: scaleAnimationDuration,
        useNativeDriver: true,
      }).start(handlePressOut);
    };

    const handlePressOut = () => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: scaleAnimationDuration,
        useNativeDriver: true,
      }).start();
    };

    const buttonPressHandler = (event: GestureResponderEvent) => {
      if (onPressHandler && typeof onPressHandler === 'function' && !disabled) {
        if (!disableScaleAnimation) {
          handlePressIn();
        }
        const { locationX, locationY } = event.nativeEvent;
        if (rippleRef.current && buttonLayoutRectangle) {
          if (rippleEdge) {
            rippleRef.current?.createRippleFromPosition(rippleEdge, buttonLayoutRectangle);
          } else {
            rippleRef.current.startRipple(locationX, locationY);
          }
        }
        onPressHandler(event);
      }
    };

    const buttonLongPressHandler = (event: GestureResponderEvent) => {
      if (onLongPressHandler && !disabled) {
        const { locationX, locationY } = event.nativeEvent;
        if (rippleRef.current && buttonLayoutRectangle) {
          if (rippleEdge) {
            rippleRef.current?.createRippleFromPosition(rippleEdge, buttonLayoutRectangle);
          } else {
            rippleRef.current.startRipple(locationX, locationY);
          }
        }
        onLongPressHandler(event);
      }
    };

    const buttonLayoutHandler = useCallback(
      (event: LayoutChangeEvent) => {
        const { layout } = event.nativeEvent;
        setButtonLayoutRectangle(layout);
        if (onLayoutHandler && typeof onLayoutHandler === 'function') {
          onLayoutHandler(event);
        }
      },
      [onLayoutHandler],
    );

    return (
      <Box ref={ref} sx={sx} style={baseButtonContainerStyle}>
        <TouchableWithoutFeedback
          onPress={buttonPressHandler}
          onLongPress={buttonLongPressHandler}
          onLayout={buttonLayoutHandler}
          disabled={disabled}
          {...props}>
          <Animated.View
            pointerEvents="box-only"
            style={[{ transform: [{ scale: scaleValue }] }, style]}
            {...componentWrapperProps}>
            {children}
            {disableRipple ? null : <Ripple ref={rippleRef} {...rippleProps} />}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Box>
    );
  },
);
