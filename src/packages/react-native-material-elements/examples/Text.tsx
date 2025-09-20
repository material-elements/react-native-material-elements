import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../src';

export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Lorem ipsum dolor sit.</Text>
      <Text variation="body1">Lorem ipsum dolor sit</Text>
      <Text variation="body2">Lorem ipsum dolor sit</Text>
      <Text variation="caption">Lorem ipsum dolor sit</Text>
      <Text variation="h1">Lorem ipsum dolor sit</Text>
      <Text variation="h2">Lorem ipsum dolor sit</Text>
      <Text variation="h3">Lorem ipsum dolor sit</Text>
      <Text variation="h4">Lorem ipsum dolor sit</Text>
      <Text variation="h5">Lorem ipsum dolor sit</Text>
      <Text variation="h6">Lorem ipsum dolor sit</Text>
      <Text maxLength={20}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, modi.</Text>
      <Text gutterBottom>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, modi.</Text>
      <Text>Lorem ipsum dolor sit.</Text>
      <Text error>Lorem ipsum dolor sit.</Text>
      <Text isActive activeColor="blue">
        Lorem ipsum dolor sit.
      </Text>
      <Text style={{ fontSize: 30, fontWeight: 400 }}>Lorem ipsum dolor sit.</Text>
      <Text sx={{ size: 30, weight: 400 }}>Lorem ipsum dolor sit.</Text>
      <Text disabled>Lorem ipsum dolor sit.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
