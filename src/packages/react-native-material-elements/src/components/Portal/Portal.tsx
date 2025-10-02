import React from 'react';
import { Modal } from 'react-native';
import { ModalContainer } from './ModalContainer';
import { PortalProps } from './Portal.types';

export const Portal: React.FC<PortalProps> = ({ children, visible, modalContainerProps, origin, onClose, ...props }) => {
  return (
    <Modal transparent animationType="slide" visible={visible} {...props}>
      <ModalContainer onClose={onClose} visible={visible} origin={origin} {...modalContainerProps}>
        {children}
      </ModalContainer>
    </Modal>
  );
};
