import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { OutlineProps } from './Input.types';
import { inputOutlineVariationStyles, outlineStyles } from './TextField.style';

export const Outline = React.forwardRef<View, OutlineProps>(
  (
    {
      error,
      style,
      isFocused,
      activeColor,
      errorColor,
      editable,
      ignoreOpacityOnNonEditable,
      square,
      variant = 'outlined',
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();

    const outlineGeneratedStyles = useMemo(() => {
      return {
        ...inputOutlineVariationStyles(variant, themeColors),
        ...outlineStyles({
          error,
          errorColor,
          isFocused,
          activeColor,
          colors: themeColors,
          editable,
          variant,
          ignoreOpacityOnNonEditable,
          square,
        }),
      };
    }, [error, errorColor, isFocused, activeColor, themeColors, editable, variant, ignoreOpacityOnNonEditable, square]);

    return <View ref={ref} style={StyleSheet.flatten([outlineGeneratedStyles, style])} {...props} />;
  },
);
Outline.displayName = 'TextFiledOutline';
