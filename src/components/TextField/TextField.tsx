import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';
import { useThemeTextFieldConfigSelector } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { Box } from '../Box';
import { BaseInput } from './BaseInput';
import {
  LABELED_ANIMATION_DURATION,
  PLACEHOLDER_FILED_INPUT_LEFT_POSITION,
  PLACEHOLDER_OUTLINE_LEFT_POSITION,
  TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
} from './constants';
import { TextFieldProps } from './Input.types';
import { InputLabel } from './InputLabel';
import { Outline } from './InputOutline';
import { textInputStyles as textInputStylesUtil } from './TextField.style';

export const TextField = React.forwardRef<View, TextFieldProps>(
  (
    {
      value,
      style,
      sx,
      error,
      activeColor,
      errorColor,
      inputLabelProps,
      startAdornment,
      startAdornmentContainerProps,
      endAdornment,
      endAdornmentContainerProps,
      inputStyles,
      outlineContainerTestId,
      outlineProps,
      isFocused: inputIsFocused,
      onFocus: onTextInputFocusHandler,
      onBlur: onTextInputBlurHandler,
      onLayout: onTextInputLayoutHandler,
      animatedDuration = LABELED_ANIMATION_DURATION,
      hideLabel = false,
      square = false,
      editable = true,
      placeholder = 'Outlined',
      variant = 'outlined',
      ignoreOpacityOnNonEditable = false,
      ...props
    },
    ref,
  ) => {
    const inputLabelAnimatedValue = useRef(new Animated.Value(0)).current;
    const [textInputLayoutRectangle, setTextInputLayoutRectangle] = useState<LayoutRectangle>();
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const textFieldThemeConfig = useThemeTextFieldConfigSelector();

    const {
      animatedDuration: themeAnimatedDuration = animatedDuration,
      inputStyles: themeInputStyles = inputStyles,
      style: themeStyle = style,
      sx: themeSx = sx,
      hideLabel: shouldHideLabel = hideLabel,
      activeColor: themeActiveColor = activeColor,
      errorColor: themeErrorColor = errorColor,
      ignoreOpacityOnNonEditable: shouldIgnoreOpacityOnNonEditable = ignoreOpacityOnNonEditable,
      square: shouldApplySquare = square,
    } = textFieldThemeConfig || {};

    const placeHolderLeftPos = variant === 'filled' ? PLACEHOLDER_FILED_INPUT_LEFT_POSITION : PLACEHOLDER_OUTLINE_LEFT_POSITION;

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent;

      if (onTextInputLayoutHandler && typeof onTextInputLayoutHandler === 'function') {
        onTextInputLayoutHandler(event);
      }

      setTextInputLayoutRectangle(layout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const getLabelTranslatePos = useCallback(() => {
      if (textInputLayoutRectangle?.width && textInputLayoutRectangle?.height) {
        if (variant === 'outlined') {
          return (textInputLayoutRectangle.height / 2) * -1;
        } else if (variant === 'filled') {
          return ((textInputLayoutRectangle.height - 19) / 2) * -1;
        }
      }
      return TRANSLATE_Y_ANIMATED_DEFAULT_POSITION;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textInputLayoutRectangle]);

    const textInputStyles = useMemo(
      () => textInputStylesUtil({ variant, endAdornment: !!endAdornment, startAdornment: !!startAdornment }),
      [variant, endAdornment, startAdornment],
    );

    useEffect(() => {
      inputLabelAnimatedValue.stopAnimation();
      if (isFocused || value || !!startAdornment || inputIsFocused) {
        Animated.timing(inputLabelAnimatedValue, {
          toValue: 1,
          duration: themeAnimatedDuration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(inputLabelAnimatedValue, {
          toValue: 0,
          duration: themeAnimatedDuration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused, inputIsFocused, value, startAdornment, endAdornment]);

    return (
      <Outline
        editable={editable}
        variant={variant}
        activeColor={themeActiveColor}
        errorColor={themeErrorColor}
        style={StyleSheet.flatten([themeSx && generateElementStyles(themeSx), themeStyle])}
        isFocused={isFocused}
        error={error}
        ignoreOpacityOnNonEditable={shouldIgnoreOpacityOnNonEditable}
        square={shouldApplySquare}
        ref={ref}
        testID={outlineContainerTestId}
        {...outlineProps}>
        {!shouldHideLabel && (
          <InputLabel
            disabled={!editable}
            variant={variant}
            isActive={isFocused}
            activeColor={themeActiveColor}
            errorColor={themeErrorColor}
            placeholder={placeholder}
            labelAnimatedValue={inputLabelAnimatedValue}
            translateYAnimatedPosition={getLabelTranslatePos()}
            placeholderLeftPosition={placeHolderLeftPos}
            error={error}
            ignoreOpacityOnNonEditable={shouldIgnoreOpacityOnNonEditable}
            {...inputLabelProps}
          />
        )}
        {startAdornment && (
          <Box sx={{ me: 8 }} {...startAdornmentContainerProps}>
            {startAdornment}
          </Box>
        )}
        <BaseInput
          value={value}
          editable={editable}
          onBlur={onBlur}
          onFocus={onFocus}
          onLayout={onLayout}
          style={StyleSheet.flatten([textInputStyles, themeInputStyles])}
          variant={variant}
          placeholder={shouldHideLabel ? placeholder : undefined}
          {...props}
        />
        {endAdornment && (
          <Box sx={{ me: 8 }} {...endAdornmentContainerProps}>
            {endAdornment}
          </Box>
        )}
      </Outline>
    );
  },
);

TextField.displayName = 'TextField';
