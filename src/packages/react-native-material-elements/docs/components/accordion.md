# Accordion Component

The `AccordionSummary` component is a customizable component for displaying collapsible content in a React Native application. It offers various properties to control the appearance and behavior of the accordion.

![Accordion Component preview](https://lh3.googleusercontent.com/d/1wMAtEXg56KYx-iG-eA7A_Qr3EAb4qRAQ=s900?authuser=1)

## Props

The `AccordionSummary` component accepts all props from the React Native `TouchableWithoutFeedback` component, in addition to the following props:

| Property                          | Description                                                      | Usage                                                                   |
| --------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `expandIcon`                      | Icon displayed to indicate expansion state.                      | Can be any React node, such as an icon or image.                        |
| `summaryChildWrapperStyles`       | Styles for the wrapper around summary child elements.            | Use to customize the appearance of the summary child elements.          |
| `expandIconWrapperStyles`         | Styles for the wrapper around the expand icon.                   | Use to customize the appearance of the expand icon wrapper.             |
| `rotateAnimationDuration`         | Duration of the rotation animation for the expand icon.          | Specifies the time for the expand icon rotation animation.              |
| `heightValueAnimationDuration`    | Duration of the height value animation.                          | Specifies the time for the height value animation.                      |
| `accordionDetailsOpacityDuration` | Duration of the accordion summary animated view.                 | Specifies the time for the opacity transition in the accordion details. |
| `rotateAnimationRange`            | Range of rotation animation values.                              | Specifies the start and end values for the rotation animation.          |
| `accordionDetails`                | Content to display in the expanded accordion details.            | Can be any React node, such as text or images, shown when expanded.     |
| `accordionWrapperStyles`          | Styles for the wrapper around the entire accordion component.    | Use to customize the appearance of the accordion wrapper.               |
| `defaultExpanded`                 | Determines if the accordion is expanded or collapsed.            | If true, the accordion starts in the expanded state.                    |
| `topBorder`                       | Show the accordion top border.                                   | If true, a border is shown at the top of the accordion.                 |
| `bottomBorder`                    | Show the accordion bottom border.                                | If true, a border is shown at the bottom of the accordion.              |
| `onExpand`                        | Callback function when the accordion is collapsed or expanded.   | Function to handle expand/collapse events.                              |
| `startAdornment`                  | A React node to be displayed at the start of the accordion.      | Commonly used for icons or labels at the start of the accordion.        |
| `startAdornmentContainerStyle`    | Style for the start adornment container.                         | Use to customize the appearance of the start adornment container.       |
| `contentKey`                      | Prop to identify when the content of `accordionDetails` changes. | Helps manage the state of accordion details when content changes.       |
| `square`                          | Determines if the accordion has square corners.                  | If true, the accordion corners will be square.                          |
| `disable`                         | Disables the accordion.                                          | If true, the accordion will be non-interactive.                         |

The `AccordionDetails` component accepts all props from the React Native `View` component, in addition to the following props:

- **`disable?: boolean`** - Disables the accordion details.

## Example

```tsx
<Accordion square>
  <AccordionSummary
    bottomBorder
    expandIcon={<Text>d</Text>}
    accordionDetails={
      <AccordionDetails>
        <Text variation="h5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita, aut aspernatur odio fugiat harum temporibus
          inventore asperiores eaque sunt.
        </Text>
      </AccordionDetails>
    }>
    <Text>Accordion 1</Text>
  </AccordionSummary>
  <AccordionSummary
    topBorder
    expandIcon={<Text>d</Text>}
    accordionDetails={
      <AccordionDetails>
        <Text variation="h5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita, aut aspernatur odio fugiat harum temporibus
          inventore asperiores eaque sunt.
        </Text>
      </AccordionDetails>
    }>
    <Text>Accordion 2</Text>
  </AccordionSummary>
</Accordion>
```
