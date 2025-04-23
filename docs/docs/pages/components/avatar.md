# Avatar

The `Avatar` component is a versatile component that displays an image with various styling options. It extends the properties of the React Native `Image` component and includes additional styling options for variations and size.

![Avatar Component](https://docs-assets.developer.apple.com/published/b38ef3054b1d61b2a8f936cd81814d10/components-image-view-intro~dark@2x.png)

Within an image view, you can stretch, scale, size to fit, or pin the image to a specific location. Image views are typically not interactive.

## Props

The `Avatar` component accepts all props from the React Native `Image` component, in addition to the following props:

| Property     | type                         | Description                                         | Usage                                                                                        |
| ------------ | ---------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `variation?` | String                       | Defines the shape of the image (default: `square`). | Options include `square`, `rounded`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`. |
| `size?`      | Number                       | Size of the image.                                  | Specifies the dimensions of the image.                                                       |
| `sx?`        | [Styles](/utils/base-styles) | Custom styles for the image.                        | Allows for additional styling of the image.                                                  |

## Example

```tsx
import React from 'react';
import {Avatar} from 'react-native-material-elements';

export const Ex1: React.FC = () => {
  return (
    <Avatar
      source={{uri: 'your-image-source'}}
      sx={{w: 100, h: 100, o: 0.9, bg: 'red', d: 'flex'}}
    />
  );
};
```
