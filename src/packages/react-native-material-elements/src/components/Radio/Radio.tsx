import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useRestyle } from '../../hooks';
import { useThemeColorsSelector, useThemeRadioConfigSelector } from '../../libraries';
import { StyledProps } from '../../libraries/style/styleTypes';
import { DefaultVariationOptions, getVariant, VariantTypes, VariationThemeConfig } from '../../utils';
import { BaseButton } from '../Button';
import { Divider, DividerProps } from '../Divider';
import { Text } from '../Typography';
import { TextProps } from '../types';
import { styles } from './Radio.styles';
import { RADIO_LARGE, RADIO_MEDIUM, RADIO_SMALL } from './constants';

export type RadioThemeConfig = {
  colors?: VariationThemeConfig<DefaultVariationOptions>;
};

export interface SizeConfig {
  small: number;
  medium: number;
  large: number;
}

export type RadioTypes = keyof SizeConfig;

export interface BaseInterface {
  /**
   * Indicates if the radio button is currently active
   */
  isActive?: boolean;
  /**
   * Duration of the animation in milliseconds
   */
  animationDuration?: number;
  /**
   * Size of the radio button, using keys from SizeConfig
   */
  size?: RadioTypes;
  /**
   * Custom size configuration for different radio button sizes
   */
  sizeConfig?: SizeConfig;
  /**
   * Color to use when the radio button is active
   */
  activeColor?: string;
  /**
   * Used for check the onPress event handler positioning in the top of the container or in the radio element.
   */
  actionType?: 'root' | 'element';
}

export interface RadioOutlineProps extends ViewProps, Omit<BaseInterface, 'size' | 'sizeConfig' | 'activeColor'> {}

export interface RadioCircleProps extends ViewProps, BaseInterface {
  /**
   * Variant type for customizing the appearance of the radio button
   */
  variant?: VariantTypes;
}

export interface RadioProps extends ViewProps, BaseInterface, StyledProps {
  /**
   * Variant type for customizing the appearance of the radio button
   */
  variant?: VariantTypes;
  /**
   * Function to handle press events on the radio button
   */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Test id for radio base button
   */
  radioBaseButtonTestId?: string;
  /**
   * Label to display alongside the radio button
   */
  label?: string;
  /**
   * Description text to provide more context for the radio button
   */
  description?: string;
  /**
   * Styles for the container holding the label
   */
  labelContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Additional props for customizing the label text
   */
  labelProps?: Omit<TextProps, 'children'>;
  /**
   * Additional properties for customizing the description text
   */
  descriptionProps?: Omit<TextProps, 'children'>;
  /**
   * Indicates whether the radio button is disabled
   */
  disabled?: boolean;
  /**
   * Custom content to display inside the radio button
   */
  radioItem?: React.ReactNode;
  /**
   * Styles for the container holding the radio item
   */
  radioItemContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Styles for the base button used in the radio button
   */
  baseButtonStyles?: StyleProp<ViewStyle>;
  /**
   * Content to display at the end of the radio button
   */
  adornment?: React.ReactNode;
  /**
   * Styles for the container holding the end adornment
   */
  adornmentContainerStyles?: StyleProp<ViewProps>;
  /**
   * Display the adornment at the end of the radio button of start of the radio button
   */
  adornmentType?: 'start' | 'end';
  /**
   * Show the divider element
   */
  showDivider?: boolean;
  /**
   * Customize the divider component.
   */
  dividerProps?: DividerProps;
}

