import React, { useMemo } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { BaseInputProps } from './Input.types';
import { baseInputStyles } from './TextField.style';

export const BaseInput = React.forwardRef<TextInput, BaseInputProps>(({ style, variant, height, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();

  const baseInputGeneratedStyles = useMemo(
    () => baseInputStyles({ colors: themeColors, variant, height }),
    [variant, themeColors, height],
  );
  return <TextInput ref={ref} style={StyleSheet.flatten([baseInputGeneratedStyles, style])} {...props} />;
});
