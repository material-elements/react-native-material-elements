import { render as testingRenderer } from '@testing-library/react-native';
import React from 'react';
import { Text as RnText, StyleSheet } from 'react-native';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  red,
  secondary,
  Text,
  ThemeProvider,
} from '../src';
import { TextVariation, TextVariationThemeConfig } from '../src/types';
import { render, waitFor } from './test-utils';

describe('Dialog', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<Dialog />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render child correctly', () => {
    const { getByText } = render(
      <Dialog>
        <Text>Hello</Text>
      </Dialog>,
    );
    const child = getByText('Hello');
    expect(child).toBeDefined();
  });
});

describe('DialogActions', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<DialogActions />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render child correctly', () => {
    const { getByText, toJSON } = render(
      <DialogActions>
        <Text>Hello</Text>
      </DialogActions>,
    );
    const child = getByText('Hello');

    expect(child).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('DialogContent', () => {
  it('should render correctly with default props', () => {
    const { toJSON } = render(<DialogContent />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render child correctly', () => {
    const { getByText, toJSON } = render(
      <DialogContent>
        <Text>Hello</Text>
      </DialogContent>,
    );
    const child = getByText('Hello');

    expect(child).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });
});

const textTests = (Component: any, componentName: string) => {
  describe(componentName, () => {
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
      const { toJSON } = render(<Component>Mock</Component>);
      await waitFor(() => {
        expect(toJSON()).toMatchSnapshot();
      });
    });

    it('should apply the sx styles', () => {
      const { getByTestId } = render(
        <Component sx={{ color: 'red', size: 20, weight: '400' }} testID={mockTestId}>
          Mock
        </Component>,
      );

      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.color).toEqual('red');
      expect(flattenedStyle.fontSize).toEqual(20);
      expect(flattenedStyle.fontWeight).toEqual('400');
    });

    it('should render the disabled text when passed the disabled prop', () => {
      const { getByTestId } = render(
        <Component disabled testID={mockTestId}>
          Mock
        </Component>,
      );

      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.opacity).toEqual(0.3);
    });

    it('truncates text when maxLength is provided', () => {
      const { getByText } = render(<Component maxLength={5}>Sample Text</Component>);
      expect(getByText('Sampl...')).toBeTruthy();
    });

    it('applies correct variation styles', () => {
      const { getByTestId } = render(
        <Component testID={mockTestId} variation="body1">
          Body1 Text
        </Component>,
      );
      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.fontSize).toEqual(24);
    });

    it('applies active state', () => {
      const { getByTestId } = render(
        <Component testID={mockTestId} isActive activeColor="green">
          Active Text
        </Component>,
      );
      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.color).toEqual('green');
    });

    it('applies error state', () => {
      const { getByTestId } = render(
        <Component testID={mockTestId} error>
          Error Text
        </Component>,
      );
      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.color).toEqual(red[600]);
    });

    it('applies custom styles via sx prop', () => {
      const customStyles = { size: 30, color: 'purple' };
      const { getByTestId } = render(
        <Component testID={mockTestId} sx={customStyles}>
          Custom Style Text
        </Component>,
      );
      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.fontSize).toEqual(30);
      expect(flattenedStyle.color).toEqual('purple');
    });

    it('should apply the isActive prop', () => {
      const { getByTestId } = render(
        <Component testID={mockTestId} isActive>
          is active
        </Component>,
      );
      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.color).toEqual(secondary[200]);
    });

    it('should apply the spacing bottom styles when passed the gutter prop', () => {
      const { getByTestId } = render(
        <Component testID={mockTestId} gutterBottom>
          gutter
        </Component>,
      );
      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.marginBottom).toEqual(10);
    });

    it('should override the gutter style when passed the custom spacing styles', () => {
      const { getByTestId } = render(
        <Component testID={mockTestId} gutterBottom sx={{ mb: 20 }}>
          gutter
        </Component>,
      );
      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.marginBottom).toEqual(20);
    });

    it('should able to adjust the gutter spacing', () => {
      const { getByTestId } = render(
        <Component testID={mockTestId} gutterBottom gutterBottomSpace={20}>
          gutter
        </Component>,
      );
      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.marginBottom).toEqual(20);
    });

    it('should override the default active color when passed the custom styles', () => {
      const { getByTestId } = render(
        <Component testID={mockTestId} isActive sx={{ color: 'red' }}>
          gutter
        </Component>,
      );
      const text = getByTestId(mockTestId);
      const flattenedStyle = StyleSheet.flatten(text.props.style);
      expect(flattenedStyle.color).toEqual('red');
    });

    it('attaches the ref to the Text component', () => {
      const ref = React.createRef<RnText>();
      const { getByTestId } = render(
        <Component testID={mockTestId} ref={ref}>
          Text with ref
        </Component>,
      );

      expect(getByTestId(mockTestId)).toBeTruthy();
      expect(ref.current).toBeTruthy();
      expect(ref.current?.props.children).toBe('Text with ref');
    });

    it('should apply the custom text color', () => {
      const { getByTestId } = render(
        <Component testID={mockTestId} color={'red'}>
          Text with custom color value
        </Component>,
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
          <Component maxLength={10}>
            <></>
          </Component>,
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
            <Component testID={mockTestId} variation={variant as TextVariation}>
              Sample text
            </Component>
          </ThemeProvider>,
        );
        const textElement = getByTestId(mockTestId);
        expect(textElement.props.style).toEqual(expect.objectContaining(expectedStyle));
      });
    });
  });
};

textTests(DialogContentText, 'DialogContentText');
textTests(DialogTitle, 'DialogTitle');
