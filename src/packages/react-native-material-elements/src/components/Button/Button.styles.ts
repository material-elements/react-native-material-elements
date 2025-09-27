import { ColorValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { getVariant } from '../../utils';
import {
  BaseButtonStyles,
  ButtonLabelStylesParams,
  ButtonSizeConfig,
  ButtonSizeVariant,
  ButtonVariationsType,
  GetButtonStylesProps,
} from './Button.types';
import {
  BUTTON_LABEL_LARGE_SIZE,
  BUTTON_LABEL_MEDIUM_SIZE,
  BUTTON_LABEL_SMALL_SIZE,
  BUTTON_LARGE_HEIGHT,
  BUTTON_MEDIUM_SIZE,
  BUTTON_SMALL_HEIGHT,
} from './constants';

export const styles = StyleSheet.create({
  buttonStyles: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonLabelContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftLabelPadding: {
    paddingLeft: 5,
    paddingRight: 10,
  },
  rightLabelPadding: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  rightAndLeftButtonPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  rightAndLeftButtonPaddingWithoutIcon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconContainer: {
    paddingLeft: 8,
  },
  rightIconContainer: {
    paddingRight: 8,
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

export const baseStyles = (size?: ButtonSizeVariant, sizeConfig?: ButtonSizeConfig): ViewStyle => {
  let height: number;

  switch (size) {
    case 'small':
      height = sizeConfig?.small?.height ?? BUTTON_SMALL_HEIGHT;
      break;
    case 'medium':
      height = sizeConfig?.medium?.height ?? BUTTON_MEDIUM_SIZE;
      break;
    case 'large':
      height = sizeConfig?.large?.height ?? BUTTON_LARGE_HEIGHT;
      break;
    default:
      height = BUTTON_MEDIUM_SIZE;
  }

  return {
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
      borderColor: themeColors.gray[400],
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
      fontSize = sizeConfig?.small?.fontSize ?? BUTTON_LABEL_SMALL_SIZE;
      break;
    case 'medium':
      fontSize = sizeConfig?.medium?.fontSize ?? BUTTON_LABEL_MEDIUM_SIZE;
      break;
    case 'large':
      fontSize = sizeConfig?.large?.fontSize ?? BUTTON_LABEL_LARGE_SIZE;
      break;
    default:
      fontSize = sizeConfig?.large?.fontSize ?? BUTTON_LABEL_MEDIUM_SIZE;
      break;
  }

  return { fontSize };
};

export const baseButtonStyles = ({ fullWidth }: BaseButtonStyles): ViewStyle => {
  const _styles: ViewStyle = {
    alignSelf: 'flex-start',
  };

  if (fullWidth) {
    _styles.width = '100%';
    _styles.alignSelf = 'auto';
  }

  return _styles;
};
