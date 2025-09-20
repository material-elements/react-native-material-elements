import _ from 'lodash';
import { StyleProp, ViewStyle } from 'react-native';
import { defaultLightTheme, generateUniqueId, getVariant, gutter, maxLength, merge } from '../src';

describe('generateUniqueId', () => {
  it('should return a non-empty string', () => {
    const id = generateUniqueId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('should include a timestamp and a random string separated by a hyphen', () => {
    const id = generateUniqueId();
    const parts = id.split('-');

    expect(parts.length).toBe(2);
    expect(parts[0]).toMatch(/^[a-z0-9]+$/);
    expect(parts[1]).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate different ids on multiple calls', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    expect(id1).not.toBe(id2);
  });

  it('should generate id containing base36 characters only', () => {
    const id = generateUniqueId();
    expect(id).toMatch(/^[a-z0-9]+-[a-z0-9]+$/);
  });
});

describe('maxLength', () => {
  it('should return the original text if its length is less than the max length', () => {
    const text = 'Hello';
    const result = maxLength(text, 10);
    expect(result).toBe('Hello');
  });

  it('should return the original text if its length is equal to the max length', () => {
    const text = 'HelloWorld';
    const result = maxLength(text, 10);
    expect(result).toBe('HelloWorld');
  });

  it('should truncate the text and append ellipsis if its length exceeds the max length', () => {
    const text = 'HelloWorld123';
    const result = maxLength(text, 10);
    expect(result).toBe('HelloWorld...');
  });

  it('should return empty string if input text is empty', () => {
    const text = '';
    const result = maxLength(text, 5);
    expect(result).toBe('');
  });

  it('should handle maxLengthNumber = 0 by returning ellipsis only', () => {
    const text = 'Hello';
    const result = maxLength(text, 0);
    expect(result).toBe('...');
  });
});

describe('gutter utility function', () => {
  it('should return correct spacing style for margin', () => {
    const result = gutter('margin', 10);
    expect(result).toEqual({ margin: 10 });
  });

  it('should return correct spacing style for padding', () => {
    const result = gutter('padding', 20);
    expect(result).toEqual({ padding: 20 });
  });

  it('should handle other spacing properties like marginTop', () => {
    const result = gutter('marginTop', 5);
    expect(result).toEqual({ marginTop: 5 });
  });
});

describe('merge utility', () => {
  it('should merge two plain objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const result = merge(obj1, obj2);

    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  it('should overwrite duplicate keys with the value from the second object', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 99, c: 3 };
    const result = merge(obj1, obj2);

    expect(result).toEqual({ a: 1, b: 99, c: 3 });
  });

  it('should merge two arrays of objects into a single object', () => {
    const arr1 = [{ a: 1 }, { b: 2 }];
    const arr2 = [{ c: 3 }, { d: 4 }];
    const result = merge(arr1, arr2);

    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  it('should merge array and object (array first)', () => {
    const arr = [{ a: 1 }, { b: 2 }];
    const obj = { c: 3 };
    const result = merge(arr, obj);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should merge object and array (object first)', () => {
    const obj = { x: 9 };
    const arr = [{ y: 10 }, { z: 11 }];
    const result = merge(obj, arr);

    expect(result).toEqual({ x: 9, y: 10, z: 11 });
  });

  it('should handle merging two empty objects', () => {
    const result = merge({}, {});
    expect(result).toEqual({});
  });

  it('should handle merging two empty arrays', () => {
    const result = merge([], []);
    expect(result).toEqual({});
  });

  it('should handle merging empty array and object', () => {
    const result = merge([], { a: 1 });
    expect(result).toEqual({ a: 1 });
  });

  it('should handle merging object and empty array', () => {
    const result = merge({ a: 1 }, []);
    expect(result).toEqual({ a: 1 });
  });

  it('should merge styles', () => {
    const componentStyles: ViewStyle = { backgroundColor: 'red', borderWidth: 10, borderRadius: 10, marginTop: 10 };
    const themeComponentStyles: ViewStyle = { backgroundColor: 'green', borderRadius: 100, top: 200, right: 10 };
    const lodashMerge = _.merge({}, componentStyles, themeComponentStyles);
    const result = merge(componentStyles, themeComponentStyles);
    expect(result).toEqual(lodashMerge);
  });

  it('should merge Array styles with object styles (array first)', () => {
    const componentStyles: StyleProp<ViewStyle> = [{ backgroundColor: 'red', borderWidth: 10, borderRadius: 10, marginTop: 10 }];
    const themeComponentStyles: ViewStyle = { backgroundColor: 'green', borderRadius: 100, top: 200, right: 10 };
    const result = merge(componentStyles, themeComponentStyles);
    expect(result).toEqual({ backgroundColor: 'green', borderWidth: 10, borderRadius: 100, marginTop: 10, top: 200, right: 10 });
  });

  it('merges when both param1 and param2 are truthy non-array, non-object values', () => {
    const result = merge('hello' as any, 123 as any);
    expect(result).toEqual({ 0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o' });
  });
});

describe('getVariant', () => {
  it('should return primary color from config if available', () => {
    const result = getVariant({
      variant: 'primary',
      colors: defaultLightTheme.colors,
      config: { primary: { color: 'red' } },
    });
    expect(result).toEqual('red');
  });

  it('should return primary color from colors fallback if not in config', () => {
    const result = getVariant({
      variant: 'primary',
      colors: defaultLightTheme.colors,
    });
    expect(result).toBe(defaultLightTheme.colors.primary[500]);
  });

  it('should return secondary color from config if available', () => {
    const result = getVariant({
      variant: 'secondary',
      colors: defaultLightTheme.colors,
      config: { secondary: { color: '#FEDCBA' } },
    });
    expect(result).toBe('#FEDCBA');
  });

  it('should return secondary color from colors fallback if not in config', () => {
    const result = getVariant({
      variant: 'secondary',
      colors: defaultLightTheme.colors,
    });
    expect(result).toBe(defaultLightTheme.colors.secondary[500]);
  });

  it('should return error color from config if available', () => {
    const result = getVariant({
      variant: 'error',
      colors: defaultLightTheme.colors,
      config: { error: { color: '#FF1111' } },
    });
    expect(result).toBe('#FF1111');
  });

  it('should return error color from colors fallback if not in config', () => {
    const result = getVariant({
      variant: 'error',
      colors: defaultLightTheme.colors,
    });
    expect(result).toBe(defaultLightTheme.colors.red[500]);
  });

  it('should return info color from config if available', () => {
    const result = getVariant({
      variant: 'info',
      colors: defaultLightTheme.colors,
      config: { info: { color: '#0099FF' } },
    });
    expect(result).toBe('#0099FF');
  });

  it('should return info color from colors fallback if not in config', () => {
    const result = getVariant({
      variant: 'info',
      colors: defaultLightTheme.colors,
    });
    expect(result).toBe(defaultLightTheme.colors.lightBlue[500]);
  });

  it('should return success color from config if available', () => {
    const result = getVariant({
      variant: 'success',
      colors: defaultLightTheme.colors,
      config: { success: { color: '#00CC00' } },
    });
    expect(result).toBe('#00CC00');
  });

  it('should return success color from colors fallback if not in config', () => {
    const result = getVariant({
      variant: 'success',
      colors: defaultLightTheme.colors,
    });
    expect(result).toBe(defaultLightTheme.colors.green[500]);
  });

  it('should return warning color from config if available', () => {
    const result = getVariant({
      variant: 'warning',
      colors: defaultLightTheme.colors,
      config: { warning: { color: '#FFCC00' } },
    });
    expect(result).toBe('#FFCC00');
  });

  it('should return warning color from colors fallback if not in config', () => {
    const result = getVariant({
      variant: 'warning',
      colors: defaultLightTheme.colors,
    });
    expect(result).toBe(defaultLightTheme.colors.yellow[500]);
  });

  it('should return gray color from config if available', () => {
    const result = getVariant({
      variant: 'gray',
      colors: defaultLightTheme.colors,
      config: { gray: { color: '#999999' } },
    });
    expect(result).toBe('#999999');
  });

  it('should return gray color from colors fallback if not in config', () => {
    const result = getVariant({
      variant: 'gray',
      colors: defaultLightTheme.colors,
    });
    expect(result).toBe(defaultLightTheme.colors.gray[500]);
  });

  it('should return lightGray color from config if available', () => {
    const result = getVariant({
      variant: 'lightGray',
      colors: defaultLightTheme.colors,
      config: { lightGray: { color: '#EEEEEE' } },
    });
    expect(result).toBe('#EEEEEE');
  });

  it('should return lightGray color from colors fallback if not in config', () => {
    const result = getVariant({
      variant: 'lightGray',
      colors: defaultLightTheme.colors,
    });
    expect(result).toBe(defaultLightTheme.colors.gray[200]);
  });

  it('should return secondary[500] as default for unknown variant', () => {
    const result = getVariant({
      colors: defaultLightTheme.colors,
    });
    expect(result).toBe(defaultLightTheme.colors.secondary[500]);
  });
});
