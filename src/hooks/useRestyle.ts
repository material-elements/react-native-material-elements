import { StyledProps, StyleLike } from '../libraries/style/styleTypes';

export const useRestyle = <T>(props: T & StyledProps) => {
  function isValidStyle<T>(value: T) {
    if (value === undefined || value === null) return false;
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
