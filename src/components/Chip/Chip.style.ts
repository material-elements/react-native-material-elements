import { ColorValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { grey } from '../../libraries';
import { getVariant } from '../../utils';
import { GenerateChipStylesProps, LabelStylesInterface } from './Chip.types';
import { ADORNMENT_WRAPPER_SPACE } from './constants';

export const styles = StyleSheet.create({
  chip: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  chipWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  chipInnerComponentWrapper: {
    minWidth: ADORNMENT_WRAPPER_SPACE,
    minHeight: ADORNMENT_WRAPPER_SPACE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 100,
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
    textColor = activeLabelColor ?? grey[50];
  } else if (
    color === 'secondary' ||
    color === 'error' ||
    color === 'success' ||
    color === 'info' ||
    color === 'primary' ||
    color === 'grey'
  ) {
    textColor = grey[50];
  } else if (color === 'lightGrey') {
    textColor = colors.grey[800];
  } else if (color === 'warning') {
    textColor = grey[800];
  } else {
    textColor = colors.grey[50];
  }

  let resolvedColor;

  if (syncBorderAndLabelColor) {
    resolvedColor = getVariant({ variant: color, colors, config: colorSchemeConfig });
  } else if (labelColor) {
    resolvedColor = labelColor;
  } else {
    const rColor = isOutlinedVariant ? colors.grey[900] : textColor;
    resolvedColor = activeLabelColor ?? rColor;
  }

  return {
    color: resolvedColor,
  };
};
