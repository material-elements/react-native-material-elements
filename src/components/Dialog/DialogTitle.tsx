import React from 'react';
import { Text as RnText, StyleSheet } from 'react-native';
import { useThemeColorsSelector } from '../../libraries/index.ts';
import { Text } from '../Typography/index.ts';
import { styles } from './Dialog.styles.ts';
import { DialogTitleProps } from './Dialog.types';

export const DialogTitle = React.forwardRef<RnText, DialogTitleProps>(({ style, color, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();

  return (
    <Text
      variation="h3"
      style={StyleSheet.flatten([styles.dialogTitle, style])}
      color={color ?? themeColors.grey[50]}
      {...props}
      ref={ref}
    />
  );
});
