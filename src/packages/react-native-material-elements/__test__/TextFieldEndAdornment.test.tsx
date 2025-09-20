import React from 'react';
import { Text } from '../src';
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
});
