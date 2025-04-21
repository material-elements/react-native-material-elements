import React from 'react';
import { View } from 'react-native';
import { useRestyle } from '../../hooks';
import { useThemeCardConfigSelector, useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { cardVariation } from './Card.styles';
import { CardProps } from './Card.types';

export const Card = React.forwardRef<View, CardProps>(({ children, variation, style, sx, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();
  const cardThemeConfig = useThemeCardConfigSelector();
  const { getStyleFromProps } = useRestyle(props);

  return (
    <Box
      ref={ref}
      style={[variation && cardVariation(variation, themeColors), cardThemeConfig?.style, getStyleFromProps(), style]}
      sx={sx}
      {...props}>
      {children}
    </Box>
  );
});

Card.displayName = 'Card';
