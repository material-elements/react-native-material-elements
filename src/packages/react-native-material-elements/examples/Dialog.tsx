import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '../src';

export const Ex1: React.FC = () => {
  return (
    <Dialog visible>
      <DialogTitle>Subscribe</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText gutterBottom>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="medium" variation="text" label="Save" square onPress={() => {}} />
      </DialogActions>
    </Dialog>
  );
};
