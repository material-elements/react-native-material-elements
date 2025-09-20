import React from 'react';
import { View, ViewProps } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { styles } from './AppBar.styles';

export type AppBarProps = ViewProps & {
  sx?: BaseStyles;
};

export const AppBar = React.forwardRef<View, BoxProps>(({ style, ...props }, ref) => {
  return <Box style={[styles.appBarContainer, style]} {...props} ref={ref} />;
});

export const AppBarItem = React.forwardRef<View, BoxProps>(({ style, ...props }, ref) => {
  return <Box style={[styles.appBarItemContainer, style]} {...props} ref={ref} />;
});
