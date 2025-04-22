import React from 'react';
import { StyleSheet, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { ThemedIconProp, useThemedProps } from '../../hooks';
import { useThemeColorsSelector, useThemeIconInputConfigSelector } from '../../libraries';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { Text } from '../Typography';
import { BaseInput } from './BaseInput';
import { getIconInputStyles } from './TextField.style';

export interface IconInputProps extends TextInputProps, Pick<BoxProps, 'sx'> {
  /**
   * Props to be applied to the wrapper around the TextInput component.
   */
  inputWrapperStyles?: ViewStyle;
  /**
   * A React node to be displayed at the end of the input field.
   * This is typically used for icons or other interactive elements.
   */
  endAdornment?: ThemedIconProp;
  /**
   * Props to be applied to the container of the end adornment.
   */
  endAdornmentContainerStyles?: ViewStyle;
  /**
   * A React node to be displayed at the start of the input field.
   * This is typically used for icons or other interactive elements.
   */
  startAdornment?: ThemedIconProp;
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
  /**
   * Hight of the input component
   */
  hight?: 'small' | 'medium' | 'large';
}

export interface GetIconInputStyles extends Pick<IconInputProps, 'hight'> {}

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
      hight = 'medium',
      testID,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const iconInputThemeConfig = useThemeIconInputConfigSelector();

    const { startAdornment: startThemedAdornment, endAdornment: endThemedAdornment } = useThemedProps({
      startAdornment,
      endAdornment,
    });

    const inputContainerStyles: BaseStyles = {
      bg: themeColors.blueGrey[50],
    };

    return (
      <View>
        {label && (
          <View style={[styles.labelContainer, labelContainerStyles]}>
            <Text variation="h5" style={labelStyles}>
              {label}
            </Text>
          </View>
        )}
        <Box
          sx={{ ...inputContainerStyles, ...sx }}
          style={[styles.inputContainer, iconInputThemeConfig?.inputWrapperStyles, inputWrapperStyles]}
          ref={ref}
          testID={`${testID}-wrapper`}>
          {startThemedAdornment && (
            <Box
              style={[
                styles.startAdornmentContainer,
                iconInputThemeConfig?.startAdornmentContainerStyles,
                startAdornmentContainerStyles,
              ]}
              testID={`${testID}-start-adornment-container`}>
              {startThemedAdornment}
            </Box>
          )}
          <BaseInput
            style={[styles.baseButtonStyles, { color: themeColors.white[900] }, getIconInputStyles({ hight }), style]}
            placeholderTextColor={themeColors.grey[600]}
            testID={testID}
            {...props}
          />
          {endThemedAdornment && (
            <Box
              style={[
                styles.endAdornmentContainer,
                iconInputThemeConfig?.endAdornmentContainerStyles,
                endAdornmentContainerStyles,
              ]}
              testID={`${testID}-end-adornment-container`}>
              {endThemedAdornment}
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
  startAdornmentContainer: {
    marginRight: 8,
  },
  endAdornmentContainer: {
    marginLeft: 8,
  },
  baseButtonStyles: {
    flex: 1,
  },
});

IconInput.displayName = 'IconInput';
