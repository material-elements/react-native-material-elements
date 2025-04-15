import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeCardConfigSelector, useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { cardVariation } from './Card.styles';
import { CardProps } from './Card.types';
import { useRestyle } from '../../hooks';

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
