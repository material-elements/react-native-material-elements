import { StyleSheet } from 'react-native';
import { GenerateAppBarStyles } from './AppBar';

export const styles = StyleSheet.create({
  appBarContainer: {
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarItemContainer: {
    padding: 4,
  },
});

export const generateAppBarStyles = ({
  flex,
  display,
  alignItems,
  justifyContent,
  flexDirection,
  backgroundColor,
}: GenerateAppBarStyles) => ({
  ...(flex && { flex }),
  ...(display && { display }),
  ...(alignItems && { alignItems }),
  ...(justifyContent && { justifyContent }),
  ...(flexDirection && { flexDirection }),
  ...(backgroundColor && { backgroundColor }),
});
