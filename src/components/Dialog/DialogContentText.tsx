import React from 'react';
import { Text as RnText } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Text } from '../Typography';
import { TextProps } from '../Typography/Text.types';

export const DialogContentText = React.forwardRef<RnText, TextProps>(({ color, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();

  return <Text variation="h4" ref={ref} color={color ?? themeColors.gray[50]} {...props} />;
});
