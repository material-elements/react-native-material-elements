import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Portal, Text } from '../../src';

const PortalExample2: React.FC = () => {
  const [portalVisible, setPortalVisible] = useState(false);

  const togglePortal = () => {
    setPortalVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePortal}>
        <Text>Show Portal with Complex Interaction</Text>
      </TouchableOpacity>

      <Portal
        visible={portalVisible}
        onClose={togglePortal}
        onDismiss={togglePortal}
        animationType="fade"
        modalContainerProps={{
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          },
        }}>
        <View style={styles.portalContent}>
          <Text mode="dark">This is Portal Example 3!</Text>
          <Button onPress={togglePortal}>
            <Text>Close</Text>
          </Button>
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

export default PortalExample2;
