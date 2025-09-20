import React from 'react';
import {Box, useTheme} from './src/packages/react-native-material-elements/src';

export const Component = () => {
  const {theme} = useTheme();

  console.log(theme.colors.scan);

  return <Box />;
};
