import React from 'react';
import { View } from 'react-native';
import { BaseButton } from '../Button/BaseButton';
import { CardActionProps } from './Card.types';

export const CardAction = React.forwardRef<View, CardActionProps>(({ children, ...props }, ref) => {
  return (
    <BaseButton ref={ref} {...props}>
      {children}
    </BaseButton>
  );
});
