import React, { useImperativeHandle, useState } from 'react';
import { Animated, Easing, LayoutRectangle, StyleSheet, View, ViewStyle } from 'react-native';
import { generateUniqueId } from '../../utils';
import { RIPPLE_DURATION, RIPPLE_RADIUS, RIPPLE_SIZE } from './constants';
import { RippleInterface, RippleObject, RipplePosition, RippleProps, onRippleAnimationType } from './Ripple.types';

const rippleContainerDefaultStyles: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'transparent',
  overflow: 'hidden',
};

const rippleDefaultStyles: ViewStyle = {
  width: RIPPLE_RADIUS * 2,
  height: RIPPLE_RADIUS * 2,
  borderRadius: RIPPLE_RADIUS,
  overflow: 'hidden',
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.147)',
};

export const Ripple = React.forwardRef<RippleInterface, RippleProps>(
  ({ rippleStyles, rippleAnimationStyles, rippleContainerStyles, ...props }, ref) => {
    const [ripples, setRipples] = useState<Array<RippleObject>>([]);

    const onRippleAnimationHandler: onRippleAnimationType = (animation, callBack) => {
      animation.start(callBack);
    };

    const onRippleAnimationEnd = () => {
      setRipples(prevState => prevState.slice(1));
    };

    const createRippleFromPosition = function (position: RipplePosition, elementLayoutRectangle: LayoutRectangle) {
      const { width, height } = elementLayoutRectangle;

      const positionCoordinates: Record<RipplePosition, [number, number]> = {
        center: [width / 2, height / 2],
        topLeft: [0, 0],
        topRight: [width, 0],
        bottomLeft: [0, height],
        bottomRight: [width, height],
      };

      if (position in positionCoordinates) {
        const [x, y] = positionCoordinates[position];
        startRipple(x, y);
      }
    };

    const startRipple = function (positionX: number, positionY: number) {
      let ripple = {
        progress: new Animated.Value(0),
        positionX: positionX - RIPPLE_SIZE / 2,
        positionY: positionY - RIPPLE_SIZE / 2,
        radius: RIPPLE_RADIUS,
        id: generateUniqueId(),
      };

      let animation = Animated.timing(ripple.progress, {
        toValue: 1,
        easing: Easing.out(Easing.ease),
        duration: RIPPLE_DURATION,
        useNativeDriver: true,
      });

      onRippleAnimationHandler(animation, onRippleAnimationEnd);
      setRipples(prevState => prevState.concat(ripple));
    };

    const renderRipple = function (item: RippleObject) {
      let rippleAnimationDefaultStyles: ViewStyle = {
        top: item.positionY,
        left: item.positionX,
        transform: [{ scale: item.progress.interpolate({ inputRange: [0, 1], outputRange: [0.5, RIPPLE_SIZE * 2] }) }],
        opacity: item.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        }),
      };

      return (
        <Animated.View
          style={StyleSheet.flatten([
            rippleStyles ? { ...rippleDefaultStyles, ...rippleStyles } : rippleDefaultStyles,
            [
              rippleAnimationStyles
                ? { ...rippleAnimationDefaultStyles, ...rippleAnimationStyles }
                : rippleAnimationDefaultStyles,
            ],
          ])}
          key={item.id}
        />
      );
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          startRipple,
          createRippleFromPosition,
        } as RippleInterface;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    return (
      <View ref={ref} style={[rippleContainerDefaultStyles, rippleContainerStyles]} {...props}>
        {ripples.map(item => renderRipple(item))}
      </View>
    );
  },
);

Ripple.displayName = 'Ripple';
