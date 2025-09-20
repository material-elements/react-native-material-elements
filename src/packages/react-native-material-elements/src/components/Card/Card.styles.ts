import { ViewStyle } from 'react-native';
import { Theme } from '../../libraries/themes/theme';
import { CardVariations } from './Card.types';

export const cardVariation = (variation: CardVariations, colors: Theme) => {
  const styles: ViewStyle = {};
  if (variation === 'outlined') {
    styles.borderColor = colors.gray[500];
    styles.borderWidth = 0.5;
    styles.borderRadius = 5;
  }

  return styles;
};
