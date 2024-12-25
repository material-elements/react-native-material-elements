import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { grey } from '../../libraries';
import { ActivityIndicator } from '../ActivityIndicator';
import { Portal } from '../Portal';
import { PortalProps } from '../types';

export interface BackdropProps extends PortalProps {
  childWrapperContainerStyles?: StyleProp<ViewStyle>;
}

export const Backdrop: React.FC<BackdropProps> = ({
  visible,
  onClose,
  modalContainerProps,
  animationType = 'fade',
  childWrapperContainerStyles,
  children,
  ...props
}) => {
  const { style, ...rest } = modalContainerProps || {};

  return (
    <Portal
      visible={visible}
      animationType={animationType}
      modalContainerProps={{
        style: StyleSheet.flatten([styles.backDropContainer, style]),
        ...rest,
      }}
      onClose={onClose}
      {...props}>
      <View style={childWrapperContainerStyles}>{children ?? <ActivityIndicator size="large" color={grey[50]} />}</View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  backDropContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
