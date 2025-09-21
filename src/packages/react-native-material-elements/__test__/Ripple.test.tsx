import React from 'react';
import { Ripple } from '../src/components/Ripple';
import { act, render } from './test-utils';
import { Animated } from 'react-native';

describe('Ripple effect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<Ripple />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<Ripple testID="ripple" />);
    expect(getByTestId('ripple')).toBeTruthy();
  });
});
