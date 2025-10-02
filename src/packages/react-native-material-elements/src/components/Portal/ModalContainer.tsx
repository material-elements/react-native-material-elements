import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { getScaleTransform } from '../../utils';
import { Box } from '../Box';
import { createModalBackgroundStyles } from './Portal.styles';
import { ModalContainerProps } from './Portal.types';

export const ModalContainer = forwardRef<View, ModalContainerProps>(
  ({ style, sx, onClose, children, rootWrapperTestID, visible, origin = 'center', ...props }, ref) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [layout, setLayout] = useState({ width: 0, height: 0 });

    const styles = useMemo(() => createModalBackgroundStyles(), []);

    const onPressHandler = () => {
      if (onClose) {
        onClose();
      }
    };

    useEffect(() => {
      if (visible) {
        Animated.spring(animatedValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(animatedValue, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }, [animatedValue, visible]);

    const scaleTransform = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.95, 1],
    });

    return (
      <TouchableWithoutFeedback onPress={onPressHandler} testID={rootWrapperTestID}>
        <Box style={[styles, style]} sx={sx} ref={ref} {...props}>
          <Animated.View
            onLayout={e => setLayout(e.nativeEvent.layout)}
            style={{ transform: getScaleTransform(scaleTransform, layout, origin) }}>
            {children}
          </Animated.View>
        </Box>
      </TouchableWithoutFeedback>
    );
  },
);
