import React, { useMemo } from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { containerStyles, generateContainerStyles, generateContainerWrapperStyles } from './Box.style';
import { ContainerProps } from './Box.types';
import { useRestyle } from '../../hooks';

export const Container = React.forwardRef<View, ContainerProps>(
  ({ sx, style, maxWidth, disableGutters, flex, children, containerStyles: containerWrapperStyles, testID, ...props }, ref) => {
    const { getStyleFromProps } = useRestyle(props);
    const containerWrapperTestId = testID ? `${testID}_outer` : undefined;

    const containerGeneratedStyles = useMemo(() => {
      return {
        ...generateContainerStyles({ maxWidth, disableGutters, flex }),
        ...generateElementStyles(sx ?? {}),
      };
    }, [sx, maxWidth, disableGutters, flex]);

    return (
      <View
        style={[containerStyles.containerSX, generateContainerWrapperStyles({ flex }), containerWrapperStyles]}
        testID={containerWrapperTestId}
        ref={ref}>
        <View style={[containerGeneratedStyles, getStyleFromProps(), style]} testID={testID} {...props}>
          {children}
        </View>
      </View>
    );
  },
);
