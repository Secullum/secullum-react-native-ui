import { Dimensions, Platform } from 'react-native';

let edgeToEdgeHandlingEnabled = false;

/**
 * Opt-in for apps that are edge-to-edge on every Android version, not only on 15+.
 * Components that adjust their layout to edge-to-edge check it with
 * `isEdgeToEdgeHandlingEnabled`. Apps that don't call it keep the previous
 * behavior of those components, including on Android 15+. Disabled by default.
 */
export const setEdgeToEdgeHandlingEnabled = (enabled: boolean) => {
  edgeToEdgeHandlingEnabled = enabled;
};

export const isEdgeToEdgeHandlingEnabled = () => {
  return Platform.OS === 'android' && edgeToEdgeHandlingEnabled;
};

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
