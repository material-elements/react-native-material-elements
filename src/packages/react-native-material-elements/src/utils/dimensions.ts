import { Dimensions, Platform } from 'react-native';
export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const isLargeScreen = screenWidth >= 768;
export const isIso = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
