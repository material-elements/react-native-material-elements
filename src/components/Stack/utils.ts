import { ViewStyle } from 'react-native';
import { GetStackInnerContainerStylesParams } from './Stack';

export const getStackInnerContainerStyles = ({
  index,
  spacing,
  direction,
  count,
}: GetStackInnerContainerStylesParams): ViewStyle => {
  if (count === 0) {
    return {};
  }

  if (spacing !== undefined && spacing <= 0) {
    return {};
  }

  const isRowDirection = direction === 'row';
  const isFirstItem = index === 0;
  const applyToSpacing = !isRowDirection && !isFirstItem && count > 1;
  const applyLeftSpacing = !isFirstItem && isRowDirection;

  return {
    ...(applyToSpacing && { marginTop: spacing }),
    ...(applyLeftSpacing && { marginLeft: spacing }),
  };
};
