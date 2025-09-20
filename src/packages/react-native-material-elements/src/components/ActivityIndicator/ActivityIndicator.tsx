import React, { useMemo } from 'react';
import { ActivityIndicator as RnActivityIndicator } from 'react-native';
import { ActivityIndicatorProps } from './ActivityIndicator.types';
import { getActivityIndicatorColor } from './ActivityIndicator.styles';
import { useThemeColorsSelector } from '../../libraries';

export const ActivityIndicator = React.forwardRef<RnActivityIndicator, ActivityIndicatorProps>(
  ({ variant = 'gray', color, switchMode = true, ...props }, ref) => {
    const themeColors = useThemeColorsSelector();

    const activityColor = useMemo(
      () => getActivityIndicatorColor({ variant, colors: themeColors, switchMode }),
      [themeColors, variant, switchMode],
    );

    return <RnActivityIndicator ref={ref} color={color ?? activityColor} {...props} />;
  },
);
