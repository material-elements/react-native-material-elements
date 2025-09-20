import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Container, Radio, Text, ThemeProvider } from '../src';

function App(): React.JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <ThemeProvider>
          <Container sx={{ d: 'flex', content: 'center', items: 'center' }}>
            <Radio
              variant="success"
              isActive={isActive}
              onPress={() => setIsActive(!isActive)}
              label="HTML Version"
              description="@material packed with rich components and widgets."
              disabled={false}
              adornment={<Text>Hi</Text>}
              radioItem={
                <Avatar
                  source={{
                    uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  }}
                  size={30}
                  variation="rounded"
                />
              }
              radioItemContainerStyles={{ width: 30, height: 30 }}
            />
            <Radio
              variant="success"
              isActive={isActive}
              onPress={() => setIsActive(!isActive)}
              label="HTML Version"
              description="@material packed with rich components and widgets."
              disabled={false}
              radioItemContainerStyles={{ width: 30, height: 30 }}
            />
            <Radio
              variant="info"
              isActive={isActive}
              onPress={() => setIsActive(!isActive)}
              label="HTML Version"
              description="@material packed with rich components and widgets."
              disabled={false}
              size="large"
            />
            <Radio
              variant="success"
              isActive={isActive}
              onPress={() => setIsActive(!isActive)}
              label="HTML Version"
              description="@material packed with rich components and widgets."
              disabled={false}
              radioItem={
                <Avatar
                  source={{
                    uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  }}
                  size={30}
                  variation="rounded"
                />
              }
              radioItemContainerStyles={{ width: 30, height: 30 }}
            />
            <Radio
              dividerProps={{
                borderColor: 'red',
              }}
              adornmentType="start"
              showDivider
              adornment={
                <React.Fragment>
                  <Text>React native radio component</Text>
                  <Text variation="h5">Some of the description...</Text>
                </React.Fragment>
              }
            />
          </Container>
        </ThemeProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
