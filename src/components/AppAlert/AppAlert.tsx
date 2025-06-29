import { Alert, AlertOptions, AlertButton } from 'react-native';

export interface AppAlertOptions {
  title?: string;
  message?: string;

  /**
   * If you want to define custom buttons manually (overrides confirm/cancel).
   * Example: [{ text: 'Yes' }, { text: 'No' }]
   */
  buttons?: AlertButton[];

  /** Show only one button (confirm) if false */
  showCancelButton?: boolean;

  /** Confirm button text (default: "OK") */
  confirmText?: string;

  /** Cancel button text (default: "Cancel") */
  cancelText?: string;

  /** Called when confirm is pressed */
  onConfirm?: () => void;

  /** Called when cancel is pressed */
  onCancel?: () => void;

  /** Additional native alert options (e.g., cancelable) */
  options?: AlertOptions;
}

export const appAlert = ({
  title = 'Alert',
  message = 'Default message',
  buttons,
  showCancelButton = true,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  options,
}: AppAlertOptions) => {
  const finalButtons: AlertButton[] = [];

  if (buttons?.length) {
    // If custom buttons are passed, use them directly
    Alert.alert(title, message, buttons, options);
    return;
  }

  if (showCancelButton) {
    finalButtons.push({
      text: cancelText,
      onPress: onCancel,
      style: 'cancel',
    });
  }

  finalButtons.push({
    text: confirmText,
    onPress: onConfirm,
  });

  Alert.alert(title, message, finalButtons, options);
};
