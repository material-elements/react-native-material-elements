import React from 'react';
import { fireEvent, render, waitFor } from './test-utils';
import { Radio, Text } from '../src';
import { View } from 'react-native';

describe('Radio Component', () => {
  const mockRadioBaseButtonTestId = 'radio-base-button-test-id';

  const mockOnPress = jest.fn();
  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<Radio />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward the ref correctly', () => {
    render(<Radio ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should call the onPress function when clicked on the radio', () => {
    const { getByTestId } = render(<Radio onPress={mockOnPress} radioBaseButtonTestId={mockRadioBaseButtonTestId} />);
    const radio = getByTestId(mockRadioBaseButtonTestId);

    fireEvent.press(radio, { nativeEvent: {} });
    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("should't call the onPress function when radio is disabled", () => {
    const { getByTestId } = render(<Radio disabled onPress={mockOnPress} radioBaseButtonTestId={mockRadioBaseButtonTestId} />);
    const radio = getByTestId(mockRadioBaseButtonTestId);

    fireEvent.press(radio, { nativeEvent: {} });
    expect(mockOnPress).not.toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(0);
  });

  it('should render the label', () => {
    const { getByText } = render(<Radio label="mock-label" />);

    const label = getByText('mock-label');
    expect(label).toBeDefined();
  });

  it('should apply the label props', () => {
    const { getByText } = render(<Radio labelProps={{ style: { color: 'red' } }} label="mock-label" />);

    const label = getByText('mock-label');
    expect(label).toBeDefined();
    expect(label.props.style).toEqual(expect.objectContaining({ color: 'red' }));
  });

  it('should render the description', () => {
    const { getByText } = render(<Radio description="mock-description" />);

    const description = getByText('mock-description');
    expect(description).toBeDefined();
  });

  it('should apply the description props', () => {
    const { getByText } = render(<Radio descriptionProps={{ style: { color: 'red' } }} description="mock-description" />);

    const description = getByText('mock-description');
    expect(description).toBeDefined();
    expect(description.props.style).toEqual(expect.objectContaining({ color: 'red' }));
  });

  it('should render the custom radio item when passed the radioItem prop', () => {
    const { getByText } = render(<Radio isActive radioItem={<Text>radioItem</Text>} />);

    const item = getByText('radioItem');
    expect(item).toBeDefined();
  });

  it('should render the adornment and not the label', () => {
    const { getByText, queryByText } = render(
      <Radio label={'mock-label'} description="mock-description" adornment={<Text>adornment</Text>} />,
    );

    const adornmentItem = getByText('adornment');
    expect(adornmentItem).toBeDefined();

    expect(queryByText('mock-label')).toBeNull();
    expect(queryByText('mock-description')).toBeNull();
  });
});
