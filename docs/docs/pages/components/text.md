# Text

The `Text` component is used to display text content with various typographic styles and options.

![Text component](https://docs-assets.developer.apple.com/published/96bbd9cca40c156991117a5222d7c5a1/components-label-intro~dark@2x.png)

Labels display text throughout the interface, in buttons, menu items, and views, helping people understand the current context and what they can do next.

The term label refers to uneditable text that can appear in various places. For example:

- Within a button, a label generally conveys what the button does, such as Edit, Cancel, or Send.
- Within many lists, a label can describe each item, often accompanied by a symbol or an image.
- Within a view, a label might provide additional context by introducing a control or describing a common action or task that people can perform in the view.

## Best practices

Use a label to display a small amount of text that people don’t need to edit. If you need to let people edit a small amount of text, use a text field. If you need to display a large amount of text, and optionally let people edit it, use a **text view**.

Prefer system fonts. A label can display plain or styled text, and it supports Dynamic Type (where available) by default. If you adjust the style of a label or use custom fonts, make sure the text remains legible.

Use system-provided label colors to communicate relative importance. The system defines four label colors that vary in appearance to help you give text different levels of visual importance. For additional guidance, see **Color**.

## Theming

- Inherits `variation`, `gutterBottomSpace`, and `maxLength` from your theme via `useThemeTextConfigSelector`.
- Uses font families and weights from your font theme via `useThemeFontSelector`.
- Supports dark/light mode detection using `useColorScheme`.

## Internal Logic

- **Max Length Handling**: If `maxLength` is passed and `children` isn't a string, throws an error to prevent unintended truncation.
- **Memoized Children**: Prevents unnecessary re-renders if `children` or `maxLength` haven't changed.
- **Restyle Support**: Dynamically extracts props via `useRestyle()` and merges those styles into the final text style array.

## Error Handling

- If `maxLength` is passed and children is not a `string`:

```tsx
throw new Error('maxLength props must be used with string');
```

## Props

| Property        | type                         | Description                                                                      |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| `children`      | ReactNode                    | The content to be displayed within the text component.                           |
| `sx?`           | [Styles](/utils/base-styles) | Custom styles to be applied to the text.                                         |
| `variation?`    | String                       | Variation of the text, such as `body1`, `caption`, `h1`, etc.                    |
| `gutterBottom?` | Boolean                      | Specifies whether to add a bottom margin to the text component.                  |
| `maxLength?`    | Number                       | Maximum length of the text content. Used for truncating or limiting text length. |
| `error?`        | Boolean                      | Specifies if the text component is in an error state.                            |
| `errorColor?`   | ColorValue                   | Color value for the text when in an error state.                                 |
| `isActive?`     | Boolean                      | Specifies if the text component is in an active state.                           |
| `activeColor?`  | ColorValue                   | Color value for the text when in an active state.                                |
| `disabled?`     | Boolean                      | Specifies if the text component is disabled.                                     |
| `mode?`         | String                       | `dark` and `light` Mode used for text light and dark variation color.            |
| `color`         | ColorValue                   | prop allows dynamic text color changes                                           |

## Example

```tsx
<Text variation="body1">Lorem ipsum dolor sit</Text>
```

## Related Utilities

- `generateTextStyles` - Generates theme-based styles for the text component.
- `maxLength` - Utility to truncate string with ellipsis (...) if needed.
- `useRestyle` - Hook to map style props (margin, padding, etc.) into style.
