import React from 'react';
import { Animated, ColorValue, GestureResponderEvent, StyleProp, TextStyle } from 'react-native';
import { Theme } from '../../libraries/themes/v1/theme';
import { DefaultVariationOptions, VariantTypes, VariationThemeConfig } from '../../utils';
import { BoxProps } from '../Box/Box.types';
import { BaseButtonProps } from '../Button/Button.types';

type PaginationItemColor = 'primary' | 'secondary' | 'standard' | 'error';
type PaginationShape = 'circular' | 'rounded';
type PaginationVariant = 'outlined' | 'text';

export type PaginationThemeConfig = {
  colors?: VariationThemeConfig<DefaultVariationOptions>;
};

/**
 * Props for a single pagination item.
 */
export interface PaginationItemProps extends Omit<BaseButtonProps, 'children' | 'ref' | 'sx'> {
  /**
   * The page number or a special string value like 'start-dots' or 'end-dots'.
   * This determines what will be displayed on the pagination item.
   */
  page?: number | string;

  /**
   * Indicates if the pagination item is the currently active page.
   * This can be used to apply specific styles to the active page.
   */
  active?: boolean;

  /**
   * Background color for the ripple effect when the pagination item is pressed.
   */
  rippleBackgroundColor?: ColorValue;

  /**
   * The active color
   */
  color?: VariantTypes;
  /**
   * pagination item shape
   */
  shape?: PaginationShape;
  /**
   * pagination item variations
   */
  variant?: PaginationVariant;
  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;

  themeColorScheme?: PaginationThemeConfig['colors'];
}

/**
 * Styles props for a single pagination item.
 * It extends from PaginationItemProps to reuse its properties for styling purposes.
 */
export interface PaginationItemStylesProps
  extends Pick<PaginationItemProps, 'color' | 'shape' | 'variant' | 'disabled' | 'themeColorScheme'> {
  isActive: Animated.Value;
  colors: Theme;
}

/**
 * Props for the Pagination component.
 */
export interface PaginationProps extends Omit<BoxProps, 'color'>, Pick<PaginationItemProps, 'color' | 'variant'> {
  /**
   * The total number of pages.
   * This is used to determine the range of pagination items to render.
   */
  count: number;

  /**
   * Callback function called when a pagination item is clicked.
   * It provides the event and the page number as arguments.
   */
  onPageChange?: (event: GestureResponderEvent, page: number) => void;

  /**
   * Additional props to be passed to the dot container.
   * This can be used to style the container that holds the dots (e.g., 'start-dots', 'end-dots').
   */
  dotContainerProps?: Omit<BoxProps, 'children'>;

  /**
   * Additional styles to be applied to the dot elements (e.g., 'start-dots', 'end-dots').
   */
  dotStyles?: StyleProp<TextStyle>;

  /**
   * Additional props to be passed to each pagination item.
   * It omits the 'page' property since each item will have its own page value.
   */
  paginationItemProps?: PaginationItemProps;

  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;

  /**
   * active state of the component
   */
  activeCount?: number;

  /**
   * custom pagination item.
   */
  renderItem?: React.ReactNode;

  /**
   * pagination item shape
   */
  itemShape?: PaginationShape;
}
