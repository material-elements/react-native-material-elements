import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { Text } from '../Typography';
import { listItemTextStyles, styles } from './List.style';
import { ListItemTextProps } from './List.types';

export const ListItemText = React.forwardRef<View, ListItemTextProps>(
  (
    {
      style,
      primary,
      primaryLabelStyles,
      secondary,
      secondaryLabelStyles,
      secondaryLabelProps,
      disablePadding,
      primaryLabelProps,
      disableLeftPadding = false,
      alignItems = 'start',
      children,
      ...props
    },
    ref,
  ) => {
    const listItemGeneratedStyles = useMemo(
      () => listItemTextStyles({ disablePadding, alignItems, disableLeftPadding }),
      [disablePadding, alignItems, disableLeftPadding],
    );

    return (
      <Box ref={ref} style={[styles.listItemText, listItemGeneratedStyles, style]} {...props}>
        {primary && (
          <Text variation="h3" style={primaryLabelStyles} {...primaryLabelProps}>
            {primary}
          </Text>
        )}
        {secondary && (
          <Text variation="h5" style={secondaryLabelStyles} {...secondaryLabelProps}>
            {secondary}
          </Text>
        )}
        {children}
      </Box>
    );
  },
);
