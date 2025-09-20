import React from 'react';
import { View } from 'react-native';
import {
  getSwitchSizes,
  Switch,
  SWITCH_CONTAINER_ANDROID_MODE_HEIGHT_LARGE,
  SWITCH_CONTAINER_ANDROID_MODE_HEIGHT_MEDIUM,
  SWITCH_CONTAINER_ANDROID_MODE_HEIGHT_SMALL,
  SWITCH_CONTAINER_ANDROID_MODE_WIDTH_LARGE,
  SWITCH_CONTAINER_ANDROID_MODE_WIDTH_MEDIUM,
  SWITCH_CONTAINER_ANDROID_MODE_WIDTH_SMALL,
  SWITCH_CONTAINER_HEIGHT_LARGE,
  SWITCH_CONTAINER_HEIGHT_MEDIUM,
  SWITCH_CONTAINER_HEIGHT_SMALL,
  SWITCH_CONTAINER_WIDTH_LARGE,
  SWITCH_CONTAINER_WIDTH_MEDIUM,
  SWITCH_CONTAINER_WIDTH_SMALL,
  SWITCH_THUMB_HEIGHT_LARGE,
  SWITCH_THUMB_HEIGHT_MEDIUM,
  SWITCH_THUMB_HEIGHT_SMALL,
  SWITCH_THUMB_WIDTH_LARGE,
  SWITCH_THUMB_WIDTH_MEDIUM,
  SWITCH_THUMB_WIDTH_SMALL,
} from '../src';
import { fireEvent, render, waitFor } from './test-utils';

describe('Switch Component', () => {
  const switchMockTestId = 'switch-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot with default props', async () => {
    const { toJSON } = render(<Switch />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<Switch ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render with default props', () => {
    const { getByTestId } = render(<Switch testID={switchMockTestId} />);
    const switchComponent = getByTestId(switchMockTestId);
    expect(switchComponent).toBeTruthy();
  });

  it('should call onToggle when switch is toggled', async () => {
    const onToggleMock = jest.fn();
    const { getByTestId } = render(<Switch testID={switchMockTestId} onToggle={onToggleMock} />);
    const switchComponent = getByTestId(switchMockTestId);

    fireEvent.press(switchComponent);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it('should apply the correct size for the (large) switch', () => {
    const { getByTestId } = render(<Switch testID={switchMockTestId} size="large" />);

    const switchComponent = getByTestId(switchMockTestId);
    expect(switchComponent.props.style.width).toBe(SWITCH_CONTAINER_WIDTH_LARGE);
    expect(switchComponent.props.style.height).toBe(SWITCH_CONTAINER_HEIGHT_LARGE);
  });

  it('should apply the correct size for the (medium) switch', () => {
    const { getByTestId } = render(<Switch testID={switchMockTestId} size="medium" />);

    const switchComponent = getByTestId(switchMockTestId);
    expect(switchComponent.props.style.width).toBe(SWITCH_CONTAINER_WIDTH_MEDIUM);
    expect(switchComponent.props.style.height).toBe(SWITCH_CONTAINER_HEIGHT_MEDIUM);
  });

  it('should apply the correct size for the (small) switch', () => {
    const { getByTestId } = render(<Switch testID={switchMockTestId} size="small" />);

    const switchComponent = getByTestId(switchMockTestId);
    expect(switchComponent.props.style.width).toBe(SWITCH_CONTAINER_WIDTH_SMALL);
    expect(switchComponent.props.style.height).toBe(SWITCH_CONTAINER_HEIGHT_SMALL);
  });
});

describe('getSwitchSizes', () => {
  const sizes = ['small', 'medium', 'large'] as const;
  const types = ['ios', 'android'] as const;

  sizes.forEach(size => {
    types.forEach(type => {
      it(`returns correct styles for size=${size} and type=${type}`, () => {
        const { thumbStyles, thumbContainerStyles } = getSwitchSizes({ size, type });

        // check thumb styles
        if (size === 'small') {
          expect(thumbStyles.width).toBe(SWITCH_THUMB_WIDTH_SMALL);
          expect(thumbStyles.height).toBe(SWITCH_THUMB_HEIGHT_SMALL);
        }
        if (size === 'medium') {
          expect(thumbStyles.width).toBe(SWITCH_THUMB_WIDTH_MEDIUM);
          expect(thumbStyles.height).toBe(SWITCH_THUMB_HEIGHT_MEDIUM);
        }
        if (size === 'large') {
          expect(thumbStyles.width).toBe(SWITCH_THUMB_WIDTH_LARGE);
          expect(thumbStyles.height).toBe(SWITCH_THUMB_HEIGHT_LARGE);
        }

        // check container styles
        if (size === 'small') {
          expect(thumbContainerStyles.width).toBe(
            type === 'android' ? SWITCH_CONTAINER_ANDROID_MODE_WIDTH_SMALL : SWITCH_CONTAINER_WIDTH_SMALL,
          );
          expect(thumbContainerStyles.height).toBe(
            type === 'android' ? SWITCH_CONTAINER_ANDROID_MODE_HEIGHT_SMALL : SWITCH_CONTAINER_HEIGHT_SMALL,
          );
        }
        if (size === 'medium') {
          expect(thumbContainerStyles.width).toBe(
            type === 'android' ? SWITCH_CONTAINER_ANDROID_MODE_WIDTH_MEDIUM : SWITCH_CONTAINER_WIDTH_MEDIUM,
          );
          expect(thumbContainerStyles.height).toBe(
            type === 'android' ? SWITCH_CONTAINER_ANDROID_MODE_HEIGHT_MEDIUM : SWITCH_CONTAINER_HEIGHT_MEDIUM,
          );
        }
        if (size === 'large') {
          expect(thumbContainerStyles.width).toBe(
            type === 'android' ? SWITCH_CONTAINER_ANDROID_MODE_WIDTH_LARGE : SWITCH_CONTAINER_WIDTH_LARGE,
          );
          expect(thumbContainerStyles.height).toBe(
            type === 'android' ? SWITCH_CONTAINER_ANDROID_MODE_HEIGHT_LARGE : SWITCH_CONTAINER_HEIGHT_LARGE,
          );
        }
      });
    });
  });
});
