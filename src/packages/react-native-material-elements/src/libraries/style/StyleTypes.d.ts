import {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  FlexStyle,
  ImageStyle,
  TextStyle,
  TransformsStyle,
  ViewStyle,
} from 'react-native';

/**
 * Defines the types of padding that can be applied to an element.
 * 'p': Padding on all sides
 * 'px': Horizontal padding (left and right)
 * 'py': Vertical padding (top and bottom)
 * 'ps': Padding on the start side (left in LTR, right in RTL)
 * 'pe': Padding on the end side (right in LTR, left in RTL)
 * 'pt': Padding on the top side.
 * 'pb': Padding on the bottom side
 */
export type ElementPadding = 'p' | 'px' | 'py' | 'ps' | 'pe' | 'pt' | 'pb';
/**
 * Defines the types of margin that can be applied to an element.
 * 'm': Margin on all sides
 * 'mx': Horizontal margin (left and right)
 * 'my': Vertical margin (top and bottom)
 * 'ms': Margin on the start side (left in LTR, right in RTL)
 * 'me': Margin on the end side (right in LTR, left in RTL)
 * 'mt': Margin on the top side
 * 'mb': Margin on the bottom side
 */
export type ElementMargin = 'm' | 'mx' | 'my' | 'ms' | 'me' | 'mt' | 'mb';
/**
 * Defines the types of dimension-related properties commonly used in React Native styling.
 * 'w': Sets the width of an element.
 * 'h': Sets the height of an element.
 * 'minW': Sets the minimum width of an element.
 * 'minH': Sets the minimum height of an element.
 * 'maxW': Sets the maximum width of an element.
 * 'maxH': Sets the maximum height of an element.
 */
export type ElementDimension = 'w' | 'h' | 'minW' | 'minH' | 'maxW' | 'maxH';
/**
 * Represents a mapping of padding and margin types to their corresponding ELementDimensionMap.
 * Each key in the ELementDimensionMap represents either a padding type or a margin type,
 * and the value is a ELementDimensionMap defining the dimension properties (e.g., width, height).
 */
export type ELementDimensionMap<T> = {
  [key in T]?: DimensionValue;
};
/**
 * Defines the types of position-related properties commonly used in React Native styling.
 * 'pos': Sets the positioning method used for an element.
 * 'posT': Sets the top position of a positioned element.
 * 'posB': Sets the bottom position of a positioned element.
 * 'posL': Sets the left position of a positioned element.
 * 'posR': Sets the right position of a positioned element.
 */
export type PositionType = {
  pos?: ViewStyle['position'];
  index?: number;
};
export type ElementPosition = 'posT' | 'posB' | 'posL' | 'posR' | 'index';
export type ElementPositionMap = {
  [key in ElementPosition]?: DimensionValue;
} & PositionType;
export interface PositionStyles extends Pick<FlexStyle, 'position' | 'right' | 'left' | 'top' | 'bottom'> {}
export type KeyOfPositionStyles = keyof PositionStyles;
/**
 * Type alias for element border radius properties.
 * Abbreviations:
 * - 'r': 'borderRadius'
 * - 'ret': 'borderTopEndRadius'
 * - 'rlt': 'borderTopLeftRadius'
 * - 'ree': 'borderEndEndRadius'
 * - 'rrt': 'borderTopRightRadius'
 * - 'rse': 'borderEndStartRadius'
 * - 'res': 'borderStartEndRadius'
 * - 'rst': 'borderTopStartRadius'
 * - 'reb': 'borderBottomEndRadius'
 * - 'rlb': 'borderBottomLeftRadius'
 * - 'rss': 'borderStartStartRadius'
 * - 'rrb': 'borderBottomRightRadius'
 * - 'rsb': 'borderBottomStartRadius'
 */
export type ElementBorderRadius =
  | 'r'
  | 'ret'
  | 'rlt'
  | 'ree'
  | 'rrt'
  | 'rse'
  | 'res'
  | 'rst'
  | 'reb'
  | 'rlb'
  | 'rss'
  | 'rrb'
  | 'rsb';
/**
 * Mapping of element border radius keys to their respective animatable numeric values.
 */
export type ElementBorderRadiusMap = {
  [key in ElementBorderRadius]?: AnimatableNumericValue;
};

export type ElementTextStyleProps = {
  color?: TextStyle['color'];
  family?: TextStyle['fontFamily'];
  size?: TextStyle['fontSize'];
  style?: TextStyle['fontStyle'];
  weight?: TextStyle['fontWeight'];
  lSpacing?: TextStyle['letterSpacing'];
  lHeight?: TextStyle['lineHeight'];
  dLine?: TextStyle['textDecorationLine'];
  dStyle?: TextStyle['textDecorationStyle'];
  dColor?: TextStyle['textDecorationColor'];
  transform?: TextStyle['textTransform'];
  select?: TextStyle['userSelect'];
  tAlign?: TextStyle['textAlign'];
};

