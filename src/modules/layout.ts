import { Dimensions, Platform } from 'react-native';

export const isTablet = () => {
  if (Platform.OS === 'web') {
    return false;
  }

  return (
    Dimensions.get('window').height >= 800 &&
    Dimensions.get('window').width >= 500
  );
};
