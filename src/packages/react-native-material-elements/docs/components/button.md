# Button Component

The `Button` component provides an interactive element that users can tap to trigger an action in your React Native application.

![Button Component preview](https://lh3.googleusercontent.com/d/1q9WElmSIyepetXY79OekATu-MqJ4bl9d=s900?authuser=1)

## Props

| Property             | Type               | Default     | Description                                                                                                                                            |
| -------------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `disabled`           | `boolean`          | `false`     | Determines whether the button is disabled. When `true`, the button becomes non-interactive.                                                            |
| `children`           | `ReactNode`        | -           | The content to be displayed inside the button, such as text, icons, or other components.                                                               |
| `disableRipple`      | `boolean`          | `false`     | Determines whether the ripple effect is disabled. If `true`, the button will not display a ripple effect on press.                                     |
| `rippleProps`        | `RippleProps`      | -           | Props for configuring the ripple effect, such as ripple color, duration, and radius.                                                                   |
| `rippleEdge`         | `RipplePosition`   | `center`    | Determines the position of the ripple effect relative to the button. Options include 'center', 'topLeft', 'topRight', 'bottomLeft', and 'bottomRight'. |
| `sx`                 | `BaseStyles`       | -           | Additional styles for the button container using the BaseStyles type from styleTypes.                                                                  |
| `variation`          | `ButtonVariations` | `contained` | Specifies the visual style variation of the button. Can be 'contained', 'outlined', or 'text'.                                                         |
| `fullWidth`          | `boolean`          | `false`     | Specifies whether the button should take up the full width available.                                                                                  |
| `disableElevation`   | `boolean`          | `false`     | Specifies whether to disable elevation for the button. Elevation adds a shadow effect to the button.                                                   |
| `buttonColor`        | `ButtonColorTypes` | -           | Specifies the color variation of the button. Can be 'primary', 'secondary', 'success', 'error', 'info', or 'warning'.                                  |
| `square` and `round` | `boolean`          | `round`     | props for flexible shape styling.                                                                                                                      |

## Examples

```tsx
<Button onPress={() => console.log('pressed')}>
  <Text>Click here</Text>
</Button>
```
