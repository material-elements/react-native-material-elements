import { DimensionValue, StyleSheet, ViewStyle } from 'react-native';
import { DialogActionsContainerStylesInterface, DialogContainerStylesInterface } from './Dialog.types';

export const styles = StyleSheet.create({
  dialogRootContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContainer: {
    paddingBottom: 8,
    zIndex: 100,
  },
  dialogContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 10,
  },
  dialogActions: {
    paddingTop: 5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dialogActionsContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  dialogTitle: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 8,
  },
});

export const dialogContainerStyles = ({
  colors,
  fullWidth,
  maxWidth,
  borderRadius,
}: DialogContainerStylesInterface): ViewStyle => {
  let width: DimensionValue;

  switch (maxWidth) {
    case 'xs':
      width = '25%';
      break;
    case 'sm':
      width = '35%';
      break;
    case 'md':
      width = '50%';
      break;
    case 'lg':
      width = '70%';
      break;
    case 'xl':
      width = '85%';
      break;
    default:
      width = '90%';
  }

  const mW = fullWidth ? '100%' : width;

  return {
    backgroundColor: colors.gray[800],
    maxWidth: mW,
    borderRadius,
  };
};

export const dialogActionsContainerStyles = ({ align }: DialogActionsContainerStylesInterface): ViewStyle => {
  let justifyContent: ViewStyle['justifyContent'];

  switch (align) {
    case 'left':
      justifyContent = 'flex-start';
      break;
    case 'center':
      justifyContent = 'center';
      break;
    case 'right':
    default:
      justifyContent = 'flex-end';
      break;
  }

  return { justifyContent };
};
