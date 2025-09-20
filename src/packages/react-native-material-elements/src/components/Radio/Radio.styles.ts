import { StyleSheet } from 'react-native';
import { RADIO_ITEM_CONTAINER_DEFAULT_SIZE, RADIO_PADDING_SPACE_SMALL } from './constants';

export const styles = StyleSheet.create({
  radioRootContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  baseButtonContainer: {
    width: 'auto',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
  },
  baseButton: {
    padding: 8,
  },
  radioOutline: {
    borderRadius: 100,
    borderWidth: 0.8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: RADIO_PADDING_SPACE_SMALL,
  },
  radioCircle: {
    borderRadius: 100,
  },
  radioItemContainer: {
    minWidth: RADIO_ITEM_CONTAINER_DEFAULT_SIZE,
    minHeight: RADIO_ITEM_CONTAINER_DEFAULT_SIZE,
  },
});
