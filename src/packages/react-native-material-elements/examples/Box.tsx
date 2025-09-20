import React from 'react';
import { Box, Text, useTheme } from '../src';

export const Ex1: React.FC = () => {
  return (
    <Box
      sx={{
        w: 50,
        h: 50,
        bg: 'white',
        r: 10,
        sColor: 'red',
        sOffset: { width: 0, height: 1 },
        sOpacity: 0.8,
        sRadius: 1,
      }}
    />
  );
};

export const Ex2: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: 200,
        bg: theme.colors.gray[400],
        r: 10,
        p: 10,
        d: 'flex',
        fDirection: 'row-reverse',
        gap: 10,
      }}>
      <Text>Hi</Text>
      <Text>Hello</Text>
    </Box>
  );
};

export const Ex3: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: 200,
        h: 50,
        bg: theme.colors.gray[400],
        ret: 10,
        p: 10,
      }}
    />
  );
};

export const Ex4: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: 200,
        h: 50,
        bg: theme.colors.gray[400],
        reb: 10,
        p: 10,
      }}
    />
  );
};

export const Ex5: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: 200,
        h: 50,
        bg: theme.colors.gray[400],
        rsb: 10,
        p: 10,
      }}
    />
  );
};

export const Ex6: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: 200,
        h: 50,
        bg: theme.colors.gray[400],
        rst: 10,
        p: 10,
      }}
    />
  );
};

export const Ex7: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: 200,
        h: 50,
        bg: theme.colors.gray[400],
        rst: 20,
        rsb: 20,
        reb: 6,
        ret: 10,
        p: 10,
      }}
    />
  );
};

export const Ex8: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: 200,
        h: 50,
        bg: theme.colors.gray[400],
        rst: 20,
        rsb: 20,
        reb: 6,
        ret: 10,
        p: 10,
        pos: 'absolute',
        posT: 10,
        posL: 10,
      }}
    />
  );
};

export const Ex9: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: 200,
        h: 50,
        bg: theme.colors.gray[400],
        rst: 20,
        rsb: 20,
        reb: 6,
        ret: 10,
        p: 10,
        pos: 'absolute',
        posR: 10,
        posB: 10,
      }}
    />
  );
};

export const Ex10: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: 200,
        h: 50,
        bg: theme.colors.gray[400],
        rst: 20,
        rsb: 20,
        reb: 6,
        ret: 10,
        p: 10,
        ms: 100,
        mt: 200,
      }}
    />
  );
};
