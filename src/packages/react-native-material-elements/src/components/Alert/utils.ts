import { TextStyle, ViewStyle } from 'react-native';
import { getVariant } from '../../utils';
import { gray } from '../../libraries';
import { GetAlertContainerStylesParams, GetAlertTitleStylesParams } from './Alert.types';

export const getAlertContainerStyles = ({
  colors,
  variant,
  variation,
  colorScheme,
}: GetAlertContainerStylesParams): ViewStyle => {
  const isDark = colorScheme === 'dark';
  const isGhostVariation = variation === 'ghost';

  const variantColor = isGhostVariation ? colors.gray[100] : getVariant({ variant, colors });
  const isOutlinedAlert = variation === 'outlined';

  if (isOutlinedAlert) {
    return {
      borderColor: variantColor,
      borderWidth: 1,
    };
  }

  if (isGhostVariation) {
    return {
      borderColor: isDark ? gray[700] : gray[300],
      borderWidth: 0.8,
      backgroundColor: variantColor,
    };
  }

  return { backgroundColor: variantColor };
};

export const getAlertTitleStyles = ({ variant, variation, colorScheme, colors }: GetAlertTitleStylesParams): TextStyle => {
  const isDark = colorScheme === 'dark';
  const isGhostVariation = variation === 'ghost';

  const isWarningVariant = variant === 'warning';
  const isLightGrayVariant = variant === 'lightGray';
  const isGrayVariant = variant === 'gray';
  const isOutlinedAlert = variation === 'outlined';

  if (
    (isLightGrayVariant || (isGhostVariation && (isWarningVariant || isGrayVariant || isLightGrayVariant)) || isOutlinedAlert) &&
    !isDark
  ) {
    return { color: gray[800] };
  }

  return {
    ...(!isOutlinedAlert && isWarningVariant && !isGhostVariation && { color: gray[900] }),
    ...(!isOutlinedAlert &&
      isGhostVariation &&
      !isGrayVariant &&
      !isLightGrayVariant && { color: getVariant({ variant, colors }) }),
  };
};
