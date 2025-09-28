import * as RN from 'react-native';
import { DropDown, DropDownListContainer, gray, Text } from '../src';
import { fireEvent, render, waitFor } from './test-utils';

const mockData = [
  { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'First Item' },
  { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'Second Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Third Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29d12', title: 'Four Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29415', title: 'Five Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29419', title: 'Six Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29412', title: 'Seven Item' },
];

describe('DropDown Component', () => {
  const mockInputWrapperTouchTestId = 'input-wrapper-touch-test-id';
  const mockInputTestId = 'input-test-id';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<DropDown data={mockData} />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should render the inputStartAdornment component correctly', () => {
    const label = 'inputStartAdornmentComponent';
    const { getByText } = render(<DropDown inputStartAdornment={<Text>{label}</Text>} data={mockData} />);
    const inputStartAdornment = getByText(label);
    expect(inputStartAdornment).toBeDefined();
  });

  it('should render the inputEndAdornment component correctly', () => {
    const label = 'inputEndAdornmentComponent';
    const { getByText } = render(<DropDown inputEndAdornment={<Text>{label}</Text>} data={mockData} />);
    const inputEndAdornment = getByText(label);
    expect(inputEndAdornment).toBeDefined();
  });

  it('should trigger the onDropDownClicked when clicking on the input', () => {
    const mockOnDropDownClicked = jest.fn();

    const { getByTestId } = render(
      <DropDown
        data={mockData}
        inputWrapperTouchableOpacityTestId={mockInputWrapperTouchTestId}
        onDropDownClicked={mockOnDropDownClicked}
      />,
    );

    const wrapper = getByTestId(mockInputWrapperTouchTestId);
    fireEvent.press(wrapper);
    expect(mockOnDropDownClicked).toHaveBeenCalled();
    expect(mockOnDropDownClicked).toHaveBeenCalledTimes(1);
  });

  it('should render the input component', () => {
    const { getByTestId } = render(<DropDown data={mockData} dropDownInputTestId={mockInputTestId} />);

    const input = getByTestId(mockInputTestId);
    expect(input).toBeDefined();
  });

  it('should render icon input component when variation prop passed as icon', () => {
    const { getByTestId } = render(<DropDown data={mockData} variation="icon" dropDownInputTestId={mockInputTestId} />);

    const input = getByTestId(mockInputTestId);
    expect(input).toBeDefined();
  });

  it('should show empty value when input component mount', () => {
    const { getByTestId } = render(<DropDown data={mockData} variation="icon" dropDownInputTestId={mockInputTestId} />);

    const input = getByTestId(mockInputTestId);
    expect(input.props.value).toEqual('');
  });

  it('should not render any input component when invalid variation prop passed', () => {
    const { queryByTestId } = render(
      <DropDown data={mockData} variation={'unknown' as any} dropDownInputTestId={mockInputTestId} />,
    );

    const input = queryByTestId(mockInputTestId);
    expect(input).toBeNull();
  });

  it('should show the selected list item title', () => {
    const { getByTestId } = render(
      <DropDown
        data={[{ id: '1', title: 'first_item' }]}
        selectedListItems={[{ id: '1' }]}
        variation="icon"
        dropDownInputTestId={mockInputTestId}
      />,
    );

    const input = getByTestId(mockInputTestId);

    expect(input.props.value).toEqual('first_item');
  });

  it('should show the multiselect message', () => {
    const { getByTestId } = render(
      <DropDown
        data={[{ id: '1', title: 'first_item' }]}
        selectedListItems={[{ id: '1' }]}
        variation="icon"
        multiselect
        dropDownInputTestId={mockInputTestId}
      />,
    );

    const input = getByTestId(mockInputTestId);

    expect(input.props.value).toEqual('Selected items 1');
  });
});

