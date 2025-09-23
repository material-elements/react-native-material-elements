import React from 'react';
import { Animated } from 'react-native';
import { gray, Skeleton } from '../src';
import { render } from './test-utils';

describe('Skeleton component', () => {
  let colorSchemeSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    colorSchemeSpy = jest.spyOn(require('react-native'), 'useColorScheme');
  });

  afterEach(() => {
    jest.clearAllMocks();
    colorSchemeSpy.mockRestore();
  });

  it('renders with default background in light mode', () => {
    colorSchemeSpy.mockReturnValue('light');
    const { getByTestId } = render(<Skeleton testID="skeleton" />);
    const skeleton = getByTestId('skeleton');
    expect(skeleton.props.style.backgroundColor).toBe(gray[400]);
  });

  it('renders with default background in dark mode', () => {
    colorSchemeSpy.mockReturnValue('dark');
    const { getByTestId } = render(<Skeleton testID="skeleton" />);
    const skeleton = getByTestId('skeleton');
    expect(skeleton.props.style.backgroundColor).toBe(gray[800]);
  });

  it('uses the custom backgroundColor when provided', () => {
    colorSchemeSpy.mockReturnValue('light');
    const { getByTestId } = render(<Skeleton testID="skeleton" backgroundColor="red" />);
    const skeleton = getByTestId('skeleton');
    expect(skeleton.props.style.backgroundColor).toBe('red');
  });

  it('starts shimmer animation on mount', () => {
    const loopSpy = jest.spyOn(Animated, 'loop');
    render(<Skeleton testID="skeleton" />);
    expect(loopSpy).toHaveBeenCalled();
  });
});
