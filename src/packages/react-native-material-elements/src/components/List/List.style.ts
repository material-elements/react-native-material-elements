import { StyleSheet, ViewStyle } from 'react-native';
import { ListItemContainerStylesProps, ListItemTextStylesProps, ListStylesProps } from './List.types';

export const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  listItemInnerContainer: { flex: 1 },
  headerContainer: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  baseButton: { display: 'flex', flexDirection: 'row', paddingTop: 2, paddingBottom: 2 },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  adornment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    minWidth: '15%',
  },
  listItemIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  listItemText: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
});

export const listStyles = ({ disablePadding }: ListStylesProps): ViewStyle => {
  let baseStyles: ViewStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  if (!disablePadding) {
    return {
      ...baseStyles,
      paddingVertical: 3,
    };
  }
  return baseStyles;
};

export const listItemContainerStyles = ({
  selected,
  colors,
  selectedColor,
  showOutline,
  outlineWidth,
  outlineColor,
  showDefaultBg,
  softRadius,
}: ListItemContainerStylesProps): ViewStyle => {
  const defaultBgColor = colors.gray[50];
  const selectedBgColor = selectedColor ?? colors.gray[100];

  let baseStyles: ViewStyle = {
    backgroundColor: selected ? selectedBgColor : showDefaultBg ? defaultBgColor : 'transparent',
  };

  if (showOutline) {
    baseStyles.borderWidth = outlineWidth ?? 1;
    baseStyles.borderColor = outlineColor ?? colors.gray[400];
  }

  if (softRadius) {
    baseStyles.borderRadius = 10;
  }

  return baseStyles;
};

export const listItemTextStyles = ({ disablePadding, alignItems, disableLeftPadding }: ListItemTextStylesProps): ViewStyle => {
  let alignItemsStyle: ViewStyle['alignItems'];

  switch (alignItems) {
    case 'start':
      alignItemsStyle = 'flex-start';
      break;
    case 'middle':
      alignItemsStyle = 'center';
      break;
    case 'end':
      alignItemsStyle = 'flex-end';
      break;
    default:
      alignItemsStyle = 'flex-start';
      break;
  }

  let baseStyles: ViewStyle = {
    alignItems: alignItemsStyle,
  };

  if (!disablePadding) {
    return {
      ...baseStyles,
      ...(!disableLeftPadding && { paddingLeft: 15 }),
      paddingRight: 15,
      paddingTop: 5,
      paddingBottom: 5,
    };
  }

  return baseStyles;
};
