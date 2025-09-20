import React from 'react';
import { Animated, TextStyle, View, ViewStyle } from 'react-native';
import { StyledProps } from '../../libraries/style/styleTypes';
import { Theme, WithThemeComponentConfig } from '../../libraries/themes/theme';
import { DefaultVariationOptions, VariantTypes, VariationThemeConfig } from '../../utils';
import { BoxProps } from '../Box/Box.types';

export type BadgeVariationThemeConfig = {
  colors?: VariationThemeConfig<DefaultVariationOptions>;
};

/**
 * Defines the available variants for the badge.
 */
export type BadgeVariant = 'dot' | 'badge';

export type BadgeOverlap = 'circular' | 'rectangular';

/**
 * Defines the anchor origin configuration for positioning the badge.
 */
export interface AnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

/**
 * Props for the badge component.
 */
export interface BadgeProps extends React.ComponentPropsWithRef<typeof View>, StyledProps {
  /**
   * Content to be displayed inside the badge.
   */
  badgeContent?: string | number;
  /**
   * Maximum value for the badge content.
   */
  max?: number;
  /**
   * Override the root max value
   */
  shouldOverrideRootMaxValue?: boolean;
  /**
   * Style variation of the badge.
   */
  variation?: VariantTypes;
  /**
   * Style variant of the badge.
   */
  variant?: BadgeVariant;
  /**
   * Indicates whether the badge should be invisible.
   */
  invisible?: boolean;
  /**
   * Duration of badge animation.
   */
  badgeAnimationDuration?: number;
  /**
   * Props for customizing the content displayed inside the badge.
   */
  badgeContentStyle?: TextStyle;
  /**
   * Anchor origin configuration to position the badge.
   */
  anchorOrigin?: AnchorOrigin;
  /**
   * Override the root anchor configuration
   */
  shouldOverrideRootAnchor?: boolean;
  /**
   * badger container props for customizing the badge wrapper element.
   */
  badgeContainerProps?: BadgeContainerProps;
  /**
   * Wrapped shape the badge should overlap.
   */
  overlap?: BadgeOverlap;
  /**
   * Badge root container styles
   */
  containerStyles?: ViewStyle;
  /**
   * Override root config
   */
  overrideRootConfig?: boolean;
}

/**
 * Props for the container that wraps the badge.
 */
export interface BadgeContainerProps extends Pick<BadgeProps, 'overlap'>, BoxProps {}

/**
 * Props used for generating badge styles.
 */
export type GenerateBadgeStylesProps = WithThemeComponentConfig<
  'badgeProps',
  Pick<BadgeProps, 'variation' | 'variant' | 'anchorOrigin' | 'overrideRootConfig' | 'shouldOverrideRootAnchor'> & {
    themeColors: Theme;
    /** Animated value controlling the visibility of the badge. */
    badgeVisibility?: Animated.Value;
  }
>;

export interface PlaceBadgeBasedPosition extends Pick<GenerateBadgeStylesProps, 'anchorOrigin' | 'variant'> {}
export interface GenerateBadgeContainerStylesProps extends Pick<BadgeContainerProps, 'overlap'> {}
export interface BadgeContentDefaultStylesProps {
  variation?: VariantTypes;
}
