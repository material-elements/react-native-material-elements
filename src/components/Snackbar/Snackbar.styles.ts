import { ColorValue, DimensionValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { green, grey } from '../../libraries';
import { getVariant, isAndroid, isIso, isLargeScreen } from '../../utils';
import { SnackbarContainerStylesInterface, SnackBarLabelStyles, SnackbarRootContainerStylesInterface } from './Snackbar';

export const styles = StyleSheet.create({
  snackbarRootContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    zIndex: 9999,
    elevation: 1000,
  },
  snackbar: {
    minHeight: 50,
    borderRadius: 6,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
    left: 0,
  },
  snackbarLabelWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  adornment: {
    paddingLeft: 14,
  },
  snackbarLabelContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  snackbarOptionContainer: {
    flex: 0.3,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: { color: green[500], fontWeight: 600, fontSize: 14 },
  actionButtonContainer: { width: '100%' },
  actionButton: { width: '100%', borderRadius: 0, height: '100%' },
  icon: {
    width: 20,
    height: 20,
  },
});

export const snackbarRootContainerStyle = ({
  horizontal,
  opacityValue,
  translateY,
}: SnackbarRootContainerStylesInterface): ViewStyle => {
  const isLeftPosition = horizontal === 'left';
  let width: DimensionValue;

  if (isLargeScreen && isIso) {
    width = '40%';
  } else if (isLargeScreen && isAndroid) {
    width = '30%';
  } else {
    width = '100%';
  }

  return {
    width,
    opacity: opacityValue,
    transform: [{ translateY }],
    ...(isLeftPosition && { left: 0 }),
    ...(!isLeftPosition && { right: 0 }),
  };
};

export const snackbarContainerStyles = ({ colors, variant }: SnackbarContainerStylesInterface): ViewStyle => {
  return {
    backgroundColor: variant ? getVariant({ variant: variant, colors }) : grey[900],
  };
};

export const snackBarLabelStyles = ({ variant }: SnackBarLabelStyles): TextStyle => {
  let textColor: ColorValue;

  if (variant === 'warning') {
    textColor = grey[900];
  } else {
    textColor = grey[50];
  }

  return { color: textColor };
};
