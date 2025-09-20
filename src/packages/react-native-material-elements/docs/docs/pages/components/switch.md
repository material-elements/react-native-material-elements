# Switch

The `Switch` component is a customizable toggle switch for React Native applications. It allows users to toggle between `on` and `off` states with smooth animations and customizable styles.

![Switch Component](https://docs-assets.developer.apple.com/published/cc66d1a475f346d564730f7487ab960c/components-toggles-intro~dark@2x.png)

**Use the switch toggle style only in a list row**. You don’t need to supply a label in this situation because the content in the row provides the context for the state the switch controls.

**Change the default color of a switch only if necessary**. The default green color tends to work well in most cases, but you might want to use your app’s accent color instead. Be sure to use a color that provides enough contrast with the uncolored appearance to be perceptible.

<p align="center">
  <img src="https://docs-assets.developer.apple.com/published/8ce57307653c7f4c45bd658c804617df/switches-default~dark@2x.png"  />
</p>

## Props

| Property              | Type                         | Description                                                                                                                                                   |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initialToggleState?` | `Boolean`                    | Indicates the initial toggle state of the switch. If `true`, the switch will be in the `on` position initially.                                               |
| `onToggle?`           | `Function`                   | Callback function that is called when the switch is toggled. The function receives the new toggle state as a boolean.                                         |
| `toggleDuration?`     | `Number`                     | Duration of the toggle animation in milliseconds. Controls how long the animation takes to transition from one state to another.                              |
| `thumbStyles?`        | `Object`                     | Custom styles for the thumb (the movable part) of the switch. Accepts a style object to customize the appearance of the thumb.                                |
| `style?`              | `Object`                     | Custom styles for the switch container. Accepts a style object to customize the appearance of the switch container.                                           |
| `sx?`                 | [Styles](/utils/base-styles) | Additional styles that can be applied to the switch component. This property allows for the inclusion of any base styles, making the component more flexible. |

## Example

```jsx
<Switch
  initialToggleState={isOn}
  onToggle={handleToggle}
  toggleDuration={300}
  thumbStyles={styles.thumb}
  style={styles.switch}
  sx={styles.additionalStyles}
/>
```
