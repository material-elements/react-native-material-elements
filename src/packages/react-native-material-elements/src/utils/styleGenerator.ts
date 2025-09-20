/**
 * This file contains utility functions for generating inline CSS styles based on provided properties.
 * It includes functions for handling spacing, display properties, width, height, and positioning.
 * These functions are designed to be used in generating dynamic styles within React components or similar environments.
 */
import {
  ElementFlexStyleProps,
  ElementTextStyleProps,
  KeyOfStylePalette,
  StyledProps,
  StyleEntry,
  StylePalette,
} from '../libraries/style/styleTypes';
import { styles } from '../libraries';

export const getStyleFromProps = (props: StyledProps) =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined));

export const generateStyle = <T extends KeyOfStylePalette>({ propertyName, value }: StyleEntry<T>) =>
  propertyName && value !== undefined ? { [propertyName]: value } : {};

export const generateSortStyles = (args: StylePalette, elementPropertyName: keyof typeof styles) => {
  const propertyName = styles[elementPropertyName];
  if (!propertyName) {
    console.warn(`Style property name ${elementPropertyName} is not defined`);
    return;
  }
  return generateStyle({ propertyName, value: args[elementPropertyName] });
};

/**
 * Generate CSS styles for an element based on the provided arguments.
 * @param args ElementStylesArgs containing spacing and margin properties.
 * @returns A string representing CSS styles for the element.
 */
export const generateElementStyles = (args: StylePalette) => {
  let nativeStyles: StylePalette & ElementTextStyleProps & ElementFlexStyleProps = {};
  const keys = Object.keys(args);

  for (let property of keys) {
    const elementPropertyName = property as keyof typeof styles;
    if (args[elementPropertyName] === undefined) {
      console.warn(
        `Invalid element property name: ${args[elementPropertyName]}, and value: ${String(args[elementPropertyName])}`,
      );
      continue;
    }
    nativeStyles = {
      ...nativeStyles,
      ...generateSortStyles(args, elementPropertyName),
    };
  }

  return nativeStyles;
};
