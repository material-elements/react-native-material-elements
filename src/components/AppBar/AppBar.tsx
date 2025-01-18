import React, { useMemo } from 'react';
import { ColorValue, FlexStyle, StyleSheet, View, ViewProps } from 'react-native';
import { Box } from '../Box';
import { generateAppBarStyles, styles } from './AppBar.styles';
import { BaseStyles } from '../../libraries/style/styleTypes';

export type AppBarProps = ViewProps & {
  sx?: BaseStyles;
  flex?: number;
  display?: FlexStyle['display'];
  alignItems?: FlexStyle['alignItems'];
  justifyContent?: FlexStyle['justifyContent'];
  flexDirection?: FlexStyle['flexDirection'];
  backgroundColor?: ColorValue;
};
export type AppBarItem = ViewProps & AppBarProps;
export type GenerateAppBarStyles = Pick<
  AppBarItem,
  'flex' | 'display' | 'alignItems' | 'justifyContent' | 'flexDirection' | 'backgroundColor'
>;

export const AppBar = React.forwardRef<View, AppBarProps>(
  ({ style, sx, flex, display, alignItems, justifyContent, flexDirection, backgroundColor, ...props }, ref) => {
    const generatedStyles = useMemo(
      () => generateAppBarStyles({ flex, display, alignItems, justifyContent, flexDirection, backgroundColor }),
      [flex, display, alignItems, justifyContent, flexDirection, backgroundColor],
    );

    return <Box style={StyleSheet.flatten([styles.appBarContainer, generatedStyles, style])} sx={sx} {...props} ref={ref} />;
  },
);

export const AppBarItem = React.forwardRef<View, AppBarItem>(
  ({ style, flex, display, alignItems, justifyContent, flexDirection, backgroundColor, ...props }, ref) => {
    const generatedStyles = useMemo(
      () => generateAppBarStyles({ flex, display, alignItems, justifyContent, flexDirection, backgroundColor }),
      [flex, display, alignItems, justifyContent, flexDirection, backgroundColor],
    );

    return <Box style={StyleSheet.flatten([styles.appBarItemContainer, generatedStyles, style])} {...props} ref={ref} />;
  },
);
