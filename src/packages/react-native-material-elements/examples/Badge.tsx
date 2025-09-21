import React from 'react';
import { Badge, Box, useTheme } from '../src';
import { LayoutChangeEvent } from 'react-native';

export const Ex1: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge badgeContent={100}>
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex2: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge badgeContent={100} max={1000}>
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex3: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge badgeContent={100} max={1000} variant="dot">
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex4: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge badgeContent={100} max={1000} variant="dot" invisible>
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex5: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge badgeContent={100} max={1000} invisible={false} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex6: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge badgeContent={100} max={1000} invisible={false} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex7: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge badgeContent={100} max={1000} invisible={false} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex8: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge badgeContent={100} max={1000} invisible={false} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex9: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge badgeContent={100} max={1000} invisible={false} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex10: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge
      badgeContent={100}
      max={1000}
      invisible={false}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContainerProps={{
        style: { backgroundColor: 'red' },
        sx: { o: 1, r: 10, w: 10 },
      }}>
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex11: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge
      badgeContent={1000}
      max={1000}
      invisible={false}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContainerProps={{ style: { backgroundColor: 'red' } }}
      overlap="circular">
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex12: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge
      badgeContent={1000}
      max={1000}
      invisible={false}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContainerProps={{ style: { backgroundColor: 'red' } }}
      overlap="rectangular">
      <Box
        sx={{
          w: 200,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex13: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge
      badgeContent={1000}
      max={1000}
      invisible={false}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      variation="error">
      <Box
        sx={{
          w: 100,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex14: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge
      badgeContent={1000}
      max={1000}
      invisible={false}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      variation="info">
      <Box
        sx={{
          w: 100,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex15: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge
      badgeContent={1000}
      max={1000}
      invisible={false}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      variation="primary">
      <Box
        sx={{
          w: 100,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex16: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge
      badgeContent={1000}
      max={1000}
      invisible={false}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      variation="secondary">
      <Box
        sx={{
          w: 100,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};

export const Ex17: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Badge
      badgeContent={1000}
      max={1000}
      invisible={false}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      variation="success">
      <Box
        sx={{
          w: 100,
          h: 50,
          bg: theme.colors.gray[400],
          r: 10,
        }}
      />
    </Badge>
  );
};
