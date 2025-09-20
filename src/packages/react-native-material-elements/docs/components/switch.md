# Switch Component

The `Switch` component is a customizable toggle switch for React Native applications. It allows users to toggle between "on" and "off" states with smooth animations and customizable styles.

![Switch Component preview](https://lh3.googleusercontent.com/d/14FyNhDX706lRVpLXkNr6jppmP9Ym5sal=s900?authuser=1)

## Props

| Property             | Description                                                                                                                                                   | Default | Usage                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------- |
| `initialToggleState` | Indicates the initial toggle state of the switch. If `true`, the switch will be in the "on" position initially.                                               | `false` | Determines whether the switch starts in the "on" position. |
| `onToggle`           | Callback function that is called when the switch is toggled. The function receives the new toggle state as a boolean.                                         | -       | Used to handle changes in the switch state.                |
| `toggleDuration`     | Duration of the toggle animation in milliseconds. Controls how long the animation takes to transition from one state to another.                              | `200`   | Adjusts the duration of the switch's toggle animation.     |
| `thumbStyles`        | Custom styles for the thumb (the movable part) of the switch. Accepts a style object to customize the appearance of the thumb.                                | -       | Allows for styling the movable part of the switch.         |
| `style`              | Custom styles for the switch container. Accepts a style object to customize the appearance of the switch container.                                           | -       | Customizes the appearance of the switch container.         |
| `sx`                 | Additional styles that can be applied to the switch component. This property allows for the inclusion of any base styles, making the component more flexible. | -       | Provides flexibility for additional styling.               |

## Example Usage

```jsx
import React, { useState } from 'react';
import { Switch } from './Switch';
import { View, Text, StyleSheet } from 'react-native';

const Example = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = newState => {
    setIsOn(newState);
  };

  return (
    <View style={styles.container}>
      <Text>{`Switch is ${isOn ? 'On' : 'Off'}`}</Text>
      <Switch
        initialToggleState={isOn}
        onToggle={handleToggle}
        toggleDuration={300}
        thumbStyles={styles.thumb}
        style={styles.switch}
        sx={styles.additionalStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    marginTop: 20,
  },
  thumb: {
    backgroundColor: 'blue',
  },
  additionalStyles: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});
```
