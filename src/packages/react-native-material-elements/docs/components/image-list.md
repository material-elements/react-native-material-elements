# ImageList Component

The `ImageList` component is designed to display a list of images with customizable styling options. It extends the properties of the React Native `ScrollView` component. Additional subcomponents, `ImageListItem` and `ImageListItemBar`, provide further customization options for individual items within the list.

![ImageList Component preview](https://lh3.googleusercontent.com/d/1ehR-kHCzQC041Jc7hB_WEik9K8BoGjfg=s900?authuser=1)

### ImageListProps

Interface for properties that can be passed to the `ImageList` component, extending the React Native `ScrollView` component.

- **`...`** - (Inherits all props from `ScrollView`)

### ImageListItemProps

Interface for properties that can be passed to an individual item (`ImageListItem`) within the `ImageList`.

| Property | Description                            | Usage                                       |
| -------- | -------------------------------------- | ------------------------------------------- |
| sx?      | Custom styles for the image list item. | Specifies custom styles using `BaseStyles`. |
| items?   | Number of items to display.            | Specifies the number of items to display.   |

## Examples

```tsx
import React from 'react';
import { Avatar, Box, Image, ImageList, ImageListItem, ImageListItemBar } from 'react-native-material-elements/src';

export const App: React.FC = () => {
  return (
    <Box>
      <ImageList
        style={{
          width: '100%',
          marginTop: 100,
          height: '80%',
        }}>
        {itemData.map(item => (
          <ImageListItem items={2} key={item.img}>
            <Image
              source={{
                uri: `${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`,
              }}
              sx={{ w: '100%' }}
              height={140}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
];
```
