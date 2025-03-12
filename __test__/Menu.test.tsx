import React, { createRef } from 'react';
import { render } from './test-utils';
import { Menu, Text } from '../src';
import { View } from 'react-native';

describe('Menu component', () => {
  const menuMockTestId = 'menu-mock-test-id';
  const menuPortalTestId = 'menu-portal-test-id';

  const mockMenuRef = createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<Menu />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render child components correctly', () => {
    const { toJSON, getByText } = render(
      <Menu>
        <Text>Child</Text>
      </Menu>,
    );
    const text = getByText('Child');
    expect(toJSON()).toMatchSnapshot();
    expect(text).toBeDefined();
  });

  it('should change the style of the menu component', () => {
    const { getByTestId } = render(<Menu testID={menuMockTestId} style={{ backgroundColor: 'red' }} />);
    const menu = getByTestId(menuMockTestId);
    expect(menu.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should attach ref correctly', () => {
    render(<Menu ref={mockMenuRef} />);
    expect(mockMenuRef.current).toBeDefined();
    expect(mockMenuRef.current).toBeInstanceOf(View);
  });

  it('should change the animation style', () => {
    const { getByTestId } = render(<Menu portalTestId={menuPortalTestId} portalProps={{ animationType: 'slide' }} />);
    const portal = getByTestId(menuPortalTestId);
    expect(portal.props.animationType).toEqual('slide');
  });

  it('menu component will take full width if passed fullWidth prop', () => {
    const { getByTestId } = render(<Menu testID={menuMockTestId} fullWidth />);
    const menu = getByTestId(menuMockTestId);
    expect(menu.props.style).toEqual(expect.objectContaining({ width: '100%' }));
  });

  it('menu component will change the width and hight if passed width and height props', () => {
    const { getByTestId } = render(<Menu testID={menuMockTestId} width={200} height={300} />);
    const menu = getByTestId(menuMockTestId);
    expect(menu.props.style).toEqual(expect.objectContaining({ width: 200, height: 300 }));
  });
});
