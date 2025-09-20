# Card Component

The `Card` component is used to display content in a visually appealing card format in your React Native application.

![Card Component preview](https://lh3.googleusercontent.com/d/1UyffmQi52deAsvTl9NZ55aBOUwQw8cZK=s900?authuser=1)

## Interfaces

### `CardProps`

The `CardProps` interface defines the properties that can be passed to a card component.

#### Props

- `sx?: BaseStyles`: Additional styles for the card container.
- `children?: React.ReactNode`: Children elements to be rendered within the card.
- `variation?: CardVariations`: Variation of the card, such as 'outlined' or undefined.

### `CardMediaProps`

The `CardMediaProps` interface extends from `ImageProps` and defines the properties for the card media component.

### `CardHeaderProps`

The `CardHeaderProps` interface defines the properties for the card header component.

#### Props

- `sx?: BaseStyles`: Additional styles for the card header.
- `children?: React.ReactNode`: Children elements to be rendered within the card header.

### `CardContentProps`

The `CardContentProps` interface extends from `CardHeaderProps` and defines the properties for the card content component.

### `CardActionProps`

The `CardActionProps` interface extends from `BaseButtonProps` and defines the properties for the card action component.

## Examples

```tsx
import React from 'react';
import { Avatar, Box, Card, CardHeader, CardMedia, CardContent, Text, useTheme } from 'react-native-material-elements/src';

export const Ex1: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center', px: 10, fDirection: 'column', gap: 10 }}>
      <Card sx={{ maxW: 350, bg: theme.colors.gray[500], r: 10, overflow: 'hidden' }}>
        <CardHeader sx={{ p: 10, d: 'flex', items: 'center', fDirection: 'row', gap: 10 }}>
          <Avatar source={{ uri: 'your-image-source' }} size={40} variation="rounded" />
          <Box>
            <Text>Shrimp and Chorizo Paella</Text>
            <Text variation="h5">September 14, 2016</Text>
          </Box>
        </CardHeader>
        <CardMedia src="card-media-image" sx={{ w: 'auto', h: 200 }} />
        <CardContent sx={{ px: 10, py: 10 }}>
          <Text variation="h5">
            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen
            peas along with the mussels, if you like.
          </Text>
        </CardContent>
        <Box sx={{ py: 10, px: 10, d: 'flex', items: 'center', content: 'flex-end' }}></Box>
      </Card>
    </Box>
  );
};
```
