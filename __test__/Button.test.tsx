import { render as testRenderer, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, green, lightBlue, primary, red, secondary, ThemeProvider, yellow } from '../src';
import { fireEvent, render } from './test-utils';

describe('Button', () => {
  const mockButtonTestId = 'mock-button-test-id';
  const mockButtonRef = React.createRef<View>();
  const mockLabel = 'mock-label';

  const mockOnLayout = jest.fn();
  const mockOnPress = jest.fn();
  const mockOnLongPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<Button />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should render correctly with inner component', async () => {
    const { toJSON } = render(
      <Button>
        <Text />
      </Button>,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<Button ref={mockButtonRef} testID={mockButtonTestId} />);
    expect(mockButtonRef.current).not.toBeNull();
    expect(mockButtonRef.current).toBeInstanceOf(View);
  });

  it('should render the label correctly', () => {
    const { getByText } = render(<Button label={mockLabel} testID={mockButtonTestId} />);
    const labelText = getByText(mockLabel);
    expect(labelText).not.toBeNull();
    expect(labelText).toBeDefined();
  });

  it('should customize the label style correctly', () => {
    const { getByText } = render(<Button label={mockLabel} labelStyles={{ color: 'red' }} testID={mockButtonTestId} />);
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'red' });
  });

  it('should change the color of the label', () => {
    const { getByText } = render(<Button label={mockLabel} labelColor="red" testID={mockButtonTestId} />);
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'red' });
  });

  it('should apply the border radius', () => {
    const { getByTestId } = render(<Button square={false} testID={mockButtonTestId} />);
    const button = getByTestId(mockButtonTestId);
    expect(button.props.style).toEqual(expect.objectContaining({ borderRadius: 8 }));
  });

  it('should not apply the border in default square prop', () => {
    const { getByTestId } = render(<Button square testID={mockButtonTestId} />);
    const button = getByTestId(mockButtonTestId);
    expect(button.props.style).toEqual(expect.objectContaining({ borderRadius: 0 }));
  });

  it('should not apply the border in default variation', () => {
    const { getByTestId } = render(<Button square testID={mockButtonTestId} />);
    const button = getByTestId(mockButtonTestId);
    expect(button.props.style).toEqual(expect.not.objectContaining({ borderWidth: 1 }));
  });

  it('should apply the border in outlined button variation', () => {
    const { getByTestId } = render(<Button square testID={mockButtonTestId} variation="outlined" />);
    const button = getByTestId(mockButtonTestId);
    expect(button.props.style).toEqual(expect.objectContaining({ borderWidth: 1 }));
  });

  it('should call the onLayout function when onLayout function prop passed', () => {
    const { getByTestId } = render(<Button onLayout={mockOnLayout} testID={mockButtonTestId} />);
    fireEvent(getByTestId(mockButtonTestId), 'layout', { nativeEvent: {} });
    expect(mockOnLayout).toHaveBeenCalledTimes(1);
  });

  it('should not trigger onPress or onLongPress when disabled', () => {
    const { getByTestId } = render(
      <Button testID={mockButtonTestId} onPress={mockOnPress} onLongPress={mockOnLongPress} disabled />,
    );

    fireEvent.press(getByTestId(mockButtonTestId));
    fireEvent(getByTestId(mockButtonTestId), 'longPress');

    expect(mockOnPress).not.toHaveBeenCalled();
    expect(mockOnLongPress).not.toHaveBeenCalled();
  });

  it('should change the button border color, label color into (RED) when the button variation is outlined and buttonColor is error', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="outlined" buttonColor="error" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.objectContaining({ borderColor: red[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: red[500] }));
  });

  it('should change the button border color, label color into (BLUE) when the button variation is outlined and buttonColor is info', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="outlined" buttonColor="info" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.objectContaining({ borderColor: lightBlue[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: lightBlue[500] }));
  });

  it('should change the button border color, label color into (PRIMARY) when the button variation is outlined and buttonColor is primary', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="outlined" buttonColor="primary" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.objectContaining({ borderColor: primary[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: primary[500] }));
  });

  it('should change the button border color, label color into (SECONDARY) when the button variation is outlined and buttonColor is secondary', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="outlined" buttonColor="secondary" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.objectContaining({ borderColor: secondary[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: secondary[500] }));
  });

  it('should change the button border color, label color into (GREEN) when the button variation is outlined and buttonColor is success', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="outlined" buttonColor="success" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.objectContaining({ borderColor: green[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: green[500] }));
  });

  it('should change the button border color, label color into (YELLOW) when the button variation is outlined and buttonColor is warning', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="outlined" buttonColor="warning" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.objectContaining({ borderColor: yellow[500] }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: yellow[500] }));
  });

  it('should change the label color into (RED) when the button variation is text and buttonColor is error', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="text" buttonColor="error" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.not.objectContaining({ borderWidth: 1 }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: red[500] }));
  });

  it('should change the label color into (BLUE) when the button variation is text and buttonColor is info', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="text" buttonColor="info" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.not.objectContaining({ borderWidth: 1 }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: lightBlue[500] }));
  });

  it('should change the label color into (PRIMARY) when the button variation is text and buttonColor is primary', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="text" buttonColor="primary" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.not.objectContaining({ borderWidth: 1 }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: primary[500] }));
  });

  it('should change the label color into (SECONDARY) when the button variation is text and buttonColor is secondary', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="text" buttonColor="secondary" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.not.objectContaining({ borderWidth: 1 }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: secondary[500] }));
  });

  it('should change the label color into (GREEN) when the button variation is text and buttonColor is success', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="text" buttonColor="success" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.not.objectContaining({ borderWidth: 1 }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: green[500] }));
  });

  it('should change the label color into (YELLOW) when the button variation is text and buttonColor is warning', () => {
    const { getByTestId, getByText } = render(
      <Button testID={mockButtonTestId} label={mockLabel} variation="text" buttonColor="warning" />,
    );
    const button = getByTestId(mockButtonTestId);
    const label = getByText(mockLabel);
    expect(button.props.style).toEqual(expect.not.objectContaining({ borderWidth: 1 }));
    expect(label.props.style).toEqual(expect.objectContaining({ color: yellow[500] }));
  });

  it('should apply the root label style correctly', () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            labelStyles: { color: 'green' },
          },
        }}>
        <Button label={mockLabel} testID={mockButtonTestId} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'green' });
  });

  it('should combine the root label style and component styles correctly', () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            labelStyles: { color: 'green' },
          },
        }}>
        <Button label={mockLabel} labelStyles={{ fontWeight: 100 }} testID={mockButtonTestId} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'green', fontWeight: 100 });
  });

  it('should apply the root square props correctly', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ buttonProps: { square: true } }}>
        <Button testID={mockButtonTestId} />
      </ThemeProvider>,
    );
    const button = getByTestId(mockButtonTestId);
    expect(button.props.style).toEqual(expect.objectContaining({ borderRadius: 0 }));
  });

  it('should override the root square prop', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ buttonProps: { square: true } }}>
        <Button testID={mockButtonTestId} square={false} overrideRootSquareConfig />
      </ThemeProvider>,
    );
    const button = getByTestId(mockButtonTestId);
    expect(button.props.style).toEqual(expect.objectContaining({ borderRadius: 8 }));
  });

  it('should apply the root label color correctly', () => {
    const { getByText } = testRenderer(
      <ThemeProvider components={{ buttonProps: { labelColor: 'green' } }}>
        <Button label={mockLabel} testID={mockButtonTestId} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'green' });
  });

  it('should override the root label color', () => {
    const { getByText } = testRenderer(
      <ThemeProvider components={{ buttonProps: { labelColor: 'green' } }}>
        <Button label={mockLabel} testID={mockButtonTestId} labelColor={'pink'} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'pink' });
  });

  it('should apply the contained button label styles', () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            contained: {
              labelStyles: { color: 'red', fontWeight: 100 },
            },
          },
        }}>
        <Button variation="contained" label={mockLabel} testID={mockButtonTestId} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'red', fontWeight: 100 });
  });

  it("should't apply the contained button label styles into the outlined button variant", () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            contained: {
              labelStyles: { color: 'red', fontWeight: 100 },
            },
          },
        }}>
        <Button variation="outlined" label={mockLabel} testID={mockButtonTestId} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).not.toEqual({ color: 'red', fontWeight: 100 });
  });

  it('should combine the contained button label root and component styles', () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            contained: {
              labelStyles: { color: 'red' },
            },
          },
        }}>
        <Button variation="contained" label={mockLabel} testID={mockButtonTestId} labelStyles={{ fontWeight: 100 }} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'red', fontWeight: 100 });
  });

  it('should apply the outlined button label styles', () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            outlined: {
              labelStyles: { color: 'red', fontWeight: 100 },
            },
          },
        }}>
        <Button variation="outlined" label={mockLabel} testID={mockButtonTestId} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'red', fontWeight: 100 });
  });

  it('should combine the outlined button label root and component styles', () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            outlined: {
              labelStyles: { color: 'red' },
            },
          },
        }}>
        <Button variation="outlined" label={mockLabel} testID={mockButtonTestId} labelStyles={{ fontWeight: 100 }} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'red', fontWeight: 100 });
  });

  it("should't apply the outlined button label styles into the contained button variant", () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            outlined: {
              labelStyles: { color: 'red', fontWeight: 100 },
            },
          },
        }}>
        <Button variation="contained" label={mockLabel} testID={mockButtonTestId} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).not.toEqual({ color: 'red', fontWeight: 100 });
  });

  it('should apply the text button label styles', () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            text: {
              labelStyles: { color: 'red', fontWeight: 100 },
            },
          },
        }}>
        <Button variation="text" label={mockLabel} testID={mockButtonTestId} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'red', fontWeight: 100 });
  });

  it('should combine the text button label root and component styles', () => {
    const { getByText } = testRenderer(
      <ThemeProvider
        components={{
          buttonProps: {
            text: {
              labelStyles: { color: 'red' },
            },
          },
        }}>
        <Button variation="text" label={mockLabel} testID={mockButtonTestId} labelStyles={{ fontWeight: 100 }} />
      </ThemeProvider>,
    );
    const labelText = getByText(mockLabel);
    expect(labelText.props.style).toEqual({ color: 'red', fontWeight: 100 });
  });
});
