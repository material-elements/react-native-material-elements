import { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../libraries/themes/v1/theme';
import { getVariant, screenWidth } from '../../utils';
import {
  INPUT_DEFAULT_BORDER_RADIUS,
  INPUT_DEFAULT_BORDER_WIDTH,
  INPUT_DEFAULT_HEIGHT,
  INPUT_LARGE_HEIGHT,
  INPUT_SMALL_HEIGHT,
  TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
} from './constants';
import {
  BaseInputStylesProps,
  LabelTextStylesProps,
  LabelTransformStyleProps,
  OutlineStyles,
  TextFiledVariation,
  TextInputStylesProps,
} from './Input.types';
import { GetOtpInputStylesParams } from './OtpInput';
import { GetIconInputStyles } from './IconInput';

const baseInputDefaultStyles: ViewStyle = {
  position: 'relative',
  zIndex: 12,
  backgroundColor: 'transparent',
};

export const textInputStyles = ({ variant, endAdornment, startAdornment }: TextInputStylesProps): StyleProp<ViewStyle> => {
  const adornmentStyles: StyleProp<ViewStyle> = {
    flex: 1,
  };

  if (endAdornment || startAdornment) {
    adornmentStyles.width = '90%';
  }

  if (variant === 'outlined' || variant === 'filled') {
    return { ...baseInputDefaultStyles, ...adornmentStyles };
  } else if (variant === 'standard') {
    return { ...baseInputDefaultStyles, ...adornmentStyles, marginBottom: -10 };
  }
  return baseInputDefaultStyles;
};

export const labelTextStyles = ({
  colors,
  variant,
  ignoreOpacityOnNonEditable,
  error,
  errorColor,
}: LabelTextStylesProps): TextStyle => {
  let color: ColorValue;

  if (variant === 'outlined' && !error) {
    color = colors.grey[800];
  } else if (error) {
    color = errorColor ?? colors.red[500];
  } else {
    color = colors.white[50];
  }

  return {
    color,
    ...(ignoreOpacityOnNonEditable && { opacity: 1 }),
  };
};

export const baseInputStyles = ({ colors, variant, height = INPUT_DEFAULT_HEIGHT }: BaseInputStylesProps): TextStyle => {
  const baseStyles: TextStyle = {
    color: variant === 'outlined' ? colors.grey[800] : colors.grey[200],
    minHeight: height,
    width: '100%',
  };
  return baseStyles;
};

export const outlineStyles = ({
  error,
  errorColor,
  isFocused,
  activeColor,
  colors,
  editable,
  variant,
  ignoreOpacityOnNonEditable,
  square,
  borderRadius,
}: OutlineStyles): ViewStyle => {
  const baseStyles: ViewStyle = {
    borderWidth: variant === 'outlined' ? 0.6 : 0,
    borderColor: colors.grey[400],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    opacity: editable || ignoreOpacityOnNonEditable ? 1 : 0.6,
    borderRadius: square ? 0 : borderRadius,
  };

  let borderColor: ColorValue;

  if (error) {
    borderColor = errorColor ?? colors.red[500];
  } else if (isFocused) {
    borderColor = activeColor ?? colors.lightBlue[500];
  } else {
    borderColor = colors.grey[400];
  }

  return { ...baseStyles, borderColor };
};

export const inputOutlineVariationStyles = (variation: TextFiledVariation, colors: Theme): ViewStyle => {
  const outlineDefaultStyles: ViewStyle = {
    width: '100%',
    borderRadius: 6,
    borderWidth: INPUT_DEFAULT_BORDER_WIDTH,
    borderColor: colors.grey[500],
    paddingHorizontal: 14,
    position: 'relative',
    backgroundColor: 'transparent',
  };

  switch (variation) {
    case 'outlined':
      return outlineDefaultStyles;
    case 'filled':
      return {
        ...outlineDefaultStyles,
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: colors.grey[500],
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomWidth: INPUT_DEFAULT_BORDER_WIDTH,
      };
  }
};

export const labelTransformStyle = ({
  colors,
  textHeight,
  labelAnimatedValue,
  variant,
  placeholderLeftPosition,
  translateYAnimatedPosition = TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
}: LabelTransformStyleProps): StyleProp<ViewStyle> => {
  const isOutlinedVariant = variant === 'outlined';

  const getOutputRange = () => {
    let outputRange = [-(textHeight / 2), translateYAnimatedPosition + -(textHeight / 2)];
    return outputRange;
  };

  const transform: ViewStyle['transform'] = [
    {
      translateY: labelAnimatedValue ? labelAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: getOutputRange() }) : 0,
    },
    {
      scale: labelAnimatedValue ? labelAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0.8] }) : 1,
    },
  ];

  return {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: isOutlinedVariant ? colors.white[50] : 'transparent',
    left: placeholderLeftPosition ?? 0,
    paddingHorizontal: 8,
    top: '50%',
    transform,
  };
};

export const getOtpInputStyles = ({
  length,
  colors,
  variant,
  isFocused,
  square,
  error,
  tintColor,
  offTintColor,
}: GetOtpInputStylesParams): TextStyle => {
  const defaultWidth = 50;
  const isExpanded = (length + 1) * defaultWidth > screenWidth;

  let borderColor: ColorValue;

  if (error) {
    borderColor = colors.red[500];
  } else if (tintColor && isFocused) {
    borderColor = tintColor;
  } else if (offTintColor && !isFocused) {
    borderColor = offTintColor;
  } else if (isFocused) {
    borderColor = getVariant({ variant, colors });
  } else {
    borderColor = colors.grey[400];
  }

  return {
    ...(isExpanded ? { flex: 1 } : { width: defaultWidth }),
    color: colors.grey[900],
    borderColor,
    borderRadius: square ? 0 : 8,
  };
};

export const getIconInputStyles = ({ height }: GetIconInputStyles): ViewStyle => {
  if (height === 'small') {
    return { minHeight: INPUT_SMALL_HEIGHT };
  } else if (height === 'medium') {
    return { minHeight: INPUT_DEFAULT_HEIGHT };
  } else {
    return { minHeight: INPUT_LARGE_HEIGHT };
  }
};
