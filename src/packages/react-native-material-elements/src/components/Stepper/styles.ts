import { StyleSheet } from 'react-native';
import { Theme } from '../../libraries/themes/theme';

export const styles = StyleSheet.create({
  stepperContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  horizontalLine: {
    width: 15,
    height: 2.4,
    borderRadius: 2,
    position: 'absolute',
  },
  verticalLine: {
    width: 2.4,
    height: 15,
    borderRadius: 2,
    position: 'absolute',
  },
  item: {
    minWidth: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperOptions: {
    borderWidth: 2,
  },
});

export const iconStyle = (colors: Theme) => {
  return { backgroundColor: colors.gray[800] };
};
