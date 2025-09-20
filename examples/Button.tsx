import React from 'react';
import { Box, Button, Text } from '../src';

export const App: React.FC = () => {
  return (
    <Box
      sx={{
        f: 1,
        d: 'flex',
        items: 'center',
        content: 'center',
        px: 10,
        fDirection: 'column',
        gap: 10,
        w: '100%',
      }}>
      <Button onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button onPress={() => console.log('pressed')} variation="outlined">
        <Text sx={{ color: 'gray' }}>Click here</Text>
      </Button>
      <Button onPress={() => console.log('pressed')} variation="text">
        <Text sx={{ color: 'gray' }}>Click here</Text>
      </Button>
      <Button buttonColor="primary" onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button buttonColor="secondary" onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button buttonColor="success" onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button buttonColor="warning" onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button onPress={() => console.log('pressed')}>
        <Text>Custom button</Text>
      </Button>
      <Button onPress={() => {}} buttonColor="secondary" label="Save" />
    </Box>
  );
};
