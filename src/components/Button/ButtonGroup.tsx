import _ from 'lodash';
import React, { useCallback } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { grey, useThemeButtonGroupConfigSelector, useThemeColorsSelector } from '../../libraries';
import { getVariant, VariantTypes } from '../../utils';
import { Box } from '../Box';
import { styles } from './Button.styles';
import { ButtonProps, ButtonVariations } from './Button.types';

export interface ButtonGroupProps extends ViewProps, Pick<ButtonProps, 'disableRipple' | 'baseButtonStyles' | 'sx'> {
  /** The size of the rounded corners for the buttons. */
  roundSize?: number;
  /** The width of the border around each button. */
  borderWidth?: number;
  /** Whether to remove borders from the buttons. */
  removeBorders?: boolean;
  /** The variation style of the buttons (e.g., primary, secondary). */
  variation?: ButtonVariations;
  /** The color type of the buttons (e.g., default, custom). */
  buttonColor?: VariantTypes;
  /**
   * If true, overrides the default border width configuration
   * for the root of the button group.
   */
  overrideRootBorderWidthConfig?: boolean;
  /**
   * If true, overrides the default configuration to remove borders
   * from the root of the button group.
   */
  overrideRootBorderRemoveConfig?: boolean;
}

interface GetBorderWidthInterface extends Pick<ButtonGroupProps, 'removeBorders' | 'borderWidth'> {
  /** Specifies the position of the button (left or right). */
  position: 'left' | 'right';
  /** Indicates if the button is the first in the group. */
  isFirst?: boolean;
  /** Indicates if the button is the last in the group. */
  isLast?: boolean;
}

export const ButtonGroup = React.forwardRef<View, ButtonGroupProps>(
  (
    {
      style,
      children,
      baseButtonStyles,
      sx,
      disableRipple,
      variation = 'contained',
      buttonColor = 'secondary',
      removeBorders = false,
      roundSize,
      borderWidth = 1,
      overrideRootBorderWidthConfig = false,
      overrideRootBorderRemoveConfig = false,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const themeButtonGroupConfig = useThemeButtonGroupConfigSelector();

    const buttonGroupRoundSize = roundSize ?? themeButtonGroupConfig?.roundSize;
    const buttonGroupDisableRipple = disableRipple ?? themeButtonGroupConfig?.disableRipple;

    const buttonGroupBorderWidth = () => {
      if (overrideRootBorderWidthConfig) {
        return borderWidth;
      }
      return themeButtonGroupConfig?.borderWidth ?? borderWidth;
    };

    const buttonGroupRemoveBorder = () => {
      if (overrideRootBorderRemoveConfig) {
        return removeBorders;
      }
      return themeButtonGroupConfig?.removeBorders ?? removeBorders;
    };

    const childrenCount = React.Children.count(children);
    const isOutlinedButton = variation === 'outlined';
    const isTextButton = variation === 'text';

    const getBorderWidth = ({
      position,
      isFirst,
      isLast,
      removeBorders: removeChildBorders,
      borderWidth: childBorderWidth,
    }: GetBorderWidthInterface) => {
      const isLeftPosition = position === 'left';

      if (!isFirst && !isLast && removeChildBorders) {
        return 0;
      }
      if (isLast && removeChildBorders && isLeftPosition) {
        return 0;
      }

      if (isFirst && !isTextButton && isLeftPosition) {
        return childBorderWidth;
      }
      if (isLast && !isTextButton && !isLeftPosition) {
        return childBorderWidth;
      }

      if (childrenCount === 2 && isLast && isLeftPosition) {
        return childBorderWidth;
      }

      if (childrenCount > 2) {
        if (isFirst && !isLeftPosition) {
          return 0;
        }
        if (!isFirst && !isLast) {
          return isLeftPosition ? childBorderWidth : 0;
        }
        if (isLast && isLeftPosition) {
          return childBorderWidth;
        }
      }

      return 0;
    };

    const renderElements = useCallback(() => {
      return React.Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;

        const borderStyles: ViewStyle = {
          borderTopLeftRadius: isFirst ? buttonGroupRoundSize : 0,
          borderBottomLeftRadius: isFirst ? buttonGroupRoundSize : 0,
          borderTopRightRadius: isLast ? buttonGroupRoundSize : 0,
          borderBottomRightRadius: isLast ? buttonGroupRoundSize : 0,
          borderColor: isOutlinedButton ? getVariant({ variant: buttonColor, colors: themeColors }) : grey[300],
          borderLeftWidth: getBorderWidth({
            position: 'left',
            isFirst,
            isLast,
            borderWidth: buttonGroupBorderWidth(),
            removeBorders: buttonGroupRemoveBorder(),
          }),
          borderRightWidth: getBorderWidth({
            position: 'right',
            isFirst,
            isLast,
            borderWidth: buttonGroupBorderWidth(),
            removeBorders: buttonGroupRemoveBorder(),
          }),
          ...(borderWidth && !isTextButton && { borderTopWidth: buttonGroupBorderWidth() }),
          ...(borderWidth && !isTextButton && { borderBottomWidth: buttonGroupBorderWidth() }),
        };

        if (React.isValidElement(child)) {
          const childProps: ButtonProps = {
            baseButtonStyles: _.merge({}, borderStyles, themeButtonGroupConfig?.baseButtonStyles, baseButtonStyles),
            disableScaleAnimation: true,
            variation,
            buttonColor,
            disableRipple: buttonGroupDisableRipple,
            style: { flex: 1 },
            ...child?.props,
          };
          return React.cloneElement(child, childProps);
        }
        return child;
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      buttonGroupRoundSize,
      children,
      borderWidth,
      removeBorders,
      themeButtonGroupConfig?.borderWidth,
      themeButtonGroupConfig?.removeBorders,
      variation,
      buttonColor,
      themeColors,
      buttonGroupDisableRipple,
      themeButtonGroupConfig?.baseButtonStyles,
      baseButtonStyles,
    ]);

    return (
      <Box style={[styles.buttonGroupContainer, themeButtonGroupConfig?.style, style]} sx={sx} {...props} ref={ref}>
        {renderElements()}
      </Box>
    );
  },
);
