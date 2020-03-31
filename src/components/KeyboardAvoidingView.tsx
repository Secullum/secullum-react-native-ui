import * as React from 'react';

import {
  Dimensions,
  EmitterSubscription,
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

    const currentlyFocusedField = TextInput.State.currentlyFocusedField();

    if (!currentlyFocusedField) {
      return;
    }

    const { extraFieldHeight, extraWindowHeight } = this.props;

    // @ts-ignore: no types :(
    UIManager.viewIsDescendantOf(
      currentlyFocusedField,
      scrollView.getInnerViewNode(),
      (isDescendant: boolean) => {
        if (!isDescendant) {
          return;
        }

        UIManager.measure(
          currentlyFocusedField,
          (x, y, width, height, pageX, pageY) => {
            const fieldPosition = pageY + height + extraFieldHeight;

            if (fieldPosition <= keyboardPosition) {
              return;
            }

            scrollView.scrollResponderScrollNativeHandleToKeyboard(
              currentlyFocusedField,
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
    // Android devices with notch will report less `availableHeight` than it should
    // That's because of this: https://github.com/facebook/react-native/issues/23693
    // If I change it to 'screen', Android devices with virtual buttons will report more than it should
    const availableHeight =
      Dimensions.get('window').height -
      this.state.keyboardHeight -
      this.props.extraWindowHeight;

    return (
      <View style={{ height: availableHeight }}>
        <ScrollView
          ref={this.scrollViewRef}
          refreshControl={this.props.refreshControl}
          scrollEnabled={this.props.scrollEnabled}
          onScroll={(e: any) => {
            if (this.props.onScroll) {
              this.props.onScroll(e.nativeEvent);
            }
          }}
        >
          {this.props.children({ availableHeight })}
        </ScrollView>
      </View>
    );
  }
}
