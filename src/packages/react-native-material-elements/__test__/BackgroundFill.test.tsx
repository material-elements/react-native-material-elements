import React from 'react';
import { BackgroundFill, Text } from '../src';
import { render } from './test-utils';

describe('BackgroundFill', () => {
  it('should render correctly', () => {
    const { toJSON } = render(<BackgroundFill />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render children correctly', () => {
    const { toJSON } = render(
      <BackgroundFill>
        <Text>Hi</Text>
      </BackgroundFill>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the overlay', () => {
    const { toJSON } = render(<BackgroundFill overlay />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render image', () => {
    const { toJSON } = render(<BackgroundFill image={{ source: { uri: 'https://demo.image' } }} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
