# Grid Component

The `Grid` component is a flexible layout system designed for creating responsive grid layouts. It supports configurable spacing, item sizes, and container behavior, making it easy to structure complex UIs.

![Grid Component preview](https://lh3.googleusercontent.com/d/1B-jS39K198QdsPSjFPy9_C3zYhKMt6-X=s900?authuser=1)

---

## Props

### `GridProps`

Props for the `Grid` component. Extends `BoxProps` and includes grid-specific configuration options.

| Prop            | Type             | Default     | Description                                                                                           |
| --------------- | ---------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `width`         | `DimensionValue` | `undefined` | The width of the grid container. Can be a numeric value or a percentage string.                       |
| `spacing`       | `number`         | `0`         | General spacing between grid items (in pixels). Can be overridden by `columnSpacing` or `rowSpacing`. |
| `container`     | `boolean`        | `false`     | Enables container behavior for the component. Necessary for defining parent grid structures.          |
| `item`          | `boolean`        | `false`     | Enables item behavior for the component. Allows defining size and spacing.                            |
| `columnSpacing` | `number`         | `0`         | Spacing between columns (in pixels). Overrides `spacing` for column-specific gaps.                    |
| `rowSpacing`    | `number`         | `0`         | Spacing between rows (in pixels). Overrides `spacing` for row-specific gaps.                          |

---

### `GridItemProps`

Props for individual grid items. Extends `BoxProps` and includes size and spacing configurations.

| Prop                       | Type                   | Default     | Description                                                                                                         |
| -------------------------- | ---------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `size`                     | `GridSize`             | `undefined` | Defines the size of the grid item as a fraction of the total width (e.g., `12` for full width, `6` for half width). |
| `gridInnerContainerStyles` | `StyleProp<ViewStyle>` | `undefined` | Custom styles for the inner container of the grid item.                                                             |
| `leftSpacing`              | `DimensionValue`       | `0`         | Spacing to the left of the grid item.                                                                               |
| `rightSpacing`             | `DimensionValue`       | `0`         | Spacing to the right of the grid item.                                                                              |
| `topSpacing`               | `DimensionValue`       | `0`         | Spacing above the grid item.                                                                                        |
| `bottomSpacing`            | `DimensionValue`       | `0`         | Spacing below the grid item.                                                                                        |

---

### `GridContainerStylesInterface`

Styles specific to the grid container.

| Prop    | Type             | Default     | Description                                |
| ------- | ---------------- | ----------- | ------------------------------------------ |
| `width` | `DimensionValue` | `undefined` | Specifies the width of the grid container. |

---

## Types

### `GridSize`

A union type defining valid sizes for grid items. Each value represents a fraction of the grid container width.

| Value | Description                 |
| ----- | --------------------------- |
| `1`   | 1/12 of the container width |
| `2`   | 2/12 of the container width |
| `...` | ...                         |
| `12`  | Full width of the container |

---

## Usage

### Grid as a Container

```tsx
<Grid container spacing={8} sx={{ bg: 'white' }}>
  <Grid item size={4} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
  <Grid item size={2} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
  <Grid item size={2} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
  <Grid item size={2} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
  <Grid item size={4} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
  <Grid item size={8} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
  <Grid item size={8} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
  <Grid item size={2} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
  <Grid item size={2} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
  <Grid item size={12} sx={{ h: 100 }}>
    <View style={{ backgroundColor: 'blue', height: '100%' }} />
  </Grid>
</Grid>
```
