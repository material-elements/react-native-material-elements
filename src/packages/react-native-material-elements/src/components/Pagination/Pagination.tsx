import React, { useEffect, useMemo, useState } from 'react';
import { GestureResponderEvent, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useThemePaginationConfigSelector } from '../../libraries';
import { Box } from '../Box';
import { Text } from '../Typography';
import { styles } from './Pagination.style';
import { PaginationProps } from './Pagination.types';
import { PaginationItem } from './PaginationItem';

const MAX_PAGINATION_ITEM_VISIBLE = 5;

export const Pagination = React.forwardRef<View, PaginationProps>(
  (
    {
      onPageChange,
      dotContainerProps,
      dotStyles,
      paginationItemProps,
      style,
      disabled,
      itemShape,
      variant,
      color = 'secondary',
      activeCount: active = 1,
      renderItem,
      count = 1,
      ...props
    },
    ref,
  ) => {
    const paginationThemeConfig = useThemePaginationConfigSelector();
    const [activeCount, setActiveCount] = useState<number>(1);
    const paginationItemShape = itemShape ?? paginationThemeConfig?.itemShape;

    const items = useMemo(() => Array.from({ length: count }, (_, index) => index + 1), [count]);

    const { colors: themeColorScheme } = paginationThemeConfig || {};

    const pageChangeHandler = (event: GestureResponderEvent, page: number | string) => {
      setActiveCount(+page);
      if (onPageChange && typeof onPageChange === 'function') {
        onPageChange(event, +page);
      }
    };

    const renderPaginationItems = (): (string | number)[] => {
      let paginationItems: (string | number)[] = [];

      if (count <= MAX_PAGINATION_ITEM_VISIBLE) {
        // If count is less than or equal to the max visible items, show all pages
        paginationItems = items;
      } else {
        if (activeCount <= 4) {
          // Show the first five items when active item is between 1 and 4
          for (let i = 1; i <= 5; i++) {
            paginationItems.push(i);
          }
          if (count > 5) {
            paginationItems.push('end-dots');
            paginationItems.push(count);
          }
        } else if (activeCount >= count - 3) {
          // Show the last five items when reaching the end
          paginationItems.push(1);
          paginationItems.push('start-dots');
          for (let i = count - 4; i <= count; i++) {
            paginationItems.push(i);
          }
        } else {
          // Show a mix of start, current, and end items
          paginationItems.push(1);
          paginationItems.push('start-dots');

          const start = Math.max(2, activeCount - 1);
          const end = Math.min(count - 1, activeCount + 1);

          for (let i = start; i <= end; i++) {
            paginationItems.push(i);
          }

          paginationItems.push('end-dots');
          paginationItems.push(count);
        }
      }

      return paginationItems;
    };

    useEffect(() => {
      setActiveCount(active);
    }, [active]);

    return (
      <Box ref={ref} style={[styles.paginationContainer, paginationThemeConfig?.style, style]} {...props}>
        {renderPaginationItems().map((item, index) => {
          if (item === 'start-dots' || item === 'end-dots') {
            return (
              <Box key={`pagination_dots_${index}`} {...dotContainerProps}>
                <Text
                  variation="h2"
                  style={StyleSheet.flatten([
                    { marginHorizontal: 5, opacity: disabled ? 0.4 : 1 },
                    paginationThemeConfig?.dotStyles,
                    dotStyles,
                  ])}>
                  ···
                </Text>
              </Box>
            );
          }
          return renderItem ? (
            <TouchableWithoutFeedback key={`pagination_dots_${index}`} onPress={event => pageChangeHandler(event, item)}>
              {renderItem}
            </TouchableWithoutFeedback>
          ) : (
            <PaginationItem
              key={`pagination_${item}_${index}`}
              onPress={event => pageChangeHandler(event, item)}
              page={item}
              active={activeCount === item}
              disabled={disabled}
              color={color}
              shape={paginationItemShape}
              variant={variant}
              themeColorScheme={themeColorScheme}
              {...paginationItemProps}
            />
          );
        })}
      </Box>
    );
  },
);
