import { ColorValue, StyleSheet, ViewStyle } from 'react-native';
import { DividerLineStyles, DividerRootContainerStyles } from './Divider';
import { gray } from '../../libraries';
import { getVariant } from '../../utils';

export const styles = StyleSheet.create({
  rootContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const dividerLineStyles = ({
  colors,
  mode,
  backgroundColor,
  textAlign,
  lineType,
  color,
  themeColorSchemeConfig,
  orientation,
}: DividerLineStyles) => {
  let _backgroundColor: ColorValue;
  const isVertical = orientation === 'vertical';

  if (backgroundColor) {
    _backgroundColor = backgroundColor;
  } else if (color) {
    _backgroundColor = getVariant({ colors, variant: color, config: themeColorSchemeConfig });
  } else if (mode === 'light') {
    _backgroundColor = gray[400];
  } else {
    _backgroundColor = gray[700];
  }

  let baseStyles: ViewStyle = {
    backgroundColor: _backgroundColor,
  };

  if (isVertical) {
    baseStyles.width = 0.6;
  } else {
    baseStyles.height = 0.6;
  }

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

  return baseStyles;
};

export const dividerRootContainerStyles = ({
  spacing,
  variant,
  orientation,
  gap,
  hasChild,
  variantSpacing,
  dividerLayout,
}: DividerRootContainerStyles): ViewStyle => {
  const isVertical = orientation === 'vertical';

  const defaultStyles: ViewStyle = isVertical
    ? {
        paddingHorizontal: 2,
        alignSelf: 'flex-start',
        flexDirection: 'column',
      }
    : { paddingVertical: 2 };

  const baseStyles: ViewStyle = { ...defaultStyles, gap: gap || hasChild ? 10 : 0 };

  let elementSpacing: number;

  if (variantSpacing) {
    elementSpacing = variantSpacing;
  } else {
    if (dividerLayout) {
      if (isVertical) {
        elementSpacing = dividerLayout.height / 6;
      } else {
        elementSpacing = dividerLayout.width / 6;
      }
    } else {
      elementSpacing = spacing.lg;
    }
  }

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
