import React from 'react';
import { View } from 'react-native';
import { Grid, GridSize } from '../src';
import { render, waitFor } from './test-utils';

describe('Grid component', () => {
  const mockGridTestId = 'grid-test-id';

  const totalColumns = 12;

  const mockRef = React.createRef<View>();

  const calculateWidth = (size: GridSize) => `${(size / totalColumns) * 100}%`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<Grid container />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<Grid ref={mockRef} container />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should change the width of the grid component when passed the width prop', () => {
    const { getByTestId } = render(<Grid container width={100} testID={mockGridTestId} />);
    const grid = getByTestId(mockGridTestId);
    expect(grid.props.style).toEqual(expect.objectContaining({ width: 100 }));
  });

  it('should render with full width', () => {
    const { getByTestId } = render(<Grid container testID={mockGridTestId} />);
    const grid = getByTestId(mockGridTestId);
    expect(grid.props.style).toEqual(expect.objectContaining({ width: '100%' }));
  });

  it('should apply the sx styles correctly', () => {
    const { getByTestId } = render(<Grid container sx={{ bg: 'red' }} testID={mockGridTestId} />);
    const grid = getByTestId(mockGridTestId);
    expect(grid.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should apply the style correctly', () => {
    const { getByTestId } = render(<Grid container style={{ backgroundColor: 'red' }} testID={mockGridTestId} />);
    const grid = getByTestId(mockGridTestId);
    expect(grid.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should auto adjust the width based on the size prop', () => {
    const { getByTestId } = render(
      <Grid container>
        <Grid item testID={`${mockGridTestId}-item-1`} />
        <Grid item testID={`${mockGridTestId}-item-2`} />
        <Grid item testID={`${mockGridTestId}-item-3`} />
      </Grid>,
    );

    const gridItem1 = getByTestId(`${mockGridTestId}-item-1`);
    expect(gridItem1.props.style).toEqual(expect.objectContaining({ width: calculateWidth(1) }));

    const gridItem2 = getByTestId(`${mockGridTestId}-item-2`);
    expect(gridItem2.props.style).toEqual(expect.objectContaining({ width: calculateWidth(1) }));

    const gridItem3 = getByTestId(`${mockGridTestId}-item-3`);
    expect(gridItem3.props.style).toEqual(expect.objectContaining({ width: calculateWidth(1) }));
  });

  it("should't calculate the width if size is less then 0 or 0", () => {
    const { getByTestId } = render(
      <Grid container>
        <Grid item size={0 as any} testID={`${mockGridTestId}-item-1`} />
        <Grid item size={-1 as any} testID={`${mockGridTestId}-item-2`} />
        <Grid item size={-100 as any} testID={`${mockGridTestId}-item-3`} />
      </Grid>,
    );

    const gridItem1 = getByTestId(`${mockGridTestId}-item-1`);
    expect(gridItem1.props.style).toEqual(expect.objectContaining({ width: 'auto' }));

    const gridItem2 = getByTestId(`${mockGridTestId}-item-2`);
    expect(gridItem2.props.style).toEqual(expect.objectContaining({ width: 'auto' }));

    const gridItem3 = getByTestId(`${mockGridTestId}-item-3`);
    expect(gridItem3.props.style).toEqual(expect.objectContaining({ width: 'auto' }));
  });

  it('should auto calculated grid item width if size prop is diff for each grid item', () => {
    const { getByTestId } = render(
      <Grid container>
        <Grid size={2} item testID={`${mockGridTestId}-item-1`} />
        <Grid size={10} item testID={`${mockGridTestId}-item-2`} />
        <Grid size={2} item testID={`${mockGridTestId}-item-3`} />
      </Grid>,
    );

    const gridItem1 = getByTestId(`${mockGridTestId}-item-1`);
    expect(gridItem1.props.style).toEqual(expect.objectContaining({ width: calculateWidth(2) }));

    const gridItem2 = getByTestId(`${mockGridTestId}-item-2`);
    expect(gridItem2.props.style).toEqual(expect.objectContaining({ width: calculateWidth(10) }));

    const gridItem3 = getByTestId(`${mockGridTestId}-item-3`);
    expect(gridItem3.props.style).toEqual(expect.objectContaining({ width: calculateWidth(2) }));
  });

  it('should apply the spacing between grid item when spacing prop passed (first item will not add the left spacing and last item will not add the right spacing)', () => {
    const spacing = 10;
    const halfSpacing = spacing / 2;

    const { getByTestId } = render(
      <Grid container spacing={spacing}>
        <Grid size={1} item testID={`${mockGridTestId}-item-1`} />
        <Grid size={10} item testID={`${mockGridTestId}-item-2`} />
        <Grid size={1} item testID={`${mockGridTestId}-item-3`} />

        <Grid size={2} item testID={`${mockGridTestId}-item-4`} />
        <Grid size={8} item testID={`${mockGridTestId}-item-5`} />
        <Grid size={2} item testID={`${mockGridTestId}-item-6`} />
      </Grid>,
    );

    const gridItem1 = getByTestId(`${mockGridTestId}-item-1`);
    expect(gridItem1.props.style).not.toHaveProperty('paddingLeft');
    expect(gridItem1.props.style).toEqual(expect.objectContaining({ paddingRight: halfSpacing }));

    const gridItem2 = getByTestId(`${mockGridTestId}-item-2`);
    expect(gridItem2.props.style).toEqual(expect.objectContaining({ paddingLeft: halfSpacing }));
    expect(gridItem2.props.style).toEqual(expect.objectContaining({ paddingRight: halfSpacing }));

    const gridItem3 = getByTestId(`${mockGridTestId}-item-3`);
    expect(gridItem3.props.style).toEqual(expect.objectContaining({ paddingLeft: halfSpacing }));
    expect(gridItem3.props.style).not.toHaveProperty('paddingRight');

    const gridItem4 = getByTestId(`${mockGridTestId}-item-4`);
    expect(gridItem4.props.style).not.toHaveProperty('paddingLeft');
    expect(gridItem4.props.style).toEqual(expect.objectContaining({ paddingRight: halfSpacing }));
    expect(gridItem4.props.style).toEqual(expect.objectContaining({ marginTop: spacing }));

    const gridItem5 = getByTestId(`${mockGridTestId}-item-5`);
    expect(gridItem5.props.style).toEqual(expect.objectContaining({ paddingLeft: halfSpacing }));
    expect(gridItem5.props.style).toEqual(expect.objectContaining({ paddingRight: halfSpacing }));
    expect(gridItem5.props.style).toEqual(expect.objectContaining({ marginTop: spacing }));

    const gridItem6 = getByTestId(`${mockGridTestId}-item-6`);
    expect(gridItem6.props.style).toEqual(expect.objectContaining({ paddingLeft: halfSpacing }));
    expect(gridItem6.props.style).toEqual(expect.objectContaining({ marginTop: spacing }));
    expect(gridItem6.props.style).not.toHaveProperty('paddingRight');
  });

  it('should apply the horizontal spacing between grid item when columnSpacing prop passed (first item will not add the left spacing and last item will not add the right spacing)', () => {
    const spacing = 10;
    const halfSpacing = spacing / 2;

    const { getByTestId } = render(
      <Grid container columnSpacing={spacing}>
        <Grid size={1} item testID={`${mockGridTestId}-item-1`} />
        <Grid size={10} item testID={`${mockGridTestId}-item-2`} />
        <Grid size={1} item testID={`${mockGridTestId}-item-3`} />

        <Grid size={2} item testID={`${mockGridTestId}-item-4`} />
        <Grid size={8} item testID={`${mockGridTestId}-item-5`} />
        <Grid size={2} item testID={`${mockGridTestId}-item-6`} />
      </Grid>,
    );

    const gridItem1 = getByTestId(`${mockGridTestId}-item-1`);
    expect(gridItem1.props.style).not.toHaveProperty('paddingLeft');
    expect(gridItem1.props.style).toEqual(expect.objectContaining({ paddingRight: halfSpacing }));

    const gridItem2 = getByTestId(`${mockGridTestId}-item-2`);
    expect(gridItem2.props.style).toEqual(expect.objectContaining({ paddingLeft: halfSpacing }));
    expect(gridItem2.props.style).toEqual(expect.objectContaining({ paddingRight: halfSpacing }));

    const gridItem3 = getByTestId(`${mockGridTestId}-item-3`);
    expect(gridItem3.props.style).toEqual(expect.objectContaining({ paddingLeft: halfSpacing }));
    expect(gridItem3.props.style).not.toHaveProperty('paddingRight');

    const gridItem4 = getByTestId(`${mockGridTestId}-item-4`);
    expect(gridItem4.props.style).not.toHaveProperty('paddingLeft');
    expect(gridItem4.props.style).toEqual(expect.objectContaining({ paddingRight: halfSpacing }));

    const gridItem5 = getByTestId(`${mockGridTestId}-item-5`);
    expect(gridItem5.props.style).toEqual(expect.objectContaining({ paddingLeft: halfSpacing }));
    expect(gridItem5.props.style).toEqual(expect.objectContaining({ paddingRight: halfSpacing }));

    const gridItem6 = getByTestId(`${mockGridTestId}-item-6`);
    expect(gridItem6.props.style).toEqual(expect.objectContaining({ paddingLeft: halfSpacing }));
    expect(gridItem6.props.style).not.toHaveProperty('paddingRight');
  });

  it('should apply the vertical spacing between grid item when rowSpacing prop passed (first item will not add the left spacing and last item will not add the right spacing)', () => {
    const spacing = 10;

    const { getByTestId } = render(
      <Grid container rowSpacing={spacing}>
        <Grid size={1} item testID={`${mockGridTestId}-item-1`} />
        <Grid size={10} item testID={`${mockGridTestId}-item-2`} />
        <Grid size={1} item testID={`${mockGridTestId}-item-3`} />

        <Grid size={2} item testID={`${mockGridTestId}-item-4`} />
        <Grid size={8} item testID={`${mockGridTestId}-item-5`} />
        <Grid size={2} item testID={`${mockGridTestId}-item-6`} />
      </Grid>,
    );

    const gridItem1 = getByTestId(`${mockGridTestId}-item-1`);
    expect(gridItem1.props.style).not.toHaveProperty('paddingRight');

    const gridItem2 = getByTestId(`${mockGridTestId}-item-2`);
    expect(gridItem2.props.style).not.toHaveProperty('paddingLeft');
    expect(gridItem2.props.style).not.toHaveProperty('paddingRight');

    const gridItem3 = getByTestId(`${mockGridTestId}-item-3`);
    expect(gridItem3.props.style).not.toHaveProperty('paddingRight');

    const gridItem4 = getByTestId(`${mockGridTestId}-item-4`);
    expect(gridItem4.props.style).not.toHaveProperty('paddingLeft');
    expect(gridItem4.props.style).toEqual(expect.objectContaining({ marginTop: spacing }));

    const gridItem5 = getByTestId(`${mockGridTestId}-item-5`);
    expect(gridItem4.props.style).not.toHaveProperty('paddingLeft');
    expect(gridItem4.props.style).not.toHaveProperty('paddingRight');
    expect(gridItem5.props.style).toEqual(expect.objectContaining({ marginTop: spacing }));

    const gridItem6 = getByTestId(`${mockGridTestId}-item-6`);
    expect(gridItem6.props.style).not.toHaveProperty('paddingLeft');
    expect(gridItem6.props.style).toEqual(expect.objectContaining({ marginTop: spacing }));
  });
});
