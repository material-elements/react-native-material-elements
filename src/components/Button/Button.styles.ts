import { ColorValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Theme, ThemeDimensions } from '../../libraries/themes/v1/theme';
import { getVariant } from '../../utils';
import {
  BaseButtonStylesParams,
  ButtonLabelStylesParams,
  ButtonRootContainerStylesInterface,
  ButtonSizeVariant,
  ButtonVariationsType,
  GetButtonStylesProps,
} from './Button.types';

export const styles = StyleSheet.create({
  baseButtonContainer: {
    alignSelf: 'flex-start',
  },
  baseButtonStyles: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabelContainer: {
    paddingHorizontal: 10,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    paddingHorizontal: 10,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'auto',
    padding: 5,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
  },
  iconBaseButtonContainer: {
    alignSelf: 'flex-start',
  },
});

export const baseButtonStyles = ({ fullWidth }: BaseButtonStylesParams): ViewStyle => {
  return {
    ...(fullWidth && { width: '100%' }),
  };
};

export const buttonRootContainerStyles = ({ flex, fullWidth }: ButtonRootContainerStylesInterface): ViewStyle => ({
  ...(flex && { flex }),
  ...(fullWidth ? { alignSelf: 'auto' } : { alignSelf: 'flex-start' }),
});

export const baseStyles = (size?: ButtonSizeVariant): ViewStyle => {
  let height: number;

  switch (size) {
    case 'small':
      height = 20;
      break;
    case 'medium':
      height = 30;
      break;
    case 'large':
      height = 40;
      break;
    default:
      height = 40;
  }

  return {
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    height,
  };
};

export const disabledStyles: ViewStyle = {
  opacity: 0.7,
};

export const buttonVariationStyles = (
  spacing: ThemeDimensions['spacing'],
  colors: Theme,
  variation: ButtonVariationsType,
  size: ButtonSizeVariant,
) => {
  const variations: Record<ButtonVariationsType, ViewStyle> = {
    outlined: {
      ...baseStyles(size),
      backgroundColor: 'transparent',
      borderColor: colors.grey[400],
      borderWidth: 1,
    },
    contained: baseStyles(size),
    text: {
      ...baseStyles(size),
      backgroundColor: 'transparent',
    },
    roundedIconButton: styles.iconButton,
    squareIconButton: {
      ...styles.iconButton,
      borderRadius: 5,
    },
  };
  return variations[variation];
};

export const getButtonStyles = ({
  themeColors,
  buttonColor,
  disabled,
  square,
  spacing,
  backgroundColor,
  variation = 'contained',
  size = 'large',
}: GetButtonStylesProps): ViewStyle => {
  const isContainedVariation = variation === 'contained';
  let buttonBackgroundColor: ColorValue | undefined;

  if (backgroundColor) {
    buttonBackgroundColor = backgroundColor;
  } else if (buttonColor) {
    buttonBackgroundColor = getVariant({ variant: buttonColor, colors: themeColors });
  }
  return {
    ...(buttonBackgroundColor && { backgroundColor: buttonBackgroundColor }),
    ...buttonVariationStyles(spacing, themeColors, variation, size),
    ...(!isContainedVariation && { borderColor: getVariant({ variant: buttonColor, colors: themeColors }) }),
    ...(disabled && disabledStyles),
    ...(square && { borderRadius: 0 }),
  };
};

export const buttonLabelStyles = ({ size }: ButtonLabelStylesParams): TextStyle => {
  let fontSize: number;

  switch (size) {
    case 'small':
      fontSize = 12;
      break;
    case 'medium':
      fontSize = 13;
      break;
    default:
      fontSize = 14;
      break;
  }

  return { fontSize };
};
