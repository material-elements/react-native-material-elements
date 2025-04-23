# Box

The `Box` component is a versatile container element that allows for easy layout and styling in React Native applications.

![Box component](https://docs-assets.developer.apple.com/published/5bb27442fab3a3bddc6f5949f1f343d9/components-box-intro~dark@2x.png)

## Best practices

**Prefer keeping a box relatively small in comparison with its containing view**. As a box’s size gets close to the size of the containing window or screen, it becomes less effective at communicating the separation of grouped content, and it can crowd other content.

**Consider using padding and alignment to communicate additional grouping within a box**. A box’s border is a distinct visual element — adding nested boxes to define subgroups can make your interface feel busy and constrained.

## Props

| Property   | Type                         | Description                                                                      |
| ---------- | ---------------------------- | -------------------------------------------------------------------------------- |
| `sx`       | [Styles](/utils/base-styles) | Object containing style properties for the Box (uses BaseStyles from styleTypes) |
| `children` | ReactNode                    | React node(s) to be rendered inside the Box.                                     |

## Examples

```tsx
<Box sx={{f: 1, d: 'flex', items: 'center', content: 'center'}}>
  <Box
    sx={{
      w: 50,
      h: 50,
      bg: 'white',
      r: 10,
      sColor: 'red',
      sOffset: {width: 0, height: 1},
      sOpacity: 0.8,
      sRadius: 1,
    }}
  />
</Box>
```
