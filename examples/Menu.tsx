import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar, Button, Container, List, ListItem, ListItemIcon, ListItemText, Menu, ThemeProvider } from '../src';
import { MeasureElementRect } from '../src/types';

function App(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const targetElementRef = useRef<View>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | MeasureElementRect>(null);

  const openHandler = function () {
    setOpen(!open);
  };

  const buttonClickHandler = function () {
    if (targetElementRef.current) {
      openHandler();
      targetElementRef.current.measure((x, y, width, height, pageX, pageY) => {
        setAnchorEl({ x, y, width, height, pageX, pageY });
      });
    }
  };

  return (
    <ThemeProvider>
      <ScrollView>
        <SafeAreaView>
          <Container>
            <View>
              <View>
                <Button ref={targetElementRef} label="Dashboard" variation="text" onPress={buttonClickHandler} />
              </View>
            </View>
            <Menu width={300} open={open} anchorEl={anchorEl} onClose={() => setOpen(false)}>
              <List disablePadding>
                <ListItem disableBottomSpacing onPress={() => console.log('done')}>
                  <ListItemIcon>
                    <Avatar
                      source={{
                        uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
                      }}
                      size={30}
                      variation="rounded"
                    />
                  </ListItemIcon>
                  <ListItemText secondary="Ali Connors — I'll be in your neighborhood doing errands this…" />
                </ListItem>
                <ListItem disableBottomSpacing onPress={() => console.log('done')}>
                  <ListItemIcon>
                    <Avatar
                      source={{
                        uri: 'https://imgs.search.brave.com/IA-a4lUg47kM0FW6vtr7Lz_eIaEWKTc1EHlAv1FFPVg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YS1kcm9wLW9mLXBp/bmstYW5kLXllbGxv/dy1wYWludC1pbi13/YXRlci5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w',
                      }}
                      size={30}
                      variation="rounded"
                    />
                  </ListItemIcon>
                  <ListItemText secondary="to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this…" />
                </ListItem>
              </List>
            </Menu>
          </Container>
        </SafeAreaView>
      </ScrollView>
    </ThemeProvider>
  );
}

export default App;
