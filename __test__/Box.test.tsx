import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Box, Text } from '../src';
import { BaseStyles } from '../src/libraries/style/styleTypes';
import { render, waitFor } from './test-utils';

describe('Box Component', () => {
  const ref = React.createRef<View>();
  const mockTestId = 'mock_box';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', async () => {
    const { toJSON } = render(<Box sx={{ bg: 'red', r: 10, w: 20, h: 20 }} />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should match the snapshot with sx styles', async () => {
    const sx = { bg: 'red', p: 10, r: 5 };
    const { toJSON } = render(
      <Box sx={sx}>
        <View />
      </Box>,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should match the snapshot with custom styles', async () => {
    const customStyle = { backgroundColor: 'blue', padding: 20 };
    const { toJSON } = render(
      <Box style={customStyle}>
        <View />
      </Box>,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<Box testID={mockTestId} />);
    expect(getByTestId(mockTestId)).toBeTruthy();
  });

  it('should apply the custom styles when style prop is passed', () => {
    const { getByTestId } = render(
      <Box testID={mockTestId} style={{ backgroundColor: 'red', borderRadius: 10, margin: 10, padding: 20 }} />,
    );
    const box = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(box.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
    expect(flattenedStyle.borderRadius).toEqual(10);
    expect(flattenedStyle.margin).toEqual(10);
    expect(flattenedStyle.padding).toEqual(20);
  });

  it('should apply the sx styles when sx prop is passed', () => {
    const sx: BaseStyles = { bg: 'red', r: 10, m: 10, p: 20 };
    const { getByTestId } = render(<Box testID={mockTestId} sx={sx} />);
    const box = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(box.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
    expect(flattenedStyle.borderRadius).toEqual(10);
    expect(flattenedStyle.margin).toEqual(10);
    expect(flattenedStyle.padding).toEqual(20);
  });

  it('should combine the sx and styles props correctly', () => {
    const mockSx: BaseStyles = { bg: 'red', r: 10, m: 10, p: 20 };
    const mockStyles: ViewStyle = { backgroundColor: 'pink', borderRadius: 30 };

    const { getByTestId } = render(<Box testID={mockTestId} sx={mockSx} style={mockStyles} />);
    const box = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(box.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('pink');
    expect(flattenedStyle.borderRadius).toEqual(30);
    expect(flattenedStyle.margin).toEqual(10);
    expect(flattenedStyle.padding).toEqual(20);
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Box testID={mockTestId}>
        <Text>Child Text</Text>
      </Box>,
    );
    expect(getByText('Child Text')).toBeTruthy();
  });

  it('should forward ref correctly', () => {
    render(
      <Box ref={ref}>
        <View />
      </Box>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(View);
  });

  it('should position child elements correctly', () => {
    const { getByTestId } = render(<Box testID={mockTestId} style={{ flexDirection: 'row', display: 'flex' }} />);
    const box = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(box.props.style);
    expect(flattenedStyle.flexDirection).toEqual('row');
    expect(flattenedStyle.display).toEqual('flex');
  });

  it('should add the inline styles correctly', () => {
    const { getByTestId } = render(<Box testID={mockTestId} display="flex" flexDirection="row" />);
    const box = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(box.props.style);
    expect(flattenedStyle.flexDirection).toEqual('row');
    expect(flattenedStyle.display).toEqual('flex');
  });

  it('should add the flex inline styles correctly', () => {
    const { getByTestId } = render(
      <Box testID={mockTestId} display="flex" flexDirection="row" justifyContent="center" alignItems="center" />,
    );
    const box = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(box.props.style);
    expect(flattenedStyle.flexDirection).toEqual('row');
    expect(flattenedStyle.display).toEqual('flex');
    expect(flattenedStyle.justifyContent).toEqual('center');
    expect(flattenedStyle.alignItems).toEqual('center');
  });

  it('should render the animated view', () => {
    const { toJSON } = render(<Box animatedView />);
    expect(toJSON()).toMatchSnapshot();
  });
});
