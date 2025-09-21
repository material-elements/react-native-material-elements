import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Container, ThemeProvider } from './src/packages/react-native-material-elements';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SafeAreaView>
        <ScrollView>
          <Container />
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
