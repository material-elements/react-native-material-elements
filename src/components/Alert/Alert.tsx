import React, { useMemo } from 'react';
import { ColorSchemeName, StyleSheet, TextStyle, useColorScheme, View } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Theme } from '../../libraries/themes/types';
import { VariantTypes } from '../../utils';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { Text } from '../Typography';
import { getAlertContainerStyles, getAlertTitleStyles } from './utils';

export interface AlertProps extends BoxProps {
  title?: string;
  titleStyles?: TextStyle;
  subTitle?: string;
  subTitleStyles?: TextStyle;
  variant?: VariantTypes;
  action?: React.ReactNode;
  variation?: 'filled' | 'outlined';
  titleMixLength?: number;
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
    display: 'flex',
    flexDirection: 'row',
    minHeight: 30,
    alignItems: 'center',
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
