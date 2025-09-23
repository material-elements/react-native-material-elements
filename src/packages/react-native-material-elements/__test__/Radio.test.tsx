import React from 'react';
import { fireEvent, render, waitFor } from './test-utils';
import { Radio, RadioCircle, Text } from '../src';
import { View } from 'react-native';
import { RADIO_LARGE, RADIO_MEDIUM, RADIO_SMALL } from '../src/components/Radio/constants';

describe('Radio Component', () => {
  const mockRadioBaseButtonTestId = 'radio-base-button-test-id';

  const mockOnPress = jest.fn();
  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
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

  it('should render the divider component', () => {
    const { getByTestId } = render(<Radio showDivider dividerProps={{ testID: 'divider' }} />);

    const divider = getByTestId('divider');
    expect(divider).toBeDefined();
  });

  it('should call the onPress function when click on the label component', () => {
    const { getByText } = render(<Radio onPress={mockOnPress} actionType="root" label="label" />);

    const label = getByText('label');
    expect(label).toBeDefined();

    fireEvent(label, 'press', { nativeEvent: {} });

    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should call the onPress function when click on the radio button', () => {
    const { getByTestId } = render(<Radio onPress={mockOnPress} radioBaseButtonTestId={mockRadioBaseButtonTestId} />);

    const radio = getByTestId(mockRadioBaseButtonTestId);

    expect(radio).toBeDefined();

    fireEvent(radio, 'press', { nativeEvent: {} });

    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render the custom radio item if radio isActive', () => {
    const { getByText } = render(<Radio isActive radioItem={<Text>Hello</Text>} />);
    const text = getByText('Hello');
    expect(text).toBeDefined();
  });

  it('should render the start adornment component', () => {
    const { getByText } = render(<Radio adornment={<Text>Hello</Text>} adornmentType="start" />);

    const text = getByText('Hello');
    expect(text).toBeDefined();
  });

  it('should render the start adornment divider component', () => {
    const { getByTestId } = render(
      <Radio showDivider dividerProps={{ testID: 'divider-test-id' }} adornment={<Text>Hello</Text>} adornmentType="start" />,
    );

    const divider = getByTestId('divider-test-id');
    expect(divider).toBeDefined();
  });

  it('should render active radio item when radio is active', () => {
    const { getByTestId } = render(<Radio isActive />);
    const radioItem = getByTestId('radio-item-test-id');
    expect(radioItem).toBeDefined();
  });
});

describe('Radio Circle', () => {
  const testID = 'mock-test-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render small divider component', () => {
    const { getByTestId } = render(<RadioCircle size="small" testID={testID} />);

    const radio = getByTestId(testID);

    expect(radio).toBeDefined();
    expect(radio.props.style.width).toEqual(RADIO_SMALL);
  });

  it('should render medium radioCircle component', () => {
    const { getByTestId } = render(<RadioCircle size="medium" testID={testID} />);

    const radio = getByTestId(testID);

    expect(radio).toBeDefined();
    expect(radio.props.style.width).toEqual(RADIO_MEDIUM);
  });

  it('should render large radioCircle component', () => {
    const { getByTestId } = render(<RadioCircle size="large" testID={testID} />);

    const radio = getByTestId(testID);

    expect(radio).toBeDefined();
    expect(radio.props.style.width).toEqual(RADIO_LARGE);
  });

  it('should render small radioCircle component when invalid size passed', () => {
    const { getByTestId } = render(<RadioCircle size={'invalid' as any} testID={testID} />);

    const radio = getByTestId(testID);

    expect(radio).toBeDefined();
    expect(radio.props.style.width).toEqual(RADIO_SMALL);
  });
});
