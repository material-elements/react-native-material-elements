# useThemedProps

### Overview

A React hook to resolve dynamic or themed React nodes (e.g., icons or components) based on your design system's current theme colors.

### Purpose

This hook allows developers to:

- Define prop values as either static React elements or dynamic functions that derive from theme colors.
- Automatically resolve those values at render time using the current theme.

It's especially useful for theming UI icons or visual components dynamically depending on the current theme mode (e.g., dark/light).

### Type Signature

```tsx
export type ThemedIconProp = ((theme: Theme) => React.ReactNode) | React.ReactNode;

type ThemedProp<T = any> = T | ((themeColors: ReturnType<typeof useThemeColorsSelector>) => T);

export const useThemedProps = <T extends Record<string, ThemedProp>>(
  props: T,
): { [K in keyof T]: React.ReactNode };
```

### How It Works

- Uses `useThemeColorsSelector Function` to access the current theme’s color tokens.
- Iterates over all props passed into it.
- Resolves each prop:
  - If it's a `function`, it’s called with the theme colors.
  - If it's a `React element`, it’s returned as-is.
  - Otherwise, a `warning` is logged (invalid input).

### Example Usage

```tsx
const MyComponent = ({
  icon,
  activeIcon,
}: {
  icon: ThemedIconProp;
  activeIcon: ThemedIconProp;
}) => {
  const themed = useThemedProps({icon, activeIcon});

  return (
    <View>
      {themed.icon}
      {themed.activeIcon}
    </View>
  );
};
```

- Passing themed props:

```tsx
<MyComponent
  icon={colors => <Icon name="home" color={colors.primary[500]} />}
  activeIcon={<Icon name="home-filled" color="red" />}
/>
```

### Return Value

| Property        | Type                            | Description                                             |
| --------------- | ------------------------------- | ------------------------------------------------------- |
| `resolvedProps` | Record<string, React.ReactNode> | Object with all themed props resolved into React nodes. |

### Warnings & Notes

- Only function and ReactElement types are valid for props.
- If any other type is passed, a console.warn will notify the developer:
  -- icon prop must be either `<Icon />` or `() => <Icon />`. Other values are not valid.
- Use this hook only when dealing with visual components that rely on theming (e.g., icons, badges, labels).

### Related Concepts

- `useThemeColorsSelector`: Hook for accessing current theme’s color palette.
- `Theme`: Your design system’s theme type.
- `ThemedIconProp`: A flexible prop type that accepts either a node or a function of theme.
