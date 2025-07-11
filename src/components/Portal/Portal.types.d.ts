import { ModalProps } from 'react-native';
import { BoxProps } from '../Box/Box.types';

/**
 * Represents a portal item with a unique key and the component to render.
 */
export interface Portal {
  /**
   * Unique identifier for the portal.
   */
  key: string;
  /**
   * The content or component to render as a portal.
   */
  component: React.ReactNode;
}

/**
 * Props for the PortalContext, allowing adding and removing portals.
 */
export interface PortalContextProps {
  /**
   * Function to add a portal to the context.
   */
  addPortal: (portal: Portal) => void;
  /**
   * Function to remove a portal from the context.
   */
  removePortal: (key: string) => void;
}

/**
 * Props for the container that wraps the modal content Extends BoxProps for styling flexibility.
 */
export interface ModalContainerProps extends BoxProps {
  /**
   * function which is used to hide the modal.
   */
  onClose?: () => void;

  rootWrapperTestID?: string;
}

/**
 * Props for the Portal component that manages portal creation and visibility.
 */
export interface PortalProps extends ModalProps {
  /**
   * Props for the container around the modal content.
   */
  modalContainerProps?: ModalContainerProps;
  /**
   * function which is used to hide the modal
   */
  onClose?: () => void;
}
