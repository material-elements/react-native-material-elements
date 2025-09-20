import React from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { styles, dialogActionsContainerStyles as dialogActionCStyles } from './Dialog.styles';
import { DialogActionsProps } from './Dialog.types';

export const DialogActions = React.forwardRef<View, DialogActionsProps>(
  ({ style, children, dialogActionsContainerStyles, align = 'right', ...props }, ref) => {
    return (
      <Box ref={ref} style={[styles.dialogActions, dialogActionCStyles({ align }), style]} {...props}>
        <View style={[styles.dialogActionsContainer, dialogActionsContainerStyles]}>{children}</View>
      </Box>
    );
  },
);
