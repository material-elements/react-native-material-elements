import { render as testRenderer, waitFor } from '@testing-library/react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Pagination, Text, ThemeProvider } from '../src';
import { fireEvent, render } from './test-utils';

describe('Pagination Component', () => {
  const mockPaginationItemTestId = 'pagination-item-test-id';
  const mockPaginationTestId = 'pagination-test-id';
  const mockDotContainerTestId = 'dot-container-test-id';

  const mockRef = React.createRef<View>();
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<Pagination count={10} />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<Pagination count={10} ref={mockRef} />);

    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should call the onPageChange function when clicked on the pagination item', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(
      <Pagination count={10} onPageChange={mockOnPageChange} paginationItemProps={{ testID: mockPaginationItemTestId }} />,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    fireEvent.press(firstItem, { nativeEvent: {} });
    expect(mockOnPageChange).toHaveBeenCalled();
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);

    const SecondItem = getByTestId(`${mockPaginationItemTestId}-2`);
    fireEvent.press(SecondItem, { nativeEvent: {} });
    expect(mockOnPageChange).toHaveBeenCalled();
    expect(mockOnPageChange).toHaveBeenCalledTimes(2);

    const ThirdItem = getByTestId(`${mockPaginationItemTestId}-3`);
    fireEvent.press(ThirdItem, { nativeEvent: {} });
    expect(mockOnPageChange).toHaveBeenCalled();
    expect(mockOnPageChange).toHaveBeenCalledTimes(3);
  });

  it('should apply the dot container styles', () => {
    const { getByTestId } = render(
      <Pagination count={10} dotContainerProps={{ style: { backgroundColor: 'red' }, testID: mockDotContainerTestId }} />,
    );

    const dotContainer = getByTestId(mockDotContainerTestId);
    const flattenedStyle = StyleSheet.flatten(dotContainer.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it("should't call the onPageChange function when clicked on the pagination item", () => {
    const { getByTestId } = render(
      <Pagination
        count={10}
        disabled
        onPageChange={mockOnPageChange}
        paginationItemProps={{ testID: mockPaginationItemTestId }}
      />,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    fireEvent.press(firstItem, { nativeEvent: {} });
    expect(mockOnPageChange).not.toHaveBeenCalled();
    expect(mockOnPageChange).not.toHaveBeenCalledTimes(1);
  });

  it('should render the custom renderItem', () => {
    const { getAllByText } = render(<Pagination count={10} renderItem={<Text>Mock</Text>} />);
    const text = getAllByText('Mock');
    expect(text).toBeDefined();
  });

  it('should change the pagination item shape when passed the itemShape (rounded)', () => {
    const { getByTestId } = render(
      <Pagination count={10} itemShape="rounded" paginationItemProps={{ testID: mockPaginationItemTestId }} />,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    expect(firstItem.props.style).toEqual(expect.objectContaining({ borderRadius: 5 }));
  });

  it('should change the pagination item shape when passed the itemShape (circular)', () => {
    const { getByTestId } = render(
      <Pagination count={10} itemShape="circular" paginationItemProps={{ testID: mockPaginationItemTestId }} />,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    expect(firstItem.props.style).toEqual(expect.objectContaining({ borderRadius: 100 }));
  });

  it('should apply the root pagination item shape when prop', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider
        components={{
          paginationProps: {
            itemShape: 'rounded',
          },
        }}>
        <Pagination count={10} paginationItemProps={{ testID: mockPaginationItemTestId }} />
      </ThemeProvider>,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    expect(firstItem.props.style).toEqual(expect.objectContaining({ borderRadius: 5 }));
  });

  it('should override the root pagination item shape prop', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider
        components={{
          paginationProps: {
            itemShape: 'rounded',
          },
        }}>
        <Pagination count={10} itemShape="circular" paginationItemProps={{ testID: mockPaginationItemTestId }} />
      </ThemeProvider>,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    expect(firstItem.props.style).toEqual(expect.objectContaining({ borderRadius: 100 }));
  });

  it('should apply the root styles config', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ paginationProps: { style: { backgroundColor: 'red' } } }}>
        <Pagination count={10} testID={mockPaginationTestId} />
      </ThemeProvider>,
    );
    const pagination = getByTestId(mockPaginationTestId);
    const flattenedStyle = StyleSheet.flatten(pagination.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
  });

  it('should combine the root styles and component styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ paginationProps: { style: { backgroundColor: 'red' } } }}>
        <Pagination count={10} testID={mockPaginationTestId} style={{ borderWidth: 2 }} />
      </ThemeProvider>,
    );
    const pagination = getByTestId(mockPaginationTestId);
    const flattenedStyle = StyleSheet.flatten(pagination.props.style);
    expect(flattenedStyle.backgroundColor).toEqual('red');
    expect(flattenedStyle.borderWidth).toEqual(2);
  });
});
