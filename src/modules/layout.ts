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

let keyboardEdgeToEdge = false;

/**
 * Opt-in for apps that draw behind the system bars (edge-to-edge) on every
 * Android version, not only on 15+. When enabled, the `KeyboardAvoidingView`
 * ends its area at the real top of the keyboard and waits for the layout caused
 * by it before scrolling to the focused input (Android only).
 *
 * Disabled by default, so apps that don't call it keep the previous behavior.
 */
export const setKeyboardEdgeToEdge = (enabled: boolean) => {
  keyboardEdgeToEdge = enabled;
};

export const isKeyboardEdgeToEdge = () => {
  return Platform.OS === 'android' && keyboardEdgeToEdge;
};
