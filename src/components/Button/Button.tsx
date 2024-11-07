import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { grey, useTheme } from '../../libraries';
import { generateElementStyles, getVariant } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Text } from '../Typography';
import { BaseButton } from './BaseButton';
import { getButtonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      style,
      sx,
      disabled,
      fullWidth,
      disableElevation,
      loading,
      label,
      labelStyles,
      labelColor,
      buttonColor = 'secondary',
      variation = 'contained',
      square = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const isContainedButton = variation === 'contained';

    const baseButtonStyles = useMemo(() => {
      const styles = getButtonStyles({ theme, variation, fullWidth, disableElevation, disabled, buttonColor, square });
      return StyleSheet.create({ generated: styles });
    }, [theme, variation, fullWidth, disableElevation, disabled, buttonColor, square]);

    const renderChild = useCallback(() => {
      if (loading) {
        return <ActivityIndicator />;
      } else if (children) {
        return children;
      } else {
        const textColor = labelColor ?? (isContainedButton ? grey[50] : getVariant({ variant: buttonColor, theme }));

        return <Text style={StyleSheet.flatten([{ color: textColor }, labelStyles])}>{label}</Text>;
      }
    }, [loading, children, labelStyles, theme, variation, buttonColor, labelColor]);

    return (
      <BaseButton
        disabled={loading || disabled}
        ref={ref}
        style={StyleSheet.flatten([baseButtonStyles.generated, sx && generateElementStyles(sx), style])}
        {...props}>
        {renderChild()}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';
