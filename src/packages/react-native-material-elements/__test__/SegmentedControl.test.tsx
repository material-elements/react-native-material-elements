import { StyleSheet } from 'react-native';
import { SegmentedControl } from '../src';
import { SegmentedControlContainer } from '../src/components/SegmentedControl/SegmentedControlContainer';
import { SegmentedControlItem } from '../src/components/SegmentedControl/SegmentedControlItem';
import { fireEvent, render } from './test-utils';

describe('SegmentedControl component', () => {
  const mockSegmentedControllerTestId = 'mock-segmented-item-test-id';

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<SegmentedControl data={['']} selectedIndex={0} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call the onChange function', () => {
    const { getByTestId } = render(
      <SegmentedControl
        data={['First', 'Second']}
        selectedIndex={0}
        segmentedControlItemTestId={mockSegmentedControllerTestId}
        onChange={mockOnPress}
      />,
    );

    const firstItem = getByTestId(`${mockSegmentedControllerTestId}-0`);

    fireEvent(firstItem, 'press', { nativeEvent: {} });

    expect(firstItem).toBeDefined();
    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should apply the correct segmentTextStyle', () => {
    const { getByText } = render(
      <SegmentedControl data={['First', 'Second']} selectedIndex={0} segmentTextStyle={{ color: 'red' }} />,
    );

    const firstItem = getByText('First');
    expect(firstItem).toBeDefined();

    expect(firstItem.props.style.color).toEqual('red');

    const secondItem = getByText('Second');
    expect(secondItem).toBeDefined();

    expect(secondItem.props.style.color).toEqual('red');
  });

  it('should apply the correct segmentTextStyle to specific item', () => {
    const { getByText } = render(
      <SegmentedControl
        data={['First', 'Second']}
        selectedIndex={0}
        segmentTextStyle={{ color: 'red' }}
        applySegmentItemTextStyleIndex={0}
      />,
    );

    const firstItem = getByText('First');
    expect(firstItem).toBeDefined();

    expect(firstItem.props.style.color).toEqual('red');
  });

  it('should apply the segmentItemStyles', () => {
    const { getByTestId } = render(
      <SegmentedControl
        data={['First', 'Second']}
        selectedIndex={0}
        segmentItemStyles={{ backgroundColor: 'red' }}
        segmentedControlItemTestId={mockSegmentedControllerTestId}
      />,
    );

    const segmentedFirstItem = getByTestId(`${mockSegmentedControllerTestId}-0`);
    const firstItemStyles = StyleSheet.flatten(segmentedFirstItem.props.style);
    expect(firstItemStyles).toEqual(expect.objectContaining({ backgroundColor: 'red' }));

    const segmentedSecondItem = getByTestId(`${mockSegmentedControllerTestId}-0`);
    const secondItemStyles = StyleSheet.flatten(segmentedSecondItem.props.style);
    expect(secondItemStyles).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should apply the segmentItemStyles', () => {
    const { getByTestId } = render(
      <SegmentedControl
        data={['First', 'Second']}
        selectedIndex={0}
        segmentItemStyles={{ backgroundColor: 'red' }}
        segmentedControlItemTestId={mockSegmentedControllerTestId}
        applySegmentItemStyleIndex={0}
      />,
    );

    const segmentedFirstItem = getByTestId(`${mockSegmentedControllerTestId}-0`);
    const firstItemStyles = StyleSheet.flatten(segmentedFirstItem.props.style);
    expect(firstItemStyles).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });
});

describe('SegmentedControlContainer component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<SegmentedControlContainer />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('SegmentedControlItem component', () => {
  const mockTestId = 'segmented-item-test-id';

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<SegmentedControlItem data={''} index={0} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the data when data passed as string', () => {
    const { getByText } = render(<SegmentedControlItem data={'First'} index={0} />);

    const text = getByText('First');
    expect(text).toBeDefined();
  });

  it('should render the data when data passed as number', () => {
    const { getByText } = render(<SegmentedControlItem data={1000} index={0} />);

    const text = getByText('1000');
    expect(text).toBeDefined();
  });

  it('should called the onPress function when click on the SegmentedControlItem', () => {
    const { getByTestId } = render(<SegmentedControlItem data={''} testID={mockTestId} index={0} onPress={mockOnPress} />);

    const item = getByTestId(mockTestId);

    fireEvent(item, 'press', { nativeEvent: {} });

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should called the onPress function with string data when click on the SegmentedControlItem', () => {
    const { getByTestId } = render(<SegmentedControlItem data={'data'} testID={mockTestId} index={0} onPress={mockOnPress} />);

    const item = getByTestId(mockTestId);

    fireEvent(item, 'press', { nativeEvent: {} });

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith('data', 0);
  });

  it('should called the onPress function with object data when click on the SegmentedControlItem', () => {
    const { getByTestId } = render(
      <SegmentedControlItem data={{ title: 'label' }} testID={mockTestId} index={0} onPress={mockOnPress} />,
    );

    const item = getByTestId(mockTestId);

    fireEvent(item, 'press', { nativeEvent: {} });

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith({ title: 'label' }, 0);
  });
});
