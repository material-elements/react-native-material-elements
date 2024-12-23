import { ViewStyle } from 'react-native';
import { getVariant } from '../../utils';
import { ProgressBarContainerStylesParams, ProgressBarIndicatorStylesParams } from './Progress';

export const getProgressBarContainerStyles = ({
  colors,
  variant,
  borderColor: progressBarBorderColor,
}: ProgressBarContainerStylesParams): ViewStyle => {
  const borderColor = progressBarBorderColor ?? getVariant({ variant, colors });

  return {
    borderColor,
  };
};

export const getProgressBarIndicatorStyles = ({
  colors,
  variant,
  backgroundColor: progressBarIndicatorBackgroundColor,
}: ProgressBarIndicatorStylesParams): ViewStyle => {
  const backgroundColor = progressBarIndicatorBackgroundColor ?? getVariant({ variant, colors });

  return {
    backgroundColor,
  };
};
