import React from 'react';
import { View } from 'react-native';
import { useRestyle } from '../../hooks';
import { Box } from '../Box';
import { dialogActionsContainerStyles as dialogActionsContainerS, styles } from './Dialog.styles';
import { DialogActionsProps } from './Dialog.types';

export const DialogActions = React.forwardRef<View, DialogActionsProps>(
  ({ style, children, dialogActionsContainerStyles, maxWidth = 150, fullWidth, ...props }, ref) => {
    const { getStyleFromProps } = useRestyle(props);

    return (
      <Box ref={ref} style={[styles.dialogActions, getStyleFromProps(), style]} {...props}>
        <View
          style={[styles.dialogActionsContainer, dialogActionsContainerS({ maxWidth, fullWidth }), dialogActionsContainerStyles]}>
          {children}
        </View>
      </Box>
    );
  },
);
