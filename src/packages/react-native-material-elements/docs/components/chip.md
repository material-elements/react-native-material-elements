# Chip Component

The `Chip` component is used to represent small blocks of information or actions in a compact manner.

![Chip Component preview](https://lh3.googleusercontent.com/d/1SMnxN1og64DI7pZaCJwDjpYJFJOZ42PC=s900?authuser=1)

## Interfaces

### `ChipProps`

The `ChipProps` interface defines the properties that can be passed to a chip component.

#### Props

- `label?: string`: The label text to display inside the chip.
- `labelContainerProps?: Omit<TextProps, 'children'>`: Props to be passed to the label text component.
- `variant?: ChipVariant`: The variant of the chip, either 'outlined' or 'filled'.
- `endAdornment?: React.ReactNode`: A React node to be displayed at the end of the chip.
- `endAdornmentContainerStyle?: StyleProp<ViewStyle>`: Style for the end adornment container.
- `endAdornmentTouchableProps?: Omit<TouchableWithoutFeedbackProps, 'children' | 'style'>`: Props to be passed to the touchable component wrapping the end adornment.
- `startAdornment?: React.ReactNode`: A React node to be displayed at the start of the chip.
- `startAdornmentContainerStyle?: StyleProp<ViewStyle>`: Style for the start adornment container.
- `startAdornmentTouchableProps?: Omit<TouchableWithoutFeedbackProps, 'children' | 'style'>`: Props to be passed to the touchable component wrapping the start adornment.
- `color?: ChipVariations`: The color variation of the chip.

### `GenerateChipStylesProps`

The `GenerateChipStylesProps` interface extends from `ChipProps` and defines additional properties for generating chip styles.

## Examples

Below are examples demonstrating the usage of the `Chip` component:

```tsx
import React from 'react';
import { Box, Chip } from 'react-native-material-elements/src';

const ChipExamples: React.FC = () => {
  return (
    <Box
      sx={{
        f: 1,
        d: 'flex',
        items: 'center',
        content: 'center',
        px: 10,
        fDirection: 'column',
        gap: 10,
      }}>
      <Chip label="Chip" />
      <Chip label="Outlined chip" variant="outlined" />
      <Chip label="Custom chip" variant="outlined" labelContainerProps={{ style: { color: 'green' } }} />
      <Chip label="Disabled chip" variant="outlined" disabled />
      <Chip
        label="Chip with start adornment chip"
        variant="outlined"
        startAdornment={<Avatar source={{ uri: 'your-image-source' }} size={25} variation="rounded" />}
      />
      <Chip
        label="Chip with start adornment chip"
        variant="outlined"
        startAdornment={
          <IconButton onPress={() => console.log('pressed')}>
            <Avatar source={{ uri: 'your-image-source' }} size={25} variation="rounded" />
          </IconButton>
        }
      />
    </Box>
  );
};
```
