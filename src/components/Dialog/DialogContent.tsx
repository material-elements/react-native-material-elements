import React from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { BoxProps } from '../Box/Box.types';
import { styles } from './Dialog.styles';

export const DialogContent = React.forwardRef<View, BoxProps>(({ style, sx, ...props }, ref) => {
  return <Box sx={sx} style={[styles.dialogContent, style]} ref={ref} {...props} />;
});
