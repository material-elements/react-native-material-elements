import { render as testRenderer, waitFor } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import { Divider, Text, ThemeProvider } from '../src';
import { spacing } from '../src/libraries/themes/v1/sizes';
import { render } from './test-utils';

describe('Divider Component', () => {
  const dividerMockTestId = 'divide-test-id';
  const dividerStartLineTestId = 'divide-start-line-test-id';
  const dividerEndLineTestId = 'divide-end-line-test-id';

  const mockTestLabel = 'test-label';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<Divider />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<Divider ref={mockRef} />);

    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render the children correctly', async () => {
    const { toJSON, getByText } = render(
      <Divider ref={mockRef}>
        <Text>{mockTestLabel}</Text>
      </Divider>,
    );

    const text = getByText(mockTestLabel);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    expect(text).toBeTruthy();
  });

  it('should add the start spacing when passed the variant (startSpacing)', () => {
    const { getByTestId } = render(<Divider ref={mockRef} testID={dividerMockTestId} variant="startSpacing" />);

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingLeft: spacing.lg }));
  });

  it('should add the end spacing when passed the variant (endSpacing)', () => {
    const { getByTestId } = render(<Divider ref={mockRef} testID={dividerMockTestId} variant="endSpacing" />);

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingRight: spacing.lg }));
  });

  it('should add the start and end spacing when passed the variant (middle)', () => {
    const { getByTestId } = render(<Divider ref={mockRef} testID={dividerMockTestId} variant="middle" />);

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingHorizontal: spacing.lg }));
  });

  it('should remove the start and end spacing when passed the variant (fullWidth)', () => {
    const { getByTestId } = render(<Divider ref={mockRef} testID={dividerMockTestId} variant="fullWidth" />);

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).not.toHaveProperty('paddingHorizontal');
    expect(divider.props.style).not.toHaveProperty('paddingRight');
    expect(divider.props.style).not.toHaveProperty('paddingLeft');
  });

  it('should change the border of the divider component when passed the borderColor prop', () => {
    const { getByTestId } = render(
      <Divider startLineTestId={dividerStartLineTestId} endLineTestId={dividerEndLineTestId} borderColor="red" />,
    );
    const startLine = getByTestId(dividerStartLineTestId);
    const endLine = getByTestId(dividerStartLineTestId);
    expect(startLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red' }));
    expect(endLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red' }));
  });

  it('should change the variant spacing of the divider component when passed the variantSpacing prop', () => {
    const { getByTestId } = render(
      <Divider ref={mockRef} testID={dividerMockTestId} variant="startSpacing" variantSpacing={20} />,
    );

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingLeft: 20 }));
  });

  it('should apply the dynamic style into the start line element', () => {
    const { getByTestId } = render(
      <Divider startLineTestId={dividerStartLineTestId} startLineStyles={{ backgroundColor: 'red' }} />,
    );

    const startLine = getByTestId(dividerStartLineTestId);
    expect(startLine.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should apply the dynamic style into the end line element', () => {
    const { getByTestId } = render(<Divider endLineTestId={dividerEndLineTestId} endLineStyles={{ backgroundColor: 'red' }} />);

    const endLine = getByTestId(dividerEndLineTestId);
    expect(endLine.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should apply the root startLineStyles styles correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider
        components={{
          dividerProps: {
            startLineStyles: { borderColor: 'red' },
          },
        }}>
        <Divider startLineTestId={dividerStartLineTestId} />
      </ThemeProvider>,
    );
    const startLine = getByTestId(dividerStartLineTestId);
    expect(startLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red' }));
  });

  it('should combine the root startLineStyles styles and component startLineStyles correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider
        components={{
          dividerProps: {
            startLineStyles: { borderColor: 'red' },
          },
        }}>
        <Divider startLineTestId={dividerStartLineTestId} startLineStyles={{ borderWidth: 2 }} />
      </ThemeProvider>,
    );
    const startLine = getByTestId(dividerStartLineTestId);
    expect(startLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red', borderWidth: 2 }));
  });

  it('should apply the root endLineStyles styles correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ dividerProps: { endLineStyles: { borderColor: 'red' } } }}>
        <Divider endLineTestId={dividerEndLineTestId} />
      </ThemeProvider>,
    );

    const endLine = getByTestId(dividerEndLineTestId);
    expect(endLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red' }));
  });

  it('should combine the root endLineStyles styles and component endLineStyles correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ dividerProps: { endLineStyles: { borderColor: 'red' } } }}>
        <Divider endLineTestId={dividerEndLineTestId} endLineStyles={{ borderWidth: 2 }} />
      </ThemeProvider>,
    );

    const endLine = getByTestId(dividerEndLineTestId);
    expect(endLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red', borderWidth: 2 }));
  });

  it('should apply the root borderColor correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ dividerProps: { borderColor: 'red' } }}>
        <Divider startLineTestId={dividerStartLineTestId} endLineTestId={dividerEndLineTestId} />
      </ThemeProvider>,
    );
    const startLine = getByTestId(dividerStartLineTestId);
    const endLine = getByTestId(dividerStartLineTestId);
    expect(startLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red' }));
    expect(endLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red' }));
  });

  it('should override the root borderColor correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ dividerProps: { borderColor: 'red' } }}>
        <Divider startLineTestId={dividerStartLineTestId} endLineTestId={dividerEndLineTestId} borderColor={'green'} />
      </ThemeProvider>,
    );
    const startLine = getByTestId(dividerStartLineTestId);
    const endLine = getByTestId(dividerStartLineTestId);
    expect(startLine.props.style).toEqual(expect.objectContaining({ borderColor: 'green' }));
    expect(endLine.props.style).toEqual(expect.objectContaining({ borderColor: 'green' }));
  });

  it('should apply the root variant spacing of the divider component correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ dividerProps: { variantSpacing: 10 } }}>
        <Divider ref={mockRef} testID={dividerMockTestId} variant="startSpacing" />
      </ThemeProvider>,
    );

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingLeft: 10 }));
  });

  it('should override the root variant spacing of the divider component correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ dividerProps: { variantSpacing: 10 } }}>
        <Divider ref={mockRef} testID={dividerMockTestId} variant="startSpacing" variantSpacing={20} />
      </ThemeProvider>,
    );

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingLeft: 20 }));
  });

  it('should apply the root style of divider component correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ dividerProps: { style: { borderWidth: 2 } } }}>
        <Divider testID={dividerMockTestId} />
      </ThemeProvider>,
    );
    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ borderWidth: 2 }));
  });

  it('should combine the root style of divider component and component styles correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ dividerProps: { style: { borderWidth: 2 } } }}>
        <Divider testID={dividerMockTestId} style={{ backgroundColor: 'red' }} />
      </ThemeProvider>,
    );
    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ borderWidth: 2, backgroundColor: 'red' }));
  });
});
