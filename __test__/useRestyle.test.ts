import { renderHook } from '@testing-library/react-hooks';
import { useRestyle } from '../src/hooks';
import { StyledProps } from '../src/libraries/style/styleTypes';

describe('useRestyle', () => {
  it('should return empty style when no props are passed', () => {
    const props = {} as StyledProps;
    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({});
  });

  it('should return style props that are string or number only', () => {
    const props = {
      color: 'red',
      padding: 10,
      margin: '5%',
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      color: 'red',
      padding: 10,
      margin: '5%',
    });
  });

  it('should skip undefined and null style props', () => {
    const props = {
      color: undefined,
      padding: null,
      margin: 10,
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      margin: 10,
    });
  });

  it('should ignore boolean values', () => {
    const props = {
      color: 'blue',
      padding: true,
      margin: false,
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      color: 'blue',
    });
  });

  it('should ignore function values', () => {
    const props = {
      color: 'green',
      onPress: () => {},
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      color: 'green',
    });
  });

  it('should ignore object and array values', () => {
    const props = {
      color: 'purple',
      style: { borderWidth: 1 },
      margin: [10, 20],
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      color: 'purple',
    });
  });

  it('should include valid numeric zero values', () => {
    const props = {
      margin: 0,
      padding: 0,
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      margin: 0,
      padding: 0,
    });
  });

  it('should include valid empty string values', () => {
    const props = {
      color: '',
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      color: '',
    });
  });

  it('should handle mixed valid and invalid props', () => {
    const props = {
      color: 'black',
      padding: undefined,
      backgroundColor: null,
      margin: 20,
      someEvent: () => {},
      children: () => {},
      style: { flex: 1 },
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      color: 'black',
      margin: 20,
    });
  });

  it('should return an empty object when all props are invalid', () => {
    const props = {
      onPress: () => {},
      children: () => {},
      style: { borderRadius: 4 },
      someUnknown: Symbol('test'),
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({});
  });

  it('should work with dimension values like "100%"', () => {
    const props = {
      width: '100%',
      height: '50%',
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      width: '100%',
      height: '50%',
    });
  });

  it('should work with color hex values', () => {
    const props = {
      backgroundColor: '#FFEEAA',
    } as any;

    const { result } = renderHook(() => useRestyle(props));
    expect(result.current.getStyleFromProps()).toEqual({
      backgroundColor: '#FFEEAA',
    });
  });
});
