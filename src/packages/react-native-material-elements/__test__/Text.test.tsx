import { render as testingRenderer, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text as RnText, StyleSheet } from 'react-native';
import { FormHelperText, red, secondary, Text, ThemeProvider } from '../src';
import { TextVariation, TextVariationThemeConfig } from '../src/components/types';
import { render } from './test-utils';

describe('Text Component', () => {
  const mockTestId = 'text_mock_id';

  const themeVariants: TextVariationThemeConfig = {
    body1: { fontSize: 20 },
    body2: { fontSize: 18 },
    h1: { fontSize: 17 },
    h2: { fontSize: 16 },
    h3: { fontSize: 15 },
    h4: { fontSize: 14 },
    h5: { fontSize: 14 },
    h6: { fontSize: 13 },
  };

  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should match the snapshot with default props', async () => {
    const { toJSON } = render(<Text>Mock</Text>);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should apply the sx styles', () => {
    const { getByTestId } = render(
      <Text sx={{ color: 'red', size: 20, weight: '400' }} testID={mockTestId}>
        Mock
      </Text>,
    );

    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.color).toEqual('red');
    expect(flattenedStyle.fontSize).toEqual(20);
    expect(flattenedStyle.fontWeight).toEqual('400');
  });

  it('should render the disabled text when passed the disabled prop', () => {
    const { getByTestId } = render(
      <Text disabled testID={mockTestId}>
        Mock
      </Text>,
    );

    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.opacity).toEqual(0.3);
  });

  it('truncates text when maxLength is provided', () => {
    const { getByText } = render(<Text maxLength={5}>Sample Text</Text>);
    expect(getByText('Sampl...')).toBeTruthy();
  });

  it('applies correct variation styles', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} variation="body1">
        Body1 Text
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.fontSize).toEqual(24);
  });

  it('applies active state', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} isActive activeColor="green">
        Active Text
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.color).toEqual('green');
  });

  it('applies error state', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} error>
        Error Text
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.color).toEqual(red[600]);
  });

  it('applies light mode', () => {
    const { getByText } = render(<Text mode="light">Light Mode Text</Text>);
    const text = getByText('Light Mode Text');
    expect(text.props.style).toEqual({ color: 'white' });
  });

  it('applies custom styles via sx prop', () => {
    const customStyles = { size: 30, color: 'purple' };
    const { getByTestId } = render(
      <Text testID={mockTestId} sx={customStyles}>
        Custom Style Text
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.fontSize).toEqual(30);
    expect(flattenedStyle.color).toEqual('purple');
  });

  it('should apply the isActive prop', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} isActive>
        is active
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.color).toEqual(secondary[200]);
  });

  it('should apply the spacing bottom styles when passed the gutter prop', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} gutterBottom>
        gutter
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.marginBottom).toEqual(10);
  });

  it('should override the gutter style when passed the custom spacing styles', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} gutterBottom sx={{ mb: 20 }}>
        gutter
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.marginBottom).toEqual(20);
  });

  it('should able to adjust the gutter spacing', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} gutterBottom gutterBottomSpace={20}>
        gutter
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.marginBottom).toEqual(20);
  });

  it('should override the default active color when passed the custom styles', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} isActive sx={{ color: 'red' }}>
        gutter
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.color).toEqual('red');
  });

  it('attaches the ref to the Text component', () => {
    const ref = React.createRef<RnText>();
    const { getByTestId } = render(
      <Text testID={mockTestId} ref={ref}>
        Text with ref
      </Text>,
    );

    expect(getByTestId(mockTestId)).toBeTruthy();
    expect(ref.current).toBeTruthy();
    expect(ref.current?.props.children).toBe('Text with ref');
  });

  it('should apply the custom text color', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} color={'red'}>
        Text with custom color value
      </Text>,
    );

    const text = getByTestId(mockTestId);
    expect(text).toBeTruthy();
    const flattenedStyle = StyleSheet.flatten(text.props.style);
    expect(flattenedStyle.color).toEqual('red');
  });

  it('should throw an error when using the maxLength prop with a non-string value', () => {
    let caughtError: Error | null = null;

    try {
      render(
        <Text maxLength={10}>
          <></>
        </Text>,
      );
    } catch (error: any) {
      caughtError = error;
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError?.message).toContain('maxLength props must be used with string');
  });

  Object.entries(themeVariants).forEach(([variant, expectedStyle]) => {
    it(`should apply the '${variant}' text theme variant`, () => {
      const { getByTestId } = render(
        <ThemeProvider
          components={{
            textProps: themeVariants,
          }}>
          <Text testID={mockTestId} variation={variant as TextVariation}>
            Sample text
          </Text>
        </ThemeProvider>,
      );
      const textElement = getByTestId(mockTestId);
      expect(textElement.props.style).toEqual(expect.objectContaining(expectedStyle));
    });
  });
});

describe('FormHelperText component', () => {
  it('should render correct', () => {
    const { toJSON } = render(<FormHelperText>Hello</FormHelperText>);
    expect(toJSON()).toMatchSnapshot();
  });
});
