import React from 'react';
import { ActivityIndicator, Box } from '../src';

export const Ex1: React.FC = () => {
  return (
    <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center' }}>
      <ActivityIndicator size="small" />
    </Box>
  );
};

export const Ex2: React.FC = () => {
  return (
    <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center' }}>
      <ActivityIndicator size="small" color="red" />
    </Box>
  );
};
