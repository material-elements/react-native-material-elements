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
  testID?: string;
}

const TextFieldEndAdornment: React.FC<TextFieldEndAdornmentProps> = ({
  loading,
  endAdornment,
  showLoadingIndicatorWhenFocused,
  isFocused,
  loadingIndicatorProps,
  endAdornmentContainerProps,
  testID,
}) => {
  if (!loading && !endAdornment) {
    return null;
  }

  let element: React.ReactNode = null;

  if (endAdornment) {
    element = endAdornment;
  } else if ((showLoadingIndicatorWhenFocused && isFocused && loading) || (!showLoadingIndicatorWhenFocused && loading)) {
    element = <ActivityIndicator {...loadingIndicatorProps} />;
  }

  if (!element) {
    return null;
  }

  return (
    <Box sx={{ me: 8, ms: 8 }} {...endAdornmentContainerProps} testID={testID}>
      {element}
    </Box>
  );
};

export default TextFieldEndAdornment;
