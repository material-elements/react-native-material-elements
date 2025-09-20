import React, { useMemo } from 'react';
import { Animated, Text as RnText, useColorScheme } from 'react-native';
import { useRestyle } from '../../hooks';
import { useThemeFontSelector, useThemeTextConfigSelector } from '../../libraries';
import { maxLength as maxLengthUtile } from '../../utils';
import { generateTextStyles } from './Text.styles';
import { TextProps } from './Text.types';

export const Text = React.forwardRef<RnText, TextProps>(
  (
    {
      children,
      maxLength,
      variation,
      gutterBottom,
      error,
      errorColor,
      isActive,
      activeColor,
      style,
      sx,
      mode,
      color,
      gutterBottomSpace = 10,
      overrideRootGutterBottomConfig = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const themeTextConfig = useThemeTextConfigSelector();
    const themeFontConfig = useThemeFontSelector();
    const themeMode = useColorScheme();
    const { getStyleFromProps } = useRestyle(props);

    const hasMaxLength = maxLength ?? themeTextConfig?.maxLength;

    const themeGutterBottomSpace = () => {
      if (overrideRootGutterBottomConfig) {
        return gutterBottomSpace;
      }
      return themeTextConfig?.gutterBottomSpace ?? gutterBottomSpace;
    };

    const renderedChildren = useMemo(() => {
      if (hasMaxLength && typeof children !== 'string') {
        throw new Error('maxLength props must be used with string');
      }

      if (typeof children === 'string' && hasMaxLength) {
        return maxLengthUtile(children, hasMaxLength);
      }
      return children;
    }, [children, hasMaxLength]);

    return (
      <Animated.Text
        ref={ref}
        style={[
          generateTextStyles({
            variation,
            gutterBottom,
            gutterBottomSpace: themeGutterBottomSpace(),
            isActive,
            activeColor,
            disabled,
            error,
            errorColor,
            sx,
            mode,
            color,
            themeComponentConfig: themeTextConfig,
            themeFonts: themeFontConfig,
            themeMode,
          }),
          themeTextConfig?.style,
          getStyleFromProps(),
          style,
        ]}
        {...props}>
        {renderedChildren}
      </Animated.Text>
    );
  },
);

Text.displayName = 'Text';
