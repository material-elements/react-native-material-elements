import { render as testRenderer } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import {
  Badge,
  BADGE_BOTTOM_LEFT_POSITION,
  BADGE_BOTTOM_RIGHT_POSITION,
  BADGE_DEFAULT_RADIUS,
  BADGE_TOP_LEFT_POSITION,
  green,
  lightBlue,
  primary,
  red,
  secondary,
  ThemeProvider,
  VariantTypes,
  yellow,
} from '../src';
import { render, waitFor } from './test-utils';

describe('Badge', () => {
  const mockBadgeTestId = 'mock-badge-test-id';
  const mockRef = React.createRef<View>();
  const defaultBadgePositionSpace = -4;

  const rootBadgeVariationThemeConfig = {
    colors: {
      primary: { color: 'green' },
      secondary: { color: 'red' },
      success: { color: 'yellow' },
      error: { color: 'pink' },
      info: { color: 'blue' },
      gray: { color: 'red' },
      lightGray: { color: 'green' },
      warning: { color: 'blue' },
    },
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render correctly', async () => {
    const { toJSON } = render(<Badge />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should render correctly with inner component', async () => {
    const { toJSON } = render(
      <Badge>
        <View />
      </Badge>,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should forward the ref', () => {
    render(<Badge ref={mockRef} />);
    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render the badge content', () => {
    const { getByText } = render(<Badge badgeContent={'100'} max={1000} />);

    const label = getByText('100');
    expect(label).toBeDefined();
  });

  it('should render the primary variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="primary" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: primary[500] }));
  });

  it('should render the secondary variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="secondary" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: secondary[500] }));
  });

  it('should render the error variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="error" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: red[500] }));
  });

  it('should render the info variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="info" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: lightBlue[500] }));
  });

  it('should render the success variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="success" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: green[500] }));
  });

  it('should render the warning variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="warning" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: yellow[500] }));
  });

  it('should render the badge dot component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variant="dot" />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ minWidth: BADGE_DEFAULT_RADIUS, minHeight: BADGE_DEFAULT_RADIUS }),
    );
  });

  it('should render the (+) after the badge content if the max value is less then the badge content', () => {
    const { getByText } = render(<Badge testID={mockBadgeTestId} badgeContent={100} max={100} />);
    const badgeLabel = getByText('99+');
    expect(badgeLabel).toBeTruthy();
  });

  it('should change the scale of the badge when the invisible prop is passed', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} invisible />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ transform: [{ scale: 0 }] }));
  });

  it('should render the badge in top right place', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ top: defaultBadgePositionSpace, right: defaultBadgePositionSpace }),
    );
  });

  it('should change the position (START TOP) of the badge when passed the anchorOrigin prop', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} anchorOrigin={BADGE_TOP_LEFT_POSITION} />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ top: defaultBadgePositionSpace, left: defaultBadgePositionSpace }),
    );
  });

  it('should change the position (START BOTTOM) of the badge when passed the anchorOrigin prop', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} anchorOrigin={BADGE_BOTTOM_LEFT_POSITION} />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ bottom: defaultBadgePositionSpace, left: defaultBadgePositionSpace }),
    );
  });

  it('should change the position (END BOTTOM) of the badge when passed the anchorOrigin prop', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} anchorOrigin={BADGE_BOTTOM_RIGHT_POSITION} />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ bottom: defaultBadgePositionSpace, right: defaultBadgePositionSpace }),
    );
  });

  it('should apply the root max config', () => {
    const { getByText } = testRenderer(
      <ThemeProvider components={{ badgeProps: { max: 10 } }}>
        <Badge testID={mockBadgeTestId} badgeContent={100} />
      </ThemeProvider>,
    );

    const label = getByText('9+');
    expect(label).toBeDefined();
  });

  it('should override the root max config', () => {
    const { getByText } = testRenderer(
      <ThemeProvider components={{ badgeProps: { max: 10 } }}>
        <Badge testID={mockBadgeTestId} max={100} badgeContent={100} shouldOverrideRootMaxValue />
      </ThemeProvider>,
    );

    const label = getByText('99+');
    expect(label).toBeDefined();
  });

  it('should apply then root anchorOrigin prop', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ badgeProps: { anchorOrigin: BADGE_TOP_LEFT_POSITION } }}>
        <Badge testID={mockBadgeTestId} />
      </ThemeProvider>,
    );
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ top: defaultBadgePositionSpace, left: defaultBadgePositionSpace }),
    );
  });

  it('should override then root anchorOrigin prop', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ badgeProps: { anchorOrigin: BADGE_TOP_LEFT_POSITION } }}>
        <Badge testID={mockBadgeTestId} anchorOrigin={BADGE_BOTTOM_LEFT_POSITION} shouldOverrideRootAnchor />
      </ThemeProvider>,
    );
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ bottom: defaultBadgePositionSpace, left: defaultBadgePositionSpace }),
    );
  });

  it('should apply the root style', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ badgeProps: { style: { backgroundColor: 'red' } } }}>
        <Badge testID={mockBadgeTestId} />
      </ThemeProvider>,
    );
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should combine the root style and component styles', () => {
    const { getByTestId } = testRenderer(
      <ThemeProvider components={{ badgeProps: { style: { backgroundColor: 'red' } } }}>
        <Badge testID={mockBadgeTestId} style={{ borderWidth: 2 }} />
      </ThemeProvider>,
    );
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red', borderWidth: 2 }));
  });

  Object.entries(rootBadgeVariationThemeConfig.colors).forEach(([variant, expectedStyle]) => {
    it(`should apply the root '${variant}' badge theme variant`, () => {
      const { getByTestId } = render(
        <ThemeProvider components={{ badgeProps: rootBadgeVariationThemeConfig }}>
          <Badge testID={mockBadgeTestId} style={{ borderWidth: 2 }} variation={variant as VariantTypes} />
        </ThemeProvider>,
      );
      const badge = getByTestId(mockBadgeTestId);
      expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: expectedStyle.color }));
    });
  });

  it('should throw error if passing invalid type of content', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Badge badgeContent={[] as any} />)).toThrow(new TypeError('Badge content must be a string or number'));
    consoleSpy.mockRestore();
  });

  it('should render badge content if content type is string', () => {
    const { getByText } = render(<Badge badgeContent={'Save'} />);
    const content = getByText('Save');
    expect(content).toBeDefined();
  });
});
