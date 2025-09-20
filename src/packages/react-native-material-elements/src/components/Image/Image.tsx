import React from 'react';
import { Animated, ImageStyle, Image as RnImage } from 'react-native';
import { useRestyle } from '../../hooks';
import { generateElementStyles } from '../../utils';
import { generateImageRadiusStyles, imageStyles } from './Image.styles';
import { ImageProps } from './Image.types';

export const Image = React.forwardRef<RnImage, ImageProps>(
  ({ size, variation, style, sx, width, height, expandToFill = false, ...props }, ref) => {
    const { getStyleFromProps } = useRestyle(props);

    return (
      <Animated.Image
        ref={ref}
        style={[
          imageStyles({ expandToFill, size, height, width }),
          variation && generateImageRadiusStyles(variation),
          sx && (generateElementStyles(sx) as ImageStyle),
          getStyleFromProps(),
          style,
        ]}
        {...props}
      />
    );
  },
);

Image.displayName = 'Image';
