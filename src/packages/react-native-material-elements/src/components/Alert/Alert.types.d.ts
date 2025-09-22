import { ColorSchemeName, TextStyle, ViewStyle } from 'react-native';
import { BoxProps } from '../types';
import { VariantTypes } from '../../utils';
import { ThemedIconProp } from '../../hooks';
import { Theme } from '../../libraries/types';

export interface AlertProps extends BoxProps {
  /** Main title text displayed in the alert */
  title?: string;
  /** Custom styles applied to the title text */
  titleStyles?: TextStyle;
  /** Optional subtitle or description below the title */
  subTitle?: string;
  /** Custom styles applied to the subtitle text */
  subTitleStyles?: TextStyle;
  /** Type of alert variant (e.g., success, error, warning) */
  variant?: VariantTypes;
  /** Optional action element (e.g., button or link) displayed inside the alert */
  action?: React.ReactNode;
  /** Defines the visual style of the alert: 'filled' for solid background, 'outlined' for bordered */
  variation?: 'filled' | 'outlined';
  /** Maximum length of the title text, useful for truncating or layout adjustment */
  titleMixLength?: number;
  /** Optional icon displayed at the start (left) of the alert */
  startIcon?: ThemedIconProp;
  /** Custom styles for the container wrapping the start icon */
  startIconContainerStyles?: ViewStyle;
  /** Optional icon displayed at the end (right) of the alert */
  endIcon?: ThemedIconProp;
  /** Custom styles for the container wrapping the end icon */
  endIconContainerStyles?: ViewStyle;
}
export interface GetAlertContainerStylesParams extends Pick<AlertProps, 'variant' | 'variation'> {
  colors: Theme;
}
export interface GetAlertTitleStylesParams extends Pick<AlertProps, 'variant' | 'variation'> {
  colorScheme: ColorSchemeName;
}
