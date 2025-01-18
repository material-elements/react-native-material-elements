import React from 'react';
import { SafeAreaView } from 'react-native';
import { AppBar, AppBarItem, Avatar, Text, ThemeProvider } from '../src';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SafeAreaView>
        <AppBar>
          <AppBarItem flex={0.2}>
            <Text>Bar</Text>
          </AppBarItem>
          <AppBarItem flex={0.6} display="flex" justifyContent="center" alignItems="center">
            <Text variation="h1">Page title</Text>
          </AppBarItem>
          <AppBarItem flex={0.2} display="flex" justifyContent="center" alignItems="flex-end">
            <Avatar
              source={{
                uri: 'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              }}
              size={30}
              variation="rounded"
            />
          </AppBarItem>
        </AppBar>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
