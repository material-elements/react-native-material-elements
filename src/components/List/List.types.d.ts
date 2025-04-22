import React from 'react';
import { ColorValue, TextStyle, View, ViewStyle } from 'react-native';
import { ThemedIconProp } from '../../hooks';
import { BaseStyles, StyledProps } from '../../libraries/style/styleTypes';
import { Theme } from '../../libraries/themes/v1/theme';
import { BaseButtonProps } from '../Button/Button.types';
import { TextProps } from '../Typography/Text.types';
import { BoxProps } from '../types';

/**
 * Interface for the List component properties, extending the properties of a View component
 * This interface defines the props that can be passed to a List component.
 */
export interface ListProps extends React.ComponentPropsWithRef<typeof View>, StyledProps {
  /**
   * Optional custom styles for the List component.
   * This can be used to apply additional styling to the List component.
   */
  sx?: BaseStyles;

  /**
   * The content of the subheader, normally ListSubheader.
   * This property allows you to set a subheader for the List.
   * It can be a string or a number.
   */
  subheader?: string | number;

  /**
   * Styles for the container of the subheader.
   * This property can be used to style the box containing the subheader.
   */
  subheaderContainerStyles?: ViewStyle;

  /**
   * Test id for sub header container
   */
  subHeaderContainerTestId?: string;

  /**
   * Properties for the subheader text component.
   * This allows customization of the subheader text properties, excluding the children prop.
   */
  subheaderProps?: Omit<TextProps, 'children'>;

  /**
   * If true, vertical padding is removed from the list.
   * This property is useful to adjust the spacing within the List component.
   */
  disablePadding?: boolean;
}

/**
 * Interface for the ListItem component properties, extending from BaseButtonProps
 * This interface defines the props that can be passed to a ListItem component.
 */
export interface ListItemProps extends Omit<BaseButtonProps, 'sx'>, StyledProps {
  /**
   * Optional styles for the container of the ListItem.
   * This can be used to apply additional styling to the ListItem container.
   */
  listContainerStyles?: ViewStyle;

  /**
   * Test id for list item container
   */
  listItemContainerTestId?: string;

  /**
   * Optional element to be displayed at the end of the ListItem.
   * This property allows adding a custom element, such as an icon, at the end of the ListItem.
   */
  endAdornment?: ThemedIconProp;

  /**
   * Optional styles for the container of the endAdornment.
   * This can be used to apply additional styling to the container of the endAdornment.
   */
  endAdornmentContainerStyles?: ViewStyle;

  /**
   * Optional element to be displayed at the start of the ListItem.
   * This property allows adding a custom element, such as an icon, at the end of the ListItem.
   */
  startAdornment?: ThemedIconProp;

  /**
   * Optional styles for the container of the startAdornment.
   * This can be used to apply additional styling to the container of the endAdornment.
   */
  startAdornmentContainerStyles?: ViewStyle;

  /**
   * Use to apply selected styling.
   * This property indicates if the ListItem is selected, allowing you to apply selected styles.
   */
  selected?: boolean;

  /**
   * Custom color for selected list element
   */
  selectedColor?: ColorValue;

  /**
   * Remove the bottom spacing
   */
  disableBottomSpacing?: boolean;

  /**
   * Override the root disable bottom spacing configuration
   */
  overrideRootBottomSpacing?: boolean;

  /**
   * Different types of bottom spacing
   */
  bottomSpacingType?: 'small' | 'medium' | 'large';

  /**
   * Used for check the onPress event handler positioning in the top of the container or in the list element.
   */
  actionType?: 'root' | 'list';

  /**
   * show the list component border
   */
  showOutline?: boolean;

  /**
   * List item component border width
   */
  outlineWidth?: number;

  /**
   * List item component outline color
   */
  outlineColor?: ColorValue;

  /**
   * The showDefaultBg prop is used for show the list item component default background color
   */
  showDefaultBg?: boolean;

  /**
   * Soft border radius
   */
  softRadius?: boolean;
}

/**
 * Interface for ListItemIcon component properties, extending the properties of ViewProps
 */
export interface ListItemIconProps extends BoxProps {}

/**
 * Interface for ListItemText component properties, extending ListProps but omitting the 'children' property
 * This interface defines the props that can be passed to a ListItemText component.
 */
export interface ListItemTextProps extends ListProps {
  /**
   * Optional primary text for the ListItemText component.
   * This property allows you to set the main text for the ListItemText component.
   */
  primary?: string;

  /**
   * Optional properties for the primary text label.
   */
  primaryLabelStyles?: TextStyle;

  /**
   * Primary text label props
   */
  primaryLabelProps?: Omit<TextProps, 'children'>;

  /**
   * Optional secondary text for the ListItemText component.
   * This property allows you to set additional text for the ListItemText component.
   */
  secondary?: string;

  /**
   * Optional properties for the secondary text label.
   */
  secondaryLabelStyles?: TextStyle;

  /**
   * Secondary text label props
   */
  secondaryLabelProps?: Omit<TextProps, 'children'>;

  /**
   * Optional flag to disable padding for the ListItemText component.
   * This property can be used to remove padding from the ListItemText component.
   */
  disablePadding?: boolean;

  /**
   * Alignment of the items within the ListItemText component.
   * This property allows you to align the items to the start, middle, or end.
   */
  alignItems?: 'start' | 'middle' | 'end';

  /**
   * disable the left padding
   */
  disableLeftPadding?: boolean;
}

/**
 * Interface for styles related to ListItemText component, focusing on the disablePadding property
 * This interface defines styles specific to the ListItemText component.
 */
export interface ListItemTextStylesProps
  extends Pick<ListItemTextProps, 'disablePadding' | 'alignItems' | 'disableLeftPadding'> {}

/**
 * Interface for styles related to the ListItem container, focusing on the selected property
 * This interface defines styles specific to the ListItem container.
 */
export interface ListItemContainerStylesProps
  extends Pick<
    ListItemProps,
    'selected' | 'selectedColor' | 'showOutline' | 'outlineWidth' | 'outlineColor' | 'showDefaultBg' | 'softRadius'
  > {
  colors: Theme;
}

/**
 * Interface for styles related to the List component, focusing on the disablePadding property
 * This interface defines styles specific to the List component.
 */
export interface ListStylesProps extends Pick<ListProps, 'disablePadding'> {}