export const Radio = React.forwardRef<View, RadioProps>(
  (
    {
      style,
      sizeConfig,
      onPress,
      label,
      labelProps,
      descriptionProps,
      activeColor,
      labelContainerStyles,
      description,
      radioItem,
      radioItemContainerStyles,
      baseButtonStyles,
      adornment,
      adornmentContainerStyles,
      dividerProps,
      radioBaseButtonTestId,
      showDivider = false,
      disabled = false,
      size = 'medium',
      isActive = false,
      animationDuration = 100,
      variant = 'info',
      actionType = 'element',
      adornmentType = 'end',
      ...props
    },
    ref,
  ) => {
    const radioThemeConfig = useThemeRadioConfigSelector();
    const { getStyleFromProps } = useRestyle(props);

    const { sizeConfig: themeSizeConfig = sizeConfig } = radioThemeConfig || {};

    const radioOnPressHandler = (event: GestureResponderEvent) => {
      if (!!onPress && typeof onPress === 'function') {
        onPress(event);
      }
    };

    const adornmentOnPressHandler = (event: GestureResponderEvent) => {
      if (actionType === 'root') {
        radioOnPressHandler(event);
      }
    };

    const renderAdornment = useCallback(() => {
      if (label || description || adornment) {
        const { sx: labelSx, ...restLabelProps } = labelProps || {};
        const { sx: descriptionSx, ...restDescriptionProps } = descriptionProps || {};

        const element = adornment ? (
          <View style={[adornmentContainerStyles]}>{adornment}</View>
        ) : (
          <View style={StyleSheet.flatten([radioThemeConfig?.labelContainerStyles, labelContainerStyles])}>
            {label && (
              <Text variation="h4" sx={labelSx} {...restLabelProps}>
                {label}
              </Text>
            )}
            {description && (
              <Text variation="h5" sx={descriptionSx} {...restDescriptionProps}>
                {description}
              </Text>
            )}
          </View>
        );

        return (
          <View style={[styles.contentContainer]}>
            <TouchableWithoutFeedback onPress={adornmentOnPressHandler}>{element}</TouchableWithoutFeedback>
          </View>
        );
      } else {
        return null;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      adornment,
      adornmentContainerStyles,
      label,
      description,
      labelProps,
      radioThemeConfig?.labelContainerStyles,
      labelContainerStyles,
      descriptionProps,
      actionType,
      isActive,
      adornmentType,
    ]);

    const renderDivider = useCallback(() => {
      return (
        <View>
          <Divider orientation="vertical" variant="middle" variantSpacing={10} {...dividerProps} />
        </View>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDivider, dividerProps]);

    return (
      <View ref={ref} style={[styles.radioRootContainer, radioThemeConfig?.style, getStyleFromProps(), style]} {...props}>
        {adornmentType === 'start' && (
          <React.Fragment>
            {renderAdornment()}
            {showDivider && renderDivider()}
          </React.Fragment>
        )}
        <View style={[styles.baseButtonContainer]}>
          <BaseButton
            onPress={radioOnPressHandler}
            disabled={disabled}
            disableRipple={true}
            style={[styles.baseButton, radioThemeConfig?.baseButtonStyles, baseButtonStyles]}
            disableScaleAnimation={true}
            testID={radioBaseButtonTestId}>
            <RadioOutline isActive={isActive} animationDuration={animationDuration}>
              {radioItem ? (
                <View style={[styles.radioItemContainer, radioThemeConfig?.radioItemContainerStyles, radioItemContainerStyles]}>
                  {isActive ? radioItem : null}
                </View>
              ) : (
                <RadioCircle
                  isActive={isActive}
                  variant={variant}
                  animationDuration={animationDuration}
                  size={size}
                  sizeConfig={themeSizeConfig}
                  activeColor={activeColor}
                />
              )}
            </RadioOutline>
          </BaseButton>
        </View>
        {adornmentType === 'end' && (
          <React.Fragment>
            {showDivider && renderDivider()}
            {renderAdornment()}
          </React.Fragment>
        )}
      </View>
    );
  },
);

const RadioOutline: React.FC<RadioOutlineProps> = ({ style, isActive, children, animationDuration, ...props }) => {
  const borderColorValue = useRef(new Animated.Value(0)).current;
  const themeColors = useThemeColorsSelector();

  useEffect(() => {
    Animated.timing(borderColorValue, {
      toValue: isActive ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const borderColorInterpolation = borderColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [themeColors.gray[400], themeColors.gray[800]],
  });

  return (
    <Animated.View style={[styles.radioOutline, { borderColor: borderColorInterpolation }, style]} {...props}>
      {children}
    </Animated.View>
  );
};

const RadioCircle: React.FC<RadioCircleProps> = ({
  style,
  variant,
  isActive,
  animationDuration,
  size,
  sizeConfig,
  activeColor,
  ...props
}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const backgroundColorValue = useRef(new Animated.Value(0)).current;

  const themeColors = useThemeColorsSelector();
  const radioThemeConfig = useThemeRadioConfigSelector();

  const { colors: themeVariantConfig } = radioThemeConfig || {};

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: isActive ? 1 : 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColorValue, {
        toValue: isActive ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, animationDuration]);

  const colorVariation = useMemo(
    () => getVariant({ variant, colors: themeColors, config: themeVariantConfig }),
    [variant, themeColors, themeVariantConfig],
  ) as string;

  const backgroundOutputRange = activeColor ?? colorVariation;

  const getSize = useMemo(() => {
    if (size === 'small') {
      return sizeConfig?.small ?? RADIO_SMALL;
    } else if (size === 'medium') {
      return sizeConfig?.medium ?? RADIO_MEDIUM;
    } else if (size === 'large') {
      return sizeConfig?.large ?? RADIO_LARGE;
    } else {
      return RADIO_SMALL;
    }
  }, [size, sizeConfig]);

  const backgroundColorInterpolation = backgroundColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [backgroundOutputRange, backgroundOutputRange],
  });

  const animatedStyle: ViewStyle = {
    transform: [{ scale: scaleValue }],
    opacity: opacityValue,
  };

  return (
    <Animated.View
      style={[
        styles.radioCircle,
        animatedStyle,
        { backgroundColor: backgroundColorInterpolation, width: getSize, height: getSize },
        style,
      ]}
      {...props}
    />
  );
};

Radio.displayName = 'Radio';
RadioOutline.displayName = 'RadioOutline';
RadioCircle.displayName = 'RadioCircle';
