import React from 'react';
import { Image as RnImage } from 'react-native';
import { Image } from '../Image';
import { CardMediaProps } from './Card.types';

export const CardMedia = React.forwardRef<RnImage, CardMediaProps>((props, ref) => {
  return <Image ref={ref} {...props} />;
});
