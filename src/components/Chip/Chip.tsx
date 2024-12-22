import React, { useCallback, useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useThemeChipConfigSelector, useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { Text } from '../Typography';
import { generateChipStyles, labelStyles, styles } from './Chip.style';
import { ChipProps } from './Chip.types';
import { DEFAULT_BORDER_RADIUS, SQUARE_BORDER_RADIUS } from './constants';

export const Chip = React.forwardRef<View, ChipProps>(
  (
    {
      label,
      disabled,
      disableRipple,
      style,
      chipWrapperContainerStyles,
      labelColor,
      startIcon,
      endIcon,
      startIconProps,
      endIconProps,
      children,
      activeLabelColor,
      backgroundColor,
      activeBackgroundColor,
      isActive = false,
      variant = 'filled',
      color = 'secondary',
      square = false,
      syncBorderAndLabelColor = false,
      overrideRootSquareConfig = false,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const isOutlinedVariant = variant === 'outlined';
    const hasIcon = Boolean(startIcon) || Boolean(endIcon);
    const chipThemeConfig = useThemeChipConfigSelector();

    const isOutlinedChip = variant === 'outlined';

    const { style: outlinedChipStyles, chipWrapperContainerStyles: outlinedChipChipWrapperContainerStyles } =
      chipThemeConfig?.outlined || {};
    const { style: fieldChipStyles, chipWrapperContainerStyles: fieldChipChipWrapperContainerStyles } =
      chipThemeConfig?.filled || {};
    const { colors: themeColorScheme } = chipThemeConfig || {};

    const chipLabelColor = labelColor ?? chipThemeConfig?.labelColor;

    const computeChipStyles = (): StyleProp<ViewStyle> => {
      return [chipThemeConfig?.style, isOutlinedChip ? outlinedChipStyles : fieldChipStyles, style].filter(Boolean);
    };

    const generateChipWrapperContainerStyles = (): StyleProp<ViewStyle> => {
      return [
        chipThemeConfig?.chipWrapperContainerStyles,
        isOutlinedChip ? outlinedChipChipWrapperContainerStyles : fieldChipChipWrapperContainerStyles,
        chipWrapperContainerStyles,
      ].filter(Boolean);
    };

    const chipSquareHandler = () => {
      if (overrideRootSquareConfig) {
        return square;
      }
      return chipThemeConfig?.square ?? square;
    };

    const chipStyles = useMemo(
      () =>
        generateChipStyles({
          variant,
          disabled,
          color,
          colors: themeColors,
          colorSchemeConfig: themeColorScheme,
          isActive,
          backgroundColor,
          activeBackgroundColor,
        }),
      [variant, disabled, color, themeColors, themeColorScheme, isActive, backgroundColor, activeBackgroundColor],
    );

    const renderLabel = useCallback(() => {
      return (
        <Text
          style={labelStyles({
            isOutlinedVariant,
            colors: themeColors,
            labelColor: chipLabelColor,
            color,
            syncBorderAndLabelColor,
            colorSchemeConfig: themeColorScheme,
            isActive,
            activeLabelColor,
          })}
          variation="h4">
          {label}
        </Text>
      );
    }, [
      themeColors,
      label,
      isOutlinedVariant,
      chipLabelColor,
      color,
      themeColorScheme,
      syncBorderAndLabelColor,
      isActive,
      activeLabelColor,
    ]);

    if (hasIcon && !children) {
      return (
        <Box
          style={StyleSheet.flatten([styles.chip, chipStyles, style, { borderRadius: chipSquareHandler() ? 5 : 20 }])}
          ref={ref}>
          <Box style={StyleSheet.flatten([styles.chipWrapper, generateChipWrapperContainerStyles()])}>
            {startIcon && <TouchableOpacity {...startIconProps}>{startIcon}</TouchableOpacity>}
            {renderLabel()}
            {endIcon && <TouchableOpacity {...endIconProps}>{endIcon}</TouchableOpacity>}
          </Box>
        </Box>
      );
    }

    return (
      <BaseButton
        disabled={disabled}
        disableRipple={disableRipple}
        scaleAnimationValue={0.96}
        style={StyleSheet.flatten([
          styles.chip,
          chipStyles,
          { borderRadius: chipSquareHandler() ? SQUARE_BORDER_RADIUS : DEFAULT_BORDER_RADIUS },
          computeChipStyles(),
        ])}
        ref={ref}
        {...props}>
        <Box style={StyleSheet.flatten([styles.chipWrapper, generateChipWrapperContainerStyles()])}>
          {children ?? renderLabel()}
        </Box>
      </BaseButton>
    );
  },
);

Chip.displayName = 'Chip';
