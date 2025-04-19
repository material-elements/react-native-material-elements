import React, { useMemo } from 'react';
import { ColorValue, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { grey, useThemeButtonConfigSelector, useThemeColorsSelector, useThemeSpacingSelector } from '../../libraries';
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
      loadingIndicatorVariant = 'grey',
      switchSpinnerMode = false,
      loadingIndicatorSize,
      size = 'large',
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
    const themeSpacing = useThemeSpacingSelector();
    const buttonThemeConfig = useThemeButtonConfigSelector();

    const isContainedButton = variation === 'contained';
    const isOutlinedButton = variation === 'outlined';
    const isTextButton = variation === 'text';

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
        spacing: themeSpacing,
        themeColors,
        variation,
        disabled,
        buttonColor,
        square: applySquareStyle,
        backgroundColor,
        size,
      });
    }, [
      overrideRootSquareConfig,
      themeSpacing,
      themeColors,
      variation,
      disabled,
      buttonColor,
      square,
      buttonThemeConfig?.square,
      backgroundColor,
      size,
    ]);

    const renderChild = () => {
      if (loading) {
        return (
          <ActivityIndicator
            variant={loadingIndicatorVariant}
            color={loadingIndicatorColor}
            switchMode={switchSpinnerMode}
            size={loadingIndicatorSize}
          />
        );
      }
      if (children) {
        return children;
      }

      let textColor: ColorValue;

      if (labelColor) {
        textColor = labelColor;
      } else if (buttonThemeConfig?.labelColor) {
        textColor = buttonThemeConfig.labelColor;
      } else if (isContainedButton) {
        textColor = grey[50];
      } else if (isOutlinedButton && (buttonColor === 'grey' || buttonColor === 'lightGrey')) {
        textColor = themeColors.grey[900];
      } else {
        textColor = getVariant({ variant: buttonColor, colors: themeColors });
      }

      return (
        <View style={styles.buttonLabelContainer}>
          <Text style={StyleSheet.flatten([{ color: textColor }, buttonLabelStyles({ size }), generateButtonLabelStyles()])}>
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
          {startIcon && <View style={styles.iconContainer}>{startIcon}</View>}
          {renderChild()}
          {endIcon && <View style={styles.iconContainer}>{endIcon}</View>}
        </BaseButton>
      </Box>
    );
  },
);

Button.displayName = 'Button';
