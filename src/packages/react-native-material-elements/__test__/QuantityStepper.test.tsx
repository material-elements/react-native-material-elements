import React from 'react';
import { QuantityStepper } from '../src';
import { fireEvent, render, waitFor } from './test-utils';

describe('QuantityStepper Component', () => {
  const mockOnIncrementTestId = 'on-increment-test-id';
  const mockOnDecrementTestId = 'on-decrement-test-id';

  const mockOnIncrement = jest.fn();
  const mockOnDecrement = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<QuantityStepper value={10} />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should apply the label styles when passed the label props', () => {
    const { getByText } = render(<QuantityStepper value={10} labelProps={{ style: { color: 'red' } }} />);
    const label = getByText('10');
    expect(label.props.style).toEqual(expect.objectContaining({ color: 'red' }));
  });

  it('should trigger the onIncrement function when clicked on the increment button', () => {
    const { getByTestId } = render(
      <QuantityStepper
        onIncrement={mockOnIncrement}
        value={0}
        allowInfiniteIncrement
        onIncrementTestId={mockOnIncrementTestId}
      />,
    );

    const increment = getByTestId(mockOnIncrementTestId);
    fireEvent.press(increment);
    expect(mockOnIncrement).toHaveBeenCalled();
    expect(mockOnIncrement).toHaveBeenCalledTimes(1);
  });

  it('should trigger the onDecrement function when clicked on the decrement button', () => {
    const { getByTestId } = render(
      <QuantityStepper
        onDecrement={mockOnDecrement}
        value={0}
        allowInfiniteDecrement
        onDecrementTestId={mockOnDecrementTestId}
      />,
    );

    const decrement = getByTestId(mockOnDecrementTestId);
    fireEvent.press(decrement);
    expect(mockOnDecrement).toHaveBeenCalled();
    expect(mockOnDecrement).toHaveBeenCalledTimes(1);
  });

  it('should disable the decrement button when passed the disabledDecrement prop', () => {
    const { getByTestId } = render(
      <QuantityStepper value={10} onDecrement={mockOnDecrement} disabledDecrement onDecrementTestId={mockOnDecrementTestId} />,
    );

    const decrement = getByTestId(mockOnDecrementTestId);
    fireEvent.press(decrement);
    expect(mockOnDecrement).not.toHaveBeenCalled();
    expect(mockOnDecrement).toHaveBeenCalledTimes(0);
  });

  it('should disable the increment button when passed the disabledIncrement prop', () => {
    const { getByTestId } = render(
      <QuantityStepper value={2} onIncrement={mockOnIncrement} disabledIncrement onIncrementTestId={mockOnIncrementTestId} />,
    );

    const increment = getByTestId(mockOnIncrementTestId);
    fireEvent.press(increment);
    expect(mockOnDecrement).not.toHaveBeenCalled();
    expect(mockOnIncrement).toHaveBeenCalledTimes(0);
  });
});
