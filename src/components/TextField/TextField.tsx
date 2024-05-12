import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { Box } from '../Box';
import { BaseInput } from './BaseInput';
import { InputLabel } from './InputLabel';
import { Outline } from './InputOutline';
import { TextFieldProps } from './InputTypes';
import {
  LABELED_ANIMATION_DURATION,
  PLACEHOLDER_FILED_INPUT_LEFT_POSITION,
  PLACEHOLDER_OUTLINE_LEFT_POSITION,
  TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
} from './constants';
import { getTextInputStyles } from './utils';

export const TextField = ({
  placeholder,
  outlineStyles,
  value,
  style,
  error,
  activeColor,
  errorColor,
  inputLabelProps,
  animatedDuration,
  editable,
  startAdornment,
  startAdornmentContainerProps,
  endAdornment,
  endAdornmentContainerProps,
  variant = 'outlined',
  onFocus: onTextInputFocusHandler,
  onBlur: onTextInputBlurHandler,
  onLayout: onTextInputLayoutHandler,
  ...props
}: TextFieldProps) => {
  const inputLabeledAnimatedValue = useRef(new Animated.Value(0)).current;
  const [textInputLayoutRectangle, setTextInputLayoutRectangle] = useState<LayoutRectangle>();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const placeHolderLeftPos = variant === 'filled' ? PLACEHOLDER_FILED_INPUT_LEFT_POSITION : PLACEHOLDER_OUTLINE_LEFT_POSITION;

  const onLayout = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;

    if (onTextInputLayoutHandler && typeof onTextInputLayoutHandler === 'function') {
      onTextInputLayoutHandler(event);
    }

    setTextInputLayoutRectangle(layout);
  };

  const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onTextInputFocusHandler && typeof onTextInputFocusHandler === 'function') {
      onTextInputFocusHandler(event);
    }
    setIsFocused(true);
  };

  const onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onTextInputBlurHandler && typeof onTextInputBlurHandler === 'function') {
      onTextInputBlurHandler(event);
    }
    setIsFocused(false);
  };

  const getLabelTranslatePos = (): number => {
    if (textInputLayoutRectangle?.width && textInputLayoutRectangle?.width) {
      if (variant === 'outlined') return (textInputLayoutRectangle.height / 2) * -1;
      else if (variant === 'filled') return ((textInputLayoutRectangle.height - 20) / 2) * -1;
    }
    return TRANSLATE_Y_ANIMATED_DEFAULT_POSITION;
  };

  useEffect(() => {
    inputLabeledAnimatedValue.stopAnimation();
    if (isFocused || value || !!startAdornment) {
      Animated.timing(inputLabeledAnimatedValue, {
        toValue: 1,
        duration: animatedDuration ? animatedDuration : LABELED_ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(inputLabeledAnimatedValue, {
        toValue: 0,
        duration: animatedDuration ? animatedDuration : LABELED_ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);

  return (
    <Outline
      variant={variant}
      activeColor={activeColor}
      errorColor={errorColor}
      style={outlineStyles}
      isFocused={isFocused}
      editable={editable}
      error={error}>
      {textInputLayoutRectangle?.width && textInputLayoutRectangle?.height ? (
        <InputLabel
          disabled={editable}
          variant={variant}
          isActive={isFocused}
          activeColor={activeColor}
          errorColor={errorColor}
          placeholder={placeholder}
          labeled={inputLabeledAnimatedValue}
          translateYAnimatedPosition={getLabelTranslatePos()}
          placeholderLeftPosition={placeHolderLeftPos}
          error={error}
          textInputLayoutRect={textInputLayoutRectangle}
          {...inputLabelProps}
        />
      ) : null}
      {startAdornment && (
        <Box sx={{ marginRight: 8 }} {...startAdornmentContainerProps}>
          {startAdornment}
        </Box>
      )}
      <BaseInput
        value={value}
        editable={editable}
        onBlur={onBlur}
        onFocus={onFocus}
        onLayout={onLayout}
        style={[getTextInputStyles({ variant, endAdornment: !!endAdornment, startAdornment: !!startAdornment }), style]}
        {...props}
      />
      {endAdornment && (
        <Box sx={{ marginLeft: 8 }} {...endAdornmentContainerProps}>
          {endAdornment}
        </Box>
      )}
    </Outline>
  );
};

TextField.displayName = 'TextField';
