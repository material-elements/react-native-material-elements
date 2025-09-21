import React, { useEffect, useRef, useState } from 'react';
import {
  ColorValue,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { VariantTypes } from '../../utils';
import { getOtpInputStyles } from './TextField.style';

export type OtpInputVariation = 'outlined' | 'underlined';
export type OTPInputProps = Omit<TextInputProps, 'onChange' | 'value' | 'onChangeText' | 'defaultValue'> & {
  /**
   * Total number of OTP input boxes.
   * Determines the length of the OTP code.
   */
  length: number;
  /**
   * Callback that receives the complete OTP string as user inputs values.
   */
  onChange?: (otp: string) => void;
  /**
   * Visual style variant (e.g., 'filled', 'outlined') to customize the appearance.
   */
  variant?: VariantTypes;
  /**
   * Styles applied to each individual OTP input box.
   */
  inputStyles?: TextStyle;
  /**
   * Styles applied to the container wrapping all OTP input boxes.
   */
  otpContainerStyles?: ViewStyle;
  /**
   * If true, renders each OTP input as a square.
   * Useful for consistent design across platforms.
   */
  square?: boolean;
  /**
   * If true, applies error styles to the inputs (e.g., red border).
   * Typically used for validation feedback.
   */
  error?: boolean;
  /**
   * Specifies the variation of the OTP input component.
   * Can be used to switch between different UI behavior or styles.
   */
  variation?: OtpInputVariation;
  /**
   * The active tint color for focused or filled input boxes.
   */
  tintColor?: ColorValue;
  /**
   * The inactive tint color for empty or unfocused input boxes.
   */
  offTintColor?: ColorValue;
  /**
   * Prefilled value for the OTP input.
   * Can be a string (e.g., "123") or number (e.g., 123) and will be split across input boxes.
   */
  defaultValue?: number | string;
};

export const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onChange,
  inputStyles,
  otpContainerStyles,
  tintColor,
  offTintColor,
  defaultValue,
  square = false,
  error = false,
  variant = 'secondary',
  variation = 'outlined',
  testID = 'otp-input',
  ...props
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<TextInput[]>([]);

  const isUnderLineInput = variation === 'underlined';

  const themeColors = useThemeColorsSelector();

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (onChange) {
      onChange(newOtp.join(''));
    }

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (onChange) {
        onChange(newOtp.join(''));
      }

      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  useEffect(() => {
    setOtp(Array(length).fill(''));
  }, [length]);

  useEffect(() => {
    if (defaultValue) {
      const defaultValueLength = defaultValue.toString();

      if (defaultValueLength.length > length) {
        throw Error('Default value must be equal or less then otp length');
      }

      const otpArray = defaultValueLength.split('').concat(Array(length - defaultValueLength.length).fill(''));
      setOtp(otpArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const renderInputs = () => {
    return otp.map((_, index) => (
      <TextInput
        key={index}
        style={StyleSheet.flatten([
          styles.input,
          getOtpInputStyles({
            length,
            colors: themeColors,
            variant,
            isFocused: focusedIndex === index,
            square,
            error,
            tintColor,
            offTintColor,
          }),
          inputStyles,
          isUnderLineInput && styles.underLineInput,
        ])}
        keyboardType="number-pad"
        maxLength={1}
        ref={ref => (inputs.current[index] = ref!)}
        onChangeText={text => handleChangeText(text, index)}
        onKeyPress={e => handleKeyPress(e, index)}
        value={otp[index]}
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        selectTextOnFocus
        testID={`${testID}-${index}`}
        {...props}
      />
    ));
  };

  return <View style={StyleSheet.flatten([styles.container, otpContainerStyles])}>{renderInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 0.8,
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 18,
  },
  underLineInput: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
});
