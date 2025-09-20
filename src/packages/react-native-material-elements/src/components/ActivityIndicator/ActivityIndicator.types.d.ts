import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Theme } from '../../libraries/types';
import { VariantTypes } from '../../utils';

export interface ActivityIndicatorProps extends React.ComponentPropsWithRef<typeof ActivityIndicator> {
  variant?: VariantTypes;
  switchMode?: boolean;
}
export interface GetActivityIndicatorColor extends Pick<ActivityIndicatorProps, 'variant' | 'switchMode'> {
  colors: Theme;
}
