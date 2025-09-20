import React from 'react';
import { Text, View } from 'react-native';
import { gray, lightBlue, red, TextField, ThemeProvider } from '../src';
import { fireEvent, render } from './test-utils';
import { render as testRenderer, waitFor } from '@testing-library/react-native';

describe('TextField Component', () => {
  const mockTextFiledTestId = 'text-filed-test-id';
  const mockTextFiledValue = 'text-filed-value';
  const mockTextFiledInputLabelTestId = 'text-filed-input-label-test-id';
  const mockTextFiledPlaceholder = 'text-filed-placeholder';
  const mockTextFieldOutlineTestId = 'text-outline-test-id';
  const mockAdornmentLabel = 'adornment-label';

  const mockRef = React.createRef<View>();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnChangeText = jest.fn();
  const mockOnSubmitEditing = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<TextField />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should render the input value correctly', () => {
    const { getByTestId } = render(<TextField value={mockTextFiledValue} testID={mockTextFiledTestId} />);
    const input = getByTestId(mockTextFiledTestId);
    expect(input.props.value).toBe(mockTextFiledValue);
  });

  it('should forward ref correctly', () => {
    render(<TextField ref={mockRef} testID={mockTextFiledTestId} />);
    expect(mockRef.current).toBeInstanceOf(View);
    expect(mockRef.current).toBeDefined();
  });

  it("should't render the animated placeholder when passed the hide label prop", () => {
    jest.useFakeTimers();
    const { queryByTestId } = render(<TextField hideLabel inputLabelProps={{ testID: mockTextFiledInputLabelTestId }} />);

    expect(queryByTestId(mockTextFiledInputLabelTestId)).toBeNull();
    jest.useRealTimers();
  });

  it('should change the default placeholder when passed the placeholder prop', () => {
    jest.useFakeTimers();
    const { getByPlaceholderText } = render(<TextField hideLabel placeholder={mockTextFiledPlaceholder} />);

    const placeHolderElem = getByPlaceholderText(mockTextFiledPlaceholder);
    expect(placeHolderElem).toBeDefined();
    expect(placeHolderElem.props.placeholder).toEqual(mockTextFiledPlaceholder);
    jest.useRealTimers();
  });

  it('should apply the dynamic sx styles', () => {
    const { getByTestId } = render(
      <TextField outlineContainerTestId={mockTextFieldOutlineTestId} sx={{ bWidth: 10, bColor: 'red' }} />,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });

  it('should apply the dynamic styles', () => {
    const { getByTestId } = render(
      <TextField outlineContainerTestId={mockTextFieldOutlineTestId} style={{ borderWidth: 10, borderColor: 'red' }} />,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });

  it('should render the endAdornment component', () => {
    const { getByText } = render(<TextField endAdornment={<Text>{mockAdornmentLabel}</Text>} />);

    const endAdornment = getByText(mockAdornmentLabel);
    expect(endAdornment).toBeDefined();
  });

  it('should render the startAdornment component', () => {
    const { getByText } = render(<TextField startAdornment={<Text>{mockAdornmentLabel}</Text>} />);

    const startAdornment = getByText(mockAdornmentLabel);
    expect(startAdornment).toBeDefined();
  });

  it('should change the input placeholder color', () => {
    jest.useFakeTimers();
    const { getByPlaceholderText } = render(
      <TextField hideLabel placeholder={mockTextFiledPlaceholder} placeholderTextColor={'red'} />,
    );

    const placeholder = getByPlaceholderText(mockTextFiledPlaceholder);
    expect(placeholder.props.placeholderTextColor).toEqual('red');
    jest.useRealTimers();
  });

  it('should handle the focus event', () => {
    const { getByTestId } = render(<TextField onFocus={mockOnFocus} testID={mockTextFiledTestId} />);

    const textFiled = getByTestId(mockTextFiledTestId);
    fireEvent(textFiled, 'focus');
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle the blur event', () => {
    const { getByTestId } = render(<TextField onBlur={mockOnBlur} testID={mockTextFiledTestId} />);

    const textField = getByTestId(mockTextFiledTestId);
    fireEvent(textField, 'blur');
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('should call onChangeText when text is changed', () => {
    const { getByTestId } = render(<TextField onChangeText={mockOnChangeText} testID={mockTextFiledTestId} />);

    const textField = getByTestId(mockTextFiledTestId);
    const newText = 'Hello, World!';

    fireEvent.changeText(textField, newText);
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
    expect(mockOnChangeText).toHaveBeenCalledWith(newText);
  });

  it('should accept and display the value prop', () => {
    const value = 'Initial value';
    const { getByDisplayValue } = render(<TextField value={value} testID={mockTextFiledTestId} />);

    const textField = getByDisplayValue(value);
    expect(textField).toBeTruthy();
  });

  it('should be disabled when editable is false', () => {
    const { getByTestId } = render(<TextField editable={false} testID={mockTextFiledTestId} />);

    const textField = getByTestId(mockTextFiledTestId);
    expect(textField.props.editable).toBe(false);
  });

  it('should handle returnKeyType prop', () => {
    const returnKeyType = 'done';
    const { getByTestId } = render(<TextField returnKeyType={returnKeyType} testID={mockTextFiledTestId} />);

    const textField = getByTestId(mockTextFiledTestId);
    expect(textField.props.returnKeyType).toBe(returnKeyType);
  });

  it('should handle secureTextEntry prop for password inputs', () => {
    const { getByTestId } = render(<TextField secureTextEntry testID={mockTextFiledTestId} />);

    const textField = getByTestId(mockTextFiledTestId);
    expect(textField.props.secureTextEntry).toBe(true);
  });

  it('should call onSubmitEditing when submit is triggered', () => {
    const { getByTestId } = render(<TextField onSubmitEditing={mockOnSubmitEditing} testID={mockTextFiledTestId} />);

    const textField = getByTestId(mockTextFiledTestId);
    fireEvent(textField, 'submitEditing');
    expect(mockOnSubmitEditing).toHaveBeenCalledTimes(1);
  });

  it('should call onKeyPress when a key is pressed', () => {
    const mockOnKeyPress = jest.fn();
    const { getByTestId } = render(<TextField onKeyPress={mockOnKeyPress} testID={mockTextFiledTestId} />);

    const textField = getByTestId(mockTextFiledTestId);
    fireEvent(textField, 'keyPress', { nativeEvent: { key: 'Enter' } });
    expect(mockOnKeyPress).toHaveBeenCalledTimes(1);
  });

  it('should show the (RED) border color when error prop is passed and input variation is (outlined)', () => {
    const { getByTestId } = render(<TextField variant="outlined" outlineContainerTestId={mockTextFieldOutlineTestId} error />);

    const textFieldOutlined = getByTestId(mockTextFieldOutlineTestId);
    expect(textFieldOutlined.props.style).toEqual(expect.objectContaining({ borderColor: red[500] }));
  });

  it('should show the border (CUSTOM ERROR COLOR) when error prop, error color props is passed and input variation is (outlined)', () => {
    const { getByTestId } = render(
      <TextField errorColor="pink" variant="outlined" outlineContainerTestId={mockTextFieldOutlineTestId} error />,
    );

    const textFieldOutlined = getByTestId(mockTextFieldOutlineTestId);
    expect(textFieldOutlined.props.style).toEqual(expect.objectContaining({ borderColor: 'pink' }));
  });

  it('should show the active border color when text field in the focused state', () => {
    const { getByTestId } = render(
      <TextField onFocus={mockOnFocus} testID={mockTextFiledTestId} outlineContainerTestId={mockTextFieldOutlineTestId} />,
    );

    const textFiled = getByTestId(mockTextFiledTestId);
    const outlined = getByTestId(mockTextFieldOutlineTestId);

    fireEvent(textFiled, 'focus');

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderColor: lightBlue[500] }));
  });

  it('should show the (CUSTOM) active border color when text field in the focused state and activeColor prop is passed', () => {
    const { getByTestId } = render(
      <TextField
        onFocus={mockOnFocus}
        activeColor={'blue'}
        testID={mockTextFiledTestId}
        outlineContainerTestId={mockTextFieldOutlineTestId}
      />,
    );

    const textFiled = getByTestId(mockTextFiledTestId);
    const outlined = getByTestId(mockTextFieldOutlineTestId);

    fireEvent(textFiled, 'focus');

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderColor: 'blue' }));
  });

  it('should change the border radius when passed the square prop', () => {
    const { getByTestId } = render(<TextField outlineContainerTestId={mockTextFieldOutlineTestId} square />);
    const outlined = getByTestId(mockTextFieldOutlineTestId);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderRadius: 0 }));
  });

  it('should apply the opacity when the input is disabled', () => {
    const { getByTestId } = render(<TextField outlineContainerTestId={mockTextFieldOutlineTestId} editable={false} />);

    const outlined = getByTestId(mockTextFieldOutlineTestId);
    expect(outlined.props.style).toEqual(expect.objectContaining({ opacity: 0.6 }));
  });

  it('should remove the opacity when the input is disabled and passed the ignoreOpacityOnNonEditable prop', () => {
    const { getByTestId } = render(
      <TextField outlineContainerTestId={mockTextFieldOutlineTestId} editable={false} ignoreOpacityOnNonEditable />,
    );

    const outlined = getByTestId(mockTextFieldOutlineTestId);
    expect(outlined.props.style).toEqual(expect.objectContaining({ opacity: 1 }));
  });

  it('should added the background color when input variant is (filled)', () => {
    const { getByTestId } = render(<TextField variant="filled" outlineContainerTestId={mockTextFieldOutlineTestId} />);

    const input = getByTestId(mockTextFieldOutlineTestId);
    expect(input.props.style).toEqual(expect.objectContaining({ backgroundColor: gray[500] }));
  });

  it('should render the error border color when input variant is (filled)', () => {
    const { getByTestId } = render(<TextField variant="filled" error outlineContainerTestId={mockTextFieldOutlineTestId} />);
    const input = getByTestId(mockTextFieldOutlineTestId);
    expect(input.props.style).toEqual(
      expect.objectContaining({
        borderColor: red[500],
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomWidth: 1,
      }),
    );
  });

  it('should show the border (CUSTOM ERROR COLOR) when error prop, error color props is passed and input variation is (filled)', () => {
    const { getByTestId } = render(
      <TextField errorColor="pink" variant="filled" outlineContainerTestId={mockTextFieldOutlineTestId} error />,
    );

    const textFieldOutlined = getByTestId(mockTextFieldOutlineTestId);
    expect(textFieldOutlined.props.style).toEqual(expect.objectContaining({ borderColor: 'pink' }));
  });

  it('should show the active border color when text field in the focused state and variant is (filled)', () => {
    const { getByTestId } = render(
      <TextField
        variant="filled"
        onFocus={mockOnFocus}
        testID={mockTextFiledTestId}
        outlineContainerTestId={mockTextFieldOutlineTestId}
      />,
    );

    const textFiled = getByTestId(mockTextFiledTestId);
    const outlined = getByTestId(mockTextFieldOutlineTestId);

    fireEvent(textFiled, 'focus');

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderColor: lightBlue[500] }));
  });

  it('should apply the root styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { style: { borderWidth: 10, borderColor: 'red' } } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} />
      </ThemeProvider>,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });

  it('should combine the root styles and component styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { style: { borderWidth: 10, borderColor: 'red' } } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} style={{ borderRadius: 10 }} />
      </ThemeProvider>,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red', borderRadius: 10 }));
  });

  it('should apply the root active color and show the active border color when text field in the focused state', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { activeColor: 'blue' } }}>
        <TextField onFocus={mockOnFocus} testID={mockTextFiledTestId} outlineContainerTestId={mockTextFieldOutlineTestId} />
      </ThemeProvider>,
    );

    const textFiled = getByTestId(mockTextFiledTestId);
    const outlined = getByTestId(mockTextFieldOutlineTestId);

    fireEvent(textFiled, 'focus');

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderColor: 'blue' }));
  });

  it('should override the root active color and show the active border color when text field in the focused state', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { activeColor: 'blue' } }}>
        <TextField
          onFocus={mockOnFocus}
          testID={mockTextFiledTestId}
          outlineContainerTestId={mockTextFieldOutlineTestId}
          activeColor={'green'}
        />
      </ThemeProvider>,
    );

    const textFiled = getByTestId(mockTextFiledTestId);
    const outlined = getByTestId(mockTextFieldOutlineTestId);

    fireEvent(textFiled, 'focus');

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderColor: 'green' }));
  });

  it('should apply the root error color', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { errorColor: 'green' } }}>
        <TextField variant="outlined" outlineContainerTestId={mockTextFieldOutlineTestId} error />
      </ThemeProvider>,
    );

    const textFieldOutlined = getByTestId(mockTextFieldOutlineTestId);
    expect(textFieldOutlined.props.style).toEqual(expect.objectContaining({ borderColor: 'green' }));
  });

  it('should override the root error color', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { errorColor: 'green' } }}>
        <TextField errorColor={'pink'} variant="outlined" outlineContainerTestId={mockTextFieldOutlineTestId} error />
      </ThemeProvider>,
    );

    const textFieldOutlined = getByTestId(mockTextFieldOutlineTestId);
    expect(textFieldOutlined.props.style).toEqual(expect.objectContaining({ borderColor: 'pink' }));
  });

  it('should apply the root ignoreOpacityOnNonEditable and remove the opacity when the input is disabled', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { ignoreOpacityOnNonEditable: true } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} editable={false} />
      </ThemeProvider>,
    );

    const outlined = getByTestId(mockTextFieldOutlineTestId);
    expect(outlined.props.style).toEqual(expect.objectContaining({ opacity: 1 }));
  });

  it('should override the root ignoreOpacityOnNonEditable', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { ignoreOpacityOnNonEditable: true } }}>
        <TextField
          outlineContainerTestId={mockTextFieldOutlineTestId}
          editable={false}
          ignoreOpacityOnNonEditable={false}
          overrideRootIgnoreOpacity
        />
      </ThemeProvider>,
    );

    const outlined = getByTestId(mockTextFieldOutlineTestId);
    expect(outlined.props.style).toEqual(expect.objectContaining({ opacity: 0.6 }));
  });

  it('should apply the root square prop', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { square: true } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} />
      </ThemeProvider>,
    );
    const outlined = getByTestId(mockTextFieldOutlineTestId);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderRadius: 0 }));
  });

  it('should override the the root square prop', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { square: true } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} square={false} />
      </ThemeProvider>,
    );
    const outlined = getByTestId(mockTextFieldOutlineTestId);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderRadius: 5 }));
  });

  it('should apply the active color when text field in the focused state and text field variation is outlined', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { outlined: { activeColor: 'blue' } } }}>
        <TextField
          variant="outlined"
          onFocus={mockOnFocus}
          testID={mockTextFiledTestId}
          outlineContainerTestId={mockTextFieldOutlineTestId}
        />
      </ThemeProvider>,
    );

    const textFiled = getByTestId(mockTextFiledTestId);
    const outlined = getByTestId(mockTextFieldOutlineTestId);

    fireEvent(textFiled, 'focus');

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderColor: 'blue' }));
  });

  it("should't apply the outlined active color when text field in the focused state and text field variation is filled", () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { outlined: { activeColor: 'blue' } } }}>
        <TextField
          variant="filled"
          onFocus={mockOnFocus}
          testID={mockTextFiledTestId}
          outlineContainerTestId={mockTextFieldOutlineTestId}
        />
      </ThemeProvider>,
    );

    const textFiled = getByTestId(mockTextFiledTestId);
    const outlined = getByTestId(mockTextFieldOutlineTestId);

    fireEvent(textFiled, 'focus');

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(outlined.props.style).not.toEqual(expect.objectContaining({ borderColor: 'blue' }));
  });

  it('should apply the active color when text field in the focused state and text field variation is filled', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { filled: { activeColor: 'blue' } } }}>
        <TextField
          variant="filled"
          onFocus={mockOnFocus}
          testID={mockTextFiledTestId}
          outlineContainerTestId={mockTextFieldOutlineTestId}
        />
      </ThemeProvider>,
    );

    const textFiled = getByTestId(mockTextFiledTestId);
    const outlined = getByTestId(mockTextFieldOutlineTestId);

    fireEvent(textFiled, 'focus');

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(outlined.props.style).toEqual(expect.objectContaining({ borderColor: 'blue' }));
  });

  it("should't apply the filled active color when text field in the focused state and text field variation is outlined", () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { filled: { activeColor: 'blue' } } }}>
        <TextField
          variant="outlined"
          onFocus={mockOnFocus}
          testID={mockTextFiledTestId}
          outlineContainerTestId={mockTextFieldOutlineTestId}
        />
      </ThemeProvider>,
    );

    const textFiled = getByTestId(mockTextFiledTestId);
    const outlined = getByTestId(mockTextFieldOutlineTestId);

    fireEvent(textFiled, 'focus');

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    expect(outlined.props.style).not.toEqual(expect.objectContaining({ borderColor: 'blue' }));
  });

  it('should apply the error color when text field variation is outlined', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { outlined: { errorColor: 'green' } } }}>
        <TextField variant="outlined" outlineContainerTestId={mockTextFieldOutlineTestId} error />
      </ThemeProvider>,
    );

    const textFieldOutlined = getByTestId(mockTextFieldOutlineTestId);
    expect(textFieldOutlined.props.style).toEqual(expect.objectContaining({ borderColor: 'green' }));
  });

  it("should't apply the outlined error color when text field variation is filled", () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { outlined: { errorColor: 'green' } } }}>
        <TextField variant="filled" outlineContainerTestId={mockTextFieldOutlineTestId} error />
      </ThemeProvider>,
    );

    const textFieldOutlined = getByTestId(mockTextFieldOutlineTestId);
    expect(textFieldOutlined.props.style).not.toEqual(expect.objectContaining({ borderColor: 'green' }));
  });

  it('should apply the error color when text field variation is filled', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { filled: { errorColor: 'green' } } }}>
        <TextField variant="filled" outlineContainerTestId={mockTextFieldOutlineTestId} error />
      </ThemeProvider>,
    );

    const textFieldOutlined = getByTestId(mockTextFieldOutlineTestId);
    expect(textFieldOutlined.props.style).toEqual(expect.objectContaining({ borderColor: 'green' }));
  });

  it("should't apply the filled error color when text field variation is outlined", () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { filled: { errorColor: 'green' } } }}>
        <TextField variant="outlined" outlineContainerTestId={mockTextFieldOutlineTestId} error />
      </ThemeProvider>,
    );

    const textFieldOutlined = getByTestId(mockTextFieldOutlineTestId);
    expect(textFieldOutlined.props.style).not.toEqual(expect.objectContaining({ borderColor: 'green' }));
  });

  it('should apply the root text field outlined styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { outlined: { style: { borderWidth: 10, borderColor: 'red' } } } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} />
      </ThemeProvider>,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });

  it('should combine the root text field outlined styles and component styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { outlined: { style: { borderColor: 'red' } } } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} style={{ borderWidth: 10 }} />
      </ThemeProvider>,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });

  it("should't apply the root text field outlined styles into the input field variation", () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { outlined: { style: { borderWidth: 10, borderColor: 'red' } } } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} variant="filled" />
      </ThemeProvider>,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).not.toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });

  it('should apply the root input field styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { filled: { style: { borderWidth: 10, borderColor: 'red' } } } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} variant="filled" />
      </ThemeProvider>,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });

  it('should combine the root input filed styles and component styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { filled: { style: { borderColor: 'red' } } } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} style={{ borderWidth: 10 }} variant="filled" />
      </ThemeProvider>,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });

  it("should't apply the root input filled styles into the input outlined variation", () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ textFieldProps: { filled: { style: { borderWidth: 10, borderColor: 'red' } } } }}>
        <TextField outlineContainerTestId={mockTextFieldOutlineTestId} variant="outlined" />
      </ThemeProvider>,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).not.toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });
});
