import React, { useMemo } from 'react';
import { ColorSchemeName, StyleSheet, TextStyle, useColorScheme, View, ViewStyle } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Theme } from '../../libraries/themes/types';
import { VariantTypes } from '../../utils';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { Text } from '../Typography';
import { getAlertContainerStyles, getAlertTitleStyles } from './utils';

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
  startIcon?: React.ReactNode;
  /** Custom styles for the container wrapping the start icon */
  startIconContainerStyles?: ViewStyle;
  /** Optional icon displayed at the end (right) of the alert */
  endIcon?: React.ReactNode;
  /** Custom styles for the container wrapping the end icon */
  endIconContainerStyles?: ViewStyle;
}
export interface GetAlertContainerStylesParams extends Pick<AlertProps, 'variant' | 'variation'> {
  colors: Theme;
}
export interface GetAlertTitleStylesParams extends Pick<AlertProps, 'variant' | 'variation'> {
  colorScheme: ColorSchemeName;
}

export const Alert = React.forwardRef<View, AlertProps>(
  (
    {
      style,
      title,
      titleStyles,
      action,
      titleMixLength,
      subTitle,
      subTitleStyles,
      startIcon,
      startIconContainerStyles,
      endIcon,
      endIconContainerStyles,
      variant = 'success',
      variation = 'filled',
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const colorScheme = useColorScheme();

    const alertContainerStyles = useMemo(() => {
      return getAlertContainerStyles({ colors: themeColors, variant, variation });
    }, [themeColors, variant, variation]);

    const titleS = useMemo(() => {
      return getAlertTitleStyles({ variant, variation, colorScheme });
    }, [variant, variation, colorScheme]);

    return (
      <Box ref={ref} style={[styles.alertContainer, alertContainerStyles, style]} {...props}>
        {startIcon ? <View style={[styles.startIconContainer, startIconContainerStyles]}>{startIcon}</View> : null}
        <View style={styles.contentContainer}>
          {title ? (
            <Text mode="light" variation="h4" maxLength={titleMixLength} style={[titleS, titleStyles]}>
              {title}
            </Text>
          ) : null}
          {subTitle ? (
            <Text mode="light" variation="h5" maxLength={titleMixLength} style={[titleS, styles.subTitle, subTitleStyles]}>
              {subTitle}
            </Text>
          ) : null}
        </View>
        {endIcon ? <View style={[styles.endIconContainer, endIconContainerStyles]}>{endIcon}</View> : null}
        {action ? <View style={styles.actionContainer}>{action}</View> : null}
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  alertContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  startIconContainer: {
    paddingRight: 10,
  },
  endIconContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  subTitle: {
    marginTop: 2,
  },
  actionContainer: {
    paddingLeft: 5,
  },
});
