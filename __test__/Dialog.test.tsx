import React from 'react';
import { Dialog, Text } from '../src';
import { render } from './test-utils';

describe('Dialog', () => {
  it('should render correctly with default props', () => {
    const { toJSON } = render(<Dialog />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render child correctly', () => {
    const { getByText } = render(
      <Dialog>
        <Text>Hello</Text>
      </Dialog>,
    );
    const child = getByText('Hello');
    expect(child).toBeDefined();
  });
});
