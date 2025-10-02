import React, { useMemo, useState } from 'react';
import {
  Animated,
  ColorValue,
  DimensionValue,
  LayoutChangeEvent,
  LayoutRectangle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useRestyle } from '../../hooks';
import { useThemeColorsSelector } from '../../libraries';
import { StyledProps } from '../../libraries/style/styleTypes';
import { Theme } from '../../libraries/types';
import { MeasureElementRect, PortalProps } from '../../types';
import { screenHeight, screenWidth } from '../../utils';
import { Portal } from '../Portal';
import { menuContainerStyle, styles } from './Menu.styles';

export type MenuProps = ViewProps & {
  /** Controls whether the menu is open or closed */
  open?: boolean;

  /** Callback function triggered when the menu is requested to close */
  onClose?: () => void;

  /** The reference element used to position the menu */
  anchorEl?: MeasureElementRect | null;

  /** Space between the menu and the anchor element */
  elemSpace?: number;

  /** The width of the menu, accepts values like 'auto', '100%', or specific dimensions */
  width?: DimensionValue;

  /** The height of the menu, accepts values like 'auto', '100%', or specific dimensions */
  height?: DimensionValue;

  /** The border color of the menu */
  borderColor?: ColorValue;

  /** The background color of the menu */
  backgroundColor?: ColorValue;

  /** If true, the menu takes up the full width of its container */
  fullWidth?: boolean;

  /** Extra spacing added to adjust the vertical position of the menu */
  menuYPosSpacer?: number;

  /** The spacing from the screen edges to prevent overflow */
  screenSideSpacer?: number;

  /** Test id for portal component */
  portalTestId?: string;

  portalProps?: PortalProps;
} & StyledProps;

export type MenuContainerStyle = Pick<MenuProps, 'borderColor' | 'width' | 'height' | 'backgroundColor' | 'fullWidth'> & {
  theme: Theme;
};

const SCREEN_SIDE_SPACER = 30;
const SCREEN_BOTTOM_SPACER = 100;
const MENU_Y_POS_SPACER = 10;

export const Menu = React.forwardRef<View, MenuProps>(
  (
    {
      open,
      onClose,
      children,
      style,
      anchorEl,
      width,
      height,
      backgroundColor,
      portalProps,
      portalTestId = 'menu-portal-test-id',
      elemSpace = 3,
      fullWidth = false,
      menuYPosSpacer = MENU_Y_POS_SPACER,
      screenSideSpacer = SCREEN_SIDE_SPACER,
      ...props
    },
    ref,
  ) => {
    const [menuRect, setMenuRect] = useState<LayoutRectangle | null>(null);
    const themeColors = useThemeColorsSelector();
    const { getStyleFromProps } = useRestyle(props);

    const { modalContainerProps, ...rest } = portalProps || {};

    const calculateXPosition = useMemo(() => {
      if (menuRect && anchorEl) {
        const menuRightEdge = anchorEl.pageX + menuRect.width;

        if (menuRightEdge + screenSideSpacer > screenWidth) {
          return Math.abs(menuRect.width - anchorEl.pageX) + anchorEl.width - 10;
        } else {
          return anchorEl.x;
        }
      }
      return 0;
    }, [menuRect, anchorEl, screenSideSpacer]);

    const calculateYPosition = useMemo(() => {
      if (anchorEl && menuRect) {
        if (menuRect.height + anchorEl.pageY + SCREEN_BOTTOM_SPACER > screenHeight) {
          return Math.abs(anchorEl.pageY - menuRect.height - menuYPosSpacer);
        }
        return anchorEl.height + anchorEl.pageY;
      }
      return 0;
    }, [anchorEl, menuRect, menuYPosSpacer]);

    const animatedStyles: ViewStyle = {
      transform: [{ translateX: !fullWidth ? calculateXPosition : 0 }, { translateY: calculateYPosition + elemSpace }],
    };

    const menuViewOnLayout = function (event: LayoutChangeEvent) {
      const { layout } = event.nativeEvent;
      setMenuRect(layout);
    };

    return (
      <Portal
        animationType="fade"
        visible={open}
        onClose={onClose}
        modalContainerProps={{ ...modalContainerProps, style: [styles.dropDownModal, modalContainerProps?.style] }}
        testID={portalTestId}
        {...rest}>
        <Animated.View
          style={[
            styles.menuContainer,
            animatedStyles,
            menuContainerStyle({ theme: themeColors, width, height, backgroundColor, fullWidth }),
            getStyleFromProps(),
            style,
          ]}
          ref={ref}
          onLayout={menuViewOnLayout}
          {...props}>
          {children}
        </Animated.View>
      </Portal>
    );
  },
);
