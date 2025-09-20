import { DeviceEventEmitter } from 'react-native';
import { HIDE_SNACK_BAR_MESSAGE, SHOW_SNACK_BAR_MESSAGE, Snackbar, snackbar, SnackbarProperties } from '../src';
import { render } from './test-utils';

describe('snackbar utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default props', () => {
    const { toJSON } = render(<Snackbar />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should called the snack bar show method with config', () => {
    snackbar.show({} as any);
    expect(DeviceEventEmitter.emit).toHaveBeenCalled();
  });

  it('should called the snack bar show method with snack properties config', () => {
    const config: SnackbarProperties = {
      message: 'Marked as read',
      showActionButton: true,
      shouldHideWhenClickedOnActionButton: false,
      type: 'warning',
    };
    snackbar.show(config);
    expect(DeviceEventEmitter.emit).toHaveBeenCalledTimes(1);
    expect(DeviceEventEmitter.emit).toHaveBeenCalledWith(SHOW_SNACK_BAR_MESSAGE, config);
  });

  it('should called the snack bar hide method', () => {
    snackbar.hide();
    expect(DeviceEventEmitter.emit).toHaveReturnedTimes(1);
    expect(DeviceEventEmitter.emit).toHaveBeenCalledWith(HIDE_SNACK_BAR_MESSAGE);
  });
});
