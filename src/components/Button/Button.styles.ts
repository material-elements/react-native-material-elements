import { ColorValue, DimensionValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
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

export const buttonRootContainerStyles = ({ flex }: ButtonRootContainerStylesInterface) => ({
  ...(flex && { flex }),
});

export const baseStyles = (spacing: ThemeDimensions['spacing'], size?: ButtonSizeVariant): ViewStyle => {
  let padding: DimensionValue;
  let paddingHorizontal: DimensionValue;

  switch (size) {
    case 'small':
      padding = spacing.xs;
      paddingHorizontal = spacing.sm;
      break;
    case 'medium':
      padding = spacing.md;
      paddingHorizontal = spacing.md;
      break;
    case 'large':
      padding = spacing.lg;
      paddingHorizontal = spacing.lg;
      break;
    default:
      padding = spacing.lg;
      paddingHorizontal = spacing.lg;
  }

  return {
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    padding,
    paddingHorizontal,
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
      ...baseStyles(spacing, size),
      backgroundColor: 'transparent',
      borderColor: colors.grey[400],
      borderWidth: 1,
    },
    contained: baseStyles(spacing, size),
    text: {
      ...baseStyles(spacing, size),
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
