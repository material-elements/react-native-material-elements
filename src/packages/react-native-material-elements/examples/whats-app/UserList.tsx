import React from 'react';
import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText, Text } from '../../src';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const UserList: React.FC = () => {
  return (
    <List>
      <ListItem
        actionType="root"
        onPress={() => console.log('done')}
        endAdornment={colors => <MaterialIcons size={20} name="keyboard-arrow-right" color={colors.white[800]} />}>
        <ListItemIcon>
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
            }}
            size={50}
            variation="rounded"
          />
        </ListItemIcon>
        <ListItemText>
          <Box>
            <Box paddingBottom={6} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Text fontSize={18}>Andrew Parker</Text>
              </Box>
              <Box>
                <Text>11/02/2024</Text>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row">
              <Box marginRight={10}>
                <Ionicons name="checkmark-done-outline" color={'blue'} size={18} />
              </Box>
              <Text fontSize={13}>What kind of strategy is batter ??</Text>
            </Box>
          </Box>
        </ListItemText>
      </ListItem>
    </List>
  );
};
