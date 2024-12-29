import React, { useMemo } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Theme } from '../../libraries/themes/types';
import { VariantTypes } from '../../utils';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { Text } from '../Typography';
import { getAlertContainerStyles, getAlertTitleStyles } from './utils';

export interface AlertProps extends BoxProps {
  title?: string;
  titleContainerStyles?: ViewStyle;
  variant?: VariantTypes;
  titleStyles?: TextStyle;
  action?: React.ReactNode;
  variation?: 'filled' | 'outlined';
  titleMixLength?: number;
}
export interface GetAlertContainerStylesParams extends Pick<AlertProps, 'variant' | 'variation'> {
  colors: Theme;
}
export interface GetAlertTitleStylesParams extends Pick<AlertProps, 'variant' | 'variation'> {}

export const Alert = React.forwardRef<View, AlertProps>(
  (
    {
      style,
      title,
      titleContainerStyles,
      titleStyles,
      action,
      titleMixLength,
      variant = 'success',
      variation = 'filled',
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();

    const alertContainerStyles = useMemo(() => {
      return getAlertContainerStyles({ colors: themeColors, variant, variation });
    }, [themeColors, variant, variation]);

    const titleS = useMemo(() => {
      return getAlertTitleStyles({ variant, variation });
    }, [variant, variation]);

    return (
      <Box ref={ref} style={StyleSheet.flatten([styles.alertContainer, alertContainerStyles, style])} {...props}>
        {title ? (
          <View style={StyleSheet.flatten([styles.titleContainer, titleContainerStyles])}>
            <Text variation="h4" maxLength={titleMixLength} style={StyleSheet.flatten([titleS, titleStyles])}>
              {title}
            </Text>
          </View>
        ) : null}
        {action ? <View style={styles.actionContainer}>{action}</View> : null}
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  alertContainer: {
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    minHeight: 30,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  actionContainer: {
    paddingLeft: 5,
  },
});
