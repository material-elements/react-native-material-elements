import React from 'react';
import { fireEvent, render } from './test-utils';
import {
  CheckBox,
  CHECKBOX_MEDIUM_SIZE,
  CHECKBOX_SMALL_SIZE,
  green,
  grey,
  lightBlue,
  primary,
  red,
  secondary,
  Text,
  yellow,
} from '../src';
import { View } from 'react-native';

describe('CheckBox Component', () => {
  const mockCheckBoxTestId = 'checkbox-test-id';
  const mockCheckBoxImageTestId = 'checkbox-image-test-id';
  const mockAdornmentLabel = 'adornment-label';
  const mockCheckBoxLabel = 'checkbox-label';
  const mockAdornmentTestId = 'adornment-test-id';

  const mockRef = React.createRef<View>();
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render checkbox correctly', () => {
    const { toJSON } = render(<CheckBox />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<CheckBox ref={mockRef} testID={mockCheckBoxTestId} />);
    expect(mockRef.current).toBeInstanceOf(View);
    expect(mockRef.current).not.toBeNull();
  });

  it('should render the checkbox label correctly', () => {
    const { getByText } = render(<CheckBox label={mockCheckBoxLabel} />);
    const label = getByText(mockCheckBoxLabel);
    expect(label).toBeDefined();
  });

  it('should change the label styles', () => {
    const { getByText } = render(<CheckBox label={mockCheckBoxLabel} labelStyles={{ color: 'red' }} />);
    const label = getByText(mockCheckBoxLabel);
    expect(label.props.style).toEqual(expect.objectContaining({ color: 'red' }));
  });

  it('should render the checkbox sub label correctly', () => {
    const { getByText } = render(<CheckBox subLabel={mockCheckBoxLabel} />);
    const subLabel = getByText(mockCheckBoxLabel);
    expect(subLabel).toBeDefined();
  });

  it('should change the sub label styles', () => {
    const { getByText } = render(<CheckBox subLabel={mockCheckBoxLabel} subLabelStyles={{ color: 'red' }} />);
    const subLabel = getByText(mockCheckBoxLabel);
    expect(subLabel.props.style).toEqual(expect.objectContaining({ color: 'red' }));
  });

  it('should change the check box color when checkBoxColor prop passed and checkbox is checked', () => {
    const { getByTestId } = render(<CheckBox isChecked checkBoxColor="red" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(expect.objectContaining({ tintColor: 'red' }));
  });

  it("should't change the check box color when checkBoxColor prop passed without passing the checked flag", () => {
    const { getByTestId } = render(<CheckBox checkBoxColor="red" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).not.toEqual(expect.objectContaining({ tintColor: 'red' }));
    expect(checkBoxImage.props.style).toEqual(expect.objectContaining({ tintColor: grey[600] }));
  });

  it('should take the default color of the checkbox', () => {
    const { getByTestId } = render(<CheckBox checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(expect.objectContaining({ tintColor: grey[600] }));
  });

  it('should call the onPress when clicked on the checkbox', () => {
    const { getByTestId } = render(<CheckBox onPress={mockOnPress} checkBoxColor="red" testID={mockCheckBoxTestId} />);
    const checkBox = getByTestId(mockCheckBoxTestId);
    fireEvent.press(checkBox);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should not call the onPress when the checkbox is disabled', () => {
    const { getByTestId } = render(<CheckBox disabled onPress={mockOnPress} checkBoxColor="red" testID={mockCheckBoxTestId} />);
    const checkBox = getByTestId(mockCheckBoxTestId);
    fireEvent.press(checkBox);
    expect(mockOnPress).not.toHaveBeenCalledTimes(1);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should render the adornment component', () => {
    const { getByText } = render(<CheckBox adornment={<Text>{mockAdornmentLabel}</Text>} />);
    const adornment = getByText(mockAdornmentLabel);
    expect(adornment).toBeDefined();
  });

  it('should render the (primary) variant of checkbox when the checkbox is checked', () => {
    const { getByTestId } = render(<CheckBox isChecked variant="primary" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(expect.objectContaining({ tintColor: primary[500] }));
  });

  it('should render the (secondary) variant of checkbox when the checkbox is checked', () => {
    const { getByTestId } = render(<CheckBox isChecked variant="secondary" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(expect.objectContaining({ tintColor: secondary[500] }));
  });

  it('should render the (success) variant of checkbox when the checkbox is checked', () => {
    const { getByTestId } = render(<CheckBox isChecked variant="success" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(expect.objectContaining({ tintColor: green[500] }));
  });

  it('should render the (error) variant of checkbox when the checkbox is checked', () => {
    const { getByTestId } = render(<CheckBox isChecked variant="error" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(expect.objectContaining({ tintColor: red[500] }));
  });

  it('should render the (info) variant of checkbox when the checkbox is checked', () => {
    const { getByTestId } = render(<CheckBox isChecked variant="info" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(expect.objectContaining({ tintColor: lightBlue[500] }));
  });

  it('should render the (warning) variant of checkbox when the checkbox is checked', () => {
    const { getByTestId } = render(<CheckBox isChecked variant="warning" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(expect.objectContaining({ tintColor: yellow[500] }));
  });

  it('should change the checkbox size when checkbox size is (small)', () => {
    const { getByTestId } = render(<CheckBox size="small" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(
      expect.objectContaining({ width: CHECKBOX_SMALL_SIZE, height: CHECKBOX_SMALL_SIZE }),
    );
  });

  it('should change the checkbox size when checkbox size is (medium)', () => {
    const { getByTestId } = render(<CheckBox size="medium" checkBoxImageTestId={mockCheckBoxImageTestId} />);
    const checkBoxImage = getByTestId(mockCheckBoxImageTestId);
    expect(checkBoxImage.props.style).toEqual(
      expect.objectContaining({ width: CHECKBOX_MEDIUM_SIZE, height: CHECKBOX_MEDIUM_SIZE }),
    );
  });

  it('should not trigger the onPress function on the adornment when the actionType prop is (element)', () => {
    const { getByTestId } = render(
      <CheckBox onPress={mockOnPress} label={mockAdornmentTestId} actionType="element" adornmentTestId={mockAdornmentTestId} />,
    );
    const adornment = getByTestId(mockAdornmentTestId);
    fireEvent.press(adornment);
    expect(mockOnPress).not.toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(0);
  });

  it('should trigger the onPress function on the adornment when the actionType prop is (root)', () => {
    const { getByTestId } = render(
      <CheckBox onPress={mockOnPress} label={mockAdornmentTestId} actionType="root" adornmentTestId={mockAdornmentTestId} />,
    );
    const adornment = getByTestId(mockAdornmentTestId);
    fireEvent.press(adornment);
    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});