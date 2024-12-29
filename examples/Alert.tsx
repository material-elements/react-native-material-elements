import React from 'react';
import { SafeAreaView } from 'react-native';
import { Alert, Button, Container, IconButton, Text, ThemeProvider } from '../src';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <Container>
        <SafeAreaView>
          <Alert
            title="This is a filled success Alert."
            variant="primary"
            action={
              <Button
                label="UNDO"
                labelColor={'white'}
                variation="text"
                baseButtonStyles={{ paddingTop: 4, paddingBottom: 4 }}
                onPress={() => {}}
                square
              />
            }
          />
          <Alert
            title="This is a filled success Alert."
            variant="primary"
            action={
              <IconButton onPress={() => undefined} variation="squareIconButton">
                <Text>U</Text>
              </IconButton>
            }
          />
        </SafeAreaView>
      </Container>
    </ThemeProvider>
  );
}

export default App;
