import { StyleSheet, ViewStyle } from 'react-native';
import { GenerateSegmentContainerStyle } from './SegmentedControlContainer';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    height: 38,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    padding: 3,
  },
  segmentContainer: {
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
  },
  item: {
    flex: 1,
  },
  baseButton: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  animatedSegmentContainer: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 6,
    height: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export const generateSegmentContainerStyle = ({ themeColors }: GenerateSegmentContainerStyle): ViewStyle => ({
  backgroundColor: themeColors.grey[300],
});
