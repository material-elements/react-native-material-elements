import { StyleSheet, ViewStyle } from 'react-native';
import { AccordionWrapperStylesInterface } from './AccordionTypes';

export const accordionSummaryStyles = StyleSheet.create({
  accordionSummaryWrapperContainer: {
    padding: 13,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  accordionSummaryChildWrapper: {
    width: '90%',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  startAdornmentContainer: {
    minWidth: '10%',
    paddingHorizontal: 6,
  },
  accordionSummaryChildrenWrapper: {
    flex: 1,
  },
  accordionSummaryExpandIconWrapper: {
    width: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  accordionDetailsWrapper: {
    width: '100%',
  },
  hiddenView: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
  },
  accordionDetailsContainer: {
    overflow: 'hidden',
  },
});

export const accordionStyles = StyleSheet.create({
  overLay: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 100,
  },
});

export const accordionWrapperStyles = ({ colors, disable, square }: AccordionWrapperStylesInterface): ViewStyle => {
  return {
    width: '100%',
    backgroundColor: colors.gray[200],
    opacity: disable ? 0.5 : 1,
    ...(!square && { borderRadius: 8 }),
  };
};
