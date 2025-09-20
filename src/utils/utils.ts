import { ColorValue } from 'react-native';
import { SpacingStyle, StylePalette } from '../libraries/style/styleTypes';
import { ThemeType } from '../libraries/themes/theme';

export const OFFSET = 20;
export const WRAPPER_BOTTOM_OFFSET = 50;

/**
 * Define the allowed variant types for themes, used to categorize styles like primary, secondary, etc.
 * These variants can be used to specify different styling options.
 */
export type VariantTypes = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'gray' | 'lightGrey';
/**
 * Interface for default options that can be applied to variations.
 * The `color` property is optional and represents the color value for the variation.
 */
export interface DefaultVariationOptions {
  color?: ColorValue;
}
/**
 * Type for the theme configuration object that maps each `VariantTypes` to a specific configuration.
 * The configuration is partially defined, meaning some variant types might not have a configuration.
 */
export type VariationThemeConfig<T> = Partial<Record<VariantTypes, T | undefined>>;
/**
 * Arguments for the `getVariant` function.
 * `colors` is the theme's color object, `variant` is the specific variant type,
 * and `config` contains the custom configurations for each variant type.
 */
export interface GetVariantArgs<T> {
  colors: ThemeType['colors'];
  variant?: VariantTypes;
  config?: VariationThemeConfig<DefaultVariationOptions & T>;
}
/**
 * Function to get the color for a specific variant based on the provided `variant`, `colors`, and `config`.
 * If the variant doesn't exist in `config`, it defaults to the color from the `colors` palette.
 */
export const getVariant = <T>({ variant, colors, config }: GetVariantArgs<T>): ColorValue | string => {
  if (variant === 'primary') {
    return config?.primary?.color ?? colors.primary[500];
  } else if (variant === 'secondary') {
    return config?.secondary?.color ?? colors.secondary[500];
  } else if (variant === 'error') {
    return config?.error?.color ?? colors.red[500];
  } else if (variant === 'info') {
    return config?.info?.color ?? colors.lightBlue[500];
  } else if (variant === 'success') {
    return config?.success?.color ?? colors.green[500];
  } else if (variant === 'warning') {
    return config?.warning?.color ?? colors.yellow[500];
  } else if (variant === 'gray') {
    return config?.gray?.color ?? colors.gray[500];
  } else if (variant === 'lightGrey') {
    return config?.lightGrey?.color ?? colors.gray[200];
  }
  return colors.secondary[500];
};

export const maxLength = function (text: string, maxLengthNumber: number): string {
  return text.length > maxLengthNumber ? `${text.slice(0, maxLengthNumber)}...` : text;
};

export const gutter = <T extends keyof SpacingStyle, U extends StylePalette[T]>(property: T, value: U): SpacingStyle => {
  return { [property]: value };
};
/**
 * Helper function to merge two objects into one.
 * This spreads the properties of both objects into a new object, ensuring no overwriting of properties.
 */
const mergeObjects = <T extends {}, U extends {}>(obj1: T, obj2: U): T & U => ({ ...obj1, ...obj2 });
/**
 * Function to merge an array of objects into a single object.
 * Each object in the array is spread into the accumulator, effectively combining them into one object.
 */
const mergeArraysToObject = <T extends Record<string, any>>(array: T[]): T => {
  return array.reduce((acc, obj) => ({ ...acc, ...obj }), {} as T);
};
/**
 * Generic merge function to merge either two objects or arrays.
 * It handles different cases based on whether the arguments are arrays or objects.
 * If the arguments are arrays, they are merged into objects first before merging them.
 */
export const merge = <T1 extends object | any[] | undefined, T2 extends object | any[] | undefined>(
  param1: T1,
  param2: T2,
): (T1 & T2) | undefined => {
  if (param1 && !Array.isArray(param1) && param2 && !Array.isArray(param2)) {
    return mergeObjects(param1, param2);
  } else if (Array.isArray(param1) && Array.isArray(param2)) {
    const mergedArray1 = mergeArraysToObject(param1);
    const mergedArray2 = mergeArraysToObject(param2);
    return mergeObjects(mergedArray1, mergedArray2);
  } else if (Array.isArray(param1) && param2 && !Array.isArray(param2)) {
    const mergedArray1 = mergeArraysToObject(param1);
    return mergeObjects(mergedArray1, param2);
  } else if (param1 && !Array.isArray(param1) && Array.isArray(param2)) {
    const mergedArray2 = mergeArraysToObject(param2);
    return mergeObjects(param1, mergedArray2);
  } else if (param1 && param2) {
    return mergeObjects(param1, param2);
  }

  return undefined;
};
