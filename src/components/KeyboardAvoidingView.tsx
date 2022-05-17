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

export interface KeyboardAvoidingViewProperties {
  extraFieldHeight: number; // To add some extra space after scrolling to the field
  extraWindowHeight: number; // To inform if there's some extra space outside the keyboard avoiding view, example: status bar, header, etc...
  refreshControl?: React.ReactElement<RefreshControlProps>;
  children: (options: { availableHeight: number }) => JSX.Element;
  scrollEnabled?: boolean;
  onScroll?: (event: NativeScrollEvent) => void;
  keyBoardShow?: boolean;
}

export interface KeyboardAvoidingViewState {
  keyboardHeight: number;
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

  state: KeyboardAvoidingViewState = {
    keyboardHeight: 0
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
  }

  handleKeyboardShow = (event: KeyboardEvent) => {
    const keyboardHeight = event.endCoordinates.height;
    const keyboardPosition = event.endCoordinates.screenY;

    this.setState({
      keyboardHeight
    });

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
      (isDescendant: boolean) => {
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
    this.setState({
      keyboardHeight: 0
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
      onScroll,
      children,
      keyBoardShow
    } = this.props;

    // Android devices with notch will report less `availableHeight` than it should
    // That's because of this: https://github.com/facebook/react-native/issues/23693
    // If I change it to 'screen', Android devices with virtual buttons will report more than it should
    const availableHeight =
      Dimensions.get('window').height -
      this.state.keyboardHeight -
      this.props.extraWindowHeight;

    return (
      <View style={[{ height: availableHeight }, !keyBoardShow && { flex: 1 }]}>
        <ScrollView
          ref={this.scrollViewRef}
          refreshControl={refreshControl}
          scrollEnabled={scrollEnabled}
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
