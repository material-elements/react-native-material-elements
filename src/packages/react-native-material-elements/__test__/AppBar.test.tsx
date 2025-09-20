import React from 'react';
import { render } from './test-utils';
import { AppBar, AppBarItem } from '../src';

describe('AppBar', () => {
  it('should render correctly without any props', () => {
    const { toJSON } = render(<AppBar />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('AppBarItem', () => {
  it('should render correctly without any props', () => {
    const { toJSON } = render(<AppBarItem />);
    expect(toJSON()).toMatchSnapshot();
  });
});
