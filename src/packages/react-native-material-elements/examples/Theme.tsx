import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Button, Container, ThemeProvider, createColorShades, createTheme, createThemeDimensions } from '../src';

const lightTheme = createTheme('light', {
  colors: {
    green: createColorShades({
      shades: {
        400: '#000000',
      },
      themePropertyName: 'green',
    }),
  },
});

const darkTheme = createTheme('light', {
  colors: {
    green: createColorShades({
      shades: {
        400: '#d54d4d',
      },
      themePropertyName: 'green',
    }),
  },
});

const themeDimensions = createThemeDimensions({
  spacing: {
    xs: 10,
  },
});

function App(): React.JSX.Element {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme} dimensions={themeDimensions}>
      <SafeAreaView>
        <ScrollView>
          <Container>
            <Button label="Theme" buttonColor="success" />
          </Container>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
