import { ColorValue } from 'react-native';
import { getVariant, GetVariantArgs } from '../../utils';
import { GetActivityIndicatorColor } from './ActivityIndicator.types';
import { green, grey, lightBlue, primary, red, secondary, yellow } from '../../libraries';

const colorConfig: GetVariantArgs<unknown>['config'] = {
  primary: { color: primary[500] },
  secondary: { color: secondary[400] },
  error: { color: red[500] },
  info: { color: lightBlue[500] },
  success: { color: green[500] },
  warning: { color: yellow[500] },
  grey: { color: grey[50] },
  lightGrey: { color: grey[500] },
};

export const getActivityIndicatorColor = ({ variant, colors, switchMode }: GetActivityIndicatorColor): ColorValue => {
  const color = getVariant({
    variant,
    colors,
    ...(!switchMode && { config: colorConfig }),
  });
  return color;
};
