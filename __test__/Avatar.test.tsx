import React from 'react';
import { Image, ViewStyle } from 'react-native';
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
    expect(avatar.props.style).toEqual({ width: 50, height: 50 });
  });

  it('applies sx styles correctly', () => {
    const sx: BaseStyles = { bg: 'blue', bWidth: 2 };
    const { getByTestId } = render(<Avatar testID={mockAvatarUrl} source={{ uri: mockAvatarUrl }} sx={sx} />);

    const avatar = getByTestId(mockAvatarUrl);

    const expectedStyles: ViewStyle = { backgroundColor: 'blue', borderWidth: 2 };
    expect(avatar.props.style).toEqual(expectedStyles);
  });

  it('forwards ref to the Image component', () => {
    render(<Avatar ref={ref} source={{ uri: mockAvatarUrl }} />);
    expect(ref.current).toBeInstanceOf(Image);
  });

  it('applies the variation prop correctly for different variants', () => {
    const { getByTestId, rerender } = render(<Avatar testID={mockTestId} source={{ uri: mockAvatarUrl }} variation="rounded" />);

    const avatar = getByTestId(mockTestId);
    expect(avatar.props.style).toEqual({ borderRadius: 100 });

    rerender(<Avatar testID={mockTestId} source={{ uri: mockAvatarUrl }} variation="square" />);
    expect(avatar.props.style).toEqual({ borderRadius: 0 });

    rerender(<Avatar testID={mockTestId} source={{ uri: mockAvatarUrl }} variation="rounded-lg" />);
    expect(avatar.props.style).toEqual({ borderRadius: 40 });
  });
});
