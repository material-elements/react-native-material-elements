jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.DeviceEventEmitter.emit = jest.fn();
  return RN;
});
