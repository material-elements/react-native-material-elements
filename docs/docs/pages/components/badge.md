# Badge

The `Badge` component is a flexible component for displaying badges with various styles, variants, and positioning options. It extends the properties of the React Native `View` component and includes additional options for customization.

![Badge Component preview](https://docs-assets.developer.apple.com/published/96bbd9cca40c156991117a5222d7c5a1/components-label-intro~dark@2x.png)

Labels display text throughout the interface, in buttons, menu items, and views, helping people understand the current context and what they can do next.

The term label refers to uneditable text that can appear in various places. For example:

- Within a button, a label generally conveys what the button does, such as Edit, Cancel, or Send.
- Within many lists, a label can describe each item, often accompanied by a symbol or an image.
- Within a view, a label might provide additional context by introducing a control or describing a common action or task that people can perform in the view.

## Props

The `Badge` component accepts all props from the React Native `View` component, in addition to the following props:

| Property                  | type             | Description                                                                                                                        |
| ------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `badgeContent?`           | Number or String | Content to be displayed inside the badge. Can be a string or a Number.                                                             |
| `max?`                    | Number           | Maximum value for the badge content.                                                                                               |
| `variation?`              | String           | Style variation of the badge. Options include `primary`, `secondary`, `error`, `info`, `success`, or `warning`.                    |
| `variant?`                | String           | Style variant of the badge. Currently supports `dot` and `badge`.                                                                  |
| `invisible?`              | Boolean          | Indicates whether the badge should be invisible.                                                                                   |
| `badgeAnimationDuration?` | Number           | Duration of badge animation in milliseconds.                                                                                       |
| `badgeContentProps?`      | Object           | Props for customizing the content displayed inside the badge, excluding 'children'.                                                |
| `anchorOrigin?`           | Object           | Anchor origin configuration to position the badge. Includes `vertical` and `horizontal` options (`top`, `bottom`, `left` `right`). |
| `badgeContainerProps?`    | Object           | Badge container props for customizing the badge wrapper element.                                                                   |
| `overlap?`                | Boolean          | Wrapped shape the badge should overlap. Options include `circular` or `rectangular`.                                               |

## Examples

```tsx
import React from 'react';
import { Badge, Box, useTheme } from 'react-native-material-elements';

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
