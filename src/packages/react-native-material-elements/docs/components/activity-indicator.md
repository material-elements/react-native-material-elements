# ActivityIndicator Component

The `ActivityIndicator` component displays a loading indicator in your React Native application.

## Props

The `ActivityIndicator` component accepts all props from the React Native `ActivityIndicator` component, in addition to the following props:

- `size?: 'small' | 'large'` - Size of the indicator (default: 'small').
- `color?: string` - Color of the indicator (default: system default).

## Examples

```tsx
import React from 'react';
import { Box, ActivityIndicator } from 'react-native-material-elements/src';

export const Ex1: React.FC = () => {
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="small" />
    </Box>
  );
};
```
