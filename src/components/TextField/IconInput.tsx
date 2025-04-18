import React from 'react';
import { StyleSheet, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { useThemeColorsSelector, useThemeIconInputConfigSelector } from '../../libraries';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { Text } from '../Typography';
import { BaseInput } from './BaseInput';

export interface IconInputProps extends TextInputProps, Pick<BoxProps, 'sx'> {
  /**
   * Props to be applied to the wrapper around the TextInput component.
   */
  inputWrapperStyles?: ViewStyle;
  /**
   * A React node to be displayed at the end of the input field.
   * This is typically used for icons or other interactive elements.
   */
  endAdornment?: React.ReactNode;
  /**
   * Props to be applied to the container of the end adornment.
   */
  endAdornmentContainerStyles?: ViewStyle;
  /**
   * A React node to be displayed at the start of the input field.
   * This is typically used for icons or other interactive elements.
   */
  startAdornment?: React.ReactNode;
  /**
   * Props to be applied to the container of the start adornment.
   */
  startAdornmentContainerStyles?: ViewStyle;
  /**
   * Show the top label of the input
   */
  label?: string;
  /**
   * Label container styles
   */
  labelContainerStyles?: ViewStyle;
  /**
   * Label styles
   */
  labelStyles?: TextStyle;
}

export const IconInput: React.FC<IconInputProps> = React.forwardRef<View, IconInputProps>(
  (
    {
      sx,
      inputWrapperStyles,
      endAdornment,
      endAdornmentContainerStyles,
      startAdornment,
      startAdornmentContainerStyles,
      style,
      labelContainerStyles,
      label,
      labelStyles,
      testID,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const iconInputThemeConfig = useThemeIconInputConfigSelector();

    const inputContainerStyles: BaseStyles = {
      bg: themeColors.blueGrey[50],
    };

    return (
      <View>
        {label && (
          <View style={StyleSheet.flatten([styles.labelContainer, labelContainerStyles])}>
            <Text variation="h5" style={labelStyles}>
              {label}
            </Text>
          </View>
        )}
        <Box
          sx={{ ...inputContainerStyles, ...sx }}
          style={StyleSheet.flatten([styles.inputContainer, iconInputThemeConfig?.inputWrapperStyles, inputWrapperStyles])}
          ref={ref}
          testID={`${testID}-wrapper`}>
          {startAdornment && (
            <Box
              style={StyleSheet.flatten([
                { marginRight: 8 },
                iconInputThemeConfig?.startAdornmentContainerStyles,
                startAdornmentContainerStyles,
              ])}
              testID={`${testID}-start-adornment-container`}>
              {startAdornment}
            </Box>
          )}
          <BaseInput
            style={StyleSheet.flatten([{ color: themeColors.white[900], flex: 1 }, style])}
            placeholderTextColor={themeColors.grey[600]}
            testID={testID}
            {...props}
          />
          {endAdornment && (
            <Box
              style={StyleSheet.flatten([
                { marginLeft: 8 },
                iconInputThemeConfig?.endAdornmentContainerStyles,
                endAdornmentContainerStyles,
              ])}
              testID={`${testID}-end-adornment-container`}>
              {endAdornment}
            </Box>
          )}
        </Box>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 3,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

IconInput.displayName = 'IconInput';
