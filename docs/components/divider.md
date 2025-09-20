# Divider Component

The `Divider` component is used to create a visual divider between sections of content.

![Divider Component preview](https://lh3.googleusercontent.com/d/1Pad94ojs9TRWMG2CMTfX0XjCypY30rFR=s900?authuser=1)

## Interfaces and Types

### `DividerVariants`

Variants for the divider, specifying its appearance.

- `'fullWidth'`: The divider spans the full width or height of its container.
- `'middle'`: The divider is centered within its container, with additional spacing considerations.

### `DividerOrientation`

Orientation of the divider.

- `'horizontal'`: The divider is oriented horizontally.
- `'vertical'`: The divider is oriented vertically.

### `DividerChildAlignment`

Alignment options for a child component within the divider.

- `'left'`: The child component is aligned to the left.
- `'right'`: The child component is aligned to the right.
- `'center'`: The child component is centered.

### `DividerProps`

Props for the Divider component, extending the base View component props.

#### Props

- `variant?: DividerVariants`: Specifies the variant of the divider.
- `textAlign?: DividerChildAlignment`: Specifies the alignment of a child component within the divider.
- `orientation?: DividerOrientation`: Specifies the orientation of the divider.
- `dividerBorderStyles?: StyleProp<ViewStyle>`: Custom style for the divider border elements.
- `leftDividerBorderStyle?: StyleProp<ViewStyle>`: Specifies styles for the left divider border element.
- `rightDividerBorderStyle?: StyleProp<ViewStyle>`: Specifies styles for the right divider border element.

### `DividerRootContainerProps`

Props for the root container of the Divider, extending base View props and including relevant divider props.

#### Props

- `variant?: DividerVariants`: Specifies the variant of the divider.
- `orientation?: DividerOrientation`: Specifies the orientation of the divider.

### `GenerateDividerStylesProps`

Props for generating the styles of the Divider.

#### Props

- `variant?: DividerVariants`: Specifies the variant of the divider.
- `textAlign?: DividerChildAlignment`: Specifies the alignment of a child component within the divider.
- `orientation?: DividerOrientation`: Specifies the orientation of the divider.
- `theme: ThemeType`: Theme object for styling.
- `dividerType: 'left' | 'right'`: Specifies the type of the divider, either 'left' or 'right'.
- `childWrapperLayoutRect?: LayoutRectangle`: Layout rectangle of the child wrapper, if it exists.
- `hasChild?: boolean`: Indicates whether the divider has a child component.
- `dividerRootLayoutRect?: LayoutRectangle`: Layout rectangle of the root divider.

You can use these interfaces and types as props and options when using the Divider component in your React Native application.

## Examples

```tsx
export const Ex1: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center', px: 10 }}>
      <Box sx={{ w: 350, bg: theme.colors.gray[800], r: 2, pb: 20 }}>
        <Box sx={{ p: 10 }}>
          <Text>This is first line</Text>
        </Box>
        <Divider />
        <Box sx={{ p: 10 }}>
          <Text>This is second line</Text>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider variant="fullWidth" />
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Text>Center</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right">
          <Text>Right</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="left">
          <Text>Left</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Chip" />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Outlined chip" variant="outlined" />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Custom chip" variant="outlined" labelContainerProps={{ style: { color: 'green' } }} />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip
            label="Chip with start adornment chip"
            variant="outlined"
            startAdornment={<Avatar source={{ uri: 'your-image-url' }} size={25} variation="rounded" />}
          />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right" dividerBorderStyles={{ backgroundColor: 'red' }}>
          <Text>Right</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right" leftDividerBorderStyle={{ backgroundColor: 'red' }}>
          <Text>Right</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right" rightDividerBorderStyle={{ backgroundColor: 'red' }}>
          <Text>Right</Text>
        </Divider>
      </Box>
    </Box>
  );
};
```
