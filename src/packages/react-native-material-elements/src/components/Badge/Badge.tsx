import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useThemeBadgeConfigSelector, useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { Text } from '../Typography';
import { badgeContentDefaultStyles, generateBadgeContainerStyles, generateBadgeStyles } from './Badge.styles';
import { BadgeContainerProps, BadgeProps } from './Badge.types';
import { BADGE_ANIMATION_DURATION, BADGE_MAX_DEFAULT_VALUE, BADGE_TOP_RIGHT_POSITION } from './constants';
import { useRestyle } from '../../hooks';

const BadgeContainer = React.forwardRef<View, BadgeContainerProps>(({ children, style, overlap, ...props }, ref) => {
  return (
    <Box ref={ref} style={[styles.badgeContainer, generateBadgeContainerStyles({ overlap }), style]} {...props}>
      {children}
    </Box>
  );
});

export const Badge = React.forwardRef<View, BadgeProps>(
  (
    {
      children,
      style,
      badgeContent,
      invisible,
      badgeContentStyle,
      max = BADGE_MAX_DEFAULT_VALUE,
      shouldOverrideRootMaxValue = false,
      badgeAnimationDuration = BADGE_ANIMATION_DURATION,
      variant = 'badge',
      anchorOrigin = BADGE_TOP_RIGHT_POSITION,
      shouldOverrideRootAnchor = false,
      badgeContainerProps,
      containerStyles,
      overrideRootConfig = false,
      variation = 'secondary',
      overlap = 'rectangular',
      ...props
    },
    ref,
  ) => {
    const themeBadgeConfig = useThemeBadgeConfigSelector();
    const badgeVisibility = useRef(new Animated.Value(0)).current;
    const themeColors = useThemeColorsSelector();
    const { getStyleFromProps } = useRestyle(props);

    const animationDuration = badgeAnimationDuration ?? themeBadgeConfig?.badgeAnimationDuration;

    const badgeStyles = useMemo(() => {
      return generateBadgeStyles({
        themeComponentConfig: themeBadgeConfig,
        variation,
        badgeVisibility,
        variant,
        anchorOrigin,
        themeColors,
        overrideRootConfig,
        shouldOverrideRootAnchor,
      });
    }, [
      variation,
      badgeVisibility,
      variant,
      anchorOrigin,
      themeColors,
      themeBadgeConfig,
      overrideRootConfig,
      shouldOverrideRootAnchor,
    ]);

    const getDisplayBadgeContent = (badgeNumber: number, maxBadgeCount: number): string | number => {
      return badgeNumber >= maxBadgeCount ? `${maxBadgeCount - 1}+` : badgeNumber;
    };

    const renderBadgeContent = useCallback(
      (content: BadgeProps['badgeContent']) => {
        if (variant === 'dot') {
          return null;
        }

        if (typeof content === 'string' || typeof content === 'number') {
          return renderTextBadgeContent(content);
        }

        if (typeof content === 'object') {
          throw new Error('Badge content must be a string or number');
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [badgeContent, max, themeBadgeConfig, overrideRootConfig, variant],
    );

    const renderTextBadgeContent = useCallback(
      (content: string | number) => {
        const badgeNumber = Number(content);

        const textStyles = StyleSheet.flatten([styles.badgeContent, badgeContentDefaultStyles({ variation }), badgeContentStyle]);

        if (isNaN(badgeNumber)) {
          return <Text style={textStyles}>{content}</Text>;
        }

        let maxBadgeNumber: number;

        if (shouldOverrideRootMaxValue) {
          maxBadgeNumber = max;
        } else {
          maxBadgeNumber = themeBadgeConfig?.max ?? max;
        }

        return <Text style={textStyles}>{getDisplayBadgeContent(badgeNumber, overrideRootConfig ? max : maxBadgeNumber)}</Text>;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [badgeContent, max, themeBadgeConfig, shouldOverrideRootMaxValue, overrideRootConfig],
    );

    useEffect(() => {
      badgeVisibility.stopAnimation();
      Animated.timing(badgeVisibility, {
        toValue: badgeContent && !invisible ? 1 : 0,
        duration: overrideRootConfig ? badgeAnimationDuration : animationDuration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invisible, badgeContent]);

    return (
      <View style={[styles.container, containerStyles]} ref={ref}>
        <BadgeContainer overlap={overlap} {...badgeContainerProps}>
          {children}
        </BadgeContainer>
        <Animated.View style={[styles.badge, badgeStyles, themeBadgeConfig?.style, getStyleFromProps(), style]} {...props}>
          {renderBadgeContent(badgeContent)}
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  badgeContent: {
    fontWeight: '400',
    fontSize: 11,
  },
  container: {
    minWidth: 30,
    alignSelf: 'flex-start',
  },
  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'auto',
  },
  badge: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
});

Badge.displayName = 'Badge';
BadgeContainer.displayName = 'BadgeContainer';
