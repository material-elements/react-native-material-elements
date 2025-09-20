import React from 'react';
import { Avatar, Box } from '../src';

export const Ex1: React.FC = () => {
  return (
    <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center' }}>
      <Avatar
        source={{
          uri: 'https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
        }}
        sx={{ w: 100, h: 100, o: 0.9, bg: 'red', d: 'flex' }}
      />
    </Box>
  );
};

export const Ex2: React.FC = () => {
  return (
    <Box sx={{ f: 1, d: 'flex', items: 'center', content: 'center' }}>
      <Avatar
        source={{
          uri: 'https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
        }}
        size={100}
        variation="rounded"
      />
    </Box>
  );
};
