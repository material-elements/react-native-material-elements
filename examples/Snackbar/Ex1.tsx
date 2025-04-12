import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ActivityIndicator, Avatar, Button, Container, SNACK_BAR, snackbar, Snackbar, ThemeProvider } from '../../src';

function App(): React.JSX.Element {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      snackbar.hide();
      setActive(false);
    }, 1000);
  }, [active]);

  return (
    <ThemeProvider>
      <SafeAreaView>
        <ScrollView>
          <Container>
            <Button
              label="Show Snack bar"
              onPress={() =>
                snackbar.show({
                  message: 'Marked as read',
                  showActionButton: true,
                  shouldHideWhenClickedOnActionButton: false,
                  actionButtonOnPress: () => {
                    setActive(true);
                  },
                  hideDuration: SNACK_BAR.LENGTH_SHORT,
                  type: 'warning',
                  startAdornment: (
                    <Avatar
                      source={{
                        uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                      }}
                      size={25}
                      variation="rounded"
                    />
                  ),
                  actionButtonItem: <ActivityIndicator />,
                })
              }
            />
          </Container>
        </ScrollView>
      </SafeAreaView>
      <Snackbar
        autoHide={false}
        position="bottom"
        disableLabelContainerPadding
        snackbarLabelContainerStyles={{ backgroundColor: 'red' }}
      />
    </ThemeProvider>
  );
}

export default App;
