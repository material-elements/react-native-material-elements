import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { Container } from '../src';
import { LG_MAX_WIDTH, MD_MAX_WIDTH, SM_MAX_WIDTH, XS_MAX_WIDTH } from '../src/components/Box/constants';

describe('Container Component', () => {
  const mockRef = React.createRef<View>();
  const containerMockTestId = 'mock_container';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', async () => {
    const { toJSON } = render(<Container />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should match the snapshot with sx styles', async () => {
    const sx = { bg: 'red', p: 10, r: 5, mt: 10 };
    const { toJSON } = render(
      <Container sx={sx}>
        <View />
      </Container>,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Container testID={containerMockTestId}>
        <Text testID="child">Child Content</Text>
      </Container>,
    );

    const container = getByTestId(containerMockTestId);
    expect(container).toBeTruthy();
  });

  it('applies custom styles (sx prop) correctly', () => {
    const { getByTestId } = render(
      <Container sx={{ bg: 'blue', p: 20, w: '90%' }} testID={containerMockTestId}>
        <Text>Test</Text>
      </Container>,
    );

    const container = getByTestId(containerMockTestId);
    expect(container.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: 'blue', padding: 20, margin: 'auto', width: '90%' }]),
    );
  });

  it('should remove the padding from the container when disabled disableGutters prop passed', () => {
    const { getByTestId } = render(<Container disableGutters testID={containerMockTestId} />);

    const expectedStyles: StyleProp<ViewStyle> = [{ margin: 'auto', width: '100%' }];

    const container = getByTestId(containerMockTestId);
    expect(container.props.style).toEqual(expect.arrayContaining(expectedStyles));
  });

  it('should applies maxWidth("md") prop correctly', () => {
    const { getByTestId } = render(
      <Container testID={containerMockTestId} maxWidth="md" disableGutters>
        <Text>Test</Text>
      </Container>,
    );

    const container = getByTestId(containerMockTestId);
    expect(container.props.style).toEqual(expect.arrayContaining([{ margin: 'auto', width: MD_MAX_WIDTH }]));
  });

  it('applies maxWidth("xs") and disableGutters correctly', () => {
    const { getByTestId } = render(
      <Container testID={containerMockTestId} maxWidth="xs" disableGutters>
        <Text>Test</Text>
      </Container>,
    );

    const container = getByTestId(containerMockTestId);
    expect(container.props.style).toEqual(expect.arrayContaining([{ margin: 'auto', width: XS_MAX_WIDTH }]));
  });

  it('should applies maxWidth("lg") prop correctly', () => {
    const { getByTestId } = render(
      <Container testID={containerMockTestId} maxWidth="lg" disableGutters>
        <Text>Test</Text>
      </Container>,
    );

    const container = getByTestId(containerMockTestId);
    expect(container.props.style).toEqual(expect.arrayContaining([{ margin: 'auto', width: LG_MAX_WIDTH }]));
  });

  it('applies maxWidth("sm") and disableGutters correctly', () => {
    const { getByTestId } = render(
      <Container testID={containerMockTestId} maxWidth="sm" disableGutters>
        <Text>Test</Text>
      </Container>,
    );

    const container = getByTestId(containerMockTestId);
    expect(container.props.style).toEqual(expect.arrayContaining([{ margin: 'auto', width: SM_MAX_WIDTH }]));
  });

  it('applies container wrapper styles correctly', () => {
    const { getByTestId } = render(
      <Container testID={containerMockTestId} containerStyles={{ padding: 10 }}>
        <Text>Test</Text>
      </Container>,
    );

    const wrapper = getByTestId(containerMockTestId);

    const expectedStyles: StyleProp<ViewStyle> = [{ margin: 'auto', width: '100%', padding: 10 }];

    expect(wrapper.props.style).toEqual(expect.arrayContaining(expectedStyles));
  });

  it('renders children components correctly', () => {
    const { getByText } = render(
      <Container>
        <Text>Child Component</Text>
      </Container>,
    );

    expect(getByText('Child Component')).toBeTruthy();
  });

  it('should render dynamic styles correctly', () => {
    const { getByTestId } = render(<Container testID={containerMockTestId} containerStyles={{ backgroundColor: 'red' }} />);

    const containerWrapperTestId = `${containerMockTestId}_outer`;
    const container = getByTestId(containerWrapperTestId);

    expect(container.props.style).toEqual(expect.arrayContaining([{ width: '100%' }, { backgroundColor: 'red' }]));
  });

  it('should render the inner component with forward ref', () => {
    const innerComponentTestId = containerMockTestId + '_inner_view_test_id';

    render(
      <Container>
        <View ref={mockRef} testID={innerComponentTestId} />
      </Container>,
    );

    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should apply the center alignment styles to the child component', () => {
    const { getByTestId } = render(
      <Container
        disableGutters
        testID={containerMockTestId}
        sx={{ d: 'flex', fDirection: 'column', items: 'center', content: 'center' }}>
        <View>Test</View>
      </Container>,
    );

    const container = getByTestId(containerMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = [
      { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '100%' },
    ];

    expect(container.props.style).toEqual(expect.arrayContaining(expectedStyles));
  });

  it('should forward the ref correctly', () => {
    render(<Container ref={mockRef} />);

    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current).toBeInstanceOf(View);
  });
});
