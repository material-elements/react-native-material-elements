import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Portal } from '../../src';

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
