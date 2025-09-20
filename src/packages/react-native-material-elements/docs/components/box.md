# Box Component

The `Box` component is a versatile container element that allows for easy layout and styling in React Native applications.

## Props

- `sx'` - Object containing style properties for the Box (uses BaseStyles from styleTypes).
- `children` - React node(s) to be rendered inside the Box..

## Examples

```tsx
import React from 'react';
import { Box, Text, useTheme } from 'react-native-material-elements/src';

export const Ex1: React.FC = () => {
  return (
    <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center' }}>
      <Box
        sx={{
          w: 50,
          h: 50,
          bg: 'white',
          r: 10,
          sColor: 'red',
          sOffset: { width: 0, height: 1 },
          sOpacity: 0.8,
          sRadius: 1,
        }}
      />
    </Box>
  );
};
```
