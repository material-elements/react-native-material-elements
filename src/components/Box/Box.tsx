import React, { useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useRestyle } from '../../hooks';
import { generateElementStyles } from '../../utils';
import { BoxProps } from './Box.types';

export interface AnimatedViewProps extends React.ComponentPropsWithRef<typeof Animated.View> {}
export const AnimatedView = React.forwardRef<View, AnimatedViewProps>((props, ref) => {
  return <Animated.View {...props} ref={ref} />;
});

export const Box = React.forwardRef<View, BoxProps>(({ children, style, sx, animatedView = false, ...props }, ref) => {
  const { getStyleFromProps } = useRestyle(props);

  const generatedStyles = useMemo(() => {
    return StyleSheet.create({ boxSX: sx ? generateElementStyles(sx) : {} });
  }, [sx]);

  if (animatedView) {
    return <AnimatedView ref={ref} style={[generatedStyles.boxSX, getStyleFromProps(), style]} {...props} />;
  }

  return (
    <View ref={ref} style={[generatedStyles.boxSX, getStyleFromProps(), style]} {...props}>
      {children}
    </View>
  );
});

Box.displayName = 'Box';
