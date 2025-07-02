import { generateElementStyles, generateSortStyles, generateStyle, getStyleFromProps } from '../src';
import { StylePalette } from '../src/libraries/types';

describe('Style Utilities', () => {
  describe('getStyleFromProps', () => {
    it('should remove undefined values from props', () => {
      const input = { color: 'red', margin: undefined, padding: 10 };
      const result = getStyleFromProps(input as any);
      expect(result).toEqual({ color: 'red', padding: 10 });
    });

    it('should return empty object if all values are undefined', () => {
      const input = { margin: undefined, padding: undefined };
      const result = getStyleFromProps(input as any);
      expect(result).toEqual({});
    });
  });

  describe('generateStyle', () => {
    it('should return style object when propertyName and value are provided', () => {
      const result = generateStyle({ propertyName: 'color', value: 'blue' });
      expect(result).toEqual({ color: 'blue' });
    });

    it('should return empty object when propertyName is missing', () => {
      const result = generateStyle({ propertyName: '', value: 'blue' } as any);
      expect(result).toEqual({});
    });

    it('should return empty object when value is undefined', () => {
      const result = generateStyle({ propertyName: 'margin', value: undefined });
      expect(result).toEqual({});
    });
  });

  describe('generateSortStyles', () => {
    it('should warn and return undefined for invalid property', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const args: StylePalette = { unknownProperty: 10 } as any;
      const result = generateSortStyles(args, 'unknownProperty' as any);
      expect(consoleSpy).toHaveBeenCalledWith('Style property name unknownProperty is not defined');
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe('generateElementStyles', () => {
    it('should generate styles for valid properties', () => {
      const args: StylePalette = { m: 10, p: 5 };
      const result = generateElementStyles(args);
      expect(result).toEqual({ margin: 10, padding: 5 });
    });

    it('should skip undefined properties and log warning', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const args: StylePalette = { m: 10, unknown: 20 } as any;
      const result = generateElementStyles(args);
      expect(consoleSpy).toHaveBeenCalledWith('Style property name unknown is not defined');
      expect(result).toEqual({ margin: 10 });
      consoleSpy.mockRestore();
    });

    it('should skip invalid properties', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const args = { a: 10, b: 20 } as any;
      generateElementStyles(args);
      expect(consoleSpy).toHaveBeenCalledWith('Style property name a is not defined');
      expect(consoleSpy).toHaveBeenCalledWith('Style property name b is not defined');
      consoleSpy.mockRestore();
    });

    it('should return empty object if no valid properties are provided', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const args: StylePalette = { unknown: 20 } as any;
      const result = generateElementStyles(args);
      expect(result).toEqual({});
      consoleSpy.mockRestore();
    });
  });
});
