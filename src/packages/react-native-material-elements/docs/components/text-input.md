# TextInput Component

The `TextInput` component is used to create customizable text input fields with various features and styles.

![TextInput Component preview](https://lh3.googleusercontent.com/d/1w3Bhp0cvjGYs6kqu9Him3akaQkiU2GUX=s900?authuser=1)

## Props

### `BaseInputProps`

Defines common properties for a base input component.

- `error`: Indicates if there's an error in the input.
- `activeColor`: The color to use when the input is active or focused.
- `isFocused`: Indicates if the input is focused.
- `errorColor`: Color to use when there is an error.
- `variant`: The variation type of the text field (outlined or filled).
- `square` prop allows control over border radius.
- `hideLabel` prop for scenarios where the label is unnecessary.

### `InputLabelProps`

Defines properties for an input label component.

- `placeholder`
- `activeColor`
- `errorColor`
- `variant`
- `editable`
- `labelContainerStyles`: Animated view container styles.
- `labeled`: Animated value for controlling label animation.
- `translateYAnimatedPosition`: Animated position for label translation.
- `placeholderLeftPosition`: Position of the placeholder when the label is active.
- `textInputLayoutRect`: The layout rectangle of the text input.

### `TextFieldProps`

Defines properties for an outlined text field component.

- `outlineStyles`: Styles for the outline container.
- `inputLabelProps`: Props for the input label component.
- `animatedDuration`: Duration of animation.
- `endAdornment`: React node for the end adornment.
- `endAdornmentContainerProps`: Props for the end adornment container.
- `startAdornment`: React node for the start adornment.
- `startAdornmentContainerProps`: Props for the start adornment container.
- `inputStyles`: Styles for the text input.
- `sx`: Additional styles for the component.

### `OutlineProps`

Defines properties for an outline component.

- Inherits from ViewProps and BaseInputProps.

### `LabelTransformStyleProps`

Represents properties required to get label transformation styles.

- Inherits from InputLabelProps and includes `theme` and `textHeight`.

### `OutlineStyles`

Represents properties required to generate outline styles.

- Inherits from OutlineProps and includes `theme`.

### `TextInputStylesProps`

Represents properties required to get text input styles.

- `variant`: The variation type of the text field.
- `endAdornment`: Indicates if there's an end adornment present.
- `startAdornment`: Indicates if there's a start adornment present.

### `LabelTextStylesProps`

Represents properties required to get label text styles.

- Inherits from TextInputStylesProps and includes `theme`.

### `BaseInputStylesProps`

Represents properties required to get base input styles.

- Inherits from BaseInputProps and includes `theme`.

## Examples

```tsx
export const App: React.FC = () => {
  return (
    <Box
      sx={{
        f: 1,
        d: 'flex',
        items: 'center',
        content: 'center',
        px: 10,
        fDirection: 'column',
        gap: 10,
      }}>
      <TextField variant="outlined" placeholder="Outlined" />
      <TextField variant="filled" placeholder="Filled" />
      <TextField variant="outlined" placeholder="Outlined" outlineStyles={{ borderColor: 'red', borderRadius: 20 }} />
    </Box>
  );
};
```
