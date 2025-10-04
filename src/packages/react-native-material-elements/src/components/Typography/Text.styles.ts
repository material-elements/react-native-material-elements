import { ColorValue, TextStyle } from 'react-native';
import { red, secondary } from '../../libraries';
import { generateElementStyles, gutter } from '../../utils';
import { TextStylesArgs } from './Text.types';

export const generateTextStyles = ({
  variation,
  gutterBottom,
  isActive,
  activeColor,
  disabled,
  error,
  errorColor,
  mode: textThemeMode,
  sx,
  color,
  gutterBottomSpace,
  themeComponentConfig,
  themeFonts,
  themeMode,
}: TextStylesArgs): TextStyle => {
  if (!themeFonts) {
    throw new Error('Theme font configuration is not available now please first configure the theme fonts.');
  }

  let baseColor: ColorValue | undefined;

  if (textThemeMode === 'light' || (!textThemeMode && themeMode === 'dark')) {
    baseColor = 'white';
  } else if (textThemeMode === 'dark') {
    baseColor = 'black';
  }

  const textColor = color ?? baseColor;

  let fontSize: number;
  let fontWeight: TextStyle['fontWeight'];

  switch (variation) {
    case 'body1':
      fontSize = themeComponentConfig?.body1?.fontSize ?? themeFonts['text-2xl'];
      fontWeight = themeComponentConfig?.body1?.fontWeight;
      break;
    case 'body2':
      fontSize = themeComponentConfig?.body2?.fontSize ?? themeFonts['text-3xl'];
      fontWeight = themeComponentConfig?.body2?.fontWeight;
      break;
    case 'caption':
      fontSize = themeComponentConfig?.caption?.fontSize ?? themeFonts['text-sm'];
      fontWeight = themeComponentConfig?.caption?.fontWeight;
      break;
    case 'h1':
      fontSize = themeComponentConfig?.h1?.fontSize ?? themeFonts['text-xl'];
      fontWeight = themeComponentConfig?.h1?.fontWeight;
      break;
    case 'h2':
      fontSize = themeComponentConfig?.h2?.fontSize ?? themeFonts['text-lg'];
      fontWeight = themeComponentConfig?.h2?.fontWeight;
      break;
    case 'h3':
      fontSize = themeComponentConfig?.h3?.fontSize ?? themeFonts['text-md'];
      fontWeight = themeComponentConfig?.h3?.fontWeight;
      break;
    case 'h4':
      fontSize = themeComponentConfig?.h4?.fontSize ?? themeFonts['text-sm'];
      fontWeight = themeComponentConfig?.h4?.fontWeight;
      break;
    case 'h5':
      fontSize = themeComponentConfig?.h5?.fontSize ?? themeFonts['text-xs'];
      fontWeight = themeComponentConfig?.h5?.fontWeight;
      break;
    case 'h6':
      fontSize = themeComponentConfig?.h6?.fontSize ?? themeFonts['text-xxs'];
      fontWeight = themeComponentConfig?.h6?.fontWeight;
      break;
    default:
      fontSize = themeFonts['text-sm'];
  }

  let textActiveColor: ColorValue;

  if (activeColor) {
    textActiveColor = activeColor;
  } else {
    textActiveColor = secondary[200];
  }

  let textErrorColor: ColorValue;

  if (errorColor) {
    textErrorColor = errorColor;
  } else {
    textErrorColor = red[600];
  }

  return {
    ...(textColor && { color: textColor }),
    ...(variation && { fontSize }),
    ...(fontWeight && { fontWeight }),
    ...(gutterBottom && gutter('marginBottom', gutterBottomSpace)),
    ...(isActive && { color: textActiveColor }),
    ...(disabled && { opacity: 0.3 }),
    ...(error && { color: textErrorColor }),
    ...(sx && generateElementStyles(sx)),
  };
};
