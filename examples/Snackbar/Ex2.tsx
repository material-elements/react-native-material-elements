import React from 'react';
import { Platform, SafeAreaView, ScrollView } from 'react-native';
import { Button, Container, snackbar, Snackbar, ThemeProvider } from '../../src';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SafeAreaView>
        <ScrollView>
          <Container>
            <Button
              sx={{ mt: Platform.OS === 'ios' ? 0 : 30 }}
              label="Show Snack bar"
              onPress={() =>
                snackbar.show({
                  message: 'Marked as read',
                  showActionButton: true,
                  shouldHideWhenClickedOnActionButton: true,
                  type: 'info',
                })
              }
            />
          </Container>
        </ScrollView>
      </SafeAreaView>
      <Snackbar disableLabelContainerPadding autoHide={false} position="top" />
    </ThemeProvider>
  );
}

export default App;
