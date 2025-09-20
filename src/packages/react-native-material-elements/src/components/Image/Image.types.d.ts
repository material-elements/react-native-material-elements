import React from 'react';
import { DimensionValue, Image, ImageProps as RnImageProps, ScrollView, View, ViewStyle } from 'react-native';
import { BaseStyles, StyledProps } from '../../libraries/style/styleTypes';

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
export interface ImageProps extends React.ComponentType<Image>, RnImageProps, ImageVariationProp, StyledProps {
  size?: DimensionValue;
  sx?: BaseStyles;
  expandToFill?: boolean;
}

/**
 * interface for properties that can be passed to an image list component
 * Extending React Native Scroll view component.
 */
export interface ImageListProps extends React.ComponentPropsWithRef<typeof ScrollView> {}

/**
 * Interface for properties that can be passed to an image list item component.
 * Extends React Native View component properties.
 */
export interface ImageListItemProps extends React.ComponentPropsWithRef<typeof View>, StyledProps {
  /**
   * index of the image list item.
   */
  index: number;
  /**
   * Additional styles for customization.
   */
  sx?: BaseStyles;
  /**
   * Number of items to be displayed in the list item.
   */
  items?: number;
  /**
   * Horizontal spacing between the image list items.
   */
  itemSpace?: number;
  /**
   * Vertical spacing between the image list items.
   */
  itemBottomSpace?: number;
  /**
   * Custom styles for list wrapper container
   */
  listWrapperContainerStyles?: ViewStyle;
  /**
   * Test id for list wrapper container
   */
  listWrapperTestId?: string;
}

export interface GenerateImageListItemStylesProps
  extends Pick<ImageListItemProps, 'index' | 'items' | 'itemSpace' | 'itemBottomSpace'> {}
export interface ImageStyleInterface extends Pick<ImageProps, 'expandToFill' | 'size' | 'height' | 'width'> {}
