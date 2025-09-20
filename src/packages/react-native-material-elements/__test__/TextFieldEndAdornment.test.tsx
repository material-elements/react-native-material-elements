import React from 'react';
import { ActivityIndicator, Text } from '../src';
import TextFieldEndAdornment from '../src/components/TextField/TextFieldEndAdornment';
import { render } from './test-utils';

describe('TextFieldEndAdornment', () => {
  const mockTextFieldEndAdornmentTestId = 'text-field-end-adornment-test-id';
  const mockLoadingIndicatorTestId = 'loading-indicator-test-id';

  const mockElementText = 'Mock Element';
  const mockElement = <Text>{mockElementText}</Text>;

  it('should render component correctly', () => {
    const { toJSON } = render(<TextFieldEndAdornment />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the adornment component', () => {
    const { getByText } = render(<TextFieldEndAdornment testID={mockTextFieldEndAdornmentTestId} endAdornment={mockElement} />);

    const element = getByText(mockElementText);

    expect(element).toBeDefined();
  });

  it('should render the loading indicator when loading prop passed', () => {
    const { getByTestId } = render(
      <TextFieldEndAdornment loading loadingIndicatorProps={{ testID: mockLoadingIndicatorTestId }} />,
    );

    const loaderComponent = getByTestId(mockLoadingIndicatorTestId);
    expect(loaderComponent).toBeDefined();
  });

  it('should render the loading indicator when loading prop passed', () => {
    const { getByTestId } = render(<TextFieldEndAdornment loadingIndicatorProps={{ testID: 'loader' }} loading />);

    const loader = getByTestId('loader');
    expect(loader).toBeDefined();
  });

  it('renders ActivityIndicator when loading=true and showLoadingIndicatorWhenFocused=false', () => {
    const { getByTestId, UNSAFE_getByType } = render(
      <TextFieldEndAdornment loading showLoadingIndicatorWhenFocused={false} testID="endAdornment" />,
    );

    const container = getByTestId('endAdornment');
    expect(container).toBeTruthy();
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('renders ActivityIndicator when loading=true, showLoadingIndicatorWhenFocused=true, and isFocused=true', () => {
    const { getByTestId, UNSAFE_getByType } = render(
      <TextFieldEndAdornment loading showLoadingIndicatorWhenFocused isFocused testID="endAdornment" />,
    );

    const container = getByTestId('endAdornment');
    expect(container).toBeTruthy();
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('returns null when no loading and no endAdornment', () => {
    const { toJSON } = render(<TextFieldEndAdornment />);
    expect(toJSON()).toBeNull();
  });

  it('returns null when showLoadingIndicatorWhenFocused=true but not focused', () => {
    const { toJSON } = render(<TextFieldEndAdornment loading showLoadingIndicatorWhenFocused isFocused={false} />);
    expect(toJSON()).toBeNull();
  });
});
