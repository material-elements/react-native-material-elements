import React from 'react';
import { View } from 'react-native';
import { useRestyle } from '../../hooks';
import { useThemeCardHeaderConfigSelector } from '../../libraries';
import { Box } from '../Box';
import { CardHeaderProps } from './Card.types';

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
