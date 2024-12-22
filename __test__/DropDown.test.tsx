import React from 'react';
import { DropDown, Text } from '../src';
import { fireEvent, render, waitFor } from './test-utils';

describe('DropDown Component', () => {
  const mockInputWrapperTouchTestId = 'input-wrapper-touch-test-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<DropDown />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should render the inputStartAdornment component correctly', () => {
    const label = 'inputStartAdornmentComponent';
    const { getByText } = render(<DropDown inputStartAdornment={<Text>{label}</Text>} />);
    const inputStartAdornment = getByText(label);
    expect(inputStartAdornment).toBeDefined();
  });

  it('should render the inputEndAdornment component correctly', () => {
    const label = 'inputEndAdornmentComponent';
    const { getByText } = render(<DropDown inputEndAdornment={<Text>{label}</Text>} />);
    const inputEndAdornment = getByText(label);
    expect(inputEndAdornment).toBeDefined();
  });

  it('should trigger the onDropDownClicked when clicking on the input', () => {
    const mockOnDropDownClicked = jest.fn();

    const { getByTestId } = render(
      <DropDown inputWrapperTouchableOpacityTestId={mockInputWrapperTouchTestId} onDropDownClicked={mockOnDropDownClicked} />,
    );

    const wrapper = getByTestId(mockInputWrapperTouchTestId);
    fireEvent.press(wrapper);
    expect(mockOnDropDownClicked).toHaveBeenCalled();
    expect(mockOnDropDownClicked).toHaveBeenCalledTimes(1);
  });
});
