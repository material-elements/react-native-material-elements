import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  ColorValue,
  Easing,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from 'react-native';
import { useThemedProps } from '../../hooks';
import { useThemeTextFieldConfigSelector } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { Box } from '../Box';
import { BaseInput } from './BaseInput';
import {
  INPUT_DEFAULT_BORDER_RADIUS,
  LABELED_ANIMATION_DURATION,
  PLACEHOLDER_FILED_INPUT_LEFT_POSITION,
  PLACEHOLDER_OUTLINE_LEFT_POSITION,
  TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
} from './constants';
import { TextFieldProps } from './Input.types';
import { InputLabel } from './InputLabel';
import { Outline } from './InputOutline';
import { textInputStyles as textInputStylesUtil } from './TextField.style';
import TextFieldEndAdornment from './TextFieldEndAdornment';

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
      loadingIndicatorProps,
      placeholder,
      multiline,
      animatedDuration = LABELED_ANIMATION_DURATION,
      overrideRootAnimationDuration = false,
      hideLabel = false,
      overrideRootHideLabel = false,
      square,
      height,
      editable = true,
      variant = 'outlined',
      ignoreOpacityOnNonEditable = false,
      overrideRootIgnoreOpacity = false,
      showLoadingIndicatorWhenFocused = false,
      loading = false,
      borderRadius = INPUT_DEFAULT_BORDER_RADIUS,
      ...props
    },
    ref,
  ) => {
    const isOutlined = variant === 'outlined';
    const inputLabelAnimatedValue = useRef(new Animated.Value(0)).current;
    const [textInputLayoutRectangle, setTextInputLayoutRectangle] = useState<LayoutRectangle>();
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const { startAdornment: startThemedAdornment, endAdornment: endThemedAdornment } = useThemedProps({
      startAdornment,
      endAdornment,
    });

    const textFieldThemeConfig = useThemeTextFieldConfigSelector();
    const {
      activeColor: textFieldOutlinedActiveColor,
      errorColor: textFieldOutlinedErrorColor,
      inputStyles: textFieldOutlinedInputStyles,
      style: textFieldOutlinedStyle,
      height: textFieldOutlinedHeight,
    } = textFieldThemeConfig?.outlined || {};
    const {
      activeColor: textFieldFieldActiveColor,
      errorColor: textFieldFieldErrorColor,
      inputStyles: textFieldFieldInputStyles,
      style: textFieldFieldStyle,
      height: textFieldFieldHeight,
    } = textFieldThemeConfig?.filled || {};

    const placeHolderLeftPos = !isOutlined ? PLACEHOLDER_FILED_INPUT_LEFT_POSITION : PLACEHOLDER_OUTLINE_LEFT_POSITION;
    const shouldApplySquareShape = square ?? textFieldThemeConfig?.square ?? false;

    const getTextFiledHeight = () => {
      if (height) return height;
      else if (isOutlined && textFieldOutlinedHeight) return textFieldOutlinedHeight;
      else if (!isOutlined && textFieldFieldHeight) return textFieldFieldHeight;
      return textFieldThemeConfig?.height;
    };

    const getTextFieldActiveColor = (): ColorValue | undefined => {
      if (activeColor) {
        return activeColor;
      } else if (textFieldThemeConfig?.activeColor) {
        return textFieldThemeConfig.activeColor;
      } else if (isOutlined && textFieldOutlinedActiveColor) {
        return textFieldOutlinedActiveColor;
      } else if (!isOutlined && textFieldFieldActiveColor) {
        return textFieldFieldActiveColor;
      }
      return undefined;
    };

    const getTextFieldErrorColor = (): ColorValue | undefined => {
      if (errorColor) {
        return errorColor;
      } else if (textFieldThemeConfig?.errorColor) {
        return textFieldThemeConfig.errorColor;
      } else if (isOutlined && textFieldOutlinedErrorColor) {
        return textFieldOutlinedErrorColor;
      } else if (!isOutlined && textFieldFieldErrorColor) {
        return textFieldFieldErrorColor;
      }
      return undefined;
    };

    const generateOutlineStyles = (): StyleProp<ViewStyle> => {
      const styles: StyleProp<ViewStyle> = [
        textFieldThemeConfig?.style,
        isOutlined ? textFieldOutlinedStyle : textFieldFieldStyle,
        style,
      ].filter(Boolean);
      return styles;
    };

    const generateInputStyles = (): StyleProp<ViewStyle> => {
      const styles: StyleProp<ViewStyle> = [
        textFieldThemeConfig?.inputStyles,
        isOutlined ? textFieldOutlinedInputStyles : textFieldFieldInputStyles,
        inputStyles,
      ].filter(Boolean);

      return styles;
    };

    const textFieldAnimationDuration = () => {
      if (overrideRootAnimationDuration) {
        return animatedDuration;
      }
      return textFieldThemeConfig?.animatedDuration ?? animatedDuration;
    };

    const shouldHideLabel = () => {
      if (overrideRootHideLabel) {
        return hideLabel;
      }
      return textFieldThemeConfig?.hideLabel ?? hideLabel;
    };

    const shouldIgnoreOpacityOnNonEditable = () => {
      if (overrideRootIgnoreOpacity) {
        return ignoreOpacityOnNonEditable;
      }
      return textFieldThemeConfig?.ignoreOpacityOnNonEditable ?? ignoreOpacityOnNonEditable;
    };

    const onLayout = useCallback(
      (event: LayoutChangeEvent) => {
        const { layout } = event.nativeEvent;

        if (onTextInputLayoutHandler && typeof onTextInputLayoutHandler === 'function') {
          onTextInputLayoutHandler(event);
        }

        setTextInputLayoutRectangle(layout);
      },
      [onTextInputLayoutHandler],
    );

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
        } else if (!isOutlined) {
          return ((textInputLayoutRectangle.height - 19) / 2) * -1;
        }
      }
      return TRANSLATE_Y_ANIMATED_DEFAULT_POSITION;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textInputLayoutRectangle]);

    useEffect(() => {
      inputLabelAnimatedValue.stopAnimation();
      if (isFocused || value || !!startAdornment || inputIsFocused) {
        Animated.timing(inputLabelAnimatedValue, {
          toValue: 1,
          duration: textFieldAnimationDuration(),
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(inputLabelAnimatedValue, {
          toValue: 0,
          duration: textFieldAnimationDuration(),
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
        activeColor={getTextFieldActiveColor()}
        errorColor={getTextFieldErrorColor()}
        style={StyleSheet.flatten([sx && generateElementStyles(sx), generateOutlineStyles()])}
        isFocused={isFocused}
        error={error}
        ignoreOpacityOnNonEditable={shouldIgnoreOpacityOnNonEditable()}
        square={shouldApplySquareShape}
        ref={ref}
        testID={outlineContainerTestId}
        borderRadius={borderRadius}
        {...outlineProps}>
        {!shouldHideLabel() && placeholder && (
          <InputLabel
            disabled={!editable}
            variant={variant}
            isActive={isFocused}
            activeColor={getTextFieldActiveColor()}
            errorColor={getTextFieldErrorColor()}
            placeholder={placeholder}
            labelAnimatedValue={inputLabelAnimatedValue}
            translateYAnimatedPosition={getLabelTranslatePos()}
            placeholderLeftPosition={placeHolderLeftPos}
            error={error}
            ignoreOpacityOnNonEditable={shouldIgnoreOpacityOnNonEditable()}
            {...inputLabelProps}
          />
        )}
        {startThemedAdornment && (
          <Box sx={{ me: 8 }} {...startAdornmentContainerProps}>
            {startThemedAdornment}
          </Box>
        )}
        <BaseInput
          value={value}
          editable={editable}
          onBlur={onBlur}
          onFocus={onFocus}
          onLayout={onLayout}
          style={StyleSheet.flatten([
            textInputStylesUtil({ variant, endAdornment: !!endAdornment, startAdornment: !!startAdornment }),
            generateInputStyles(),
          ])}
          variant={variant}
          placeholder={shouldHideLabel() ? placeholder : undefined}
          multiline={multiline}
          height={getTextFiledHeight()}
          {...props}
        />
        <TextFieldEndAdornment
          loading={loading}
          endAdornment={endThemedAdornment}
          showLoadingIndicatorWhenFocused={showLoadingIndicatorWhenFocused}
          loadingIndicatorProps={loadingIndicatorProps}
          isFocused={isFocused}
          endAdornmentContainerProps={endAdornmentContainerProps}
        />
      </Outline>
    );
  },
);

TextField.displayName = 'TextField';
