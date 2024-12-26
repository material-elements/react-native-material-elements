import { ColorShades, Theme } from '../theme';
import { accent } from './accent';
import { amber } from './amber';
import { blueGrey } from './blueGrey';
import { brown } from './brown';
import { cyan } from './cyan';
import { deepOrange } from './deepOrange';
import { green } from './green';
import { grey } from './grey';
import { lightBlue } from './lightBlue';
import { lightGreen } from './lightGreen';
import { lime } from './lime';
import { orange } from './orange';
import { pink } from './pink';
import { primary } from './primary';
import { red } from './red';
import { secondary } from './secondary';
import { teal } from './teal';
import { white } from './white';
import { yellow } from './yellow';

const initialLightTheme = {
  primary,
  secondary,
  accent,
  deepOrange,
  brown,
  grey,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  red,
  pink,
  blueGrey,
  teal,
  cyan,
  lightBlue,
  white,
};

const createDarkColorTheme = (key: keyof typeof initialLightTheme) => {
  const colors = initialLightTheme[key] as ColorShades;
  const darkColors: any = {};
  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const reverseShades = [...shades].reverse();

  shades.forEach((shade, index) => {
    const shadeIndex = reverseShades[index] as unknown as keyof ColorShades;
    darkColors[shade] = colors[shadeIndex];
  });

  return darkColors;
};

const initialDarkTheme: Theme = {
  primary: createDarkColorTheme('primary'),
  secondary: createDarkColorTheme('secondary'),
  accent: createDarkColorTheme('accent'),
  deepOrange: createDarkColorTheme('deepOrange'),
  brown: createDarkColorTheme('brown'),
  grey: createDarkColorTheme('grey'),
  green: createDarkColorTheme('green'),
  lightGreen: createDarkColorTheme('lightGreen'),
  lime: createDarkColorTheme('lime'),
  yellow: createDarkColorTheme('yellow'),
  amber: createDarkColorTheme('amber'),
  orange: createDarkColorTheme('orange'),
  red: createDarkColorTheme('red'),
  pink: createDarkColorTheme('pink'),
  blueGrey: createDarkColorTheme('blueGrey'),
  teal: createDarkColorTheme('teal'),
  cyan: createDarkColorTheme('cyan'),
  lightBlue: createDarkColorTheme('lightBlue'),
  white: createDarkColorTheme('white'),
};

export { initialLightTheme, initialDarkTheme };
