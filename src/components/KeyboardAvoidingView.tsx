import * as React from 'react';

import {
  Dimensions,
  EmitterSubscription,
  findNodeHandle,
  Keyboard,
  KeyboardEvent,
  NativeScrollEvent,
  Platform,
  RefreshControlProps,
  ScrollView,
  TextInput,
  UIManager,
  View
} from 'react-native';

import { isEdgeToEdge, isKeyboardEdgeToEdge } from '../modules/layout';

export interface KeyboardAvoidingViewProperties {
  extraFieldHeight: number; // To add some extra space after scrolling to the field
  extraWindowHeight: number; // To inform if there's some extra space outside the keyboard avoiding view, example: status bar, header, etc...
  refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
  children: (options: { availableHeight: number }) => JSX.Element;
  scrollEnabled?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  onScroll?: (event: NativeScrollEvent) => void;
  keyBoardShow?: boolean;
}

// With `setKeyboardEdgeToEdge` enabled, the keyboard event arrives before the
// layout it causes (container height and padding are only applied after it).
// Scrolling right away would be limited by the old content size, so we wait for
// that layout to settle.
const KEYBOARD_LAYOUT_DELAY = 120;

export interface KeyboardAvoidingViewState {
  keyboardHeight: number;
  keyboardScreenY: number; // Top of the keyboard on the screen (0 when hidden)
}

export class KeyboardAvoidingView extends React.Component<
  KeyboardAvoidingViewProperties,
  KeyboardAvoidingViewState
> {
  static defaultProps = {
    extraFieldHeight: 0,
    extraWindowHeight: 0,
    scrollEnabled: true
  };

  keyboardDidShowSubscription?: EmitterSubscription;
  keyboardDidHideSubscription?: EmitterSubscription;

  scrollViewRef = React.createRef<ScrollView>();
  scrollTimeout?: ReturnType<typeof setTimeout>;

  state: KeyboardAvoidingViewState = {
    keyboardHeight: 0,
    keyboardScreenY: 0
  };

  componentDidMount() {
    // Android doesn't have 'will' events, but we can use 'did' there without any problem
    // iOS on the other hand needs to use the 'will' events otherwise the screen would show some empty spaces during keyboard events
    this.keyboardDidShowSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      this.handleKeyboardShow
    );

    this.keyboardDidHideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      this.handleKeyboardHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSubscription!.remove();
    this.keyboardDidHideSubscription!.remove();

    this.clearScrollTimeout();
  }

  clearScrollTimeout = () => {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);

      this.scrollTimeout = undefined;
    }
  };

  handleKeyboardShow = (event: KeyboardEvent) => {
    const keyboardHeight = event.endCoordinates.height;
    const keyboardPosition = event.endCoordinates.screenY;

    this.setState({
      keyboardHeight,
      keyboardScreenY: keyboardPosition
    });

    this.clearScrollTimeout();

    if (isKeyboardEdgeToEdge()) {
      this.scrollTimeout = setTimeout(() => {
        this.scrollTimeout = undefined;

        this.scrollToFocusedInput(keyboardPosition);
      }, KEYBOARD_LAYOUT_DELAY);
    } else {
      this.scrollToFocusedInput(keyboardPosition);
    }
  };

  scrollToFocusedInput = (keyboardPosition: number) => {
    const scrollView = this.scrollViewRef.current;

    if (!scrollView) {
      return;
    }

    //@ts-ignore
    const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();

    if (!currentlyFocusedInput) {
      return;
    }

    const { extraFieldHeight, extraWindowHeight } = this.props;

    const currentlyFocusedInputNode = findNodeHandle(currentlyFocusedInput);

    // @ts-ignore: no types :(
    UIManager.viewIsDescendantOf(
      currentlyFocusedInputNode,
      findNodeHandle(scrollView),
      (result: boolean | boolean[]) => {
        // In the new architecture the callback receives [boolean] instead of boolean,
        // and an array is always truthy. Without this, the KeyboardAvoidingView of
        // screens still mounted in the stack tried to measure a field focused in
        // another screen, and the measurement failed with "Error measuring text field.".
        // Related issue on GitLab: 15073
        const isDescendant = Array.isArray(result) ? result[0] : result;

        if (!isDescendant) {
          return;
        }

        currentlyFocusedInput.measure(
          (
            x: number,
            y: number,
            width: number,
            height: number,
            pageX: number,
            pageY: number
          ) => {
            const fieldPosition = pageY + height + extraFieldHeight;

            if (fieldPosition <= keyboardPosition) {
              return;
            }

            scrollView.scrollResponderScrollNativeHandleToKeyboard(
              currentlyFocusedInputNode,
              extraWindowHeight + extraFieldHeight,
              true
            );
          }
        );
      }
    );
  };

  handleKeyboardHide = () => {
    this.clearScrollTimeout();

    this.setState({
      keyboardHeight: 0,
      keyboardScreenY: 0
    });
  };

  scrollTo = (x: number, y: number) => {
    if (!this.scrollViewRef.current) {
      return;
    }

    this.scrollViewRef.current.scrollTo({ x, y });
  };

  scrollToEnd = () => {
    if (!this.scrollViewRef.current) {
      return;
    }

    this.scrollViewRef.current.scrollToEnd();
  };

  render() {
    const {
      refreshControl,
      scrollEnabled,
      keyboardShouldPersistTaps,
      onScroll,
      children,
      keyBoardShow,
      extraWindowHeight
    } = this.props;

    const { keyboardHeight, keyboardScreenY } = this.state;

    // Android devices with notch will report less `availableHeight` than it should
    // That's because of this: https://github.com/facebook/react-native/issues/23693
    // If I change it to 'screen', Android devices with virtual buttons will report more than it should
    //
    // With edge-to-edge (Android), `window.height` includes the navigation bar but
    // `keyboardHeight` does not, so `window.height - keyboardHeight` would end below
    // the top of the keyboard and the last pixels of the scroll would stay hidden
    // behind it. With `setKeyboardEdgeToEdge` enabled, while the keyboard is
    // visible we use its real top instead.
    const availableHeight =
      isKeyboardEdgeToEdge() && keyboardHeight > 0 && keyboardScreenY > 0
        ? keyboardScreenY - extraWindowHeight
        : Dimensions.get('window').height - keyboardHeight - extraWindowHeight;

    return (
      <View style={[{ height: availableHeight }, !keyBoardShow && { flex: 1 }]}>
        <ScrollView
          // On Android 15+ (API 35+), with edge-to-edge enforced, the window is not
          // resized when the keyboard appears, so the ScrollView does not gain any
          // scroll room and may hide focused input fields.
          // Related issues on GitLab: 11635, 14734
          contentContainerStyle={
            isEdgeToEdge() && keyboardHeight > 0
              ? { paddingBottom: keyboardHeight }
              : undefined
          }
          ref={this.scrollViewRef}
          // @ts-ignore: O react-native não tem auto, mas o react-native-web aceita
          refreshControl={refreshControl}
          scrollEnabled={scrollEnabled}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onScroll={(e: any) => {
            if (onScroll) {
              onScroll(e.nativeEvent);
            }
          }}
          scrollEventThrottle={16} // Só pro expo parar de incomodar (16 é o valor sugerido)
        >
          {children({ availableHeight })}
        </ScrollView>
      </View>
    );
  }
}
