import React, { useEffect, useRef, useState } from 'react';
import {
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
import { Theme } from '../../libraries/themes/types';
import { VariantTypes } from '../../utils';
import { getOtpInputStyles } from './TextField.style';

export type OtpInputVariation = 'outlined' | 'underlined';
export type OTPInputProps = Omit<TextInputProps, 'onChange'> & {
  length: number;
  onChange?: (otp: string) => void;
  variant?: VariantTypes;
  inputStyles?: TextStyle;
  otpContainerStyles?: ViewStyle;
  square?: boolean;
  error?: boolean;
  variation?: OtpInputVariation;
};

export interface GetOtpInputStylesParams extends Pick<OTPInputProps, 'length' | 'variant' | 'square' | 'error'> {
  colors: Theme;
  isFocused?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onChange,
  inputStyles,
  otpContainerStyles,
  square = false,
  error = false,
  variant = 'secondary',
  variation = 'outlined',
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

  const renderInputs = () => {
    return otp.map((_, index) => (
      <TextInput
        key={index}
        style={StyleSheet.flatten([
          styles.input,
          inputStyles,
          getOtpInputStyles({ length, colors: themeColors, variant, isFocused: focusedIndex === index, square, error }),
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
