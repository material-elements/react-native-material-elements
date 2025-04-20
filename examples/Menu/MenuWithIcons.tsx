import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Container, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, ThemeProvider } from '../../src';
import { MeasureElementRect } from '../../src/types';

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
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <IconButton ref={targetElementRef} onPress={buttonClickHandler}>
                  <Entypo name="dots-three-vertical" size={18} color="white" />
                </IconButton>
              </View>
            </View>
            <Menu width={300} open={open} anchorEl={anchorEl} onClose={() => setOpen(false)}>
              <List disablePadding>
                <ListItem disableBottomSpacing onPress={() => console.log('done')}>
                  <ListItemIcon paddingRight={2}>
                    <AntDesign name="google" size={18} color={'white'} />
                  </ListItemIcon>
                  <ListItemText secondary="Google account" />
                </ListItem>
                <ListItem disableBottomSpacing onPress={() => console.log('done')}>
                  <ListItemIcon paddingRight={2}>
                    <MaterialIcons name="logout" size={18} color={'white'} />
                  </ListItemIcon>
                  <ListItemText secondary="Sign out" />
                </ListItem>
                <ListItem disableBottomSpacing onPress={() => console.log('done')}>
                  <ListItemIcon paddingRight={2}>
                    <Entypo name="folder-video" size={18} color={'white'} />
                  </ListItemIcon>
                  <ListItemText secondary="Youtube studio" />
                </ListItem>
                <Divider />
                <ListItem disableBottomSpacing onPress={() => console.log('done')}>
                  <ListItemIcon paddingRight={2}>
                    <Entypo name="price-ribbon" size={18} color={'white'} />
                  </ListItemIcon>
                  <ListItemText secondary="Purchase and memberships" />
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
