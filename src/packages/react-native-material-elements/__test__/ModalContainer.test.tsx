import React from 'react';
import { fireEvent, render } from './test-utils';
import { ModalContainer, Text } from '../src';

describe('ModalContainer', () => {
  const mockOnCloseHandler = jest.fn();

  const mockTestId = 'mock-test-id';

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

  it('should call the onClose function', () => {
    const { getByTestId } = render(
      <ModalContainer onClose={mockOnCloseHandler} rootWrapperTestID={mockTestId}>
        <></>
      </ModalContainer>,
    );

    const item = getByTestId(mockTestId);

    fireEvent(item, 'press', { nativeEvent: {} });
    expect(mockOnCloseHandler).toHaveBeenCalled();
    expect(mockOnCloseHandler).toHaveBeenCalledTimes(1);
  });
});
