import { AnimatableNumericValue, DimensionValue, Image, ImageStyle, ImageProps as RnImageProps } from 'react-native';
import {
  ElementBorderRadiusMap,
  ElementRadius,
  ELementDimensionMap,
  ElementMargin,
  ElementPadding,
  ElementDimension,
  ElementFlexStyleProps,
} from '../../libraries/style/styleTypes';

/**
 * Define the type for the variant of the image.
 */
export type ImageVariant = 'square' | 'rounded' | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl';

/**
 * Interface for the image variation property, which may be used in styling.
 */
export interface ImageVariationProp {
  variation?: ImageVariant;
}

/**
 * Interface for properties that can be passed to an image component.
 * Extends React Native ImageProps and ImageVariationProp for styling flexibility.
 */
export interface ImageProps extends React.ComponentType<Image>, RnImageProps, ImageVariationProp {
  /**
   * Size of the image.
   */
  size?: DimensionValue;
  sx?: ELementDimensionMap<ElementPadding | ElementMargin | ElementDimension> & ElementBorderRadiusMap & ElementFlexStyleProps;
}
