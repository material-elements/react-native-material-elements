# Text Component

The `Text` component is used to display text content with various typographic styles and options.

## Props

### `TextProps`

Interface for the properties that can be passed to a text component.

#### Required Props

- `children: React.ReactNode`: The content to be displayed within the text component.

#### Optional Props

- `sx?: BaseStyles & ElementTextStyleProps`: Custom styles to be applied to the text.
- `variation?: TextVariation`: Variation of the text, such as 'body1', 'caption', 'h1', etc.
- `gutterBottom?: boolean`: Specifies whether to add a bottom margin to the text component.
- `maxLength?: number`: Maximum length of the text content. Used for truncating or limiting text length.
- `error?: boolean`: Specifies if the text component is in an error state.
- `errorColor?: ColorValue`: Color value for the text when in an error state.
- `isActive?: boolean`: Specifies if the text component is in an active state.
- `activeColor?: ColorValue`: Color value for the text when in an active state.
- `disabled?: boolean`: Specifies if the text component is disabled.
- `mode?: 'light' | 'dark'`: Mode used for text light and dark variation color.
- `color` prop allows dynamic text color changes

### `TextGutter`

Interface representing gutter styles for text.

- `margin?: number`: Margin around the text component.
- `marginTop?: number`: Top margin for the text component.
- `marginBottom?: number`: Bottom margin for the text component.
- `marginLeft?: number`: Left margin for the text component.
- `marginRight?: number`: Right margin for the text component.
- `padding?: number`: Padding around the text component.
- `paddingTop?: number`: Top padding for the text component.
- `paddingBottom?: number`: Bottom padding for the text component.
- `paddingLeft?: number`: Left padding for the text component.
- `paddingRight?: number`: Right padding for the text component.

### Example

```tsx
export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Lorem ipsum dolor sit.</Text>
      <Text variation="body1">Lorem ipsum dolor sit</Text>
      <Text variation="body2">Lorem ipsum dolor sit</Text>
      <Text variation="caption">Lorem ipsum dolor sit</Text>
      <Text variation="h1">Lorem ipsum dolor sit</Text>
      <Text variation="h2">Lorem ipsum dolor sit</Text>
      <Text variation="h3">Lorem ipsum dolor sit</Text>
      <Text variation="h4">Lorem ipsum dolor sit</Text>
      <Text variation="h5">Lorem ipsum dolor sit</Text>
      <Text variation="h6">Lorem ipsum dolor sit</Text>
      <Text maxLength={20}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, modi.</Text>
      <Text gutterBottom>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, modi.</Text>
      <Text>Lorem ipsum dolor sit.</Text>
      <Text error>Lorem ipsum dolor sit.</Text>
      <Text isActive activeColor="blue">
        Lorem ipsum dolor sit.
      </Text>
      <Text style={{ fontSize: 30, fontWeight: 400 }}>Lorem ipsum dolor sit.</Text>
      <Text sx={{ size: 30, weight: 400 }}>Lorem ipsum dolor sit.</Text>
      <Text disabled>Lorem ipsum dolor sit.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
```
