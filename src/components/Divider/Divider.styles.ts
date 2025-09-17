import { ColorValue, StyleSheet, ViewStyle } from 'react-native';
import { DividerLineStyles, DividerRootContainerStyles } from './Divider';
import { grey } from '../../libraries';
import { getVariant } from '../../utils';

export const styles = StyleSheet.create({
  rootContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderWidth: 0.9,
  },
});

export const dividerLineStyles = ({
  colors,
  mode,
  borderColor,
  textAlign,
  lineType,
  color,
  themeColorSchemeConfig,
}: DividerLineStyles) => {
  let borderColorValue: ColorValue;

  if (borderColor) {
    borderColorValue = borderColor;
  } else if (color) {
    borderColorValue = getVariant({ colors, variant: color, config: themeColorSchemeConfig });
  } else if (mode === 'light') {
    borderColorValue = grey[400];
  } else {
    borderColorValue = grey[700];
  }

  let baseStyles: ViewStyle = {
    borderColor: borderColorValue,
  };
  const isStartLine = lineType === 'start';

  switch (textAlign) {
    case 'center':
      baseStyles.flex = 1;
      break;
    case 'left':
      isStartLine ? (baseStyles.flex = 0.2) : (baseStyles.flex = 0.8);
      break;
    case 'right':
      isStartLine ? (baseStyles.flex = 0.8) : (baseStyles.flex = 0.2);
      break;
  }

  if (isStartLine) {
    baseStyles.borderEndWidth = 0;
  } else {
    baseStyles.borderStartWidth = 0;
  }

  return baseStyles;
};

export const dividerRootContainerStyles = ({
  spacing,
  variant,
  orientation,
  gap,
  hasChild,
  variantSpacing,
}: DividerRootContainerStyles): ViewStyle => {
  const isVertical = orientation === 'vertical';

  const defaultStyles: ViewStyle = isVertical
    ? {
        paddingHorizontal: 2,
        alignSelf: 'auto',
        flexDirection: 'column',
      }
    : { paddingVertical: 2 };

  const baseStyles: ViewStyle = { ...defaultStyles, gap: gap || hasChild ? 10 : 0 };
  const elementSpacing = variantSpacing ?? spacing.lg;

  switch (variant) {
    case 'middle':
      isVertical ? (baseStyles.paddingVertical = elementSpacing) : (baseStyles.paddingHorizontal = elementSpacing);
      break;
    case 'startSpacing':
      isVertical ? (baseStyles.paddingTop = elementSpacing) : (baseStyles.paddingLeft = elementSpacing);
      break;
    case 'endSpacing':
      isVertical ? (baseStyles.paddingBottom = elementSpacing) : (baseStyles.paddingRight = elementSpacing);
      break;
  }

  return baseStyles;
};
