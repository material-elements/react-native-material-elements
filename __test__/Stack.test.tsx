import React from 'react';
import { render } from './test-utils';
import { Stack } from '../src';
import { StyleSheet, Text, View } from 'react-native';

describe('Stack Component', () => {
  const ref = React.createRef<View>();
  const mockStackTestId = 'mock_stack_test_id';

  it('should render correctly', () => {
    const { toJSON } = render(
      <Stack>
        <Text>Hello</Text>
      </Stack>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Stack>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </Stack>,
    );

    expect(getByText('Child 1')).toBeTruthy();
    expect(getByText('Child 2')).toBeTruthy();
  });

  it('should forward ref correctly', () => {
    render(
      <Stack ref={ref}>
        <View />
      </Stack>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(View);
  });

  it('should apply the styles', () => {
    const { getByTestId } = render(
      <Stack testID={mockStackTestId} style={{ backgroundColor: 'red' }}>
        <Text>Hello</Text>
      </Stack>,
    );

    const stack = getByTestId(mockStackTestId);
    expect(stack).toBeDefined();

    const flattedStyles = StyleSheet.flatten(stack.props.style);
    expect(flattedStyles.backgroundColor).toEqual('red');
  });

  it('should change the stack component direction when passed the direction prop row', () => {
    const { getByTestId } = render(
      <Stack direction="row" testID={mockStackTestId} style={{ backgroundColor: 'red' }}>
        <Text>Hello</Text>
      </Stack>,
    );

    const stack = getByTestId(mockStackTestId);
    const flattedStyles = StyleSheet.flatten(stack.props.style);
    expect(flattedStyles.display).toEqual('flex');
    expect(flattedStyles.flexDirection).toEqual('row');
  });
});
