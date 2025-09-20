import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Text, ThemeProvider, useTheme } from '../src';

export const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: '100%',
        h: '100%',
        d: 'flex',
        items: 'center',
        content: 'center',
        p: 10,
        bg: theme.colors.gray[800],
      }}>
      <Accordion square>
        <AccordionSummary
          bottomBorder
          expandIcon={<Text>d</Text>}
          accordionDetails={
            <AccordionDetails>
              <Text variation="h5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita, aut aspernatur odio fugiat harum
                temporibus inventore asperiores eaque sunt.
              </Text>
            </AccordionDetails>
          }>
          <Text>Accordion 1</Text>
        </AccordionSummary>
        <AccordionSummary
          expandIcon={<Text>d</Text>}
          accordionDetails={
            <AccordionDetails>
              <Text variation="h5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita, aut aspernatur odio fugiat harum
                temporibus inventore asperiores eaque sunt.
              </Text>
            </AccordionDetails>
          }>
          <Text>Accordion 2</Text>
        </AccordionSummary>
      </Accordion>
    </Box>
  );
};

export const Ex1 = () => {
  return (
    <ThemeProvider>
      <Accordion>
        <AccordionSummary
          startAdornment={
            <Avatar
              source={{
                uri: 'https://images.unsplash.com/photo-1715615685666-882710b534f9?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              size={35}
              variation="rounded"
            />
          }
          bottomBorder
          expandIcon={<Text>d</Text>}
          accordionDetails={
            <AccordionDetails>
              <Text variation="h5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita, aut aspernatur odio fugiat harum
                temporibus inventore asperiores eaque sunt.
              </Text>
            </AccordionDetails>
          }>
          <Text>Accordion 1</Text>
          <Text variation="h5" sx={{ mt: 2, color: 'gray' }}>
            Lorem ipsum dolor sit amet.
          </Text>
        </AccordionSummary>
        <AccordionSummary
          expandIcon={<Text>d</Text>}
          startAdornment={
            <Avatar
              source={{
                uri: 'https://images.unsplash.com/photo-1634309490604-1270c0d486e8?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              size={35}
              variation="rounded"
            />
          }
          accordionDetails={
            <AccordionDetails>
              <Text variation="h5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita, aut aspernatur odio fugiat harum
                temporibus inventore asperiores eaque sunt.
              </Text>
            </AccordionDetails>
          }>
          <Text>Accordion 2</Text>
          <Text variation="h5" sx={{ mt: 2, color: 'gray' }}>
            Lorem ipsum dolor sit amet.
          </Text>
        </AccordionSummary>
      </Accordion>
    </ThemeProvider>
  );
};
