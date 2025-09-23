import React from 'react';
import { Avatar, Chip, green, lightBlue, primary, red, secondary, ThemeProvider, yellow } from '../src';
import { SQUARE_BORDER_RADIUS } from '../src/components/Chip/constants';
import { fireEvent, render } from './test-utils';
import { View } from 'react-native';
import { render as testRenderer, waitFor } from '@testing-library/react-native';

describe('Chip Component', () => {
  const chipMockTestId = 'chip-test-id';
  const chipMockLabel = 'label';
  const startIconMockTestId = 'start-icon-test-id';
  const endIconMockTestId = 'end-icon-test-id';
  const iconMockTestId = 'icon-test-id';

  const mockRef = React.createRef<View>();
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should forward ref correctly', () => {
    render(<Chip ref={mockRef} />);

    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should match the snapshot with default props', async () => {
    const { toJSON } = render(<Chip />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('renders correctly with label', () => {
    const { getByText } = render(<Chip testID={chipMockTestId} label={chipMockLabel} />);

    const labelElement = getByText(chipMockLabel);
    expect(labelElement).toBeTruthy();
  });

  it('should show the label', () => {
    const { getByTestId, getByText } = render(<Chip testID={chipMockTestId} label={chipMockLabel} />);
    const chip = getByTestId(chipMockTestId);

    expect(getByText(chipMockLabel)).toBeTruthy();
    expect(chip).toBeTruthy();
  });

  it('should render the outlined variation of the chip component', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} label={chipMockLabel} variant="outlined" />);
    const chip = getByTestId(chipMockTestId);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderWidth: 1 }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should change the border of the chip component when square prop is passed', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} label={chipMockLabel} square />);
    const chip = getByTestId(chipMockTestId);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderRadius: SQUARE_BORDER_RADIUS }));
  });

  it('should call the function when chip component is pressed', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<Chip onPress={mockOnPress} testID={chipMockTestId} />);
    const chip = getByTestId(chipMockTestId);
    fireEvent.press(chip, { nativeEvent: {} });
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should change the label default color when passed the labelColor prop', () => {
    const { getByText } = render(<Chip labelColor={'red'} label={chipMockLabel} onPress={mockOnPress} testID={chipMockTestId} />);
    const label = getByText(chipMockLabel);
    expect(label.props.style).toEqual(expect.objectContaining({ color: 'red' }));
  });

  it('should render with the (secondary) color in (filled) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: secondary[500] }));
  });

  it('should render with the (primary) color in (filled) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="primary" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: primary[500] }));
  });

  it('should render with the (success) color in (filled) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="success" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: green[500] }));
  });

  it('should render with the (error) color in (filled) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="error" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: red[500] }));
  });

  it('should render with the (info) color in (filled) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="info" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: lightBlue[500] }));
  });

  it('should render with the (warning) color in (filled) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="warning" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: yellow[500] }));
  });

  it('should render with the (secondary) color in (outlined) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} variant="outlined" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: secondary[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should render with the (primary) color in (outlined) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="primary" variant="outlined" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: primary[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should render with the (success) color in (outlined) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="success" variant="outlined" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: green[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should render with the (error) color in (outlined) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="error" variant="outlined" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: red[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should render with the (info) color in (outlined) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="info" variant="outlined" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: lightBlue[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should render with the (warning) color in (outlined) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} color="warning" variant="outlined" />);
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: yellow[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should sync the chip and label (secondary) color in (outlined) variant', () => {
    const { getByTestId, getByText } = render(
      <Chip testID={chipMockTestId} variant="outlined" syncBorderAndLabelColor label={chipMockLabel} />,
    );

    const chip = getByTestId(chipMockTestId);
    const label = getByText(chipMockLabel);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: secondary[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: secondary[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should sync the chip and label (primary) color in (outlined) variant', () => {
    const { getByTestId, getByText } = render(
      <Chip testID={chipMockTestId} color="primary" variant="outlined" syncBorderAndLabelColor label={chipMockLabel} />,
    );

    const chip = getByTestId(chipMockTestId);
    const label = getByText(chipMockLabel);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: primary[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: primary[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should sync the chip and label (success) color in (outlined) variant', () => {
    const { getByTestId, getByText } = render(
      <Chip testID={chipMockTestId} variant="outlined" color="success" syncBorderAndLabelColor label={chipMockLabel} />,
    );

    const chip = getByTestId(chipMockTestId);
    const label = getByText(chipMockLabel);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: green[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: green[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should sync the chip and label (error) color in (outlined) variant', () => {
    const { getByTestId, getByText } = render(
      <Chip testID={chipMockTestId} variant="outlined" color="error" syncBorderAndLabelColor label={chipMockLabel} />,
    );

    const chip = getByTestId(chipMockTestId);
    const label = getByText(chipMockLabel);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: red[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: red[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should sync the chip and label (info) color in (outlined) variant', () => {
    const { getByTestId, getByText } = render(
      <Chip testID={chipMockTestId} variant="outlined" color="info" syncBorderAndLabelColor label={chipMockLabel} />,
    );

    const chip = getByTestId(chipMockTestId);
    const label = getByText(chipMockLabel);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: lightBlue[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: lightBlue[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should sync the chip and label (warning) color in (outlined) variant', () => {
    const { getByTestId, getByText } = render(
      <Chip testID={chipMockTestId} variant="outlined" color="warning" syncBorderAndLabelColor label={chipMockLabel} />,
    );

    const chip = getByTestId(chipMockTestId);
    const label = getByText(chipMockLabel);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderColor: yellow[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: yellow[500] }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should render correctly with start icon', () => {
    const { getByTestId, toJSON } = render(
      <Chip
        testID={chipMockTestId}
        startIcon={
          <Avatar
            source={{
              uri: 'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }}
            size={20}
            variation="rounded"
            testID={startIconMockTestId}
          />
        }
      />,
    );

    const startIcon = getByTestId(startIconMockTestId);
    expect(startIcon).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with end icon', () => {
    const { getByTestId, toJSON } = render(
      <Chip
        testID={chipMockTestId}
        endIcon={
          <Avatar
            source={{
              uri: 'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }}
            size={20}
            variation="rounded"
            testID={endIconMockTestId}
          />
        }
      />,
    );

    const endIcon = getByTestId(endIconMockTestId);
    expect(endIcon).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('user should able to click on the start icon', () => {
    const { getByTestId } = render(
      <Chip
        testID={chipMockTestId}
        startIconProps={{
          onPress: mockOnPress,
          testID: iconMockTestId,
        }}
        startIcon={
          <Avatar
            source={{
              uri: 'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }}
            size={20}
            variation="rounded"
            testID={startIconMockTestId}
          />
        }
      />,
    );

    const startIconTouch = getByTestId(iconMockTestId);
    fireEvent.press(startIconTouch, { nativeEvent: {} });
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('user should able to click on the end icon', () => {
    const { getByTestId } = render(
      <Chip
        testID={chipMockTestId}
        endIconProps={{
          onPress: mockOnPress,
          testID: iconMockTestId,
        }}
        endIcon={
          <Avatar
            source={{
              uri: 'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }}
            size={20}
            variation="rounded"
            testID={startIconMockTestId}
          />
        }
      />,
    );

    const endIconTouch = getByTestId(iconMockTestId);
    fireEvent.press(endIconTouch, { nativeEvent: {} });
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should apply the root styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ chipProps: { style: { backgroundColor: 'red' } } }}>
        <Chip label="Save" testID={chipMockTestId} />
      </ThemeProvider>,
    );
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should combine the root styles and component styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ chipProps: { style: { backgroundColor: 'red' } } }}>
        <Chip label="Save" testID={chipMockTestId} style={{ borderWidth: 1 }} />
      </ThemeProvider>,
    );
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red', borderWidth: 1 }));
  });

  it('should apply the outlined chip variation root styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ chipProps: { outlined: { style: { backgroundColor: 'red' } } } }}>
        <Chip label="Save" testID={chipMockTestId} variant="outlined" />
      </ThemeProvider>,
    );
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should combine the outlined chip variation root styles and component styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ chipProps: { outlined: { style: { backgroundColor: 'red' } } } }}>
        <Chip label="Save" testID={chipMockTestId} variant="outlined" style={{ borderWidth: 1 }} />
      </ThemeProvider>,
    );
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red', borderWidth: 1 }));
  });

  it('should apply the root chip field variation styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ chipProps: { filled: { style: { backgroundColor: 'red' } } } }}>
        <Chip label="Save" testID={chipMockTestId} variant="filled" />
      </ThemeProvider>,
    );
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should combine the root chip field variation styles and component styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ chipProps: { filled: { style: { backgroundColor: 'red' } } } }}>
        <Chip label="Save" testID={chipMockTestId} style={{ borderWidth: 1 }} variant="filled" />
      </ThemeProvider>,
    );
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red', borderWidth: 1 }));
  });

  it("should't apply the outlined chip variation root styles when chip variation is filled", () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ chipProps: { outlined: { style: { backgroundColor: 'red' } } } }}>
        <Chip label="Save" testID={chipMockTestId} variant="filled" />
      </ThemeProvider>,
    );
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).not.toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it("should't apply the filled chip variation root styles when chip variation is outlined", () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ chipProps: { filled: { style: { backgroundColor: 'red' } } } }}>
        <Chip label="Save" testID={chipMockTestId} variant="outlined" />
      </ThemeProvider>,
    );
    const chip = getByTestId(chipMockTestId);
    expect(chip.props.style).not.toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });
});
