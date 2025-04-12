import React from 'react';
import { Platform, SafeAreaView, ScrollView } from 'react-native';
import { Button, Container, SNACK_BAR, snackbar, Snackbar, ThemeProvider } from '../../src';

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
                  message: `Oops! Something went wrong on our end. We're working to fix it as soon as possible. Please try again in a few moments or check back later.`,
                  showActionButton: false,
                  shouldHideWhenClickedOnActionButton: true,
                  hideDuration: 60,
                  actionButtonLabel: 'Close',
                  animationDuration: 50,
                  type: 'error',
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
