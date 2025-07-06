import React from 'react';
import { IconButton } from '../src';
import { fireEvent, render } from './test-utils';

describe('IconButton', () => {
  const mockOnPress = jest.fn();
  const mockIconButtonTestId = 'mock-icon-button-test-id';

  beforeAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<IconButton />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call the onPress function', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<IconButton onPress={mockOnPress} testID={mockIconButtonTestId} />);
    const button = getByTestId(mockIconButtonTestId);
    fireEvent.press(button, { nativeEvent: {} });
    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
