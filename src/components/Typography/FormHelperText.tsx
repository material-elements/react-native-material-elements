import React from 'react';
import { Text as RnText } from 'react-native';
import { TextProps } from './TextTypes';
import { Text } from './Text';

export const FormHelperText = React.forwardRef<RnText, TextProps>((props, ref) => {
  return <Text ref={ref} {...props} />;
});
