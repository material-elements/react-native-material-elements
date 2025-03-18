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
            values={['One', 'Two', 'Three', 'Four', 'Five']}
            selectedIndex={index}
            onChange={(value: string) => setIndex(['One', 'Two', 'Three', 'Four', 'Five'].findIndex(e => e === value) + 1)}
          />
        </Container>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
