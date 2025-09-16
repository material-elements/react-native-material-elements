import React from 'react';
import { View } from 'react-native';
import { useRestyle } from '../../hooks';
import { generateElementStyles } from '../../utils';
import { containerStyles, generateContainerStyles, generateContainerWrapperStyles } from './Box.style';
import { ContainerProps } from './Box.types';

export const Container = React.forwardRef<View, ContainerProps>(
  ({ sx, style, maxWidth, disableGutters, flex, children, containerStyles: containerWrapperStyles, testID, ...props }, ref) => {
    const { getStyleFromProps } = useRestyle(props);
    const containerWrapperTestId = testID ? `${testID}_outer` : undefined;

    return (
      <View
        style={[containerStyles.containerSX, generateContainerWrapperStyles({ flex }), containerWrapperStyles]}
        testID={containerWrapperTestId}
        ref={ref}>
        <View
          style={[
            generateContainerStyles({ maxWidth, disableGutters, flex }),
            generateElementStyles(sx ?? {}),
            getStyleFromProps(),
            style,
          ]}
          testID={testID}
          {...props}>
          {children}
        </View>
      </View>
    );
  },
);
