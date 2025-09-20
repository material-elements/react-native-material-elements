# Dropdown Component

The `Dropdown` component provides a customizable dropdown menu that supports single and multiple item selection, optional search functionality, light and dark mode, and adornments for both the input and dropdown items.

![Dropdown Component preview](https://lh3.googleusercontent.com/d/1Ce_1U5e8sf8Dgkx2ZVfRvY_-BxNhte5_=s900?authuser=1)

## Props

The `Dropdown` component accepts all props from the React Native `View` component, in addition to the following custom props:

### `DropDownData`

Defines the structure of data to be displayed in the dropdown.

- `id: string` - Unique identifier for the dropdown item.
- `title: string` - Display title for the dropdown item.

### `DropDownListContainerProps<T extends DropDownData>`

Props for the container that renders the list of dropdown items, extending from `ViewProps` and `FlatListProps`.

- `open?: boolean` - Indicates whether the dropdown is open.
- `maxHeight?: number` - Maximum height of the dropdown container when open.
- `onClose?: () => void` - Callback triggered when the dropdown closes.
- `inputLayoutRectangle: LayoutRectangle` - Layout rectangle for the input element.
- `dropDownContainerRect: MeasureElementRect` - Measured dimensions of the dropdown container element.
- `onItemClicked?: (item: DropDownData) => void` - Callback triggered when an item is clicked.
- `selectedListItems?: Array<DropDownData> | null` - Currently selected dropdown items.
- `showSelectedItem?: boolean` - Whether to display the selected item in the dropdown list.
- `listItemEndAdornment?: React.ReactNode` - React node displayed at the end of each list item.
- `listItemStartAdornment?: React.ReactNode` - React node displayed at the start of each list item.
- `activeItemColor?: ColorValue` - Color applied to the active or selected dropdown item.
- `listItemTextProps?: Pick<ListItemTextProps, 'disablePadding' | 'alignItems'>` - Props for styling the text inside list items.
- `listItemMinHeight?: number` - Minimum height for each list item in the dropdown.
- `displaySelectedAdornment?: boolean` - Whether to show an adornment for the selected item.
- `disableTextPadding?: boolean` - Removes padding from the list item text component.
- `multiselect?: boolean` - Allows multiple items to be selected.
- `search?: boolean` - Enables or disables the search functionality.
- `searchPlaceholder?: string` - Placeholder text inside the search input when it is empty.
- `searchProps?: IconInputProps` - Customizes the search input, allowing styling, events, or icons.
- `searchContainerProps?: Omit<BoxProps, 'children'>` - Props for customizing the search container.

### `DropDownProps<T extends DropDownData>`

The primary props interface for the dropdown component, extending from `View` and omitting some properties from `DropDownListContainerProps`.

- `inputStartAdornment?: React.ReactNode` - React node displayed at the start of the input field (e.g., an icon).
- `inputEndAdornment?: React.ReactNode` - React node displayed at the end of the input field (e.g., an icon).
- `placeholder?: string` - Placeholder text for the input field when no value is selected.
- `listContainerProps?: Omit<DropDownListContainerProps<T>, 'open' | 'onClose' | 'inputLayoutRectangle' | 'dropDownContainerRect'>` - Props for customizing the dropdown list container.
- `variation?: TextFiledVariation | 'icon'` - Allows different styles or icons for the input field.
- `onDropDownClicked?: (event: GestureResponderEvent) => void` - Callback triggered when the dropdown input field is clicked.
- `onListItemClicked?: (event: GestureResponderEvent, item: DropDownData) => void` - Callback triggered when a dropdown item is clicked.
- `multiselectMessage?: string` - Message displayed when multiple items are selected.
- `onItemClicked?: (item: Array<DropDownData>) => void` - Callback triggered when selected items are confirmed.

## Examples

```tsx
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Container, DropDown, ThemeProvider } from 'react-native-material-elements/src';

const DATA = [
  { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'First Item' },
  { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'Second Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Third Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29d12', title: 'Four Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29415', title: 'Five Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29419', title: 'Six Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29412', title: 'Seven Item' },
];

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <ThemeProvider>
            <DropDown
              onItemClicked={item => console.log(item)}
              listItemEndAdornment={
                <Avatar
                  source={{
                    uri: 'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  }}
                  size={20}
                  variation="rounded"
                />
              }
              displaySelectedAdornment
              inputStartAdornment={
                <Avatar
                  source={{
                    uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  }}
                  size={30}
                  variation="rounded"
                />
              }
              variation="outlined"
              data={DATA}
            />
          </ThemeProvider>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
```
