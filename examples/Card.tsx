import React from 'react';
import { Avatar, Box, Card, CardAction, CardHeader, CardMedia, Text, useTheme, CardContent, Button } from '../src';

export const Ex1: React.FC = () => {
  const { theme } = useTheme();

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
      <Card
        sx={{
          maxW: 350,
          bg: theme.colors.gray[500],
          r: 10,
          overflow: 'hidden',
        }}>
        <CardHeader sx={{ p: 10, d: 'flex', items: 'center', fDirection: 'row', gap: 10 }}>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/vRrTws13r9jDY4EkNZTe6uV6WhoBaE5Y2Q6QOUE6OFc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ.jpeg',
            }}
            size={40}
            variation="rounded"
          />
          <Box>
            <Text>Shrimp and Chorizo Paella</Text>
            <Text variation="h5">September 14, 2016</Text>
          </Box>
        </CardHeader>
        <CardMedia src="https://mui.com/static/images/cards/paella.jpg" sx={{ w: 'auto', h: 200 }} />
        <CardContent sx={{ px: 10, py: 10 }}>
          <Text variation="h5">
            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen
            peas along with the mussels, if you like.
          </Text>
        </CardContent>
        <Box
          sx={{
            py: 10,
            px: 10,
            d: 'flex',
            items: 'center',
            content: 'flex-end',
          }}
        />
      </Card>
    </Box>
  );
};

export const Ex2: React.FC = () => {
  const { theme } = useTheme();

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
      <Card
        sx={{
          maxW: 350,
          bg: theme.colors.gray[500],
          r: 10,
          overflow: 'hidden',
        }}>
        <CardAction onPress={() => console.log('pressed')}>
          <CardMedia src="https://mui.com/static/images/cards/paella.jpg" sx={{ w: 'auto', h: 200 }} />
        </CardAction>
        <CardContent sx={{ px: 10, py: 10 }}>
          <Text variation="h5">
            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen
            peas along with the mussels, if you like.
          </Text>
        </CardContent>
        <Box
          sx={{
            py: 10,
            px: 10,
            d: 'flex',
            items: 'center',
            content: 'flex-end',
          }}
        />
      </Card>
    </Box>
  );
};

export const Ex3: React.FC = () => {
  const { theme } = useTheme();

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
      <Card
        sx={{
          maxW: 350,
          bg: theme.colors.gray[500],
          r: 10,
          overflow: 'hidden',
        }}>
        <CardAction onPress={() => console.log('pressed')}>
          <CardMedia src="https://mui.com/static/images/cards/paella.jpg" sx={{ w: 'auto', h: 200 }} />
        </CardAction>
        <CardContent sx={{ px: 10, py: 10 }}>
          <Text variation="h5">
            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen
            peas along with the mussels, if you like.
          </Text>
        </CardContent>
        <Box
          sx={{
            py: 10,
            px: 10,
            d: 'flex',
            items: 'center',
            content: 'flex-end',
          }}>
          <Button onPress={() => console.log('pressed')} variation="text">
            <Text>Buy</Text>
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export const Ex4: React.FC = () => {
  const { theme } = useTheme();

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
      <Card
        sx={{
          maxW: 350,
          bg: theme.colors.gray[500],
          r: 10,
          overflow: 'hidden',
        }}>
        <CardAction onPress={() => console.log('pressed')}>
          <CardMedia src="https://mui.com/static/images/cards/contemplative-reptile.jpg" sx={{ w: 'auto', h: 200 }} />
          <CardContent sx={{ px: 10, py: 10 }}>
            <Text variation="h5">
              This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen
              peas along with the mussels, if you like.
            </Text>
          </CardContent>
        </CardAction>
      </Card>
    </Box>
  );
};

export const Ex5: React.FC = () => {
  const { theme } = useTheme();

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
      <Card
        sx={{
          maxW: 350,
          bg: theme.colors.gray[500],
          r: 10,
          sColor: 'red',
          sOffset: { width: 0, height: 1 },
          sOpacity: 0.8,
        }}>
        <CardAction onPress={() => console.log('pressed')}>
          <CardMedia
            src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            sx={{ w: 'auto', h: 200, ret: 10, rst: 10 }}
          />
          <CardContent sx={{ px: 10, py: 10 }}>
            <Text variation="h5">
              This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen
              peas along with the mussels, if you like.
            </Text>
          </CardContent>
        </CardAction>
      </Card>
    </Box>
  );
};
