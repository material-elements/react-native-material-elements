import React from 'react';
import { DimensionValue, Image, ImageProps, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { styles } from './BackgroundFill.styles';

export interface BackgroundFillProps extends ViewProps {
  image?: ImageProps;
  height?: DimensionValue;
  overlay?: boolean;
  overlayStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const BackgroundFill = React.forwardRef<View, BackgroundFillProps>(
  ({ style, image, height, overlay, overlayStyle, children, contentContainerStyle, ...props }, ref) => {
    const { style: imageStyles, ...restImageProps } = image || {};

    return (
      <View style={StyleSheet.flatten([styles.container, { height }, style])} {...props} ref={ref}>
        {children ? <View style={StyleSheet.flatten([styles.contentContainer, contentContainerStyle])}>{children}</View> : null}
        {overlay ? <View style={StyleSheet.flatten([styles.overlay, overlayStyle])} /> : null}
        {image ? <Image style={StyleSheet.flatten([styles.image, imageStyles])} {...restImageProps} /> : null}
      </View>
    );
  },
);
