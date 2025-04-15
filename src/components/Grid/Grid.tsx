import React, { forwardRef } from 'react';
import { DimensionValue, StyleProp, View, ViewStyle } from 'react-native';
import { useRestyle } from '../../hooks';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { gridContainerStyles, gridItemContainerStyles, styles } from './Grid.styles';

/**
 * Type representing the size of a grid item.
 * Valid values are integers from 1 to 12, where each number represents
 * a fraction of the total grid width (e.g., 12 represents full width, 6 represents half).
 */
export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Interface defining the props for the Grid component.
 * Combines properties from BoxProps and specific grid-related configurations.
 */
export interface GridProps
  extends BoxProps,
    Pick<GridItemProps, 'size' | 'gridInnerContainerStyles' | 'leftSpacing' | 'rightSpacing' | 'topSpacing' | 'bottomSpacing'> {
  /**
   * Width of the grid container. Accepts a numeric value or a percentage string.
   */
  width?: DimensionValue;
  /**
   * General spacing between grid items in pixels.
   * This is applied uniformly unless overridden by `columnSpacing` or `rowSpacing`.
   */
  spacing?: number;
  /**
   * If true, the component will behave as a grid container.
   * This enables item alignment and spacing configuration.
   */
  container?: boolean;
  /**
   * If true, the component will behave as a grid item.
   * This allows specifying individual item sizes and styles.
   */
  item?: boolean;
  /**
   * Spacing between columns in the grid, measured in pixels.
   * Overrides the `spacing` property for column-specific spacing.
   */
  columnSpacing?: number;
  /**
   * Spacing between rows in the grid, measured in pixels.
   * Overrides the `spacing` property for row-specific spacing.
   */
  rowSpacing?: number;
}

/**
 * Interface defining styles specific to the grid container.
 */
export interface GridContainerStylesInterface extends Pick<GridProps, 'width'> {}

/**
 * Interface defining the props for a grid item within the Grid component.
 */
export interface GridItemProps extends BoxProps {
  /**
   * Specifies the size of the grid item, based on the `GridSize` type.
   * Determines the width as a fraction of the total grid container width.
   */
  size?: GridSize;
  /**
   * Styles applied to the inner container of the grid item.
   * Allows for customization of individual grid item appearance.
   */
  gridInnerContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Spacing to the left of the grid item. Can be numeric or percentage-based.
   */
  leftSpacing?: DimensionValue;
  /**
   * Spacing to the right of the grid item. Can be numeric or percentage-based.
   */
  rightSpacing?: DimensionValue;
  /**
   * Spacing above the grid item. Can be numeric or percentage-based.
   */
  topSpacing?: DimensionValue;
  /**
   * Spacing below the grid item. Can be numeric or percentage-based.
   */
  bottomSpacing?: DimensionValue;
}
export interface GridItemContainerStylesInterface
  extends Pick<GridItemProps, 'size' | 'leftSpacing' | 'rightSpacing' | 'topSpacing' | 'bottomSpacing'> {}

export const Grid = forwardRef<View, GridProps>(
  (
    {
      sx,
      style,
      width,
      children,
      container,
      item,
      columnSpacing = 0,
      rowSpacing = 0,
      spacing = 0,
      gridInnerContainerStyles,
      leftSpacing = 0,
      rightSpacing = 0,
      topSpacing = 0,
      bottomSpacing = 0,
      size = 1,
      ...props
    },
    ref,
  ) => {
    const { getStyleFromProps } = useRestyle(props);

    if (!container && !item) {
      console.warn('Grid container or grid item is not defined');
      return null;
    }

    const childArray = React.Children.toArray(children);

    const getNextRowItemSize = (index: number): number => {
      const nextRowItemIndex = index + 1;
      const nextRowItem = childArray[nextRowItemIndex];
      return React.isValidElement(nextRowItem) ? (nextRowItem.props.size as number) : 0;
    };

    const renderChild = () => {
      const totalColumns = 12;
      let currentRowTotalSize = 0;
      let currentRowIndex = 1;
      let isLastInRow = false;

      return childArray.map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        const childSize = child.props.size || 1;

        const isFirstInRow = currentRowTotalSize === 0;
        const isFirstRow = currentRowIndex === 1;
        const nextRowItemSize = getNextRowItemSize(index);

        if (currentRowTotalSize + childSize > totalColumns) {
          isLastInRow = true;
          currentRowTotalSize = childSize;
          currentRowIndex += 1;
        } else {
          currentRowTotalSize += childSize;
          if (currentRowTotalSize + nextRowItemSize > totalColumns) {
            isLastInRow = true;
            currentRowTotalSize = 0;
            currentRowIndex += 1;
          } else {
            isLastInRow = false;
          }
        }

        if (currentRowTotalSize === totalColumns) {
          isLastInRow = true;
          currentRowTotalSize = 0;
          currentRowIndex += 1;
        }

        let childProps: GridItemProps = {};

        let halfSpacing = typeof spacing === 'number' && spacing > 0 ? spacing / 2 : undefined;
        const halfColSpacing =
          typeof columnSpacing === 'number' && columnSpacing && columnSpacing > 0 ? columnSpacing / 2 : undefined;
        const gap = halfSpacing ?? halfColSpacing;
        const childTopSpacing = typeof rowSpacing === 'number' && rowSpacing > 0 ? rowSpacing : spacing;

        /**
         * Determines if the current item should have both left and right spacing applied.
         * This happens when the item is neither the first nor the last in the row.
         */
        const hasLeftAndRightSpacing = !isFirstInRow && !isLastInRow;

        /**
         * Determines if the current item should have right spacing applied.
         * - Applies when the item is the first in the row but not the last.
         * - Applies if the item is the only one in the row but there is space left in the total columns.
         * - Applies if the item is not the last in the row and the next row's item size will exceed the total columns.
         */
        const hasRightSpacing =
          (isFirstInRow && !isLastInRow) ||
          (isFirstInRow && isLastInRow && childSize < totalColumns) ||
          (!isLastInRow && childSize + nextRowItemSize > totalColumns);
        /**
         * Determines if the current item should have only left spacing applied.
         * This applies when the item is the last in the row but not the first.
         */
        const hasLeftSpacing = isLastInRow && !isFirstInRow;

        childProps = {
          ...(hasLeftSpacing && { leftSpacing: gap }),
          ...(hasLeftAndRightSpacing && { leftSpacing: gap, rightSpacing: gap }),
          ...(hasRightSpacing && { rightSpacing: gap }),
          ...(!isFirstRow && { topSpacing: childTopSpacing }),
        };

        return React.cloneElement(child, { ...childProps, ...child.props } as GridItemProps);
      });
    };

    if (item) {
      return (
        <Box
          ref={ref}
          sx={sx}
          style={[
            gridItemContainerStyles({ size, topSpacing, bottomSpacing, leftSpacing, rightSpacing }),
            getStyleFromProps(),
            style,
          ]}
          {...props}>
          <Box style={gridInnerContainerStyles}>{children}</Box>
        </Box>
      );
    } else if (container) {
      return (
        <Box
          ref={ref}
          sx={sx}
          style={[styles.gridContainer, gridContainerStyles({ width }), getStyleFromProps(), style]}
          {...props}>
          {renderChild()}
        </Box>
      );
    }
  },
);
