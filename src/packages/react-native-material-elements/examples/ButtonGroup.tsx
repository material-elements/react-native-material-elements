import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, ButtonGroup, Container, ThemeProvider } from '../src';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SafeAreaView>
        <Container>
          <ButtonGroup variation="contained">
            <Button onPress={() => {}} label="One" />
            <Button onPress={() => {}} label="Two" />
            <Button onPress={() => {}} label="Three" />
          </ButtonGroup>
          <ButtonGroup variation="outlined">
            <Button onPress={() => {}} label="One" />
            <Button onPress={() => {}} label="Two" />
            <Button onPress={() => {}} label="Three" />
          </ButtonGroup>
          <ButtonGroup variation="text">
            <Button onPress={() => {}} label="One" />
            <Button onPress={() => {}} label="Two" />
            <Button onPress={() => {}} label="Three" />
          </ButtonGroup>
          <ButtonGroup variation="text" buttonColor="error">
            <Button onPress={() => {}} label="One" />
            <Button onPress={() => {}} label="Two" />
            <Button onPress={() => {}} label="Three" />
          </ButtonGroup>
          <ButtonGroup buttonColor="error">
            <Button onPress={() => {}} label="One" />
            <Button onPress={() => {}} label="Two" />
            <Button onPress={() => {}} label="Three" />
          </ButtonGroup>
          <ButtonGroup variation="outlined" buttonColor="success">
            <Button onPress={() => {}} label="One" />
            <Button onPress={() => {}} label="Two" />
            <Button onPress={() => {}} label="Three" />
          </ButtonGroup>
        </Container>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
