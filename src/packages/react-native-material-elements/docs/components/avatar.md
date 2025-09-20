# Avatar Component

The `Avatar` component is a versatile component that displays an image with various styling options. It extends the properties of the React Native `Image` component and includes additional styling options for variations and size.

## Props

The `Avatar` component accepts all props from the React Native `Image` component, in addition to the following props:

| Property    | Description                                         | Usage                                                                                        |
| ----------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `variation` | Defines the shape of the image (default: 'square'). | Options include 'square', 'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl'. |
| `size`      | Size of the image.                                  | Specifies the dimensions of the image.                                                       |
| `sx`        | Custom styles for the image.                        | Allows for additional styling of the image.                                                  |

## Examples

```tsx
import React from 'react';
import { Avatar, Box } from 'react-native-material-elements/src';

export const Ex1: React.FC = () => {
  return (
    <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center' }}>
      <Avatar source={{ uri: 'your-image-source' }} sx={{ w: 100, h: 100, o: 0.9, bg: 'red', d: 'flex' }} />
    </Box>
  );
};
```
