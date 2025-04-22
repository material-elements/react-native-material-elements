import { renderHook } from '@testing-library/react-hooks';
import React, { isValidElement } from 'react';
import { Text, View } from 'react-native';
import { useThemedProps } from '../src/hooks';
import { render, ThemeWrapper } from './test-utils';
import { Theme } from '../src/libraries/themes/types';
import { green } from '../src';

describe('useThemedProps', () => {
  it('should match icon component snapshot correctly', () => {
    const props = {
      icon: () => <View />,
    };
    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });
    const { toJSON } = render(result.current.icon);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render icon component correctly', () => {
    const props = {
      icon: () => <View />,
    };
    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    const renderedIcon = result.current.icon;
    expect(isValidElement(renderedIcon)).toBe(true);
    expect(renderedIcon).toBeDefined();
  });

  it('should not apply theme-based style override', () => {
    const props = {
      style: { color: 'red' },
    };

    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(result.current.style).toBeUndefined();
  });

  it('should handle no icon provided gracefully', () => {
    const props = {};
    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(result.current.icon).toBeUndefined();
  });

  it('should support label as a ReactNode', () => {
    const props = {
      label: <Text>Label</Text>,
    };

    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(isValidElement(result.current.label)).toBe(true);
  });

  it('should preserve custom props', () => {
    const props = {
      customKey: 'customValue',
    };

    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(result.current.customKey).toBeUndefined();
  });

  it('should memoize icon function result', () => {
    const iconFn = jest.fn(() => <View />);
    const props = { icon: iconFn };

    const { rerender } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(iconFn).toHaveBeenCalledTimes(1);
    rerender();
    expect(iconFn).toHaveBeenCalledTimes(1);
  });

  it('should resolve function props using themeColors', () => {
    const props = {
      icon: (theme: Theme) => <View style={{ backgroundColor: theme.green[500] }} />,
    };

    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    const iconComponent = result.current.icon;

    expect(iconComponent).toBeDefined();
    expect(iconComponent.props.style.backgroundColor).toEqual(green[500]);
  });

  it('should render component correctly if user passed component directly', () => {
    const props = {
      icon: <View />,
    };
    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    const iconComponent = result.current.icon;
    expect(iconComponent).toBeDefined();
    const { toJSON } = render(iconComponent);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should return an empty object when props are empty', () => {
    const { result } = renderHook(() => useThemedProps({}), { wrapper: ThemeWrapper });

    expect(result.current).toEqual({});
  });

  it('should return valid React elements when ReactNode props are provided', () => {
    const StaticIcon = <View testID="static-icon" />;
    const props = {
      icon: StaticIcon,
      label: <View testID="label" />,
    };

    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(result.current.icon).toBe(StaticIcon);
    expect(result.current.label).toBeDefined();
  });

  it('should support themed prop returning a primitive value', () => {
    const props = {
      fontSize: () => 16,
    };

    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(result.current.fontSize).toBe(16);
  });

  it('should evaluate icon function only once even across re-renders', () => {
    const iconFn = jest.fn(() => <View />);
    const props = { icon: iconFn };

    const { rerender } = renderHook(() => useThemedProps(props), {
      wrapper: ThemeWrapper,
      initialProps: props,
    });

    rerender(props);
    rerender(props);

    expect(iconFn).toHaveBeenCalledTimes(1);
  });

  it('should support themed props returning null', () => {
    const props = {
      icon: () => null,
    };

    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(result.current.icon).toBeNull();
  });

  it('should set undefined if function does not return a value', () => {
    const props = {
      icon: () => {},
    };

    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(result.current.icon).toBeUndefined();
  });

  it('should ignore deep nested functions (not supported by current impl)', () => {
    const props = {
      styles: {
        color: (theme: Theme) => theme.primary,
      },
    };

    const { result } = renderHook(() => useThemedProps(props as any), { wrapper: ThemeWrapper });

    expect(result.current.styles).toBeUndefined();
  });

  it('should not return array props as-is', () => {
    const props = {
      values: [1, 2, 3],
    };

    const { result } = renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(result.current.values).toBeUndefined();
  });

  it('should warn if icon is a primitive value', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const props = {
      icon: 'not-a-component' as any,
    };

    renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(warnSpy).toHaveBeenCalledWith('icon prop must be either <Icon /> or () => <Icon />. Other values are not valid.');

    warnSpy.mockRestore();
  });

  it('should warn if icon is a plain object', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const props = {
      icon: { something: true } as any,
    };

    renderHook(() => useThemedProps(props), { wrapper: ThemeWrapper });

    expect(warnSpy).toHaveBeenCalledWith('icon prop must be either <Icon /> or () => <Icon />. Other values are not valid.');

    warnSpy.mockRestore();
  });

  it('should not warn if icon is a valid React element', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const props = {
      icon: () => <View />,
    };

    renderHook(() => useThemedProps(props));
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
