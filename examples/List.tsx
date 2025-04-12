import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  Avatar,
  Chip,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Text,
  ThemeProvider,
} from '../src';

export const Ex1 = () => {
  return (
    <List>
      <ListItem onPress={() => console.log('done')}>
        <ListItemIcon>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
            }}
            size={30}
            variation="rounded"
          />
        </ListItemIcon>
        <ListItemText primary="Brunch this weekend?" secondary="Ali Connors — I'll be in your neighborhood doing errands this…" />
      </ListItem>
      <Divider>
        <Chip label="CENTER" />
      </Divider>
      <ListItem onPress={() => console.log('done')}>
        <ListItemIcon>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/IA-a4lUg47kM0FW6vtr7Lz_eIaEWKTc1EHlAv1FFPVg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YS1kcm9wLW9mLXBp/bmstYW5kLXllbGxv/dy1wYWludC1pbi13/YXRlci5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w',
            }}
            size={30}
            variation="rounded"
          />
        </ListItemIcon>
        <ListItemText primary="Summer BBQ" secondary="to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this…" />
      </ListItem>
      <ListItem disableRipple disableScaleAnimation endAdornment={<Switch size="large" />}>
        <ListItemText primary="Brunch this weekend?" secondary="Ali Connors — I'll be in your neighborhood doing errands this…" />
      </ListItem>
    </List>
  );
};

export const Ex2 = () => {
  return (
    <List sx={{ bg: 'lightgray' }}>
      <ListItem
        onPress={() => console.log('done')}
        endAdornment={
          <IconButton onPress={() => console.log('pressed')}>
            <Text>D</Text>
          </IconButton>
        }>
        <ListItemIcon>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
            }}
            size={30}
            variation="rounded"
          />
        </ListItemIcon>
        <ListItemText primary="Brunch this weekend?" secondary="Ali Connors — I'll be in your neighborhood doing errands this…" />
      </ListItem>
      <Divider />
      <ListItem onPress={() => console.log('done')}>
        <ListItemIcon>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/IA-a4lUg47kM0FW6vtr7Lz_eIaEWKTc1EHlAv1FFPVg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YS1kcm9wLW9mLXBp/bmstYW5kLXllbGxv/dy1wYWludC1pbi13/YXRlci5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w',
            }}
            size={30}
            variation="rounded"
          />
        </ListItemIcon>
        <ListItemText primary="Summer BBQ" secondary="to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this…" />
      </ListItem>
    </List>
  );
};

export const Ex3 = () => {
  return (
    <List>
      <ListItem
        onPress={() => console.log('done')}
        endAdornment={
          <IconButton onPress={() => console.log('Pressed')}>
            <Avatar
              source={{
                uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
              }}
              size={30}
              variation="rounded"
            />
          </IconButton>
        }>
        <ListItemIcon>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
            }}
            size={30}
            variation="rounded"
          />
        </ListItemIcon>
        <ListItemText primary="Brunch this weekend?" secondary="Ali Connors — I'll be in your neighborhood doing errands this…" />
      </ListItem>
      <Divider />
      <ListItem
        onPress={() => console.log('done')}
        endAdornment={
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/IA-a4lUg47kM0FW6vtr7Lz_eIaEWKTc1EHlAv1FFPVg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YS1kcm9wLW9mLXBp/bmstYW5kLXllbGxv/dy1wYWludC1pbi13/YXRlci5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w',
            }}
            size={30}
            variation="rounded"
          />
        }>
        <ListItemIcon>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/IA-a4lUg47kM0FW6vtr7Lz_eIaEWKTc1EHlAv1FFPVg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YS1kcm9wLW9mLXBp/bmstYW5kLXllbGxv/dy1wYWludC1pbi13/YXRlci5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w',
            }}
            size={30}
            variation="rounded"
          />
        </ListItemIcon>
        <ListItemText primary="Summer BBQ" secondary="to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this…" />
      </ListItem>
    </List>
  );
};

export const Ex4 = () => {
  return (
    <List subheader="Setting">
      <ListItem onPress={() => console.log('done')}>
        <ListItemIcon>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
            }}
            size={30}
            variation="rounded"
          />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider />
      <ListItem onPress={() => console.log('done')} selected={true}>
        <ListItemIcon>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/IA-a4lUg47kM0FW6vtr7Lz_eIaEWKTc1EHlAv1FFPVg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YS1kcm9wLW9mLXBp/bmstYW5kLXllbGxv/dy1wYWludC1pbi13/YXRlci5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w',
            }}
            size={30}
            variation="rounded"
          />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem>
      <Divider />
      <ListItem onPress={() => console.log('done')}>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider />
      <ListItem onPress={() => console.log('done')}>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
};

export const Ex7 = () => {
  return (
    <ThemeProvider>
      <SafeAreaView>
        <Container>
          <List subheader="List item">
            <ListItem
              showOutline={true}
              showDefaultBg
              outlineColor={'red'}
              actionType="root"
              softRadius
              startAdornment={<Text>Start</Text>}
              endAdornment={<Text>End</Text>}
              onPress={() => {}}>
              <ListItemIcon>
                <Avatar
                  source={{
                    uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
                  }}
                  size={30}
                  variation="rounded"
                />
              </ListItemIcon>
              <ListItemText
                primary="Brunch this weekend?"
                secondary="Ali Connors — I'll be in your neighborhood doing errands this…"
              />
            </ListItem>
          </List>
        </Container>
      </SafeAreaView>
    </ThemeProvider>
  );
};
