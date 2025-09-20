# Button

The `Button` component provides an interactive element that users can tap to trigger an action in your React Native application.

![Button Component](https://docs-assets.developer.apple.com/published/aff6e888243b2f283363a44a8b71513c/components-buttons-intro~dark@2x.png)

Versatile and highly customizable, buttons give people simple, familiar ways to do tasks in your app. In general, a button combines three attributes to clearly communicate its function:

- **Style**. A visual style based on size, color, and shape.
- **Content**. The symbol (or interface icon), text label, or both that a button displays to convey its purpose.
- **Role**. A system-defined role that identifies a button’s semantic meaning and can affect its appearance.

## Best practices

When buttons are instantly recognizable and easy to understand, an app tends to feel intuitive and well designed.

Make buttons easy for people to use. It’s essential to include enough space around a button so that people can visually distinguish it from surrounding components and content. Giving a button enough space is also critical for helping people select or activate it, regardless of the method of input they use. As a general rule, a button needs a hit region of at least 44x44 pt — in visionOS, 60x60 pt — to ensure that people can select it easily, whether they use a fingertip, a pointer, their eyes, or a remote.

Ensure that each button clearly communicates its purpose. A button always includes a text label or a symbol (or interface icon) — and sometimes a combination of both — to help people predict what it does.

![Button Component](https://docs-assets.developer.apple.com/published/238e255a125e6800e8c70e0f2f20e9d9/button-activity-indicator-hidden~dark@2x.png)

## Props

| Property           | Type                         | Description                                                                                                                                            |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `disabled`         | `boolean`                    | Determines whether the button is disabled. When `true`, the button becomes non-interactive.                                                            |
| `children`         | `ReactNode`                  | The content to be displayed inside the button, such as text, icons, or other components.                                                               |
| `disableRipple`    | `boolean`                    | Determines whether the ripple effect is disabled. If `true`, the button will not display a ripple effect on press.                                     |
| `rippleProps`      | `RippleProps`                | Props for configuring the ripple effect, such as ripple color, duration, and radius.                                                                   |
| `rippleEdge`       | `RipplePosition`             | Determines the position of the ripple effect relative to the button. Options include `center`, `topLeft`, `topRight`, `bottomLeft`, and `bottomRight`. |
| `sx`               | [Styles](/utils/base-styles) | Additional styles for the button container using the BaseStyles type from styleTypes.                                                                  |
| `variation`        | `ButtonVariations`           | Specifies the visual style variation of the button. Can be `contained`, `outlined`, or `text`.                                                         |
| `fullWidth`        | `boolean`                    | Specifies whether the button should take up the full width available.                                                                                  |
| `disableElevation` | `boolean`                    | Specifies whether to disable elevation for the button. Elevation adds a shadow effect to the button.                                                   |
| `buttonColor`      | `ButtonColorTypes`           | Specifies the color variation of the button. Can be `primary`, `secondary`, `success`, `error`, `info`, or `warning`.                                  |
| `square`           | `boolean`                    | props for flexible shape styling.                                                                                                                      |

## Examples

```tsx
<Button onPress={() => console.log('pressed')}>
  <Text>Click here</Text>
</Button>
```
