import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { getStackInnerContainerStyles } from './utils';
import { useRestyle } from '../../hooks';

export interface StackProps extends Omit<BoxProps, 'animatedView' | 'direction'> {
  /**
   * Space (in pixels or design units) between each child element in the stack.
   * This controls the visual gap between stacked items.
   *
   * Example: spacing={8} will add 8px gap between items.
   */
  spacing?: number;

  /**
   * Layout direction of the stack items.
   * - 'row' places children horizontally (like flex-direction: row)
   * - 'column' places children vertically (like flex-direction: column)
   *
   * Defaults to 'column' if not specified.
   */
  direction?: 'row' | 'column';

  /**
   * Optional key to uniquely identify this stack, useful for debugging,
   * animations, or conditional rendering.
   */
  stackKey?: string;
}
export interface GetStackInnerContainerStylesParams extends Pick<StackProps, 'spacing' | 'direction'> {
  index: number;
  count: number;
}

export const Stack = React.forwardRef<View, StackProps>(
  ({ style, sx, children, spacing = 0, direction = 'column', stackKey = 'stack-key', ...props }, ref) => {
    const isRowStack = direction === 'row';

    const renderChild = () => {
      return React.Children.map(children, (child, index) => {
        if (!child) {
          return null;
        }

        const containerStyles = getStackInnerContainerStyles({
          index,
          spacing,
          direction,
          count: React.Children.count(children),
        });
        return (
          <View
            key={`stack-child-${index}-${stackKey}`}
            style={StyleSheet.flatten([isRowStack && styles.stackRowInnerContainer, containerStyles])}>
            {child}
          </View>
        );
      });
    };

    return (
      <Box
        ref={ref}
        sx={sx}
        key={`stack-${stackKey}-${direction}`}
        style={[styles.stackContainer, isRowStack && styles.stackRowContainer, style]}
        {...props}>
        {renderChild()}
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  stackContainer: {
    maxWidth: '100%',
    width: '100%',
  },
  stackRowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  stackRowInnerContainer: {
    flex: 1,
  },
});
