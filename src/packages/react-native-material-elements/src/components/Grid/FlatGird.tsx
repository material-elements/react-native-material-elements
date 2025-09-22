import React from 'react';
import { FlatList, FlatListProps, ListRenderItem, ListRenderItemInfo, StyleSheet, View } from 'react-native';

export interface FlatGirdProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[];
  numColumns?: number;
  renderItem: ListRenderItem<T>;
  spacing?: number;
}

export const FlatGrid = <T,>({ data, numColumns = 2, spacing = 0, renderItem, ...flatListProps }: FlatGirdProps<T>) => {
  const renderGridItem = (info: ListRenderItemInfo<T>) => {
    return (
      <View style={[styles.gridItem, { width: `${100 / numColumns}%`, padding: spacing }]}>
        {renderItem ? renderItem(info) : null}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderGridItem}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      {...flatListProps}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: { aspectRatio: 1 },
});
