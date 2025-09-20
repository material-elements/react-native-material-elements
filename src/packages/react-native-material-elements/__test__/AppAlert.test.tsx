import { Alert } from 'react-native';
import { appAlert } from '../src';

jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

describe('appAlert', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should include cancel button when showCancelButton is true', () => {
    const onCancel = jest.fn();

    appAlert({
      showCancelButton: true,
      onCancel,
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Alert',
      'Default message',
      [
        { text: 'Cancel', onPress: onCancel, style: 'cancel' },
        { text: 'OK', onPress: undefined },
      ],
      undefined,
    );
  });

  it('should exclude cancel button when showCancelButton is false', () => {
    appAlert({
      showCancelButton: false,
    });

    expect(Alert.alert).toHaveBeenCalledWith('Alert', 'Default message', [{ text: 'OK', onPress: undefined }], undefined);
  });

  it('should call Alert.alert with custom button texts', () => {
    appAlert({
      confirmText: 'Yes',
      cancelText: 'No',
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Alert',
      'Default message',
      [
        { text: 'No', onPress: undefined, style: 'cancel' },
        { text: 'Yes', onPress: undefined },
      ],
      undefined,
    );
  });

  it('should call Alert.alert with custom onConfirm and onCancel handlers', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    appAlert({
      onConfirm,
      onCancel,
    });

    const buttons = (Alert.alert as jest.Mock).mock.calls[0][2];

    expect(buttons[0].onPress).toBe(onCancel);
    expect(buttons[1].onPress).toBe(onConfirm);
  });

  it('should use custom buttons if provided (overrides everything else)', () => {
    const customButtons = [
      { text: 'Yes', onPress: jest.fn() },
      { text: 'No', onPress: jest.fn() },
    ];

    appAlert({
      buttons: customButtons,
      title: 'Custom',
      message: 'With custom buttons',
    });

    expect(Alert.alert).toHaveBeenCalledWith('Custom', 'With custom buttons', customButtons, undefined);
  });

  it('should pass additional native alert options', () => {
    appAlert({
      options: { cancelable: false },
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Alert',
      'Default message',
      [
        { text: 'Cancel', onPress: undefined, style: 'cancel' },
        { text: 'OK', onPress: undefined },
      ],
      { cancelable: false },
    );
  });
});
