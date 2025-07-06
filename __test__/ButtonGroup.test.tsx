import React from 'react';
import { Button, ButtonGroup } from '../src';
import { render } from './test-utils';

describe('ButtonGroup', () => {
  it('should render correctly with default props', () => {
    const { toJSON } = render(<ButtonGroup />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render child button component correctly', () => {
    const { toJSON } = render(
      <ButtonGroup>
        <Button label="Save" />
        <Button label="Delete" />
      </ButtonGroup>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
