import React from 'react';
import { render } from './test-utils';
import { ModalContainer, Text } from '../src';

describe('ModalContainer', () => {
  it('should render correctly with default props', () => {
    const { toJSON } = render(
      <ModalContainer>
        <Text>Hello</Text>
      </ModalContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the child component correctly', () => {
    const { getByText } = render(
      <ModalContainer>
        <Text>Hello</Text>
      </ModalContainer>,
    );
    const element = getByText('Hello');
    expect(element).toBeDefined();
  });
});
