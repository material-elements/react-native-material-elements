import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ImageListProps } from './Image.types';

export const ImageList = React.forwardRef<ScrollView, ImageListProps>(
  ({ style, children, contentContainerStyle, ...props }, ref) => {
    return (
      <ScrollView
        style={[style]}
        contentContainerStyle={StyleSheet.flatten([styles.container, contentContainerStyle])}
        ref={ref}
        {...props}>
        {children}
      </ScrollView>
    );
  },
);
ImageList.displayName = 'ImageList';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