export type ElementFlexStyleProps = {
  align?: FlexStyle['alignContent'];
  content?: FlexStyle['justifyContent'];
  items?: FlexStyle['alignItems'];
  self?: FlexStyle['alignSelf'];
  ratio?: FlexStyle['aspectRatio'];
  d?: FlexStyle['display'];
  end?: FlexStyle['end'];
  f?: FlexStyle['flex'];
  fBasis?: FlexStyle['flexBasis'];
  fDirection?: FlexStyle['flexDirection'];
  rGap?: FlexStyle['rowGap'];
  gap?: FlexStyle['gap'];
  cGap?: FlexStyle['columnGap'];
  fGrow?: FlexStyle['flexGrow'];
  fShrink?: FlexStyle['flexShrink'];
  wrap?: FlexStyle['flexWrap'];
};

export type ElementViewStyles = {
  bVisibility?: ViewStyle['backfaceVisibility'];
  bg?: ViewStyle['backgroundColor'];
  o?: ViewStyle['opacity'];
  e?: ViewStyle['elevation'];
  pEvents?: ViewStyle['pointerEvents'];
  c?: ViewStyle['cursor'];
  sColor?: ViewStyle['shadowColor'];
  sOffset?: ViewStyle['shadowOffset'];
  sOpacity?: ViewStyle['shadowOpacity'];
  sRadius?: ViewStyle['shadowRadius'];
  bColor?: ViewStyle['borderColor'];
  bWidth?: ViewStyle['borderWidth'];
  overflow?: ViewStyle['overflow'];
};

/**
 * Interface defining properties related to spacing styles, such as margins and paddings.
 * This extends the FlexStyle interface and picks specific properties relevant to spacing.
 */
export interface SpacingStyle
  extends Pick<
    FlexStyle,
    | 'gap'
    | 'margin'
    | 'marginBottom'
    | 'marginEnd'
    | 'marginHorizontal'
    | 'marginLeft'
    | 'marginRight'
    | 'marginStart'
    | 'marginTop'
    | 'marginVertical'
    | 'padding'
    | 'paddingBottom'
    | 'paddingEnd'
    | 'paddingHorizontal'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingStart'
    | 'paddingTop'
    | 'paddingVertical'
    | 'width'
    | 'height'
    | 'minWidth'
    | 'minHeight'
    | 'maxWidth'
    | 'maxHeight'
  > {}

export type BaseStyles = ELementDimensionMap<ElementPadding | ElementMargin | ElementDimension> &
  ElementPositionMap &
  ElementFlexStyleProps &
  ElementViewStyles &
  ElementBorderRadiusMap;

export interface StylePalette extends ViewStyle, TextStyle, TransformsStyle, ImageStyle, BaseStyles, ElementTextStyleProps {}

export type KeyOfStylePalette = keyof StylePalette;

/**
 * Define the object structure for each entry in the array Property name should be one of
 * the keys of StylePalette
 * Value type is determined based on the propertyName
 */
export interface StyleEntry<T extends KeyOfStylePalette> {
  propertyName: T;
  value: StylePalette[T];
}

/**
 * interface for element border radius properties, which may be used in styling
 */
export interface ElementRadius
  extends Pick<
    ViewStyle,
    | 'borderRadius'
    | 'borderTopEndRadius'
    | 'borderTopLeftRadius'
    | 'borderEndEndRadius'
    | 'borderTopRightRadius'
    | 'borderEndStartRadius'
    | 'borderStartEndRadius'
    | 'borderTopStartRadius'
    | 'borderBottomEndRadius'
    | 'borderBottomLeftRadius'
    | 'borderStartStartRadius'
    | 'borderBottomRightRadius'
    | 'borderBottomStartRadius'
    | 'shadowRadius'
  > {}

export interface ElementBorderColorStyles
  extends Pick<
    ViewStyle,
    'borderBlockColor' | 'borderBlockEndColor' | 'borderBlockStartColor' | 'borderBottomColor' | 'borderColor'
  > {}
/**
 * A combined type that includes all style properties from View, Text, and Image components.
 * This is useful for creating a unified style type that works across various components.
 */
export type RNStyle = ViewStyle & TextStyle & ImageStyle;
/**
 * A union type representing primitive or common values used in React Native styles.
 * This includes strings, numbers, dimension values (like '100%' or numbers), color values, and undefined.
 */
type StyleLike = string | number | DimensionValue | ColorValue | undefined;
/**
 * Filters the keys of a type `T`, keeping only those properties whose value types extend from `StyleLike`.
 * Essentially, it picks style-related properties (e.g., color, padding, margin) and excludes nested objects or complex values.
 */
type FilterStyleProps<T> = {
  [K in keyof T as T[K] extends StyleLike ? K : never]: T[K];
};
/**
 * A utility type that extracts only the directly usable style properties from `RNStyle`.
 * This helps enforce clean and flat style props that can be applied directly to components.
 */
export type StyledProps = FilterStyleProps<RNStyle>;
