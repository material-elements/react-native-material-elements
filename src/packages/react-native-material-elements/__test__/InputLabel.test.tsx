import React from 'react';
import { Animated } from 'react-native';
import { gray, InputLabel } from '../src';
import { fireEvent, render } from './test-utils';

describe('InputLabel', () => {
  it('updates textLayoutRect state when onLayout is called', () => {
    const { getByText } = render(<InputLabel placeholder="Test Label" labelAnimatedValue={new Animated.Value(0)} />);

    const textElement = getByText('Test Label');

    fireEvent(textElement, 'layout', {
      nativeEvent: {
        layout: {
          x: 0,
          y: 0,
          width: 100,
          height: 20,
        },
      },
    });

    expect(textElement.props.style).toEqual({ color: gray[800], fontSize: 14 });
  });
});
