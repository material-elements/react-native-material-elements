import React from 'react';
import { SafeAreaView } from 'react-native';
import { Container, OTPInput, ThemeProvider } from '../src';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <Container>
        <SafeAreaView>
          <OTPInput length={6} variant="info" onChange={() => undefined} />
        </SafeAreaView>
      </Container>
    </ThemeProvider>
  );
}

export default App;
