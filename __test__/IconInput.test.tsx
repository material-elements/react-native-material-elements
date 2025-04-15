import React from 'react';
import { render } from './test-utils';
import { IconInput, Text } from '../src';
import { StyleSheet } from 'react-native';

describe('IconInput', () => {
  const inputTestId = 'icon-input-test-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<IconInput />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the label of the input', () => {
    const { getByText } = render(<IconInput label="Name" />);
    const label = getByText('Name');
    expect(label).toBeDefined();
  });

  it('should apply the inputWrapperStyles', () => {
    const { getByTestId } = render(<IconInput testID={inputTestId} inputWrapperStyles={{ backgroundColor: 'red' }} />);
    const input = getByTestId(`${inputTestId}-wrapper`);
    const flattenedStyle = StyleSheet.flatten(input.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it('should render start adornment component', () => {
    const { getByText } = render(<IconInput startAdornment={<Text>start-adornment</Text>} />);
    const adornment = getByText('start-adornment');
    expect(adornment).toBeDefined();
  });

  it('should render end adornment component', () => {
    const { getByText } = render(<IconInput endAdornment={<Text>end-adornment</Text>} />);
    const adornment = getByText('end-adornment');
    expect(adornment).toBeDefined();
  });

  it('should apply start adornment container styles', () => {
    const { getByTestId } = render(
      <IconInput
        testID={inputTestId}
        startAdornment={<Text>start-adornment</Text>}
        startAdornmentContainerStyles={{ backgroundColor: 'red' }}
      />,
    );
    const adornment = getByTestId(`${inputTestId}-start-adornment-container`);
    const flattenedStyle = StyleSheet.flatten(adornment.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it('should apply end adornment container styles', () => {
    const { getByTestId } = render(
      <IconInput
        testID={inputTestId}
        endAdornment={<Text>end-adornment</Text>}
        endAdornmentContainerStyles={{ backgroundColor: 'red' }}
      />,
    );
    const adornment = getByTestId(`${inputTestId}-end-adornment-container`);
    const flattenedStyle = StyleSheet.flatten(adornment.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });
});
