# useRestyle

### Overview

A utility hook that extracts valid style-related props from a component's props, enabling consistent dynamic styling across custom components.

### Purpose

The useRestyle hook is designed to:

- Filter through a component’s props.
- Extract style-like props (e.g., `margin`, `padding`, `fontSize`, etc.).
- Return an object that can be passed to the style prop in a React Native component.

It ensures only valid style values (number or string) are included, and skips invalid or non-style-related props.

### Type Signature

```tsx
function useRestyle<T>(props: T & StyledProps): {
  getStyleFromProps: () => Record<string, StyleLike>;
};
```

### How It Works

- `StyledProps`: An interface defining known style-like props (like margin, padding, etc.).
- `isValidStyle`: Internal utility to check if a prop value is a valid style type (`string` or `number`) and not `undefined`, `null`, or a `React element`.
- `getStyleFromProps Function`: Loops through the props and builds a style object from only the valid style props.

### Example Usage

```tsx
const MyComponent = props => {
  const {getStyleFromProps} = useRestyle(props);

  return <View style={getStyleFromProps()} />;
};
```

- If you pass in props like:

```tsx
<MyComponent margin={8} padding={12} customProp="hello" />
```

- Only the valid style props (margin, padding) will be returned by getStyleFromProps():

```tsx
{ margin: 8, padding: 12 }
```

### Return Value

| Property            | Type                      | Description                                                           |
| ------------------- | ------------------------- | --------------------------------------------------------------------- |
| `getStyleFromProps` | Record<string, StyleLike> | Returns an `object` of valid style props (`string` or `number` only). |

### Notes

Ignores props that are:

- `undefined` or `null`
- React elements (e.g., `<Text />`)
- Functions, objects, or other non-style primitives
- Meant to work alongside a StyledProps system or design tokens in a theme-driven environment.

### Related Types

- `StyledProps`: Defines which props are considered `styleable`.
- `StyleLike`: Usually `string` or `number`, representing a single style value.
