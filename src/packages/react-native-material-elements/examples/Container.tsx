import React, { Fragment } from 'react';
import { Box, Container, Text } from '../src';

export const App: React.FC = () => {
  return (
    <Fragment>
      <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center' }}>
        <Container maxWidth="xl" sx={{ bg: 'lightblue', h: '100%' }}>
          <Text>Hi</Text>
        </Container>
      </Box>
    </Fragment>
  );
};
