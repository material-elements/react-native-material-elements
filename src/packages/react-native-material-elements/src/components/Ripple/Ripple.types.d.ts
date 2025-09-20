import { Animated, LayoutRectangle, View, ViewStyle } from 'react-native';

/**
 * Interface defining the properties of a Ripple effect object.
 */
export interface RippleObject {
  /**
   * Value representing the progress of the ripple animation
   */
  progress: Animated.Value;
  /**
   * X-coordinate of the ripple's starting position
   */
  positionX: number;
  /**
   * Y-coordinate of the ripple's starting position
   */
  positionY: number;
  /**
   * Radius of the ripple effect
   */
  radius: number;
  /**
   * Unique identifier for the ripple object
   */
  id: string;
}

type RipplePosition = 'center' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

/**
 * Type definition for a function handling Ripple animation.
 */
export type onRippleAnimationType = (
  /**
   * The animation instance controlling the ripple effect
   */
  animation: Animated.CompositeAnimation,
  /**
   * Callback function to execute when the animation ends
   */
  callBack: Animated.EndCallback,
) => void;

/**
 * Interface defining the properties for configuring a Ripple component.
 */
export interface RippleProps {
  /**
   * Custom styles for the ripple effect
   */
  rippleStyles?: ViewStyle;
  /**
   * Additional styles for the ripple animation
   */
  rippleAnimationStyles?: ViewStyle;
  /**
   * Styles for the container of the ripple effect
   */
  rippleContainerStyles?: ViewStyle;
}

/**
 * Interface extending the View interface, adding functionality specific to the Ripple component.
 */
export interface RippleInterface extends View {
  /**
   * Method to start the ripple effect at a given position
   */
  startRipple: (positionX: number, positionY: number) => void;
  createRippleFromPosition: (position: RipplePosition, elementLayoutRectangle: LayoutRectangle) => void;
}
