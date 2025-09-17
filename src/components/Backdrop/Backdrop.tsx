import React from 'react';
import { ActivityIndicatorProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { grey } from '../../libraries';
import { ActivityIndicator } from '../ActivityIndicator';
import { Portal } from '../Portal';
import { PortalProps } from '../types';

export interface BackdropProps extends PortalProps {
  childWrapperContainerStyles?: StyleProp<ViewStyle>;
  activityIndicatorTestId?: string;
  activityIndicatorProps?: ActivityIndicatorProps;
}

export const Backdrop: React.FC<BackdropProps> = ({
  visible,
  onClose,
  modalContainerProps,
  animationType = 'fade',
  childWrapperContainerStyles,
  children,
  activityIndicatorTestId,
  activityIndicatorProps,
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
      <View style={childWrapperContainerStyles}>
        {children ?? (
          <ActivityIndicator testID={activityIndicatorTestId} size="large" color={grey[50]} {...activityIndicatorProps} />
        )}
      </View>
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
