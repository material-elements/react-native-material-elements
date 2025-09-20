import _ from 'lodash';
import React, { useCallback } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { gray, useThemeButtonGroupConfigSelector, useThemeColorsSelector } from '../../libraries';
import { StyledProps } from '../../libraries/style/styleTypes';
import { getVariant, VariantTypes } from '../../utils';
import { Box } from '../Box';
import { styles } from './Button.styles';
import { ButtonProps, ButtonVariations } from './Button.types';
import { useRestyle } from '../../hooks';

export interface ButtonGroupProps extends ViewProps, Pick<ButtonProps, 'disableRipple' | 'baseButtonStyles' | 'sx'>, StyledProps {
  /** The size of the rounded corners for the buttons. */
  roundSize?: number;
  /** The width of the border around each button. */
  borderWidth?: number;
  /** The variation style of the buttons (e.g., primary, secondary). */
  variation?: ButtonVariations;
  /** The color type of the buttons (e.g., default, custom). */
  buttonColor?: VariantTypes;
  /**
   * If true, overrides the default border width configuration
   * for the root of the button group.
   */
  overrideRootBorderWidthConfig?: boolean;
}

interface GetBorderWidthInterface extends Pick<ButtonGroupProps, 'borderWidth'> {
  /** Specifies the position of the button (left or right). */
  position: 'left' | 'right';
  /** Indicates if the button is the first in the group. */
  isFirst?: boolean;
  /** Indicates if the button is the last in the group. */
  isLast?: boolean;
}

const DEFAULT_BORDER_WIDTH = 1;

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
      roundSize,
      borderWidth = DEFAULT_BORDER_WIDTH,
      overrideRootBorderWidthConfig = false,
      ...props
    },
    ref,
  ) => {
    const isOutlinedButton = variation === 'outlined';
    const isTextButton = variation === 'text';

    const { getStyleFromProps } = useRestyle(props);
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

    const getBorderWidth = ({
      position,
      isFirst,
      isLast,
      borderWidth: childBorderWidth = DEFAULT_BORDER_WIDTH,
    }: GetBorderWidthInterface): number => {
      const isLeftPosition = position === 'left';

      if (!isFirst && isLeftPosition && !isTextButton) {
        return borderWidth;
      } else if (isOutlinedButton && ((isFirst && isLeftPosition) || (isLast && !isLeftPosition))) {
        return childBorderWidth;
      } else if (isTextButton && !isFirst && ((!isLast && isLeftPosition) || (isLast && isLeftPosition))) {
        return borderWidth;
      } else {
        return 0;
      }
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
          borderColor: isOutlinedButton ? getVariant({ variant: buttonColor, colors: themeColors }) : gray[200],
          borderLeftWidth: getBorderWidth({
            position: 'left',
            isFirst,
            isLast,
            borderWidth: buttonGroupBorderWidth(),
          }),
          borderRightWidth: getBorderWidth({
            position: 'right',
            isFirst,
            isLast,
            borderWidth: buttonGroupBorderWidth(),
          }),
        };

        if (React.isValidElement(child)) {
          const childProps: ButtonProps = {
            baseButtonStyles: _.merge({}, borderStyles, themeButtonGroupConfig?.baseButtonStyles, baseButtonStyles),
            disableScaleAnimation: true,
            variation,
            buttonColor,
            disableRipple: buttonGroupDisableRipple,
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
      themeButtonGroupConfig?.borderWidth,
      variation,
      buttonColor,
      themeColors,
      buttonGroupDisableRipple,
      themeButtonGroupConfig?.baseButtonStyles,
      baseButtonStyles,
    ]);

    return (
      <Box
        style={[styles.buttonGroupContainer, themeButtonGroupConfig?.style, getStyleFromProps(), style]}
        sx={sx}
        {...props}
        ref={ref}>
        {renderElements()}
      </Box>
    );
  },
);
