import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { TextInputFormValidation01 } from '../examples/form-validation/TextInputFormValidation01';
import { render } from './test-utils';

describe('TextInputFormValidation01', () => {
  const submitButtonLabel = 'Save';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders input and button', () => {
    const { getByPlaceholderText, getByText } = render(<TextInputFormValidation01 />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByText(submitButtonLabel)).toBeTruthy();
  });

  it('shows error message when email is empty', async () => {
    const { getByText } = render(<TextInputFormValidation01 />);
    const saveButton = getByText(submitButtonLabel);

    fireEvent.press(saveButton, { nativeEvent: {} });

    await waitFor(() => {
      expect(getByText(/email/i)).toBeTruthy();
    });
  });

  it('shows error message when email is invalid', async () => {
    const { getByPlaceholderText, getByText } = render(<TextInputFormValidation01 />);
    const emailInput = getByPlaceholderText('Email');
    const saveButton = getByText(submitButtonLabel);

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(saveButton, { nativeEvent: {} });

    await waitFor(() => {
      expect(getByText(/email must be a valid/i)).toBeTruthy();
    });
  });

  it('shows error message when email is invalid 2', async () => {
    const { getByPlaceholderText, getByText } = render(<TextInputFormValidation01 />);
    const emailInput = getByPlaceholderText('Email');
    const saveButton = getByText(submitButtonLabel);

    fireEvent.changeText(emailInput, 123);
    fireEvent.press(saveButton, { nativeEvent: {} });

    await waitFor(() => {
      expect(getByText(/email must be a valid/i)).toBeTruthy();
    });
  });

  it('submits form when email is valid', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { getByPlaceholderText, getByText } = render(<TextInputFormValidation01 />);

    const emailInput = getByPlaceholderText('Email');
    const saveButton = getByText(submitButtonLabel);

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(saveButton, { nativeEvent: {} });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    consoleSpy.mockRestore();
  });
});
