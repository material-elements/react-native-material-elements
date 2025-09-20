## Transition Animation Components

These components provide various transition animations to apply to child elements. All specific animation components extend from `BaseTransitionProps`, which defines common properties.

![Transition Animation preview](https://lh3.googleusercontent.com/d/1L69JQx783wk2bWnsw7-FL1BSnDI9VkwF=s900?authuser=1)

### BaseTransitionProps

| Property          | Type                   | Description                                                                                                 |
| ----------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `duration`        | `number`               | Duration of the animation in milliseconds. Defines how long the animation should run.                       |
| `delay`           | `number`               | Delay before the animation starts in milliseconds. This allows you to postpone the start of the animation.  |
| `repeatCount`     | `number`               | Number of times the animation should repeat. Sets how many times the animation should loop before stopping. |
| `style`           | `StyleProp<ViewStyle>` | Additional styles for the container. Allows you to apply custom styles to the container view.               |
| `children`        | `React.ReactNode`      | Children components to apply the animation effect. The elements that will undergo the animation.            |
| `applyTransition` | `boolean`              | State for the animation effect. Determines whether the transition animation should be applied or not.       |

### WobbleProps

The `WobbleProps` interface inherits from `BaseTransitionProps` and uses default wobble animation parameters.

### BounceProps

The `BounceProps` interface inherits from `BaseTransitionProps` with an additional `height` property.

| Property | Type     | Description                      |
| -------- | -------- | -------------------------------- |
| `height` | `number` | Sets the bounce effect's height. |

### FadeProps

The `FadeProps` interface inherits from `BaseTransitionProps` and applies fading animation parameters. It excludes `repeatCount`.

### FlashProps

The `FlashProps` interface inherits from `BaseTransitionProps` and applies flash animation parameters.

### PulseProps

The `PulseProps` interface inherits from `BaseTransitionProps` with an additional `scale` property.

| Property | Type     | Description                                    |
| -------- | -------- | ---------------------------------------------- |
| `scale`  | `number` | Adjusts the size scaling for the pulse effect. |

### ShakeProps

The `ShakeProps` interface inherits from `BaseTransitionProps` with an additional `type` property.

| Property | Type       | Description                                                      |
| -------- | ---------- | ---------------------------------------------------------------- |
| `type`   | `'x'  'y'` | Defines the axis of shaking: horizontal ('x') or vertical ('y'). |

### TadaProps

The `TadaProps` interface inherits from `BaseTransitionProps` and applies tada animation parameters.

### HeartBeatProps

The `HeartBeatProps` interface inherits from `BaseTransitionProps` and applies heartbeat animation parameters.

### BackInProps

The `BackInProps` interface inherits from `BaseTransitionProps` with additional `type` and `initialValue` properties. It excludes `repeatCount`.

| Property       | Type                          | Description                                      |
| -------------- | ----------------------------- | ------------------------------------------------ |
| `type`         | `'down' 'left' 'right'  'up'` | Specifies the direction of the backIn animation. |
| `initialValue` | `number`                      | Sets the starting value for the animation.       |

### FadingProps

The `FadingProps` interface excludes `repeatCount` from `BaseTransitionProps` and adds a `type` property.

| Property | Type                                                                                                                                                                                               | Description                                               |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `type`   | `'fadeIn' 'fadeInDown' 'fadeInDownBig' 'fadeInLeft' 'fadeInLeftBig' 'fadeInRight' 'fadeInRightBig' 'fadeInUp' 'fadeInUpBig' 'fadeInTopLeft' 'fadeInTopRight' 'fadeOut' 'fadeOutDown'  'fadeOutUp'` | Specifies the exact type of fade animation to be applied. |

### FlipProps

The `FlipProps` interface inherits from `BaseTransitionProps` with an additional `type` property.

| Property | Type                                                | Description                           |
| -------- | --------------------------------------------------- | ------------------------------------- |
| `type`   | `'flip' 'flipInX' 'flipInY' 'flipOutX'  'flipOutY'` | Specifies the type of flip animation. |

### SlideProps

The `SlideProps` interface inherits from `BaseTransitionProps` with additional `type`, `fromValue`, and `toValue` properties.

| Property    | Type                                                      | Description                                |
| ----------- | --------------------------------------------------------- | ------------------------------------------ |
| `type`      | `'slideInDown' 'slideInLeft' 'slideInRight'  'slideInUp'` | Specifies the type of slide animation.     |
| `fromValue` | `number`                                                  | Sets the starting value for the animation. |
| `toValue`   | `number`                                                  | Sets the ending value for the animation.   |
