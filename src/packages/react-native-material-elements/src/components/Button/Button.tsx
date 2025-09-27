import React, { useMemo } from 'react';
import { ColorValue, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { useThemedProps } from '../../hooks';
import { gray, useThemeButtonConfigSelector, useThemeColorsSelector } from '../../libraries';
import { getVariant, merge } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Text } from '../Typography';
import { BaseButton } from './BaseButton';
import { buttonLabelStyles, getButtonStyles, styles } from './Button.styles';
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
      disableRipple,
      disableScaleAnimation = false,
      scaleAnimationValue = 0.99,
      buttonContainerStyle,
      rippleEdge,
      rippleProps,
      sx,
      backgroundColor,
      startIcon,
      endIcon,
      loadingIndicatorColor,
      loadingIndicatorVariant = 'gray',
      switchSpinnerMode = false,
      loadingIndicatorSize = 'small',
      size = 'medium',
      sizeConfig,
      buttonColor = 'primary',
      variation = 'contained',
      loaderTestId = 'button-loader',
      square = false,
      overrideRootSquareConfig = false,
      startIconContainerStyles,
      endIconContainerStyles,
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

    const { labelStyles: containedButtonLabelStyles, style: containedButtonStyles } = buttonThemeConfig?.contained || {};
    const { labelStyles: outlinedButtonLabelStyles, style: outlinedButtonStyles } = buttonThemeConfig?.outlined || {};
    const { labelStyles: textButtonLabelStyles, style: textButtonStyles } = buttonThemeConfig?.text || {};

    const getButtonSpacing = (): StyleProp<ViewStyle> => {
      if (startIcon && endIcon) {
        return styles.rightAndLeftButtonPadding;
      } else if (startIcon) {
        return styles.leftLabelPadding;
      } else if (endIcon) {
        return styles.rightLabelPadding;
      } else {
        return styles.rightAndLeftButtonPaddingWithoutIcon;
      }
    };

    const generateButtonLabelStyles = (): StyleProp<TextStyle> => {
      return [
        buttonThemeConfig?.labelStyles,
        isContainedButton && containedButtonLabelStyles,
        isOutlinedButton && outlinedButtonLabelStyles,
        isTextButton && textButtonLabelStyles,
        buttonLabelStyles({ size, sizeConfig: buttonThemeConfig?.sizeConfig ?? sizeConfig }),
        getButtonSpacing(),
        labelStyles,
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
      return disableScaleAnimation ?? buttonThemeConfig?.disableScaleAnimation;
    };

    const buttonScaleAnimationValue = () => {
      return scaleAnimationValue ?? buttonThemeConfig?.scaleAnimationValue;
    };

    const buttonRippleEdge = () => {
      return rippleEdge ?? buttonThemeConfig?.rippleEdge;
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

    const renderActivityIndicator = () => {
      let _loadingIndicatorColor = loadingIndicatorColor;

      if (isContainedButton) {
        if (buttonColor === 'lightGray') {
          _loadingIndicatorColor = themeColors.gray[900];
        } else if (buttonColor === 'warning') {
          _loadingIndicatorColor = gray[900];
        }
      }

      return (
        <ActivityIndicator
          variant={loadingIndicatorVariant}
          color={_loadingIndicatorColor}
          switchMode={switchSpinnerMode}
          size={loadingIndicatorSize}
          testID={loaderTestId}
        />
      );
    };

    const renderChild = () => {
      let textColor: ColorValue;

      if (labelColor) {
        textColor = labelColor;
      } else if (buttonThemeConfig?.labelColor) {
        textColor = buttonThemeConfig.labelColor;
      } else if (isContainedButton) {
        if (buttonColor === 'lightGray') {
          textColor = themeColors.gray[900];
        } else if (buttonColor === 'warning') {
          textColor = gray[900];
        } else {
          textColor = gray[50];
        }
      } else if (isOutlinedButton && (buttonColor === 'gray' || buttonColor === 'lightGray')) {
        textColor = themeColors.gray[900];
      } else {
        textColor = getVariant({ variant: buttonColor, colors: themeColors });
      }

      if (children) {
        return children;
      }
      return (
        <View style={styles.buttonLabelContainer}>
          <Text style={StyleSheet.flatten([{ color: textColor }, generateButtonLabelStyles()])}>{label}</Text>
        </View>
      );
    };

    return (
      <BaseButton
        disabled={loading || disabled}
        style={[styles.buttonStyles, buttonStyles, generateButtonStyles()]}
        disableRipple={shouldDisableRipple}
        disableScaleAnimation={shouldDisableScaleAnimation()}
        scaleAnimationValue={buttonScaleAnimationValue()}
        rippleEdge={buttonRippleEdge()}
        buttonContainerStyle={[buttonThemeConfig?.buttonContainerStyle, buttonContainerStyle]}
        rippleProps={mergeRippleProps}
        sx={sx}
        ref={ref}
        {...props}>
        {(startThemedIcon || loading) && (
          <View style={[styles.iconContainer, styles.leftIconContainer, startIconContainerStyles]}>
            {loading ? renderActivityIndicator() : startThemedIcon}
          </View>
        )}
        {renderChild()}
        {endThemedIcon && (
          <View style={[styles.iconContainer, styles.rightIconContainer, endIconContainerStyles]}>{endThemedIcon}</View>
        )}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';
