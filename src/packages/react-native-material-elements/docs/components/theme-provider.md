# ThemeProvider

The `ThemeProvider` is used to provide theming capabilities to your application, allowing you to switch between light and dark themes and customize various style properties.

## Props

### `ThemeProviderProps<T>`

Defines the properties for the `ThemeProvider` component.

#### Required Props

- `children`: The React node to be rendered within the `ThemeProvider`.

#### Optional Props

- `lightTheme`: The light theme object, extending `ThemeType`.
- `darkTheme`: The dark theme object, extending `ThemeType`.
- `mode`: The initial mode of the theme, either 'dark' or 'light'.

## Interfaces and Types

### `ColorShades`

Represents shades of a color.

- `50`: string;
- `100`: string;
- `200`: string;
- `300`: string;
- `400`: string;
- `500`: string;
- `600`: string;
- `700`: string;
- `800`: string;
- `900`: string;

### `Theme`

Type representing the theme object, based on `initialLightTheme`.

### `ThemeType`

Type representing the structure of the theme object.

- `colors`: `Theme` - Colors used in the theme.
- `font`: Object with font sizes.
- `spacing`: Object with spacing values.
- `latterSpacing`: Object with letter spacing values.
- `lineHeight`: Object with line height values.
- `fontWeight`: Object with font weight values.

### `ThemeInterface<T>`

Interface representing the theme and a function to change the theme mode.

- `theme`: `ThemeType & T` - The current theme.

# Theme Configuration Documentation

This documentation provides an overview of the theme configuration used in your application, including the initial light and dark themes. The themes define color palettes for various UI elements to maintain a consistent design.

## Initial Light Theme

The `initialLightTheme` object defines the color palette for the light mode of the application. Each color category (e.g., primary, secondary) contains a range of shades from light (50) to dark (900).

### Example

```tsx
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Button,
  Container,
  ThemeProvider,
  createColorShades,
  createTheme,
  createThemeDimensions,
} from 'react-native-material-elements/src';

const lightTheme = createTheme('light', {
  colors: {
    green: createColorShades({
      shades: {
        400: '#000000',
      },
      themePropertyName: 'green',
    }),
  },
});

const darkTheme = createTheme('light', {
  colors: {
    green: createColorShades({
      shades: {
        400: '#d54d4d',
      },
      themePropertyName: 'green',
    }),
  },
});

const themeDimensions = createThemeDimensions({
  spacing: {
    xs: 10,
  },
});

function App(): React.JSX.Element {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme} dimensions={themeDimensions}>
      <SafeAreaView>
        <ScrollView>
          <Container>
            <Button label="Theme" buttonColor="success" />
          </Container>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
```
