import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatableNumericValue,
  Animated,
  DeviceEventEmitter,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Theme } from '../../libraries/themes/v1/theme';
import { maxLength as maxLengthUtile, screenHeight, VariantTypes } from '../../utils';
import { Button } from '../Button';
import { ButtonProps } from '../types';
import { Text } from '../Typography';
import { HIDE_SNACK_BAR_MESSAGE, SHOW_SNACK_BAR_MESSAGE, SNACK_BAR, SNACK_BAR_SCREEN_GAP } from './constants';
import { snackbarContainerStyles, snackBarLabelStyles, snackbarRootContainerStyle, styles } from './Snackbar.styles';

export type SnackbarType = 'error' | 'info' | 'success' | 'warning';
export interface SnackbarProperties {
  /** The message to be displayed in the Snackbar. */
  message: string;
  /** The type of Snackbar (e.g., error, info, success, warning). */
  type: SnackbarType;
  /** Whether to show an action button. */
  showActionButton?: boolean;
  /** The label for the action button. */
  actionButtonLabel?: string;
  /**
   * Callback for when the action button is pressed.
   * Receives the GestureResponderEvent as an argument.
   */
  actionButtonOnPress?: (event: GestureResponderEvent) => void;
  /** Duration of the Snackbar's entrance/exit animations in milliseconds. */
  animationDuration?: number;
  /** Duration in milliseconds after which the Snackbar will hide automatically. */
  hideDuration?: number;
  /** Whether the Snackbar should hide when the action button is clicked. */
  shouldHideWhenClickedOnActionButton?: boolean;
  /** Optional start adornment (e.g., icon) to display in the Snackbar. */
  startAdornment?: React.ReactNode;
  /** Styles for the container of the start adornment. */
  startAdornmentContainerStyles?: StyleProp<ViewStyle>;
  /** Optional additional item for the action button. */
  actionButtonItem?: React.ReactNode;
  /** Styles for the action button. */
  actionButtonStyles?: StyleProp<ViewStyle>;
  /** Different variants of the snackbar component */
  variant?: VariantTypes;
  /** Optional property for hide the adornment element */
  hideAdornment?: boolean;
  /** Max length of the snackbar component message. This will override the root config prop. */
  messageMaxLength?: number;
  /** Change the auto hide state of the snack bar component */
  autoHide?: boolean;
}
export interface SnackbarProps extends ViewProps {
  snackBarStyle?: ViewStyle;
  /** Styles for the Snackbar label container. */
  snackbarLabelContainerStyles?: StyleProp<ViewStyle>;
  /** Props for the label styles */
  labelStyle?: TextStyle;
  /** Position of the Snackbar, can be 'top' or 'bottom'. */
  position?: 'top' | 'bottom';
  /** Horizontal position of the snack bar  */
  horizontal?: 'left' | 'right';
  /** Whether the Snackbar should hide automatically after a specified duration. */
  autoHide?: boolean;
  /** Styles for the container of Snackbar options. */
  snackbarOptionContainerStyles?: StyleProp<ViewStyle>;
  /** Whether to disable padding in the label container. */
  disableLabelContainerPadding?: boolean;
  /** Source URI for the success image, if any. */
  successImageSource?: string;
  /** Source URI for the failure image, if any. */
  failureImageSource?: string;
  /** Source URI for the info image, if any. */
  InfoImageSource?: string;
  /** Source URI for the warning image, if any. */
  warningImageSource?: string;
  /** Additional props for the action button. */
  actionButtonProps?: Omit<
    ButtonProps,
    | 'children'
    | 'ref'
    | 'overrideRootSquareConfig'
    | 'overrideRootDisableScaleAnimation'
    | 'overrideRootScaleAnimationValue'
    | 'overrideRootRippleEdge'
  >;
  /** Max length of the snackbar component message */
  messageMaxLength?: number;
  /** Extra space from top or bottom */
  extraSpace?: number;
}
export interface SnackbarRootContainerStylesInterface extends Pick<SnackbarProps, 'horizontal'> {
  translateY: AnimatableNumericValue | `${number}%`;
  opacityValue?: Animated.Value;
}
export interface SnackbarContainerStylesInterface extends Pick<SnackbarProperties, 'variant'> {
  colors: Theme;
}
export interface SnackBarLabelStyles extends Pick<SnackbarProperties, 'variant'> {}

