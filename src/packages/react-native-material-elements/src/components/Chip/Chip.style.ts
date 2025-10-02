import { ColorValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { gray } from '../../libraries';
import { getVariant } from '../../utils';
import { GenerateChipStylesProps, LabelStylesInterface } from './Chip.types';

export const styles = StyleSheet.create({
  chip: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    alignSelf: 'flex-start',
  },
  chipWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
});

export const generateChipStyles = ({
  variant,
  disabled,
  color,
  colors,
  colorSchemeConfig,
  isActive,
  backgroundColor,
  activeBackgroundColor,
}: GenerateChipStylesProps) => {
  let baseStyles: ViewStyle = {};

  if (disabled) {
    baseStyles = { ...baseStyles, opacity: 0.5 };
  }

  let currentColor: ColorValue;

  if (isActive) {
    currentColor = activeBackgroundColor ?? colors.lightBlue[400];
  } else if (backgroundColor) {
    currentColor = backgroundColor;
  } else {
    currentColor = getVariant({ variant: color, colors, config: colorSchemeConfig });
  }

  if (variant === 'outlined') {
    baseStyles = {
      ...baseStyles,
      borderWidth: 1,
      borderColor: currentColor,
    };
  } else {
    baseStyles.backgroundColor = currentColor;
  }

  return baseStyles;
};

export const labelStyles = ({
  isOutlinedVariant,
  labelColor,
  color,
  colors,
  syncBorderAndLabelColor,
  colorSchemeConfig,
  isActive,
  activeLabelColor,
}: LabelStylesInterface): TextStyle => {
  let textColor: ColorValue;

  if (isActive) {
    textColor = activeLabelColor ?? gray[50];
  } else if (
    color === 'secondary' ||
    color === 'error' ||
    color === 'success' ||
    color === 'info' ||
    color === 'primary' ||
    color === 'gray'
  ) {
    textColor = gray[50];
  } else if (color === 'lightGray') {
    textColor = colors.gray[800];
  } else if (color === 'warning') {
    textColor = gray[800];
  } else {
    textColor = colors.gray[50];
  }

  let resolvedColor;

  if (syncBorderAndLabelColor && color !== 'warning' && color !== 'lightGray' && color !== 'gray') {
    resolvedColor = getVariant({ variant: color, colors, config: colorSchemeConfig, systemColorItem: '900' });
  } else if (labelColor) {
    resolvedColor = labelColor;
  } else {
    const rColor = isOutlinedVariant ? colors.gray[900] : textColor;
    resolvedColor = activeLabelColor ?? rColor;
  }

  return {
    color: resolvedColor,
    fontWeight: '500',
    fontSize: 12,
  };
};
