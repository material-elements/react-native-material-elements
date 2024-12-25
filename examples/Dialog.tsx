import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogContent, DialogContentText, DialogTitle } from '../src';

export const Ex1: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Dialog maxWidth="xl" visible={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <ButtonGroup style={{ paddingHorizontal: 10 }} variation="text">
          <Button label="Done" onPress={() => {}} flex={1} />
          <Button label="Close" onPress={() => {}} flex={1} />
        </ButtonGroup>
      </Dialog>
      <Button onPress={() => setShowDialog(!showDialog)} label="Open" />
    </>
  );
};
