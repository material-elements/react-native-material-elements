import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    maxHeight: 300,
    marginTop: 5,
  },
  listContainerScrollView: {
    paddingVertical: 2,
    flexGrow: 1,
  },
  dropDownModal: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 10,
  },
  dropDownInputWrapper: { borderWidth: 0.7, height: 30 },
});
