# Portal Component

The `Portal` component provides a way to render content that appears above other components, typically used for modals, dialogs, or tooltips.

## Props

### Portal

Represents a portal item with a unique key and the component to render.

#### Properties

- `key` (string): Unique identifier for the portal.
- `component` (React.ReactNode): The content or component to render as a portal.

### PortalContextProps

Props for the `PortalContext`, allowing adding and removing portals.

#### Properties

- `addPortal` (function): Function to add a portal to the context.
  - Parameters:
    - `portal` (Portal): The portal to add.
- `removePortal` (function): Function to remove a portal from the context.
  - Parameters:
    - `key` (string): The unique key of the portal to remove.

### ModalContainerProps

Props for the container that wraps the modal content. Extends `BoxProps` for styling flexibility.

#### Properties

- `onClose` (function, optional): Function which is used to hide the modal.

### PortalProps

Props for the `Portal` component that manages portal creation and visibility. Extends `ModalProps` from `react-native`.

#### Properties

- `children` (React.ReactNode): The content to render inside the portal.
- `modalContainerProps` (ModalContainerProps, optional): Props for the container around the modal content.
- `onClose` (function, optional): Function which is used to hide the modal.

## Examples

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Portal } from 'react-native-material-elements/src';

const PortalExample1: React.FC = () => {
  const [portalVisible, setPortalVisible] = useState(false);

  const togglePortal = () => {
    setPortalVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePortal}>
        <Text>Show Portal</Text>
      </TouchableOpacity>

      <Portal
        visible={portalVisible}
        onDismiss={togglePortal}
        modalContainerProps={{
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <View style={styles.portalContent}>
          <Text>This is Portal Example 1!</Text>
          <TouchableOpacity onPress={togglePortal}>
            <Text>Close Portal</Text>
          </TouchableOpacity>
        </View>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default PortalExample1;
```
