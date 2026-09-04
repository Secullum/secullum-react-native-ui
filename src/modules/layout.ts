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

/**
 * Whether the app window draws behind the system bars (edge-to-edge).
 * Starting on Android 15 (API 35) this mode is enforced, and the content has to
 * reserve the status and navigation bar areas on its own.
 *
 * @see {@link https://developer.android.com/develop/ui/views/layout/edge-to-edge|Android documentation}
 */
export const isEdgeToEdge = () => {
  return Platform.OS === 'android' && Number(Platform.Version) >= 35;
};
