import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Alert, gray, Text, yellow } from '../src';
import { fireEvent, render } from './test-utils';
import * as RN from 'react-native';

describe('Alert', () => {
  const mockStartIcon = <View testID="start-icon-test-id" />;
  const mockEndIcon = <View testID="end-icon-test-id" />;

  const mockOnPress = jest.fn();
  const testId = 'alert-container-test-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAction = (
    <TouchableOpacity testID="action-test-id" onPress={mockOnPress}>
      <Text>Click here</Text>
    </TouchableOpacity>
  );

  it('should render correctly with zero props', () => {
    const { toJSON } = render(<Alert />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render start icon correctly', () => {
    const { getByTestId } = render(<Alert startIcon={mockStartIcon} />);
    const startIconElement = getByTestId('start-icon-test-id');
    expect(startIconElement).toBeDefined();
  });

  it('should render end icon correctly', () => {
    const { getByTestId } = render(<Alert endIcon={mockEndIcon} />);
    const endIconElement = getByTestId('end-icon-test-id');
    expect(endIconElement).toBeDefined();
  });

  it('should render the action component correctly', () => {
    const { getByTestId } = render(<Alert action={mockAction} />);
    const actionButton = getByTestId('action-test-id');
    fireEvent.press(actionButton);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should render the title', () => {
    const { getByText } = render(<Alert title="Hello" />);
    const titleElement = getByText('Hello');
    expect(titleElement).toBeDefined();
  });

  it('should render the subTitle', () => {
    const { getByText } = render(<Alert subTitle="Hello" />);
    const subTitleElement = getByText('Hello');
    expect(subTitleElement).toBeDefined();
  });

  it('should render the ghost variant alert with (light theme)', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    const { getByTestId } = render(<Alert variation="ghost" testID={testId} />);

    const alert = getByTestId(testId);

    const flattenStyles = StyleSheet.flatten(alert.props.style);
    expect(flattenStyles).toEqual(
      expect.objectContaining({ borderRadius: 6, borderColor: gray[300], borderWidth: 0.8, backgroundColor: gray[100] }),
    );
  });

  it('should render the ghost variant alert with (dark theme)', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    const { getByTestId } = render(<Alert variation="ghost" testID={testId} />);

    const alert = getByTestId(testId);

    const flattenStyles = StyleSheet.flatten(alert.props.style);
    expect(flattenStyles).toEqual(
      expect.objectContaining({ borderRadius: 6, borderColor: gray[700], borderWidth: 0.8, backgroundColor: gray[800] }),
    );
  });

  it('should render gray title when variation is ghost, variant is gray and theme mode is light', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    const { getByText } = render(<Alert variation="ghost" variant="gray" subTitle="subTitle" title="title" />);

    const title = getByText('title');
    const subTitle = getByText('subTitle');

    const titleFlattenStyles = StyleSheet.flatten(title.props.style);
    expect(titleFlattenStyles).toEqual(expect.objectContaining({ color: gray[800] }));

    const subTitleFlattenStyles = StyleSheet.flatten(subTitle.props.style);
    expect(subTitleFlattenStyles).toEqual(expect.objectContaining({ color: gray[800] }));
  });

  it('should render light gray title when variation is ghost, variant is gray and theme mode is dark', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    const { getByText } = render(<Alert variation="ghost" variant="gray" subTitle="subTitle" title="title" />);

    const title = getByText('title');
    const subTitle = getByText('subTitle');

    const titleFlattenStyles = StyleSheet.flatten(title.props.style);
    expect(titleFlattenStyles).toEqual(expect.objectContaining({ color: 'white' }));

    const subTitleFlattenStyles = StyleSheet.flatten(subTitle.props.style);
    expect(subTitleFlattenStyles).toEqual(expect.objectContaining({ color: 'white' }));
  });

  it('should render gray title when variation is ghost, variant is lightGray and theme mode is light', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    const { getByText } = render(<Alert variation="ghost" variant="lightGray" subTitle="subTitle" title="title" />);

    const title = getByText('title');
    const subTitle = getByText('subTitle');

    const titleFlattenStyles = StyleSheet.flatten(title.props.style);
    expect(titleFlattenStyles).toEqual(expect.objectContaining({ color: gray[800] }));

    const subTitleFlattenStyles = StyleSheet.flatten(subTitle.props.style);
    expect(subTitleFlattenStyles).toEqual(expect.objectContaining({ color: gray[800] }));
  });

  it('should render light gray title when variation is ghost, variant is lightGray and theme mode is dark', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    const { getByText } = render(<Alert variation="ghost" variant="lightGray" subTitle="subTitle" title="title" />);

    const title = getByText('title');
    const subTitle = getByText('subTitle');

    const titleFlattenStyles = StyleSheet.flatten(title.props.style);
    expect(titleFlattenStyles).toEqual(expect.objectContaining({ color: 'white' }));

    const subTitleFlattenStyles = StyleSheet.flatten(subTitle.props.style);
    expect(subTitleFlattenStyles).toEqual(expect.objectContaining({ color: 'white' }));
  });

  it('should render gray title when variation is ghost, variant is warning and theme mode is light', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    const { getByText } = render(<Alert variation="ghost" variant="warning" subTitle="subTitle" title="title" />);

    const title = getByText('title');
    const subTitle = getByText('subTitle');

    const titleFlattenStyles = StyleSheet.flatten(title.props.style);
    expect(titleFlattenStyles).toEqual(expect.objectContaining({ color: gray[800] }));

    const subTitleFlattenStyles = StyleSheet.flatten(subTitle.props.style);
    expect(subTitleFlattenStyles).toEqual(expect.objectContaining({ color: gray[800] }));
  });

  it('should render yellow title when variation is ghost, variant is warning and theme mode is dark', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    const { getByText, debug } = render(<Alert variation="ghost" variant="warning" subTitle="subTitle" title="title" />);

    const title = getByText('title');
    const subTitle = getByText('subTitle');

    const titleFlattenStyles = StyleSheet.flatten(title.props.style);
    expect(titleFlattenStyles).toEqual(expect.objectContaining({ color: yellow[400] }));

    const subTitleFlattenStyles = StyleSheet.flatten(subTitle.props.style);
    expect(subTitleFlattenStyles).toEqual(expect.objectContaining({ color: yellow[400] }));
  });
});
