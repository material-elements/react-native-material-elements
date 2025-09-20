# List Component

The `List` component is used to display a list of items, often used in navigation or content organization.

![List Component preview](https://lh3.googleusercontent.com/d/1WEQqlvttSL74Bpo3VCDW_v27AYlXRwjs=s900?authuser=1)

## Interfaces and Types

### `ListProps`

Interface for the List component properties, extending the properties of a View component.

#### Props

- `sx?: BaseStyles`: Optional custom styles for the List component.
- `subheader?: string | number`: The content of the subheader, normally ListSubheader.
- `subheaderContainerStyles?: ViewStyles : Styles for the container of the subheader.
- `subheaderProps?: Omit<TextProps, 'children'>`: Properties for the subheader text component.
- `disablePadding?: boolean`: If true, vertical padding is removed from the list.

### `ListItemProps`

Interface for the ListItem component properties, extending from BaseButtonProps.

#### Props

- `listContainerStyles?: ViewStyles: Optional styles for the container of the ListItem.
- `endAdornment?: React.ReactNode`: Optional element to be displayed at the end of the ListItem.
- `endAdornmentContainerStyles?: ViewStyles: Optional styles for the container of the endAdornment.
- `selected?: boolean`: Use to apply selected styling.

### `ListItemIconProps`

Interface for ListItemIcon component properties, extending the properties of ListProps.

### `ListItemTextProps`

Interface for ListItemText component properties, extending ListProps but omitting the 'children' property.

#### Props

- `primary?: string`: Optional primary text for the ListItemText component.
- `primaryLabelProps?: Omit<TextProps, 'children'>`: Optional properties for the primary text label.
- `secondary?: string`: Optional secondary text for the ListItemText component.
- `secondaryLabelProps?: Omit<TextProps, 'children'>`: Optional properties for the secondary text label.
- `disablePadding?: boolean`: Optional flag to disable padding for the ListItemText component.
- `alignItems?: 'start' | 'middle' | 'end'`: Alignment of the items within the ListItemText component.

### `ListItemTextStylesProps`

Interface for styles related to ListItemText component, focusing on the disablePadding property.

### `ListItemStylesProps`

Interface for styles related to ListItem component, focusing on the endAdornment property.

### `ListItemContainerStylesProps`

Interface for styles related to the ListItem container, focusing on the selected property.

### `ListStylesProps`

Interface for styles related to the List component, focusing on the disablePadding property.

These interfaces and types provide flexibility and customization options when using the List component in your React Native applications.

## Examples

```tsx
export const Ex1 = () => {
  return (
    <List>
      <ListItem onPress={() => console.log('done')}>
        <ListItemIcon>
          <Avatar source={{ uri: 'your-image-url' }} size={30} variation="rounded" />
        </ListItemIcon>
        <ListItemText primary="Brunch this weekend?" secondary="Ali Connors — I'll be in your neighborhood doing errands this…" />
      </ListItem>
      <Divider>
        <Chip label="CENTER" />
      </Divider>
      <ListItem onPress={() => console.log('done')}>
        <ListItemIcon>
          <Avatar source={{ uri: 'your-image-url' }} size={30} variation="rounded" />
        </ListItemIcon>
        <ListItemText primary="Summer BBQ" secondary="to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this…" />
      </ListItem>
    </List>
  );
};
```
