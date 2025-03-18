import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Theme } from '../../libraries/themes/types';
import { generateSegmentContainerStyle, styles } from './SegmentedControl.styles';

export interface SegmentedControlContainerProps extends ViewProps {}
export interface GenerateSegmentContainerStyle {
  themeColors: Theme;
}

export const SegmentedControlContainer: React.FC<SegmentedControlContainerProps> = function ({ style, ...props }) {
  const themeColors = useThemeColorsSelector();

  return <View style={[styles.container, generateSegmentContainerStyle({ themeColors }), style]} {...props} />;
};
