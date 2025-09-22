import React, { useMemo } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { useThemedProps } from '../../hooks';
import { useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { Text } from '../Typography';
import { getAlertContainerStyles, getAlertTitleStyles } from './utils';
import { AlertProps } from './Alert.types';

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

    const { startIcon: startThemedIcon, endIcon: endThemedIcon } = useThemedProps({
      startIcon,
      endIcon,
    });

    const alertContainerStyles = useMemo(() => {
      return getAlertContainerStyles({ colors: themeColors, variant, variation });
    }, [themeColors, variant, variation]);

    const titleS = useMemo(() => {
      return getAlertTitleStyles({ variant, variation, colorScheme });
    }, [variant, variation, colorScheme]);

    return (
      <Box ref={ref} style={[styles.alertContainer, alertContainerStyles, style]} {...props}>
        {startIcon ? <View style={[styles.startIconContainer, startIconContainerStyles]}>{startThemedIcon}</View> : null}
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
        {endIcon ? <View style={[styles.endIconContainer, endIconContainerStyles]}>{endThemedIcon}</View> : null}
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
