import { SegmentedControl, SegmentedControlProps } from '../src';
import { fireEvent, render } from './test-utils';

describe('SegmentedControl', () => {
  const values = ['One', 'Two', 'Three'];
  const mockOnChange = jest.fn();

  const renderSegmentedControl = (overrideProps: Partial<SegmentedControlProps<string>> = {}) =>
    render(<SegmentedControl values={values} selectedIndex={0} onChange={mockOnChange} {...overrideProps} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = renderSegmentedControl();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render all values correctly', () => {
    const { getByText } = renderSegmentedControl();

    values.forEach(value => {
      expect(getByText(value)).toBeTruthy();
    });
  });

  it('should apply default selected index', () => {
    const { getByText } = renderSegmentedControl({ selectedIndex: 1 });

    expect(getByText('Two')).toBeTruthy();
  });

  it('should call onChange when a different segment is pressed', () => {
    jest.useFakeTimers();
    const { getByText } = renderSegmentedControl();

    fireEvent.press(getByText('Two'), { nativeEvent: {} });

    expect(mockOnChange).toHaveBeenCalledWith('Two');
  });

  it('should not call onChange when the same segment is pressed', () => {
    const { getByText } = renderSegmentedControl({ selectedIndex: 0 });
    fireEvent.press(getByText('One'), { nativeEvent: {} });
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
