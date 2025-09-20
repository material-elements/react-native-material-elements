# Pagination Component

The `Pagination` component is used to display a set of pagination items for navigating through a list of items or pages.

![Pagination Component preview](https://lh3.googleusercontent.com/d/1_eGjrw5VGvD47u9QZ43wqNh_1SIbFduo=s900?authuser=1)

## Interfaces and Types

### `PaginationItemProps`

Props for a single pagination item.

#### Props

- `page?: number | string`: The page number or a special string value like 'start-dots' or 'end-dots'.
- `active?: boolean`: Indicates if the pagination item is the currently active page.
- `rippleBackgroundColor?: ColorValue`: Background color for the ripple effect when the pagination item is pressed.
- `color?: PaginationItemColor`: The active color of the pagination item.
- `shape?: PaginationShape`: The shape of the pagination item (circular or rounded).
- `variant?: PaginationVariant`: The variation style of the pagination item (outlined or text).
- `disabled?: boolean`: If true, the component is disabled.

### `PaginationItemStylesProps`

Styles props for a single pagination item, extending from `PaginationItemProps` to reuse its properties for styling purposes.

#### Props

- `color?: PaginationItemColor`: The active color of the pagination item.
- `shape?: PaginationShape`: The shape of the pagination item (circular or rounded).
- `variant?: PaginationVariant`: The variation style of the pagination item (outlined or text).
- `disabled?: boolean`: If true, the component is disabled.
- `isActive: Animated.Value`: Animation value for the active state.
- `theme: ThemeType`: The theme object, which contains theme-related properties and methods.

### `PaginationProps`

Props for the Pagination component.

#### Props

- `count: number`: The total number of pages.
- `onPageChange?: (event: GestureResponderEvent, page: number) => void`: Callback function called when a pagination item is clicked.
- `dotContainerProps?: Omit<BoxProps, 'children'>`: Additional props to be passed to the dot container.
- `dotStylesProps?: StyleProp<TextStyle>`: Additional styles to be applied to the dot elements.
- `paginationItemProps?: PaginationItemProps`: Additional props to be passed to each pagination item.
- `disabled?: boolean`: If true, the component is disabled.
- `activeCount?: number`: The active state of the component.
- `renderItem?: React.ReactNode`: Custom pagination item.

These interfaces and types provide the necessary props and styling options for implementing pagination functionality in your React Native applications.

## Examples

### Example 1

```tsx
export const Ex1: React.FC = () => {
  return (
    <Box sx={{ f: 1, d: 'flex', content: 'center', items: 'center', gap: 10 }}>
      <Pagination count={10} />
      <Pagination count={10} onPageChange={(_, page) => console.log(page)} />
      <Pagination count={10} activeCount={6} />
      <Pagination count={10} disabled />
      <Pagination count={10} dotStylesProps={{ backgroundColor: 'red' }} />
      <Pagination count={10} renderItem={<Avatar source={{ uri: 'your-image-url' }} size={30} variation="rounded" />} />
      <Pagination count={10} style={{ backgroundColor: 'red', borderRadius: 10 }} />
      <Pagination count={10} paginationItemProps={{ shape: 'rounded' }} />
      <Pagination count={10} paginationItemProps={{ shape: 'circular' }} />
      <Pagination count={10} paginationItemProps={{ color: 'error' }} />
      <Pagination count={10} paginationItemProps={{ color: 'primary' }} />
      <Pagination count={10} paginationItemProps={{ color: 'secondary' }} />
      <Pagination count={10} paginationItemProps={{ color: 'standard' }} />
      <Pagination count={10} paginationItemProps={{ variant: 'outlined' }} />
      <Pagination count={10} paginationItemProps={{ rippleBackgroundColor: 'red' }} />
      <Pagination count={10} paginationItemProps={{ disableRipple: true }} />
    </Box>
  );
};
```
