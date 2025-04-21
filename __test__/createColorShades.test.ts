import { createColorShades } from '../src';

describe('createColorShades', () => {
  it('should merge default theme colors with custom shades', () => {
    const customShades = {
      400: '#000000',
    };

    const result = createColorShades({
      shades: customShades,
      themePropertyName: 'green',
    });

    expect(result[400]).toEqual(customShades[400]);
  });

  it('should always return custom shades with default shades', () => {
    const customShades = {
      50: '#fff',
      100: '#efefef',
      400: '#000000',
    };

    const result = createColorShades({
      shades: customShades,
      themePropertyName: 'green',
    });

    expect(result[50]).toEqual(result[50]);
    expect(result[100]).toEqual(result[100]);
    expect(result[400]).toEqual(result[400]);
    expect(Object.keys(result)).toHaveLength(10);
  });
});
