import { DeviceEventEmitter } from 'react-native';
import { HIDE_SNACK_BAR_MESSAGE, SHOW_SNACK_BAR_MESSAGE } from './constants';
import { SnackbarProperties } from './Snackbar';

export const snackbar = {
  show: (config: SnackbarProperties) => {
    DeviceEventEmitter.emit(SHOW_SNACK_BAR_MESSAGE, config);
  },
  hide: () => {
    DeviceEventEmitter.emit(HIDE_SNACK_BAR_MESSAGE);
  },
};
