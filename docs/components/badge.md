# Badge Component

The `Badge` component is a flexible component for displaying badges with various styles, variants, and positioning options. It extends the properties of the React Native `View` component and includes additional options for customization.

![Badge Component preview](https://lh3.googleusercontent.com/d/1DCvRLlj8Y-nYgRtUImn-K9MNQc_iFSGG=s900?authuser=1)

## Props

The `Badge` component accepts all props from the React Native `View` component, in addition to the following props:

| Property                 | Description                                                                                                     | Default  | Usage                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------- |
| `badgeContent`           | Content to be displayed inside the badge. Can be a string or a number.                                          | -        | Sets the text or number shown inside the badge.                     |
| `max`                    | Maximum value for the badge content.                                                                            | -        | Limits the number displayed in the badge if it exceeds the maximum. |
| `variation`              | Style variation of the badge. Options include 'primary', 'secondary', 'error', 'info', 'success', or 'warning'. | -        | Determines the color and style of the badge.                        |
| `variant`                | Style variant of the badge. Currently supports 'dot'.                                                           | -        | Defines the badge style; 'dot' creates a small dot badge.           |
| `invisible`              | Indicates whether the badge should be invisible.                                                                | -        | Controls the visibility of the badge.                               |
| `badgeAnimationDuration` | Duration of badge animation in milliseconds.                                                                    | -        | Specifies how long the badge animation takes.                       |
| `badgeContentProps`      | Props for customizing the content displayed inside the badge, excluding 'children'.                             | -        | Allows customization of the badge content component.                |
| `anchorOrigin`           | Anchor origin configuration to position the badge. Includes `vertical` and `horizontal` options ('top'          | 'bottom' | 'left' 'right'). - Positions the badge relative to its container.   |
| `badgeContainerProps`    | Badge container props for customizing the badge wrapper element.                                                | -        | Customizes the wrapper element around the badge.                    |
| `overlap`                | Wrapped shape the badge should overlap. Options include 'circular' or 'rectangular'.                            | -        | Determines the shape of the badge's overlap area.                   |

## Examples

```tsx
import React from 'react';
import { Badge, Box, useTheme } from 'react-native-material-elements/src';

export const Ex1: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center' }}>
      <Badge badgeContent={100}>
        <Box sx={{ w: 200, h: 50, bg: theme.colors.gray[400], r: 10 }} />
      </Badge>
    </Box>
  );
};
```
