import React from 'react';
import { View, ViewProps } from 'react-native';
import { useRestyle } from '../../hooks';
import { useThemeColorsSelector } from '../../libraries';
import { StyledProps } from '../../libraries/style/styleTypes';
import { Theme } from '../../libraries/types';
import { generateSegmentContainerStyle, styles } from './SegmentedControl.styles';

export interface SegmentedControlContainerProps extends ViewProps, StyledProps {}
export interface GenerateSegmentContainerStyle {
  themeColors: Theme;
}

export const SegmentedControlContainer: React.FC<SegmentedControlContainerProps> = function ({ style, ...props }) {
  const themeColors = useThemeColorsSelector();
  const { getStyleFromProps } = useRestyle(props);

  return (
    <View style={[styles.container, generateSegmentContainerStyle({ themeColors }), getStyleFromProps(), style]} {...props} />
  );
};
