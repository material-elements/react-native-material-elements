import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Avatar } from '../src';
import { BaseStyles } from '../src/libraries/style/styleTypes';
import { render, waitFor } from './test-utils';

describe('Avatar Component', () => {
  const ref = React.createRef<Image>();

  const mockTestId = 'mock_avatar_test_id';
  const mockAvatarUrl = 'avatar.jpg';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot with  props', async () => {
    const { toJSON } = render(<Avatar source={{ uri: mockAvatarUrl }} />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Avatar testID={mockTestId} source={{ uri: mockAvatarUrl }} />);

    const avatar = getByTestId(mockTestId);
    expect(avatar).toBeTruthy();
    expect(avatar.props.source).toEqual(expect.objectContaining({ uri: mockAvatarUrl }));
  });

  it('passes size prop correctly to the Image component', () => {
    const { getByTestId } = render(<Avatar testID={mockAvatarUrl} source={{ uri: mockAvatarUrl }} size={50} />);
    const avatar = getByTestId(mockAvatarUrl);
    const flattenedStyle = StyleSheet.flatten(avatar.props.style);
    expect(flattenedStyle.width).toEqual(50);
    expect(flattenedStyle.height).toEqual(50);
  });

  it('applies sx styles correctly', () => {
    const sx: BaseStyles = { bg: 'blue', bWidth: 2 };
    const { getByTestId } = render(<Avatar testID={mockAvatarUrl} source={{ uri: mockAvatarUrl }} sx={sx} />);

    const avatar = getByTestId(mockAvatarUrl);

    const flattenedStyle = StyleSheet.flatten(avatar.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('blue');
    expect(flattenedStyle.borderWidth).toEqual(2);
  });

  it('forwards ref to the Image component', () => {
    render(<Avatar ref={ref} source={{ uri: mockAvatarUrl }} />);
    expect(ref.current).toBeInstanceOf(Image);
  });

  it('applies the "rounded" variation prop correctly', () => {
    const { getByTestId } = render(<Avatar testID={mockTestId} source={{ uri: mockAvatarUrl }} variation="rounded" />);

    const avatar = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(avatar.props.style);
    expect(flattenedStyle.borderRadius).toEqual(100);
  });

  it('applies the "square" variation prop correctly', () => {
    const { getByTestId, rerender } = render(<Avatar testID={mockTestId} source={{ uri: mockAvatarUrl }} variation="square" />);

    const avatar = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(avatar.props.style);

    rerender(<Avatar testID={mockTestId} source={{ uri: mockAvatarUrl }} variation="square" />);
    expect(flattenedStyle.borderRadius).toEqual(0);
  });

  it('applies the "rounded-lg" variation prop correctly', () => {
    const { getByTestId, rerender } = render(
      <Avatar testID={mockTestId} source={{ uri: mockAvatarUrl }} variation="rounded-lg" />,
    );

    const avatar = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(avatar.props.style);

    rerender(<Avatar testID={mockTestId} source={{ uri: mockAvatarUrl }} variation="rounded-lg" />);
    expect(flattenedStyle.borderRadius).toEqual(40);
  });
});
