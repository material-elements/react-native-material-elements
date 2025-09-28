import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useRestyle, useThemedProps } from '../../hooks';
import { useThemeColorsSelector, useThemeIconButtonConfigSelector } from '../../libraries';
import { merge } from '../../utils';
import { BaseButton } from './BaseButton';
import { getButtonStyles } from './Button.styles';
import { IconButtonProps } from './Button.types';

export const IconButton = React.forwardRef<View, IconButtonProps>(
  (
    {
      disabled,
      children,
      style,
      rippleProps,
      icon,
      overrideRootRippleEdge = false,
      disableRipple = false,
      overrideRootDisableRippleEffect = false,
      overrideRootVariation = false,
      rippleEdge = 'center',
      variation = 'roundedIconButton',
      ...props
    },
    ref,
  ) => {
    const { getStyleFromProps } = useRestyle(props);
    const themeColors = useThemeColorsSelector();
    const iconButtonThemeConfig = useThemeIconButtonConfigSelector();
    const { icon: themedIcon } = useThemedProps({
      icon,
    });

    const isRoundedIconButton = variation === 'roundedIconButton';

    const { style: roundedIconButtonStyles } = iconButtonThemeConfig?.roundedIconButton || {};
    const { style: squareIconButtonStyles } = iconButtonThemeConfig?.squareIconButton || {};

    const generateButtonStyles = (): StyleProp<ViewStyle> => {
      return [iconButtonThemeConfig?.style, isRoundedIconButton ? roundedIconButtonStyles : squareIconButtonStyles, style].filter(
        Boolean,
      );
    };

    const iconButtonVariation = () => {
      if (overrideRootVariation) {
        return variation;
      }
      return iconButtonThemeConfig?.variation ?? variation;
    };

    const iconButtonDisableRipple = () => {
      if (overrideRootDisableRippleEffect) {
        return disableRipple;
      }
      return iconButtonThemeConfig?.disableRipple ?? disableRipple;
    };

    const iconButtonRippleEdge = () => {
      if (overrideRootRippleEdge) {
        return rippleEdge;
      }
      return iconButtonThemeConfig?.rippleEdge ?? rippleEdge;
    };

    const mergeRippleProps = useMemo(() => {
      return merge(iconButtonThemeConfig?.rippleProps, rippleProps);
    }, [iconButtonThemeConfig?.rippleProps, rippleProps]);

    const iconButtonStyles = useMemo(
      () =>
        getButtonStyles({
          variation: iconButtonVariation(),
          disabled,
          themeColors,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [disabled, overrideRootVariation, themeColors, variation],
    );

    return (
      <BaseButton
        ref={ref}
        style={[iconButtonStyles, getStyleFromProps(), generateButtonStyles()]}
        rippleProps={mergeRippleProps}
        disableRipple={iconButtonDisableRipple()}
        rippleEdge={iconButtonRippleEdge()}
        {...props}>
        {themedIcon ?? children}
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
