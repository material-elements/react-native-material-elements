import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Accordion, AccordionDetails, AccordionDetailsProps, AccordionSummary, grey, Text } from '../src';
import { fireEvent, render, waitFor } from './test-utils';

describe('Accordion Component', () => {
  const mockAccordionTestId = 'accordion-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<Accordion />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<Accordion ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should change the border radius when passed the square prop', () => {
    const { getByTestId } = render(<Accordion testID={mockAccordionTestId} square />);

    const accordion = getByTestId(mockAccordionTestId);
    expect(accordion.props.style).not.toHaveProperty('borderRadius');
  });

  it('should change the opacity when passed the disable prop', () => {
    const { getByTestId } = render(<Accordion testID={mockAccordionTestId} disable />);

    const accordion = getByTestId(mockAccordionTestId);
    const flattenedStyle = StyleSheet.flatten(accordion.props.style);

    expect(flattenedStyle.opacity).toEqual(0.5);
  });

  it('should add the inline styles correctly', () => {
    const { getByTestId } = render(
      <Accordion testID={mockAccordionTestId} display="flex" justifyContent="center" flex={1} alignItems="center" />,
    );
    const accordion = getByTestId(mockAccordionTestId);
    const flattenedStyle = StyleSheet.flatten(accordion.props.style);
    expect(flattenedStyle.display).toEqual('flex');
    expect(flattenedStyle.justifyContent).toEqual('center');
    expect(flattenedStyle.flex).toEqual(1);
    expect(flattenedStyle.alignItems).toEqual('center');
  });

  it('should render the multiple components correctly', () => {
    const { getByText } = render(
      <Accordion>
        <Text>Hello_1</Text>
        <Text>Hello_2</Text>
      </Accordion>,
    );
    const firstText = getByText('Hello_1');
    expect(firstText).toBeDefined();

    const secondText = getByText('Hello_2');
    expect(secondText).toBeDefined();
  });
});

describe('AccordionSummary Component', () => {
  const mockRef = React.createRef<View>();
  const mockOnPress = jest.fn();
  const mockHeaderTestId = 'mock-accordion-summary-header-test-id';
  const mockTestId = 'mock-accordion-summary-test-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<AccordionSummary />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward ref correctly', () => {
    render(<AccordionSummary ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render the icon when passed the expandIcon prop', () => {
    const { getByText } = render(<AccordionSummary expandIcon={<Text>expandIcon</Text>} />);

    const expandIcon = getByText('expandIcon');
    expect(expandIcon).toBeDefined();
  });

  it('should show the top border', () => {
    const { getByTestId } = render(<AccordionSummary headerTestId={mockHeaderTestId} topBorder />);
    const element = getByTestId(mockHeaderTestId);

    expect(element).toBeDefined();

    const flattenStyles = StyleSheet.flatten(element.props.style);

    expect(flattenStyles.borderTopWidth).toEqual(1);
    expect(flattenStyles.borderTopColor).toEqual(grey[300]);
  });

  it('should show the bottom border', () => {
    const { getByTestId } = render(<AccordionSummary headerTestId={mockHeaderTestId} bottomBorder />);
    const element = getByTestId(mockHeaderTestId);

    expect(element).toBeDefined();

    const flattenStyles = StyleSheet.flatten(element.props.style);

    expect(flattenStyles.borderBottomWidth).toEqual(1);
    expect(flattenStyles.borderBottomColor).toEqual(grey[300]);
  });

  it('should call the onPress function', () => {
    const { getByTestId } = render(<AccordionSummary onPress={mockOnPress} testID={mockTestId} />);
    const element = getByTestId(mockTestId);
    fireEvent.press(element);
    expect(mockOnPress).toHaveBeenCalled();
  });
});

describe('AccordionDetails Component', () => {
  const mockAccordionDetailsTestId = 'mock-accordion-details-test-id';
  const mockRef = React.createRef<View>();
  const TestChild = (props: any) => <Text {...props}>Test Child</Text>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render accordion details correctly', () => {
    const { toJSON } = render(<AccordionDetails />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should disable accordion details component when passed disable prop', () => {
    const { getByTestId } = render(<AccordionDetails disable testID={mockAccordionDetailsTestId} />);
    const element = getByTestId(mockAccordionDetailsTestId);
    const combineStyles: ViewStyle = StyleSheet.flatten(element.props.style);
    expect(combineStyles.opacity).toEqual(0.5);
  });

  it('should forward ref correctly', () => {
    render(<AccordionDetails ref={mockRef} testID={mockAccordionDetailsTestId} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render child component', () => {
    const { getByText, toJSON } = render(
      <AccordionDetails>
        <View>
          <Text>First child</Text>
        </View>
        <View>
          <Text>Second child</Text>
        </View>
      </AccordionDetails>,
    );

    expect(toJSON()).toMatchSnapshot();

    const firstChildElement = getByText('First child');
    expect(firstChildElement).toBeDefined();

    const secondChildElement = getByText('Second child');
    expect(secondChildElement).toBeDefined();
  });

  const renderComponent = (props?: Partial<AccordionDetailsProps>) => {
    return render(
      <AccordionDetails {...props}>
        <TestChild />
      </AccordionDetails>,
    );
  };

  it('should render children correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('Test Child')).toBeTruthy();
  });

  it('should apply default accordion styles', () => {
    const { getByTestId } = render(
      <AccordionDetails testID="accordion-details">
        <TestChild />
      </AccordionDetails>,
    );

    const view = getByTestId('accordion-details');

    expect(view.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: '100%',
          opacity: 1,
          paddingTop: 8,
          paddingHorizontal: 12,
          paddingBottom: 15,
        }),
      ]),
    );
  });

  it('should reduce opacity when disabled', () => {
    const { getByTestId } = render(
      <AccordionDetails testID="accordion-details" disable={true}>
        <TestChild />
      </AccordionDetails>,
    );

    const view = getByTestId('accordion-details');
    const combinedStyle = Array.isArray(view.props.style) ? Object.assign({}, ...view.props.style) : view.props.style;

    expect(combinedStyle.opacity).toBe(0.5);
  });

  it('should merge external style prop', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <AccordionDetails testID="accordion-details" style={customStyle}>
        <TestChild />
      </AccordionDetails>,
    );

    const view = getByTestId('accordion-details');
    const stylesArray = Array.isArray(view.props.style) ? view.props.style : [view.props.style];
    const mergedStyles = Object.assign({}, ...stylesArray);

    expect(mergedStyles.backgroundColor).toBe('red');
  });

  it('should spread additional props on the View', () => {
    const { getByTestId } = render(
      <AccordionDetails testID="accordion-details" accessible accessibilityLabel="accordion details">
        <TestChild />
      </AccordionDetails>,
    );

    const view = getByTestId('accordion-details');
    expect(view.props.accessibilityLabel).toBe('accordion details');
    expect(view.props.accessible).toBe(true);
  });

  it('should render the multiple components correctly', () => {
    const { getByText } = render(
      <AccordionDetails>
        <Text>Hello_1</Text>
        <Text>Hello_2</Text>
      </AccordionDetails>,
    );
    const firstText = getByText('Hello_1');
    expect(firstText).toBeDefined();

    const secondText = getByText('Hello_2');
    expect(secondText).toBeDefined();
  });
});
