import React from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { styles } from './List.style';
import { ListItemIconProps } from './List.types';

export const ListItemIcon = React.forwardRef<View, ListItemIconProps>(({ style, ...props }, ref) => {
  return <Box ref={ref} style={[styles.listItemIcon, style]} {...props} />;
});
