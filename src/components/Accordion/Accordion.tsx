import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useRestyle } from '../../hooks';
import { useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { BoxProps } from '../Box/Box.types';
import { accordionWrapperStyles } from './Accordion.style';

export interface AccordionProps extends BoxProps {
  square?: boolean;
  disable?: boolean;
}

export const Accordion = React.forwardRef<View, AccordionProps>(
  ({ style, children, square = false, disable = false, ...props }, ref) => {
    const themeColors = useThemeColorsSelector();
    const { getStyleFromProps } = useRestyle(props);

    const accordionContainerStyles = useMemo(
      () => accordionWrapperStyles({ colors: themeColors, disable, square }),
      [themeColors, disable, square],
    );

    return (
      <Box style={[accordionContainerStyles, getStyleFromProps(), style]} {...props} ref={ref}>
        {React.Children.map(children, child =>
          React.isValidElement(child) ? React.cloneElement<any>(child, { disabled: disable }) : child,
        )}
      </Box>
    );
  },
);
Accordion.displayName = 'Accordion';
