import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, LayoutRectangle, View } from 'react-native';
import { AnimatedView, Box } from '../Box';
import { Text } from '../Typography';
import { BadgeContainerProps, BadgeProps } from './BadgeTypes';
import { BADGE_ANIMATION_DURATION, BADGE_MAX_DEFAULT_VALUE } from './constants';
import { BadgeContainerDefaultStyles, BadgeContentDefaultStyles, BadgeDefaultStyles, generateBadgeStyles } from './utils';

const BadgeContainer = React.forwardRef<View, BadgeContainerProps>(({ children, style, ...props }, ref) => {
  return (
    <Box ref={ref} style={[BadgeContainerDefaultStyles, style]} {...props}>
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
      variation,
      invisible,
      badgeAnimationDuration,
      badgeContentProps,
      max,
      variant,
      anchorOrigin,
      badgeContainerProps,
      ...props
    },
    ref,
  ) => {
    const [badgeContainerLayoutRect, setBadgeContainerLayoutRect] = useState<LayoutRectangle>();
    const badgeVisibility = useRef(new Animated.Value(1)).current;
    const maxValueLimit = max || BADGE_MAX_DEFAULT_VALUE;

    const badgeContainerLayoutHandler = (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent;
      setBadgeContainerLayoutRect(layout);
    };

    const renderBadgeContent = function (content: BadgeProps['badgeContent']) {
      if (variant === 'dot') return null;

      if (typeof content === 'string' || typeof content === 'number') {
        const badgeNumber = Number(badgeContent);

        if (isNaN(badgeNumber)) {
          return (
            <Text style={BadgeContentDefaultStyles} {...badgeContentProps}>
              {content}
            </Text>
          );
        }

        return (
          <Text style={BadgeContentDefaultStyles} {...badgeContentProps}>
            {badgeNumber >= maxValueLimit ? maxValueLimit - 1 + '+' : badgeNumber}
          </Text>
        );
      } else if (typeof content === 'object') throw new Error('Badge content must be a string or number');
    };

    useEffect(() => {
      badgeVisibility.stopAnimation();
      Animated.timing(badgeVisibility, {
        toValue: badgeContent && !invisible ? 1 : 0,
        duration: badgeAnimationDuration || BADGE_ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, [invisible, badgeContent]);

    return (
      <Fragment>
        <BadgeContainer onLayout={badgeContainerLayoutHandler} {...badgeContainerProps}>
          {children}
        </BadgeContainer>
        {badgeContainerLayoutRect ? (
          <AnimatedView
            ref={ref}
            style={[
              BadgeDefaultStyles,
              generateBadgeStyles({
                rootElementRect: badgeContainerLayoutRect,
                variation,
                badgeVisibility,
                variant,
                anchorOrigin,
              }),
              style,
            ]}
            {...props}>
            {renderBadgeContent(badgeContent)}
          </AnimatedView>
        ) : null}
      </Fragment>
    );
  },
);
