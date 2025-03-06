import React from 'react';
import { ActivityIndicatorProps } from 'react-native';
import { ActivityIndicator } from '../ActivityIndicator';
import { Box } from '../Box';
import { BoxProps } from '../types';

export interface TextFieldEndAdornmentProps {
  loading?: boolean;
  endAdornment?: React.ReactNode;
  showLoadingIndicatorWhenFocused?: boolean;
  loadingIndicatorProps?: ActivityIndicatorProps;
  isFocused?: boolean;
  endAdornmentContainerProps?: Omit<BoxProps, 'children'>;
}

const TextFieldEndAdornment: React.FC<TextFieldEndAdornmentProps> = ({
  loading,
  endAdornment,
  showLoadingIndicatorWhenFocused,
  isFocused,
  loadingIndicatorProps,
  endAdornmentContainerProps,
}) => {
  if (!loading && !endAdornment) {
    return null;
  }

  let element: React.ReactNode;

  if (endAdornment) {
    element = endAdornment;
  } else {
    if (showLoadingIndicatorWhenFocused && isFocused && loading) {
      element = <ActivityIndicator {...loadingIndicatorProps} />;
    } else if (!showLoadingIndicatorWhenFocused && loading) {
      element = <ActivityIndicator {...loadingIndicatorProps} />;
    }
  }

  if (!element) {
    return null;
  }

  return (
    <Box sx={{ me: 8, ms: 8 }} {...endAdornmentContainerProps}>
      {element}
    </Box>
  );
};

export default TextFieldEndAdornment;
