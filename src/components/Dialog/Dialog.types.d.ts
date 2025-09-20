import { ViewStyle } from 'react-native';
import { Theme } from '../../libraries/themes/theme';
import { BoxProps } from '../Box/Box.types';
import { PortalProps } from '../Portal/Portal.types';
import { TextProps } from '../types';

export interface DialogTitleProps extends TextProps {}
export interface DialogProps extends PortalProps {
  dialogContainerProps?: Omit<BoxProps, 'children'>;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: number;
}
export interface DialogContainerStylesInterface extends Pick<DialogProps, 'fullWidth' | 'maxWidth' | 'borderRadius'> {
  colors: Theme;
}
export interface DialogActionsProps extends BoxProps {
  dialogActionsContainerStyles?: ViewStyle;
  align?: 'left' | 'right' | 'center';
}

export type DialogActionsContainerStylesInterface = Pick<DialogActionsProps, 'align'>;
