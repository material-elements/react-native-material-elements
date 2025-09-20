import React, { forwardRef, useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Box } from '../Box';
import { createModalBackgroundStyles } from './Portal.styles';
import { ModalContainerProps } from './Portal.types';

export const ModalContainer = forwardRef<View, ModalContainerProps>(
  ({ style, sx, onClose, children, rootWrapperTestID, ...props }, ref) => {
    const styles = useMemo(() => createModalBackgroundStyles(), []);

    const onPressHandler = () => {
      if (onClose) {
        onClose();
      }
    };

    return (
      <TouchableWithoutFeedback onPress={onPressHandler} testID={rootWrapperTestID}>
        <Box style={[styles, style]} sx={sx} ref={ref} {...props}>
          <TouchableWithoutFeedback accessible={false}>{children}</TouchableWithoutFeedback>
        </Box>
      </TouchableWithoutFeedback>
    );
  },
);
