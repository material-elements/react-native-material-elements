import { TextStyle, ViewStyle } from 'react-native';
import { GetAlertContainerStylesParams, GetAlertTitleStylesParams } from './Alert';
import { getVariant } from '../../utils';
import { grey } from '../../libraries';

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

export const getAlertTitleStyles = ({ variant, variation }: GetAlertTitleStylesParams): TextStyle => {
  const isWarningVariant = variant === 'warning';
  const isOutlinedAlert = variation === 'outlined';

  return {
    ...(!isOutlinedAlert && isWarningVariant && { color: grey[900] }),
  };
};
