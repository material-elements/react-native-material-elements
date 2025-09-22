import { ColorShades, Theme } from '../../theme';
import { accent } from './accent';
import { amber } from './amber';
import { blueGrey } from './blueGrey';
import { brown } from './brown';
import { calendulaGold } from './calendulaGold';
import { cyan } from './cyan';
import { cyanV2 } from './cyanV2';
import { daybreakBlue } from './daybreakBlue';
import { deepOrange } from './deepOrange';
import { dustRed } from './dustRed';
import { frenchMagenta } from './frenchMagenta';
import { geekBlue } from './geekBlue';
import { goldenPurple } from './goldenPurple';
import { green } from './green';
import { gray } from './gray';
import { lightBlue } from './lightBlue';
import { lightGreen } from './lightGreen';
import { lime } from './lime';
import { limeV2 } from './limeV2';
import { orange } from './orange';
import { pink } from './pink';
import { polarGreen } from './polarGreen';
import { primary } from './primary';
import { red } from './red';
import { secondary } from './secondary';
import { sunriseYellow } from './sunriseYellow';
import { sunsetOrange } from './sunsetOrange';
import { teal } from './teal';
import { volcano } from './volcano';
import { white } from './white';
import { yellow } from './yellow';

const initialLightTheme = {
  primary,
  secondary,
  accent,
  deepOrange,
  brown,
  gray,
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
  dustRed,
  volcano,
  sunsetOrange,
  limeV2,
  calendulaGold,
  sunriseYellow,
  polarGreen,
  cyanV2,
  daybreakBlue,
  geekBlue,
  goldenPurple,
  frenchMagenta,
};

const createDarkColorTheme = (key: keyof typeof initialLightTheme) => {
  const colors = initialLightTheme[key];
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
  gray: createDarkColorTheme('gray'),
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
  dustRed: createDarkColorTheme('dustRed'),
  volcano: createDarkColorTheme('volcano'),
  sunsetOrange: createDarkColorTheme('sunsetOrange'),
  limeV2: createDarkColorTheme('limeV2'),
  calendulaGold: createDarkColorTheme('calendulaGold'),
  sunriseYellow: createDarkColorTheme('sunriseYellow'),
  polarGreen: createDarkColorTheme('polarGreen'),
  cyanV2: createDarkColorTheme('cyanV2'),
  daybreakBlue: createDarkColorTheme('daybreakBlue'),
  geekBlue: createDarkColorTheme('geekBlue'),
  goldenPurple: createDarkColorTheme('goldenPurple'),
  frenchMagenta: createDarkColorTheme('frenchMagenta'),
};

export { initialDarkTheme, initialLightTheme };
