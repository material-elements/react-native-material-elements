import { render as testRenderer, waitFor } from '@testing-library/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardContent, CardHeader, grey, ThemeProvider } from '../src';
import { render } from './test-utils';

describe('Card Component', () => {
  const mockCardTestId = 'card-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<Card />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<Card ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should apply the sx styles correctly', () => {
    const mockSx = { bg: 'red' };
    const { getByTestId } = render(<Card sx={mockSx} testID={mockCardTestId} />);

    const card = getByTestId(mockCardTestId);
    const flattenedStyle = StyleSheet.flatten(card.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it('should apply the card variant (outlined)', () => {
    const { getByTestId } = render(<Card variation="outlined" testID={mockCardTestId} />);

    const card = getByTestId(mockCardTestId);
    const flattenedStyle = StyleSheet.flatten(card.props.style);
    expect(flattenedStyle.borderWidth).toEqual(0.5);
    expect(flattenedStyle.borderColor).toEqual(grey[500]);
  });

  it('should apply the root style', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ cardProps: { style: { backgroundColor: 'red' } } }}>
        <Card variation="outlined" testID={mockCardTestId} />
      </ThemeProvider>,
    );
    const card = getByTestId(mockCardTestId);
    const flattenedStyle = StyleSheet.flatten(card.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it('should combine the root style and component style', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ cardProps: { style: { backgroundColor: 'red' } } }}>
        <Card variation="outlined" testID={mockCardTestId} style={{ borderWidth: 2 }} />
      </ThemeProvider>,
    );
    const card = getByTestId(mockCardTestId);
    const flattenedStyle = StyleSheet.flatten(card.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
    expect(flattenedStyle.borderWidth).toEqual(2);
  });
});

describe('CardHeader Component', () => {
  const mockCardHeaderTestId = 'card-header-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<CardHeader />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<CardHeader ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should apply the sx styles correctly', () => {
    const mockSx = { bg: 'red' };
    const { getByTestId } = render(<CardHeader sx={mockSx} testID={mockCardHeaderTestId} />);

    const cardHeader = getByTestId(mockCardHeaderTestId);
    const flattenedStyle = StyleSheet.flatten(cardHeader.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it('should apply the root style', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ cardHeaderProps: { style: { backgroundColor: 'red' } } }}>
        <CardHeader testID={mockCardHeaderTestId} />
      </ThemeProvider>,
    );
    const cardHeader = getByTestId(mockCardHeaderTestId);
    const flattenedStyle = StyleSheet.flatten(cardHeader.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it('should combine the root style and component style', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ cardHeaderProps: { style: { backgroundColor: 'red' } } }}>
        <CardHeader testID={mockCardHeaderTestId} style={{ borderWidth: 2 }} />
      </ThemeProvider>,
    );
    const cardHeader = getByTestId(mockCardHeaderTestId);
    const flattenedStyle = StyleSheet.flatten(cardHeader.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
    expect(flattenedStyle.borderWidth).toEqual(2);
  });
});

describe('CardContent Component', () => {
  const mockCardContentTestId = 'card-content-test-td';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<CardContent />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<CardContent ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should apply the sx styles correctly', () => {
    const mockSx = { bg: 'red' };
    const { getByTestId } = render(<CardContent sx={mockSx} testID={mockCardContentTestId} />);

    const cardHeader = getByTestId(mockCardContentTestId);
    const flattenedStyle = StyleSheet.flatten(cardHeader.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });
});
