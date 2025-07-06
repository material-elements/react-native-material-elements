import React from 'react';
import { Alert, Text } from '../src';
import { fireEvent, render } from './test-utils';
import { TouchableOpacity, View } from 'react-native';

describe('Alert', () => {
  const mockStartIcon = <View testID="start-icon-test-id" />;
  const mockEndIcon = <View testID="end-icon-test-id" />;

  const mockOnPress = jest.fn();
  const mockAction = (
    <TouchableOpacity testID="action-test-id" onPress={mockOnPress}>
      <Text>Click here</Text>
    </TouchableOpacity>
  );

  it('should render correctly with zero props', () => {
    const { toJSON } = render(<Alert />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render start icon correctly', () => {
    const { getByTestId } = render(<Alert startIcon={mockStartIcon} />);
    const startIconElement = getByTestId('start-icon-test-id');
    expect(startIconElement).toBeDefined();
  });

  it('should render end icon correctly', () => {
    const { getByTestId } = render(<Alert endIcon={mockEndIcon} />);
    const endIconElement = getByTestId('end-icon-test-id');
    expect(endIconElement).toBeDefined();
  });

  it('should render the action component correctly', () => {
    const { getByTestId } = render(<Alert action={mockAction} />);
    const actionButton = getByTestId('action-test-id');
    fireEvent.press(actionButton);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should render the title', () => {
    const { getByText } = render(<Alert title="Hello" />);
    const titleElement = getByText('Hello');
    expect(titleElement).toBeDefined();
  });

  it('should render the subTitle', () => {
    const { getByText } = render(<Alert subTitle="Hello" />);
    const subTitleElement = getByText('Hello');
    expect(subTitleElement).toBeDefined();
  });
});
