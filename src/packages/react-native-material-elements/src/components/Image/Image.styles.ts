import { ImageStyle, StyleSheet, ViewStyle } from 'react-native';
import { ElementRadius } from '../../libraries/style/styleTypes';
import { generateStyle } from '../../utils';
import {
  DEFAULT_ITEMS,
  IMAGE_ROUNDED_LG_RADIUS,
  IMAGE_ROUNDED_MD_RADIUS,
  IMAGE_ROUNDED_RADIUS,
  IMAGE_ROUNDED_SM_RADIUS,
  IMAGE_ROUNDED_XL_RADIUS,
  IMAGE_SQUARE_RADIUS,
} from './constants';
import { GenerateImageListItemStylesProps, ImageStyleInterface, ImageVariant } from './Image.types';

export const generateImageRadiusStyles = (variation: ImageVariant): ImageStyle => {
  let styles: ElementRadius = {};

  if (variation === 'rounded') {
    styles.borderRadius = IMAGE_ROUNDED_RADIUS;
  } else if (variation === 'square') {
    styles.borderRadius = IMAGE_SQUARE_RADIUS;
  } else if (variation === 'rounded-sm') {
    styles.borderRadius = IMAGE_ROUNDED_SM_RADIUS;
  } else if (variation === 'rounded-md') {
    styles.borderRadius = IMAGE_ROUNDED_MD_RADIUS;
  } else if (variation === 'rounded-lg') {
    styles.borderRadius = IMAGE_ROUNDED_LG_RADIUS;
  } else if (variation === 'rounded-xl') {
    styles.borderRadius = IMAGE_ROUNDED_XL_RADIUS;
  }

  return generateStyle({ propertyName: 'borderRadius', value: styles.borderRadius });
};

export const imageStyles = ({ expandToFill, size, width, height }: ImageStyleInterface): ImageStyle => {
  if (expandToFill) {
    return StyleSheet.absoluteFill as ImageStyle;
  }

  return {
    width: size ?? width,
    height: size ?? height,
  };
};

export const generateImageListItemStyles = ({
  index,
  itemSpace,
  itemBottomSpace,
  items = DEFAULT_ITEMS,
}: GenerateImageListItemStylesProps): ViewStyle => {
  const isFirstInRow = (index + 1) % items === 1;
  const isLastInRow = (index + 1) % items === 0;

  const paddingLeft = isFirstInRow ? 0 : itemSpace;
  const paddingRight = isLastInRow ? 0 : itemSpace;

  const applyPaddingLeft = items >= 2 ? paddingLeft : 0;
  const applyPaddingRight = items >= 2 ? paddingRight : 0;

  return {
    width: `${100 / items}%`,
    paddingLeft: applyPaddingLeft,
    paddingRight: applyPaddingRight,
    paddingBottom: itemBottomSpace,
  };
};
