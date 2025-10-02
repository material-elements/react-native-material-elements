import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { Portal } from '../Portal';
import { dialogContainerStyles, styles } from './Dialog.styles';
import { DialogProps } from './Dialog.types';

export const Dialog: React.FC<DialogProps> = ({
  modalContainerProps,
  children,
  dialogContainerProps,
  maxWidth,
  fullWidth = false,
  borderRadius = 10,
  ...props
}) => {
  const themeColors = useThemeColorsSelector();
  const { style: modalContainerStyles, ...rest } = modalContainerProps || {};
  const { style: dialogContainerStyle, ...dialogOtherProps } = dialogContainerProps || {};

  return (
    <Portal
      animationType="fade"
      modalContainerProps={{ style: [styles.dialogRootContainer, modalContainerStyles], ...rest }}
      {...props}>
      <TouchableWithoutFeedback accessible={false}>
        <Box
          style={StyleSheet.flatten([
            styles.dialogContainer,
            dialogContainerStyles({ colors: themeColors, fullWidth, maxWidth, borderRadius }),
            dialogContainerStyle,
          ])}
          {...dialogOtherProps}>
          {children}
        </Box>
      </TouchableWithoutFeedback>
    </Portal>
  );
};
