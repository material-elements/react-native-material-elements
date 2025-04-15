import React from 'react';
import { fireEvent, render, waitFor } from './test-utils';
import { Image, ImageList, ImageListItem, Text } from '../src';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

const mockItemData = [
  { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e' },
  { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d' },
  { img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45' },
  { img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c' },
  { img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8' },
  { img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62' },
  { img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6' },
  { img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f' },
  { img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25' },
  { img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af' },
  { img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1' },
  { img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6' },
];

describe('ImageList Component', () => {
  const mockImageListTestId = 'image-list-test-id';

  const mockRef = React.createRef<ScrollView>();
  const mockOnScroll = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', async () => {
    const { toJSON } = render(<ImageList />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<ImageList ref={mockRef} />);
    expect(mockRef.current).toBeInstanceOf(ScrollView);
    expect(mockRef.current).not.toBeNull();
  });

  it('passes extra props to ScrollView', () => {
    const { getByTestId } = render(<ImageList testID={mockImageListTestId} onScroll={mockOnScroll} />);

    const scrollView = getByTestId(mockImageListTestId);
    fireEvent.scroll(scrollView, { nativeEvent: { contentOffset: { y: 100 } } });

    expect(mockOnScroll).toHaveBeenCalled();
  });

  it('renders correctly with children', () => {
    const { getByText } = render(
      <ImageList>
        <Text>Image 1</Text>
        <Text>Image 2</Text>
      </ImageList>,
    );

    expect(getByText('Image 1')).toBeTruthy();
    expect(getByText('Image 2')).toBeTruthy();
  });

  it('applies styles from props', () => {
    const style = { backgroundColor: 'red' };
    const contentContainerStyle: ViewStyle = { justifyContent: 'center' };

    const { getByTestId } = render(
      <ImageList style={style} contentContainerStyle={contentContainerStyle} testID={mockImageListTestId} />,
    );

    const scrollView = getByTestId(mockImageListTestId);
    expect(scrollView.props.style).toContainEqual(style);
    expect(scrollView.props.contentContainerStyle).toEqual(expect.objectContaining(contentContainerStyle));
  });

  it('handles large numbers of children gracefully', () => {
    const children = Array.from({ length: 100 }, (_, i) => <Text key={i}>Child {i + 1}</Text>);
    const { getByText } = render(<ImageList>{children}</ImageList>);

    expect(getByText('Child 1')).toBeTruthy();
    expect(getByText('Child 100')).toBeTruthy();
  });
});

describe('ImageListItem Component', () => {
  const mockImageListItemTestId = 'image-list-item-test-id';
  const mockListItemWrapperTestId = 'list-item-wrapper-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<ImageListItem index={0} />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<ImageListItem index={0} ref={mockRef} />);
    expect(mockRef.current).toBeInstanceOf(View);
    expect(mockRef.current).not.toBeNull();
  });

  it('should apply the sx property', () => {
    const { getByTestId } = render(<ImageListItem testID={mockImageListItemTestId} index={0} sx={{ bg: 'red' }} />);

    const listItem = getByTestId(mockImageListItemTestId);
    const flattenedStyle = StyleSheet.flatten(listItem.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it('should apply the listWrapperContainerStyles', () => {
    const { getByTestId } = render(
      <ImageListItem
        listWrapperTestId={mockListItemWrapperTestId}
        index={0}
        listWrapperContainerStyles={{ backgroundColor: 'red' }}
      />,
    );

    const listItemWrapper = getByTestId(mockListItemWrapperTestId);
    const flattenedStyle = StyleSheet.flatten(listItemWrapper.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it('should apply (100%) width when items=1', () => {
    const { getByTestId } = render(<ImageListItem testID={mockImageListItemTestId} index={0} items={1} />);
    const listItem = getByTestId(mockImageListItemTestId);
    const flattenedStyle = StyleSheet.flatten(listItem.props.style);
    expect(flattenedStyle.width).toEqual('100%');
  });

  it('should apply (50%) width when items=2', () => {
    const { getByTestId } = render(<ImageListItem testID={mockImageListItemTestId} index={0} items={2} />);
    const listItem = getByTestId(mockImageListItemTestId);
    const flattenedStyle = StyleSheet.flatten(listItem.props.style);
    expect(flattenedStyle.width).toEqual('50%');
  });

  it('should apply (33.33%) width when items=3', () => {
    const { getByTestId } = render(<ImageListItem testID={mockImageListItemTestId} index={0} items={3} />);
    const listItem = getByTestId(mockImageListItemTestId);
    const flattenedStyle = StyleSheet.flatten(listItem.props.style);
    expect(flattenedStyle.width).toEqual('33.333333333333336%');
  });

  it('should apply (25%) width when items=4', () => {
    const { getByTestId } = render(<ImageListItem testID={mockImageListItemTestId} index={0} items={4} />);
    const listItem = getByTestId(mockImageListItemTestId);
    const flattenedStyle = StyleSheet.flatten(listItem.props.style);
    expect(flattenedStyle.width).toEqual('25%');
  });

  it("should't apply the padding left and right when items=1", () => {
    const { getByTestId } = render(<ImageListItem testID={mockImageListItemTestId} index={0} items={1} />);
    const listItem = getByTestId(mockImageListItemTestId);
    const flattenedStyle = StyleSheet.flatten(listItem.props.style);
    expect(flattenedStyle.paddingLeft).toEqual(0);
    expect(flattenedStyle.paddingRight).toEqual(0);
  });

  it('renders ImageList with the correct number of ImageListItem components', () => {
    const { getAllByTestId } = render(
      <ImageList>
        {mockItemData.map((item, index) => (
          <ImageListItem items={2} key={item.img} index={index} testID={mockImageListItemTestId}>
            <Image source={{ uri: `${item.img}` }} height={140} />
          </ImageListItem>
        ))}
      </ImageList>,
    );

    const imageListItems = getAllByTestId(mockImageListItemTestId);
    expect(imageListItems).toHaveLength(mockItemData.length);
  });

  it('should apply the spacing between items', () => {
    const items = 2;

    const { getByTestId } = render(
      <ImageList>
        {mockItemData.map((item, index) => (
          <ImageListItem items={items} key={item.img} index={index} testID={`${mockImageListItemTestId}-${index}`}>
            <Image source={{ uri: `${item.img}` }} height={140} />
          </ImageListItem>
        ))}
      </ImageList>,
    );

    mockItemData.forEach((_, index) => {
      const listItem = getByTestId(`${mockImageListItemTestId}-${index}`);

      const isFirstInRow = (index + 1) % items === 1;
      const isLastInRow = (index + 1) % items === 0;

      const paddingLeft = isFirstInRow ? 0 : 1;
      const paddingRight = isLastInRow ? 0 : 1;
      const flattenedStyle = StyleSheet.flatten(listItem.props.style);
      expect(flattenedStyle.paddingLeft).toEqual(paddingLeft);
      expect(flattenedStyle.paddingRight).toEqual(paddingRight);
    });
  });
});