describe('DropDownListContainer component', () => {
  const mockListItemTestId = 'mock-list-item-test-id';

  const mockOnItemClickedHandler = jest.fn();
  const mockOnCloseHandler = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render properly with default props', () => {
    const { toJSON } = render(
      <DropDownListContainer
        inputLayoutRectangle={{ x: 0, y: 0, width: 0, height: 0 }}
        dropDownContainerRect={{ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }}
        data={[]}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the list item', () => {
    const { getByTestId } = render(
      <DropDownListContainer
        inputLayoutRectangle={{ x: 0, y: 0, width: 0, height: 0 }}
        dropDownContainerRect={{ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }}
        data={[{ id: '1', title: 'first_item' }]}
        listItemTestId={mockListItemTestId}
      />,
    );

    const listItem = getByTestId(mockListItemTestId);
    expect(listItem).toBeDefined();
  });

  it('should called the onItemClicked when onItemClicked props will passed and user tap on the list item', () => {
    const { getByTestId } = render(
      <DropDownListContainer
        inputLayoutRectangle={{ x: 0, y: 0, width: 0, height: 0 }}
        dropDownContainerRect={{ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }}
        data={[{ id: '1', title: 'first_item' }]}
        onItemClicked={mockOnItemClickedHandler}
        listItemTestId={mockListItemTestId}
      />,
    );

    const listItem = getByTestId(mockListItemTestId);

    fireEvent(listItem, 'press', { nativeEvent: {} });

    expect(mockOnItemClickedHandler).toHaveBeenCalledTimes(1);
    expect(mockOnItemClickedHandler).toHaveBeenCalledWith({ id: '1', title: 'first_item' });
  });

  it('should show the gray[900] color for title text', () => {
    const { getByText } = render(
      <DropDownListContainer
        inputLayoutRectangle={{ x: 0, y: 0, width: 0, height: 0 }}
        dropDownContainerRect={{ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }}
        data={[{ id: '1', title: 'first_item' }]}
        onItemClicked={mockOnItemClickedHandler}
        listItemTestId={mockListItemTestId}
      />,
    );

    const title = getByText('first_item');
    expect(title).toBeDefined();
    expect(title.props.style.color).toEqual(gray[900]);
  });

  it('should show the gray[50] color for title text if item is selected', () => {
    const { getByText } = render(
      <DropDownListContainer
        inputLayoutRectangle={{ x: 0, y: 0, width: 0, height: 0 }}
        dropDownContainerRect={{ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }}
        data={[{ id: '1', title: 'first_item' }]}
        onItemClicked={mockOnItemClickedHandler}
        listItemTestId={mockListItemTestId}
        selectedListItems={[{ id: '1' }]}
        showSelectedItem
      />,
    );

    const title = getByText('first_item');
    expect(title).toBeDefined();
    expect(title.props.style.color).toEqual(gray[50]);
  });

  it('should show the light color of the title text when color scheme is dark', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');

    const { getByText } = render(
      <DropDownListContainer
        inputLayoutRectangle={{ x: 0, y: 0, width: 0, height: 0 }}
        dropDownContainerRect={{ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }}
        data={[{ id: '1', title: 'first_item' }]}
        onItemClicked={mockOnItemClickedHandler}
        listItemTestId={mockListItemTestId}
      />,
    );

    const title = getByText('first_item');
    expect(title).toBeDefined();
    expect(title.props.style.color).toEqual(gray[50]);
  });

  it('should show the listItemEndAdornment item when list items is isSelected', () => {
    const { getByText } = render(
      <DropDownListContainer
        inputLayoutRectangle={{ x: 0, y: 0, width: 0, height: 0 }}
        dropDownContainerRect={{ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }}
        data={[{ id: '1', title: 'first_item' }]}
        selectedListItems={[{ id: '1' }]}
        listItemEndAdornment={<Text>Hello</Text>}
        displaySelectedAdornment
        showSelectedItem
      />,
    );

    const listItemEndAdornment = getByText('Hello');
    expect(listItemEndAdornment).toBeDefined();
  });

  it('should render the search bar component', () => {
    const { toJSON, getByPlaceholderText } = render(
      <DropDownListContainer
        inputLayoutRectangle={{ x: 0, y: 0, width: 0, height: 0 }}
        dropDownContainerRect={{ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }}
        search
        data={mockData}
      />,
    );

    expect(toJSON()).toMatchSnapshot();

    const search = getByPlaceholderText('Search');
    expect(search).toBeDefined();
  });

  it('should call the onClose function when press on item', () => {
    const { getByText } = render(
      <DropDownListContainer
        inputLayoutRectangle={{ x: 0, y: 0, width: 0, height: 0 }}
        dropDownContainerRect={{ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }}
        data={[{ id: '1', title: 'first_item' }]}
        onItemClicked={mockOnItemClickedHandler}
        listItemTestId={mockListItemTestId}
        onClose={mockOnCloseHandler}
      />,
    );

    const title = getByText('first_item');
    fireEvent(title, 'press', { nativeEvent: {} });
    expect(mockOnCloseHandler).toHaveBeenCalled();
    expect(mockOnCloseHandler).toHaveBeenCalledTimes(1);
  });
});
