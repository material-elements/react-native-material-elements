import React from 'react';
import { Avatar, Box, Chip } from '../src';

export const Ex1: React.FC = () => {
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
      }}>
      <Chip label="Chip" />
      <Chip label="Outlined chip" variant="outlined" />
      <Chip label="Custom chip" variant="outlined" />
      <Chip label="Disabled chip" variant="outlined" disabled />
      <Chip label="Chip with start adornment chip" variant="outlined" />
      <Chip label="Chip with start adornment chip" variant="outlined" />
      <Chip label="Chip with start adornment chip with styles" variant="outlined" />
      <Chip label="Chip with end adornment chip" variant="outlined" />
      <Chip label="Chip with end adornment chip" variant="outlined" />
      <Chip label="Chip with end adornment chip with styles" variant="outlined" />
      <Chip label="onPress chip" variant="outlined" onPress={() => console.log('pressed')} />
      <Chip label="onPress chip without ripple effect" variant="outlined" onPress={() => console.log('pressed')} />
      <Chip label="onPress chip with rippleEdge bottom left" variant="outlined" onPress={() => console.log('pressed')} />
      <Chip label="onPress chip with rippleEdge bottom right" variant="outlined" onPress={() => console.log('pressed')} />
      <Chip label="onPress chip with rippleEdge center" variant="outlined" onPress={() => console.log('pressed')} />
      <Chip label="onPress chip with rippleEdge top left" variant="outlined" onPress={() => console.log('pressed')} />
      <Chip label="onPress chip with rippleEdge top right" variant="outlined" onPress={() => console.log('pressed')} />
      <Chip
        label="Shopping"
        square
        onPress={() => console.log('pressed')}
        startIcon={
          <Avatar
            source={{
              uri: 'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }}
            size={25}
            variation="rounded"
          />
        }
        startIconProps={{
          activeOpacity: 1,
          onPress: () => console.log('icon press'),
        }}
      />
    </Box>
  );
};
