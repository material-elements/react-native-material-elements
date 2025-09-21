import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Container, SegmentedControl, ThemeProvider } from './src/packages/react-native-material-elements';

function App(): React.JSX.Element {
  const [index, setIndex] = useState<number>(0);

  return (
    <ThemeProvider>
      <SafeAreaView>
        <ScrollView>
          <Container>
            <SegmentedControl
              data={['One', 'Two', 'Three', 'Four', 'Five']}
              selectedIndex={index}
              onChange={(_, _index) => setIndex(_index)}
            />
          </Container>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
