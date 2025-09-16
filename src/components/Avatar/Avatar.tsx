import React from 'react';
import { Image as RnImage, StyleSheet, View } from 'react-native';
import { Box } from '../Box';
import { Image } from '../Image';
import { ImageProps } from '../types';

export interface AvatarProps extends ImageProps {}

export const Avatar = React.forwardRef<RnImage, AvatarProps>(({ size, ...props }, ref) => {
  return (
    <View>
      <Box style={styles.container}>
        <Image ref={ref} size={size} {...props} />
      </Box>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
});

Avatar.displayName = 'Avatar';
