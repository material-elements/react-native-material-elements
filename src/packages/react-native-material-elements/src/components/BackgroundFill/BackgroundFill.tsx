import React from 'react';
import { Image, ImageProps, View, ViewProps, ViewStyle } from 'react-native';
import { useRestyle } from '../../hooks';
import { StyledProps } from '../../libraries/style/styleTypes';
import { styles } from './BackgroundFill.styles';

export interface BackgroundFillProps extends ViewProps, StyledProps {
  image?: ImageProps;
  overlay?: boolean;
  overlayStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const BackgroundFill = React.forwardRef<View, BackgroundFillProps>(
  ({ style, image, overlay, overlayStyle, children, contentContainerStyle, ...props }, ref) => {
    const { style: imageStyles, ...restImageProps } = image || {};
    const { getStyleFromProps } = useRestyle(restImageProps);

    return (
      <View style={[styles.container, getStyleFromProps(), style]} {...props} ref={ref}>
        {children ? <View style={[styles.contentContainer, contentContainerStyle]}>{children}</View> : null}
        {overlay ? <View style={[styles.overlay, overlayStyle]} /> : null}
        {image ? <Image style={[styles.image, imageStyles]} {...restImageProps} /> : null}
      </View>
    );
  },
);
