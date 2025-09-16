import { ColorValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { getVariant } from '../../utils';
import {
  ButtonLabelStylesParams,
  ButtonRootContainerStylesInterface,
  ButtonSizeConfig,
  ButtonSizeVariant,
  ButtonVariationsType,
  GetButtonStylesProps,
} from './Button.types';

export const styles = StyleSheet.create({
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

export const buttonRootContainerStyles = ({ flex }: ButtonRootContainerStylesInterface): ViewStyle => ({
  ...(flex && { flex }),
});

export const baseStyles = (size?: ButtonSizeVariant, sizeConfig?: ButtonSizeConfig): ViewStyle => {
  let height: number;

  switch (size) {
    case 'small':
      height = sizeConfig?.small?.height ?? 20;
      break;
    case 'medium':
      height = sizeConfig?.medium?.height ?? 30;
      break;
    case 'large':
      height = sizeConfig?.large?.height ?? 40;
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

export const getButtonStyles = ({
  themeColors,
  buttonColor,
  disabled,
  square,
  backgroundColor,
  variation = 'contained',
  size = 'large',
  sizeConfig,
}: GetButtonStylesProps): ViewStyle => {
  const isContainedVariation = variation === 'contained';
  let buttonBackgroundColor: ColorValue | undefined;

  if (backgroundColor) {
    buttonBackgroundColor = backgroundColor;
  } else if (buttonColor) {
    buttonBackgroundColor = getVariant({ variant: buttonColor, colors: themeColors });
  }

  const variations: Record<ButtonVariationsType, ViewStyle> = {
    outlined: {
      ...baseStyles(size, sizeConfig),
      backgroundColor: 'transparent',
      borderColor: themeColors.grey[400],
      borderWidth: 1,
    },
    contained: baseStyles(size, sizeConfig),
    text: {
      ...baseStyles(size, sizeConfig),
      backgroundColor: 'transparent',
    },
    roundedIconButton: styles.iconButton,
    squareIconButton: {
      ...styles.iconButton,
      borderRadius: 5,
    },
  };

  return {
    ...(buttonBackgroundColor && { backgroundColor: buttonBackgroundColor }),
    ...variations[variation],
    ...(!isContainedVariation && { borderColor: getVariant({ variant: buttonColor, colors: themeColors }) }),
    ...(disabled && { opacity: 0.7 }),
    ...(square && { borderRadius: 0 }),
  };
};

export const buttonLabelStyles = ({ size, sizeConfig }: ButtonLabelStylesParams): TextStyle => {
  let fontSize: number;

  switch (size) {
    case 'small':
      fontSize = sizeConfig?.small?.fontSize ?? 12;
      break;
    case 'medium':
      fontSize = sizeConfig?.medium?.fontSize ?? 13;
      break;
    default:
      fontSize = sizeConfig?.large?.fontSize ?? 14;
      break;
  }

  return { fontSize };
};
