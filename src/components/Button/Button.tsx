import React, { useMemo } from 'react';
import { ColorValue, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { useThemedProps } from '../../hooks';
import { gray, useThemeButtonConfigSelector, useThemeColorsSelector } from '../../libraries';
import { getVariant, merge } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Box } from '../Box';
import { Text } from '../Typography';
import { BaseButton } from './BaseButton';
import { buttonLabelStyles, buttonRootContainerStyles, getButtonStyles, styles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      style,
      disabled,
      loading,
      label,
      labelStyles,
      labelColor,
      baseButtonStyles,
      disableRipple,
      flex,
      disableScaleAnimation = false,
      scaleAnimationValue = 0.99,
      baseButtonContainerStyle,
      rippleEdge,
      rippleProps,
      sx,
      backgroundColor,
      baseButtonSx,
      startIcon,
      endIcon,
      loadingIndicatorColor,
      loadingIndicatorVariant = 'gray',
      switchSpinnerMode = false,
      loadingIndicatorSize,
      size = 'medium',
      sizeConfig,
      overrideRootDisableScaleAnimation = false,
      overrideRootScaleAnimationValue = false,
      overrideRootRippleEdge = false,
      buttonColor = 'secondary',
      variation = 'contained',
      square = false,
      overrideRootSquareConfig = false,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const buttonThemeConfig = useThemeButtonConfigSelector();

    const isContainedButton = variation === 'contained';
    const isOutlinedButton = variation === 'outlined';
    const isTextButton = variation === 'text';

    const { startIcon: startThemedIcon, endIcon: endThemedIcon } = useThemedProps({
      startIcon,
      endIcon,
    });

    const {
      labelStyles: containedButtonLabelStyles,
      baseButtonStyles: containedBaseButtonStyles,
      style: containedButtonStyles,
    } = buttonThemeConfig?.contained || {};
    const {
      labelStyles: outlinedButtonLabelStyles,
      baseButtonStyles: outlinedBaseButtonStyles,
      style: outlinedButtonStyles,
    } = buttonThemeConfig?.outlined || {};
    const {
      labelStyles: textButtonLabelStyles,
      baseButtonStyles: textBaseButtonStyles,
      style: textButtonStyles,
    } = buttonThemeConfig?.text || {};

    const generateButtonLabelStyles = (): StyleProp<TextStyle> => {
      return [
        buttonThemeConfig?.labelStyles,
        isContainedButton && containedButtonLabelStyles,
        isOutlinedButton && outlinedButtonLabelStyles,
        isTextButton && textButtonLabelStyles,
        labelStyles,
      ].filter(Boolean);
    };

    const generateBaseButtonStyles = (): StyleProp<ViewStyle> => {
      return [
        buttonThemeConfig?.baseButtonStyles,
        isContainedButton && containedBaseButtonStyles,
        isOutlinedButton && outlinedBaseButtonStyles,
        isTextButton && textBaseButtonStyles,
        baseButtonStyles,
      ].filter(Boolean);
    };

    const generateButtonStyles = (): StyleProp<ViewStyle> => {
      return [
        buttonThemeConfig?.style,
        isContainedButton && containedButtonStyles,
        isOutlinedButton && outlinedButtonStyles,
        isTextButton && textButtonStyles,
        style,
      ].filter(Boolean);
    };

    const shouldDisableRipple = disableRipple ?? buttonThemeConfig?.disableRipple;

    const shouldDisableScaleAnimation = () => {
      if (overrideRootDisableScaleAnimation) {
        return disableScaleAnimation;
      }
      return buttonThemeConfig?.disableScaleAnimation ?? disableScaleAnimation;
    };

    const buttonScaleAnimationValue = () => {
      if (overrideRootScaleAnimationValue) {
        return scaleAnimationValue;
      }
      return buttonThemeConfig?.scaleAnimationValue ?? scaleAnimationValue;
    };

    const buttonRippleEdge = () => {
      if (overrideRootRippleEdge) {
        return rippleEdge;
      }
      return buttonThemeConfig?.rippleEdge ?? rippleEdge;
    };

    const mergeRippleProps = useMemo(() => {
      return merge(buttonThemeConfig?.rippleProps, rippleProps);
    }, [buttonThemeConfig?.rippleProps, rippleProps]);

    const buttonStyles = useMemo(() => {
      let applySquareStyle = false;

      if (overrideRootSquareConfig) {
        applySquareStyle = square;
      } else {
        applySquareStyle = buttonThemeConfig?.square ?? square;
      }

      return getButtonStyles({
        themeColors,
        variation,
        disabled,
        buttonColor,
        square: applySquareStyle,
        backgroundColor,
        size,
        sizeConfig: buttonThemeConfig?.sizeConfig ?? sizeConfig,
      });
    }, [
      overrideRootSquareConfig,
      themeColors,
      variation,
      disabled,
      buttonColor,
      square,
      buttonThemeConfig?.square,
      backgroundColor,
      size,
      sizeConfig,
      buttonThemeConfig?.sizeConfig,
    ]);

    const renderChild = () => {
      let textColor: ColorValue;
      let _loadingIndicatorColor = loadingIndicatorColor;

      if (labelColor) {
        textColor = labelColor;
      } else if (buttonThemeConfig?.labelColor) {
        textColor = buttonThemeConfig.labelColor;
      } else if (isContainedButton) {
        if (buttonColor === 'lightGrey') {
          textColor = themeColors.gray[900];
          _loadingIndicatorColor = themeColors.gray[900];
        } else if (buttonColor === 'warning') {
          textColor = gray[900];
          _loadingIndicatorColor = gray[900];
        } else {
          textColor = gray[50];
        }
      } else if (isOutlinedButton && (buttonColor === 'gray' || buttonColor === 'lightGrey')) {
        textColor = themeColors.gray[900];
      } else {
        textColor = getVariant({ variant: buttonColor, colors: themeColors });
      }

      if (loading) {
        return (
          <ActivityIndicator
            variant={loadingIndicatorVariant}
            color={_loadingIndicatorColor}
            switchMode={switchSpinnerMode}
            size={loadingIndicatorSize}
          />
        );
      }
      if (children) {
        return children;
      }
      return (
        <View style={styles.buttonLabelContainer}>
          <Text
            style={StyleSheet.flatten([
              { color: textColor },
              buttonLabelStyles({ size, sizeConfig: buttonThemeConfig?.sizeConfig ?? sizeConfig }),
              generateButtonLabelStyles(),
            ])}>
            {label}
          </Text>
        </View>
      );
    };

    return (
      <Box style={[buttonRootContainerStyles({ flex }), generateButtonStyles()]} sx={sx} ref={ref}>
        <BaseButton
          disabled={loading || disabled}
          style={[styles.baseButtonStyles, buttonStyles, generateBaseButtonStyles()]}
          disableRipple={shouldDisableRipple}
          disableScaleAnimation={shouldDisableScaleAnimation()}
          scaleAnimationValue={buttonScaleAnimationValue()}
          rippleEdge={buttonRippleEdge()}
          baseButtonContainerStyle={(buttonThemeConfig?.baseButtonContainerStyle, baseButtonContainerStyle)}
          rippleProps={mergeRippleProps}
          sx={baseButtonSx}
          {...props}>
          {startThemedIcon && <View style={styles.iconContainer}>{startThemedIcon}</View>}
          {renderChild()}
          {endThemedIcon && <View style={styles.iconContainer}>{endThemedIcon}</View>}
        </BaseButton>
      </Box>
    );
  },
);

Button.displayName = 'Button';