const defaultSuccessImage = require('./images/success.png');
const defaultFailureImage = require('./images/error.png');
const defaultInfoImage = require('./images/info.png');
const defaultWarningImage = require('./images/warning.png');

export const Snackbar: React.FC<SnackbarProps> = ({
  style,
  snackBarStyle,
  snackbarLabelContainerStyles,
  labelStyle,
  snackbarOptionContainerStyles,
  successImageSource,
  failureImageSource,
  InfoImageSource,
  warningImageSource,
  actionButtonProps,
  messageMaxLength,
  extraSpace = 0,
  disableLabelContainerPadding = false,
  autoHide = false,
  position = 'bottom',
  horizontal = 'left',
  onLayout,
  ...props
}) => {
  const positionRef = useRef(position);
  const autoHideRef = useRef(autoHide);
  const hideDuration = useRef(SNACK_BAR.LENGTH_SHORT);
  const animationDuration = useRef(SNACK_BAR.LENGTH_SHORT);

  const opacityValue = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(position === 'top' ? -100 : screenHeight)).current;
  const [visible, setVisible] = useState<boolean>(false);
  const themeColors = useThemeColorsSelector();

  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarProperties | null>(null);
  const [snackbarRootRectangle, setSnackbarRootRectangle] = useState<LayoutRectangle | null>(null);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    if (snackbarConfig?.autoHide !== undefined) {
      autoHideRef.current = snackbarConfig.autoHide;
    } else {
      autoHideRef.current = autoHide;
    }
  }, [autoHide, snackbarConfig?.autoHide]);

  useEffect(() => {
    if (position === 'top') {
      translateY.setValue(-100);
    } else {
      translateY.setValue(screenHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, screenHeight]);

  useEffect(() => {
    if (snackbarConfig?.hideDuration) {
      hideDuration.current = snackbarConfig.hideDuration;
    } else if (snackbarConfig?.animationDuration) {
      animationDuration.current = snackbarConfig.animationDuration;
    }
  }, [snackbarConfig?.hideDuration, snackbarConfig?.animationDuration]);

  const snackbarRootContainerOnLayout = (event: LayoutChangeEvent) => {
    if (onLayout && typeof onLayout === 'function') {
      onLayout(event);
    }
    const { layout } = event.nativeEvent;
    setSnackbarRootRectangle(layout);
  };

  const generateLabelStyle = useMemo(() => {
    return snackBarLabelStyles({ variant: snackbarConfig?.variant });
  }, [snackbarConfig?.variant]);

  const hideAnimation = useCallback(() => {
    const translateYToValue =
      positionRef.current === 'top' ? (snackbarRootRectangle?.height ? -snackbarRootRectangle.height : -100) : screenHeight;

    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: animationDuration.current,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: translateYToValue,
        duration: animationDuration.current,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setSnackbarConfig(null);
        setVisible(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackbarConfig, opacityValue, positionRef, snackbarRootRectangle, translateY, screenHeight, autoHideRef]);

  const startAnimation = useCallback(() => {
    const translateYToValue =
      positionRef.current === 'top'
        ? 30 + extraSpace
        : screenHeight - (snackbarRootRectangle?.height ? snackbarRootRectangle.height + SNACK_BAR_SCREEN_GAP : 100) - extraSpace;

    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: animationDuration.current,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: translateYToValue,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished && autoHideRef.current) {
        setTimeout(() => {
          hideAnimation();
        }, hideDuration.current);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackbarConfig, opacityValue, positionRef, snackbarRootRectangle, translateY, screenHeight, autoHideRef, extraSpace]);

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_SNACK_BAR_MESSAGE, (config: SnackbarProperties) => {
      setSnackbarConfig(config);
      setVisible(true);
      startAnimation();
    });

    DeviceEventEmitter.addListener(HIDE_SNACK_BAR_MESSAGE, () => {
      hideAnimation();
    });

    return () => {
      DeviceEventEmitter.removeAllListeners(SHOW_SNACK_BAR_MESSAGE);
      DeviceEventEmitter.removeAllListeners(HIDE_SNACK_BAR_MESSAGE);
    };
  }, [extraSpace, hideAnimation, startAnimation]);

  const actionButtonOnPressHandler = useCallback(
    (event: GestureResponderEvent) => {
      if (snackbarConfig?.shouldHideWhenClickedOnActionButton) {
        hideAnimation();
      }

      if (snackbarConfig?.actionButtonOnPress && typeof snackbarConfig.actionButtonOnPress === 'function') {
        snackbarConfig.actionButtonOnPress(event);
      }
    },
    [hideAnimation, snackbarConfig],
  );

  const renderAdornment = useCallback(() => {
    if (snackbarConfig?.hideAdornment) {
      return null;
    }

    let source: ImageSourcePropType = defaultInfoImage;

    if (snackbarConfig?.type === 'error') {
      source = failureImageSource ?? defaultFailureImage;
    } else if (snackbarConfig?.type === 'success') {
      source = successImageSource ?? defaultSuccessImage;
    } else if (snackbarConfig?.type === 'info') {
      source = InfoImageSource ?? defaultInfoImage;
    } else if (snackbarConfig?.type === 'warning') {
      source = warningImageSource ?? defaultWarningImage;
    }

    const child = snackbarConfig?.startAdornment ? snackbarConfig?.startAdornment : <Image source={source} style={styles.icon} />;

    return <View style={[styles.adornment]}>{child}</View>;
  }, [snackbarConfig, successImageSource, failureImageSource, InfoImageSource, warningImageSource]);

  const renderMessage = useCallback(() => {
    if (snackbarConfig?.messageMaxLength) {
      return maxLengthUtile(snackbarConfig.message, snackbarConfig.messageMaxLength);
    } else if (messageMaxLength && snackbarConfig?.message) {
      return maxLengthUtile(snackbarConfig.message, messageMaxLength);
    } else {
      return snackbarConfig?.message;
    }
  }, [messageMaxLength, snackbarConfig]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={StyleSheet.flatten([
        styles.snackbarRootContainer,
        snackbarRootContainerStyle({ horizontal, opacityValue, translateY }),
        style,
      ])}
      onLayout={snackbarRootContainerOnLayout}
      pointerEvents="box-none"
      {...props}>
      <View
        style={StyleSheet.flatten([
          styles.snackbar,
          snackbarContainerStyles({ colors: themeColors, variant: snackbarConfig?.variant }),
          snackBarStyle,
        ])}>
        <View style={styles.snackbarLabelWrapper}>
          {renderAdornment()}
          <View
            style={StyleSheet.flatten([
              styles.snackbarLabelContainer,
              snackbarLabelContainerStyles,
              { paddingLeft: disableLabelContainerPadding ? 0 : 10 },
            ])}>
            {Boolean(snackbarConfig?.message) && (
              <Text variation="h5" mode="light" style={StyleSheet.flatten([generateLabelStyle, labelStyle])}>
                {renderMessage()}
              </Text>
            )}
          </View>
        </View>
        {snackbarConfig?.showActionButton && (
          <View style={StyleSheet.flatten([styles.snackbarOptionContainer, snackbarOptionContainerStyles])}>
            <Button
              variation="text"
              label={snackbarConfig?.actionButtonLabel ?? 'HIDE'}
              onPress={actionButtonOnPressHandler}
              labelStyles={styles.buttonLabel}
              style={StyleSheet.flatten([snackbarConfig?.actionButtonStyles, styles.actionButtonContainer])}
              baseButtonStyles={styles.actionButton}
              {...actionButtonProps}>
              {snackbarConfig?.actionButtonItem}
            </Button>
          </View>
        )}
      </View>
    </Animated.View>
  );
};
