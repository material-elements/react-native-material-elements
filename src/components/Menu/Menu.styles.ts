import { StyleSheet, ViewStyle } from 'react-native';
import { MenuContainerStyle } from './Menu';

export const styles = StyleSheet.create({
  dropDownModal: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 10,
  },
  menuContainer: {
    borderRadius: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 0.5,
  },
});

export const menuContainerStyle = function ({
  theme,
  borderColor: borderC,
  width,
  height,
  fullWidth,
  backgroundColor: bg,
}: MenuContainerStyle): ViewStyle {
  return {
    ...(width && { width }),
    ...(height && { height }),
    ...(fullWidth && { width: '100%' }),
    borderColor: borderC || theme.grey[300],
    backgroundColor: bg || theme.grey[100],
  };
};
