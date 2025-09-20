import React from 'react';
import { StyledProps, StyleLike } from '../libraries/style/styleTypes';

export const useRestyle = <T>(props: T & StyledProps) => {
  function isValidStyle<U>(value: U) {
    if (value === undefined || value === null || React.isValidElement(value)) {
      return false;
    }
    return typeof value === 'string' || typeof value === 'number';
  }

  const getStyleFromProps = () => {
    const result: Record<string, StyleLike> = {};

    for (const key in props) {
      const value = props[key as keyof StyledProps];
      if (isValidStyle(value)) {
        result[key] = value;
      }
    }

    return result;
  };
  return { getStyleFromProps };
};
