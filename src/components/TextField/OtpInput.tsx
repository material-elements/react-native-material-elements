import React, { useEffect, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Theme } from '../../libraries/themes/types';
import { VariantTypes } from '../../utils';
import { getOtpInputStyles } from './TextField.style';

interface OTPInputProps {
  length: number;
  onChangeOTP?: (otp: string) => void;
  variant?: VariantTypes;
  inputStyles?: TextStyle;
  otpContainerStyles?: ViewStyle;
}

export interface GetOtpInputStylesParams extends Pick<OTPInputProps, 'length' | 'variant'> {
  colors: Theme;
  isFocused?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onChangeOTP,
  variant = 'secondary',
  inputStyles,
  otpContainerStyles,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<TextInput[]>([]);

  const themeColors = useThemeColorsSelector();

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (onChangeOTP) {
      onChangeOTP(newOtp.join(''));
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
      if (onChangeOTP) {
        onChangeOTP(newOtp.join(''));
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
          getOtpInputStyles({ length, colors: themeColors, variant, isFocused: focusedIndex === index }),
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
      />
    ));
  };

  return <View style={[styles.container, otpContainerStyles]}>{renderInputs()}</View>;
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
    borderWidth: 1,
    color: 'red',
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 18,
  },
});
