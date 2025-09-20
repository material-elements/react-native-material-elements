import { TextStyle, ViewStyle } from 'react-native';
import { GetAlertContainerStylesParams, GetAlertTitleStylesParams } from './Alert';
import { getVariant } from '../../utils';
import { gray } from '../../libraries';

export const getAlertContainerStyles = ({ colors, variant, variation }: GetAlertContainerStylesParams): ViewStyle => {
  const variantColor = getVariant({ variant, colors });
  const isOutlinedAlert = variation === 'outlined';

  if (isOutlinedAlert) {
    return {
      borderColor: variantColor,
      borderWidth: 1,
    };
  }

  return { backgroundColor: variantColor };
};

export const getAlertTitleStyles = ({ variant, variation, colorScheme }: GetAlertTitleStylesParams): TextStyle => {
  const isLight = colorScheme === 'light';

  const isWarningVariant = variant === 'warning';
  const islightGrayVariant = variant === 'lightGray';
  const isOutlinedAlert = variation === 'outlined';

  if (islightGrayVariant && isLight) {
    return { color: gray[900] };
  }

  return {
    ...(!isOutlinedAlert && isWarningVariant && { color: gray[900] }),
  };
};
