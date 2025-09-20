# QuantityStepper Component

The `QuantityStepper` component is a customizable stepper for React Native applications. It allows users to increment or decrement a numeric value with configurable styles, callbacks, and constraints.

![QuantityStepper Component preview](https://lh3.googleusercontent.com/d/1rXqdQ7gzx1zzvtNuiSbMFmrCKpKbparT=s900?authuser=1)

## Props

| Property               | Description                                                                            | Usage                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `value`                | The current value of the quantity stepper.                                             | Should represent the number that is being incremented or decremented.                   |
| `labelProps`           | Props to be passed to the label text component, excluding the 'children' prop.         | Used to style and configure the label that displays the current value.                  |
| `labelWrapperProps`    | Props to be passed to the label wrapper view component, excluding the 'children' prop. | Used to style and configure the container of the label.                                 |
| `onIncrement`          | Callback function that is called when the increment button is pressed.                 | Receives the gesture event as a parameter.                                              |
| `onDecrement`          | Callback function that is called when the decrement button is pressed.                 | Receives the gesture event as a parameter.                                              |
| `incrementButtonStyle` | Style to be applied to the increment button view.                                      | Used to customize the appearance of the increment button.                               |
| `decrementButtonStyle` | Style to be applied to the decrement button view.                                      | Used to customize the appearance of the decrement button.                               |
| `disabledIncrement`    | Determines whether the increment button is disabled.                                   | If true, the increment button will be non-interactive.                                  |
| `disabledDecrement`    | Determines whether the decrement button is disabled.                                   | If true, the decrement button will be non-interactive.                                  |
| `maxIncrement`         | Specifies the maximum limit for the value when incrementing.                           | If provided, the value cannot exceed this limit when the increment button is pressed.   |
| `minDecrement`         | Specifies the minimum limit for the value when decrementing.                           | If provided, the value cannot go below this limit when the decrement button is pressed. |
| `buttonType`           | Different options for button styles.                                                   | Options are `'square'` or `'round'`.                                                    |
