import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeCardHeaderConfigSelector } from '../../libraries';
import { Box } from '../Box';
import { CardHeaderProps } from './Card.types';
import { useRestyle } from '../../hooks';

export const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, sx, style, ...props }, ref) => {
  const cardHeaderThemeConfig = useThemeCardHeaderConfigSelector();
  const { getStyleFromProps } = useRestyle(props);

  return (
    <Box ref={ref} style={[cardHeaderThemeConfig?.style, getStyleFromProps(), style]} sx={sx} {...props}>
      {children}
    </Box>
  );
});

CardHeader.displayName = 'CardHeader';
