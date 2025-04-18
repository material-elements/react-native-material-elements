import React from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { dialogActionsContainerStyles as dialogActionsContainerS, styles } from './Dialog.styles';
import { DialogActionsProps } from './Dialog.types';

export const DialogActions = React.forwardRef<View, DialogActionsProps>(
  ({ style, children, dialogActionsContainerStyles, maxWidth = 150, fullWidth, ...props }, ref) => {
    return (
      <Box ref={ref} style={[styles.dialogActions, style]} {...props}>
        <View
          style={[styles.dialogActionsContainer, dialogActionsContainerS({ maxWidth, fullWidth }), dialogActionsContainerStyles]}>
          {children}
        </View>
      </Box>
    );
  },
);
