import { fireEvent, render as testRenderer, waitFor } from '@testing-library/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardAction, CardContent, CardHeader, CardMedia, gray, Text, ThemeProvider } from '../src';
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
    expect(flattenedStyle.borderColor).toEqual(gray[500]);
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

describe('CardAction', () => {
  const mockOnPress = jest.fn();
  const cardActionMockTestId = 'card-action-test-id';

  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<CardAction />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the child component correctly', () => {
    const { toJSON, getByText } = render(
      <CardAction>
        <Text>Hello</Text>
      </CardAction>,
    );
    const element = getByText('Hello');
    expect(element).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call the function when press in action component', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(
      <CardAction onPress={mockOnPress} testID={cardActionMockTestId}>
        <Text>Hello</Text>
      </CardAction>,
    );

    const element = getByTestId(cardActionMockTestId);
    fireEvent.press(element, { nativeEvent: {} });
    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

describe('CardMedia', () => {
  const cardMediaMockTestId = 'card-media-test-id';

  it('should render correctly with default props', () => {
    const { toJSON } = render(<CardMedia />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the image', () => {
    const { getByTestId, toJSON } = render(
      <CardMedia testID={cardMediaMockTestId} source={{ uri: 'https://mock-image-url.com' }} />,
    );
    const element = getByTestId(cardMediaMockTestId);

    expect(element.props.source.uri).toEqual('https://mock-image-url.com');
    expect(toJSON()).toMatchSnapshot();
  });
});
