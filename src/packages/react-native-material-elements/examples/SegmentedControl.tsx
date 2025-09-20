import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Container, SegmentedControl, ThemeProvider } from '../src';

function App(): React.JSX.Element {
  const [index, setIndex] = useState(1);

  return (
    <ThemeProvider>
      <SafeAreaView>
        <Container>
          <SegmentedControl
            data={['One', 'Two', 'Three', 'Four', 'Five']}
            selectedIndex={index}
            onChange={(_, index) => setIndex(index)}
          />
        </Container>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
