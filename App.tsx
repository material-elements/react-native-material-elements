import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Chip, Container, ThemeProvider } from './src/packages/react-native-material-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Container flex={1} style={isDarkMode ? styles.dark : styles.light}>
          <Chip
            label="Save"
            color="warning"
            onPress={() => {}}
            endIcon={<MaterialIcons name="keyboard-arrow-down" size={20} />}
          />
        </Container>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: '#000000',
  },
  light: {
    backgroundColor: '#ffffff',
  },
});

export default App;
