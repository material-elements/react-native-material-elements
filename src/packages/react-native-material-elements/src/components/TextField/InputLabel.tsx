import React, { useMemo, useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Text } from '../Typography';
import { InputLabelProps } from './Input.types';
import { labelTextStyles, labelTransformStyle } from './TextField.style';
import { PLACEHOLDER_OUTLINE_LEFT_POSITION, TEXT_FONT_DEFAULT_HEIGHT } from './constants';

export const InputLabel: React.FC<InputLabelProps> = function ({
  placeholder,
  labelAnimatedValue,
  editable,
  translateYAnimatedPosition,
  placeholderLeftPosition,
  labelContainerStyles,
  style,
  error,
  errorColor,
  ignoreOpacityOnNonEditable,
  variant = 'outlined',
  ...props
}) {
  const themeColors = useThemeColorsSelector();

  const [textLayoutRect, setTextLayoutRect] = useState<LayoutRectangle>();
  const textHeight = textLayoutRect?.height ?? TEXT_FONT_DEFAULT_HEIGHT;

  const styles = useMemo(
    () =>
      labelTransformStyle({
        colors: themeColors,
        textHeight,
        translateYAnimatedPosition,
        labelAnimatedValue,
        variant,
        placeholderLeftPosition: placeholderLeftPosition ?? PLACEHOLDER_OUTLINE_LEFT_POSITION,
      }),
    [themeColors, textHeight, translateYAnimatedPosition, labelAnimatedValue, variant, placeholderLeftPosition],
  );

  const labelStyles = useMemo(
    () => labelTextStyles({ colors: themeColors, variant, ignoreOpacityOnNonEditable, error, errorColor }),
    [themeColors, variant, ignoreOpacityOnNonEditable, error, errorColor],
  );

  const onTextLayoutHandler = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setTextLayoutRect(layout);
  };

  return (
    <Animated.View style={[styles, labelContainerStyles]}>
      <Text variation="h4" onLayout={onTextLayoutHandler} disabled={editable} style={[labelStyles, style]} {...props}>
        {placeholder}
      </Text>
    </Animated.View>
  );
};

InputLabel.displayName = 'InputLabel';
