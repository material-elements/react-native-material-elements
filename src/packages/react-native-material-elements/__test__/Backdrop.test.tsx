import React from 'react';
import { render } from './test-utils';
import { Backdrop, Text } from '../src';

describe('Backdrop', () => {
  it('should render correctly', () => {
    const { toJSON } = render(<Backdrop />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render custom child component', () => {
    const { getByText } = render(
      <Backdrop>
        <Text>Child</Text>
      </Backdrop>,
    );

    const childElement = getByText('Child');
    expect(childElement).toBeDefined();
  });

  it('should render activity indicator when child not provided', () => {
    const { getByTestId } = render(<Backdrop activityIndicatorTestId="activity-indicator-test-id" />);
    const loader = getByTestId('activity-indicator-test-id');
    expect(loader).toBeDefined();
  });
});
