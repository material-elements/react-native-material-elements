import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Box } from '../Box';
import { CardContentProps } from './Card.types';

export const CardContent = React.forwardRef<View, CardContentProps>(({ children, style, sx, ...props }, ref) => {
  return (
    <Box ref={ref} style={StyleSheet.flatten([styles.container, style])} sx={sx} {...props}>
      {children}
    </Box>
  );
});

const styles = StyleSheet.flatten({
  container: {
    padding: 10,
  },
});
