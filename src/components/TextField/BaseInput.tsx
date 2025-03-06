import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { BaseInputProps } from './Input.types';
import { baseInputStyles } from './TextField.style';

export const BaseInput = React.forwardRef<TextInput, BaseInputProps>(({ style, variant, height, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();

  return (
    <TextInput
      ref={ref}
      style={StyleSheet.flatten([baseInputStyles({ colors: themeColors, variant, height }), style])}
      {...props}
    />
  );
});
