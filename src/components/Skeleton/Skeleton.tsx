import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, useColorScheme } from 'react-native';
import { gray } from '../../libraries';
import { Box } from '../Box';
import { BoxProps } from '../types';

type SkeletonProps = BoxProps & {
  animationDuration?: number;
};

export const Skeleton: React.FC<SkeletonProps> = ({ backgroundColor, animationDuration = 1000, ...props }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const getBackgroundColor = useCallback(() => {
    if (backgroundColor) {
      return backgroundColor;
    }
    return isDarkMode ? gray[800] : gray[400];
  }, [backgroundColor, isDarkMode]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return <Box animatedView style={{ opacity, backgroundColor: getBackgroundColor() }} {...props} />;
};
Skeleton.displayName = 'Skeleton';
