# CheckBox Component

The `CheckBox` component is a customizable checkbox for React Native applications. It allows users to create checkboxes with various states, including checked, unchecked, and indeterminate, along with customizable styles and adornments.

![CheckBox Component preview](https://lh3.googleusercontent.com/d/16qcdMaqdzy5CmHHDzFhcWqss5UrfmIg-=s900?authuser=1)

## Props

| Property                       | Description                                                                 | Usage                                                                     |
| ------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `isChecked`                    | Boolean value indicating whether the checkbox is checked.                   | This is a required prop.                                                  |
| `isIndeterminate`              | Boolean value indicating whether the checkbox is in an indeterminate state. | Represents a mixed selection, often used in hierarchical checkboxes.      |
| `checkBoxColor`                | Color of the checkbox border when it is not checked.                        | Accepts any valid color string.                                           |
| `disabled`                     | Boolean value indicating whether the checkbox is disabled.                  | When true, the checkbox is not interactive and visually appears disabled. |
| `indeterminateImage`           | Image to display when the checkbox is in an indeterminate state.            | Can be any React node, such as an icon or an image.                       |
| `checkBoxWrapperStyles`        | Style object to apply to the wrapper view of the checkbox.                  | Accepts any valid `ViewStyle` properties.                                 |
| `startAdornment`               | React node to display at the start (left side) of the checkbox.             | Commonly used for adding icons or labels.                                 |
| `startAdornmentContainerProps` | Props to apply to the container of the `startAdornment`.                    | Omits the 'children' prop from `BoxProps` to avoid conflicts.             |
| `endAdornment`                 | React node to display at the end (right side) of the checkbox.              | Commonly used for adding icons or labels.                                 |
| `endAdornmentContainerProps`   | Props to apply to the container of the `endAdornment`.                      | Omits the 'children' prop from `BoxProps` to avoid conflicts.             |
