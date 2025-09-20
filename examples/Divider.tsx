import React from 'react';
import { Box, Chip, Divider, Text, useTheme } from '../src';

export const Ex1: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box sx={{ d: 'flex', items: 'center', content: 'center', px: 10 }}>
      <Box sx={{ w: 350, bg: theme.colors.gray[800], r: 2, pb: 20 }}>
        <Box sx={{ p: 10 }}>
          <Text>This is first line</Text>
        </Box>
        <Divider />
        <Box sx={{ p: 10 }}>
          <Text>This is second line</Text>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider variant="fullWidth" />
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Text>Center</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right">
          <Text>Right</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="left">
          <Text>Left</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Chip" />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Outlined chip" variant="outlined" />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Custom chip" variant="outlined" />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Chip with start adornment chip" variant="outlined" />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right" startLineStyles={{ backgroundColor: 'red' }}>
          <Text>Right</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right" startLineStyles={{ backgroundColor: 'red' }}>
          <Text>Right</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right" endLineStyles={{ backgroundColor: 'red' }}>
          <Text>Right</Text>
        </Divider>
      </Box>
    </Box>
  );
};

export const Ex2: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        d: 'flex',
        items: 'center',
        content: 'center',
        px: 10,
        gap: 10,
      }}>
      <Box
        sx={{
          w: 350,
          bg: theme.colors.gray[800],
          r: 2,
          d: 'flex',
          h: 80,
          fDirection: 'row',
        }}>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>1</Text>
        </Box>
        <Divider orientation="vertical" variant="fullWidth" />
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>2</Text>
        </Box>
        <Divider orientation="vertical" variant="middle" />
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>3</Text>
        </Box>
        <Divider orientation="vertical" variant="middle">
          <Text>Center</Text>
        </Divider>
      </Box>
      <Box
        sx={{
          w: 400,
          bg: theme.colors.gray[800],
          r: 2,
          d: 'flex',
          h: 80,
          fDirection: 'row',
        }}>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>1</Text>
        </Box>
        <Divider orientation="vertical" variant="middle" textAlign="left">
          <Text>Left</Text>
        </Divider>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>2</Text>
        </Box>
        <Divider orientation="vertical" variant="middle">
          <Text>Center</Text>
        </Divider>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>3</Text>
        </Box>
        <Divider orientation="vertical" variant="middle" textAlign="right">
          <Text>Right</Text>
        </Divider>
      </Box>
      <Box
        sx={{
          w: 400,
          bg: theme.colors.gray[800],
          r: 2,
          d: 'flex',
          h: 80,
          fDirection: 'row',
        }}>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>1</Text>
        </Box>
        <Divider orientation="vertical" variant="middle" textAlign="left">
          <Chip label="Custom chip" variant="outlined" />
        </Divider>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>2</Text>
        </Box>
        <Divider orientation="vertical" variant="middle">
          <Chip label="Chip" variant="outlined" onPress={() => console.log('pressed')} />
        </Divider>
      </Box>
    </Box>
  );
};
