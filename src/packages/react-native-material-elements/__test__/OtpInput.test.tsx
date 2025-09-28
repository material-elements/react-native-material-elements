import React from 'react';
import { OTPInput } from '../src';
import { fireEvent, render } from './test-utils';

describe('OTP Component', () => {
  const mockOtpInputTestId = 'mock-otp-input-test-id';

  const mockOnChange = jest.fn();

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
    const { getByTestId } = render(<OTPInput length={3} onChange={mockOnChange} />);

    const firstInput = getByTestId('otp-input-0');
    fireEvent.changeText(firstInput, '1');

    expect(mockOnChange).toHaveBeenCalledWith('1');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange with the correct OTP value 2', () => {
    const { getByTestId } = render(<OTPInput length={3} onChange={mockOnChange} />);

    const firstInput = getByTestId('otp-input-0');
    fireEvent.changeText(firstInput, '1');

    const secondInput = getByTestId('otp-input-1');
    fireEvent.changeText(secondInput, '2');

    const thirdInput = getByTestId('otp-input-2');
    fireEvent.changeText(thirdInput, '3');

    expect(mockOnChange).toHaveBeenCalledWith('123');
    expect(mockOnChange).toHaveBeenCalledTimes(3);
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

  it('should set the default values', () => {
    const { getByTestId } = render(<OTPInput testID={mockOtpInputTestId} length={3} defaultValue={'123'} />);

    const firstInput = getByTestId(`${mockOtpInputTestId}-0`);
    expect(firstInput).toBeDefined();
    expect(firstInput.props.value).toEqual('1');

    const secondInput = getByTestId(`${mockOtpInputTestId}-1`);
    expect(secondInput).toBeDefined();
    expect(secondInput.props.value).toEqual('2');

    const thirdInput = getByTestId(`${mockOtpInputTestId}-2`);
    expect(thirdInput).toBeDefined();
    expect(thirdInput.props.value).toEqual('3');
  });

  it('ignores text input when length > 1', () => {
    const { getByTestId } = render(<OTPInput length={4} onChange={mockOnChange} />);
    const firstInput = getByTestId('otp-input-0');

    fireEvent.changeText(firstInput, '12');

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(firstInput.props.value).toBe('');
  });

  it('calls onChange when a single character is entered', () => {
    const { getByTestId } = render(<OTPInput length={4} onChange={mockOnChange} />);
    const firstInput = getByTestId('otp-input-0');

    fireEvent.changeText(firstInput, '1');

    expect(mockOnChange).toHaveBeenCalledWith('1');
    expect(firstInput.props.value).toBe('1');
  });

  it('throws error when defaultValue length > OTP length', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => render(<OTPInput length={3} defaultValue="12345" />)).toThrow(
      'Default value must be equal or less then otp length',
    );
    spy.mockRestore();
  });

  it('applies defaultValue when valid', () => {
    const { getByTestId } = render(<OTPInput length={4} defaultValue="12" />);
    expect(getByTestId('otp-input-0').props.value).toBe('1');
    expect(getByTestId('otp-input-1').props.value).toBe('2');
    expect(getByTestId('otp-input-2').props.value).toBe('');
    expect(getByTestId('otp-input-3').props.value).toBe('');
  });

  it('focus handler is called on focus event', () => {
    const { getByTestId } = render(<OTPInput length={4} />);
    const secondInput = getByTestId('otp-input-1');

    fireEvent(secondInput, 'focus');

    expect(secondInput.props.selectTextOnFocus).toBe(true);
  });
});
