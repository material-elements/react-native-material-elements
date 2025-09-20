import React from 'react';
import { OTPInput } from '../src';
import { fireEvent, render } from './test-utils';

describe('OTP Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<OTPInput length={5} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correct number of inputs', () => {
    const { getByTestId } = render(<OTPInput length={3} />);

    for (let i = 0; i < 3; i++) {
      const input = getByTestId(`otp-input-${i}`);
      expect(input).toBeDefined();
    }
  });

  it('calls onChange with the correct OTP value', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<OTPInput length={3} onChange={mockOnChange} />);

    const firstInput = getByTestId('otp-input-0');
    fireEvent.changeText(firstInput, '1');

    expect(mockOnChange).toHaveBeenCalledWith('1');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('focuses the next input when a digit is entered', () => {
    const { getByTestId } = render(<OTPInput length={3} />);

    const firstInput = getByTestId('otp-input-0');
    const secondInput = getByTestId('otp-input-1');

    fireEvent.changeText(firstInput, '1');
    expect(secondInput).toBeTruthy();
  });

  it('handles backspace and focuses the previous input', () => {
    const { getByTestId } = render(<OTPInput length={3} />);

    const firstInput = getByTestId('otp-input-0');
    const secondInput = getByTestId('otp-input-1');

    fireEvent.changeText(firstInput, '1');
    fireEvent.changeText(secondInput, '2');

    fireEvent(secondInput, 'keyPress', { nativeEvent: { key: 'Backspace' } });

    expect(secondInput.props.value).toBe('');
    expect(firstInput.props.value).toBe('1');
  });

  it('applies styles correctly based on props', () => {
    const { getByTestId } = render(
      <OTPInput
        length={3}
        square
        error
        variation="underlined"
        otpContainerStyles={{ backgroundColor: 'yellow' }}
        inputStyles={{ color: 'blue' }}
      />,
    );

    const firstInput = getByTestId('otp-input-0');

    expect(firstInput.props.style).toEqual(
      expect.objectContaining({
        color: 'blue',
      }),
    );
  });

  it('clears all inputs when the length prop changes', () => {
    const { getByTestId, rerender } = render(<OTPInput length={3} />);

    const firstInput = getByTestId('otp-input-0');
    fireEvent.changeText(firstInput, '1');

    rerender(<OTPInput length={6} />);

    const updatedInputs = [getByTestId('otp-input-0'), getByTestId('otp-input-1'), getByTestId('otp-input-2')];

    updatedInputs.forEach(input => {
      expect(input.props.value).toBe('');
    });
  });
});
