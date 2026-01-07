import * as React from 'react';

import {
  Platform,
  Modal as ReactNativeModal,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

export interface ModalProperties {
  children: React.ReactNode;
  visible: boolean;
  overlayStyle?: StyleProp<ViewStyle>;
  onRequestClose?: () => void;
  animation?: 'none' | 'fade' | 'slide';
}

interface ModalState {
  isMounted: boolean;
}

export class Modal extends React.Component<ModalProperties> {
  state: ModalState = {
    isMounted: false
  };

  componentDidUpdate(prevProps: ModalProperties) {
    if (prevProps.visible && !this.props.visible) {
      this.setState({ isMounted: false });
    }
  }

  handleShow = () => {
    this.setState({ isMounted: true });
  };

  render() {
    const {
      children,
      visible,
      overlayStyle,
      onRequestClose,
      animation
    } = this.props;
    const { isMounted } = this.state;

    return (
      <ReactNativeModal
        animationType={animation || 'fade'}
        transparent
        visible={visible}
        supportedOrientations={['landscape', 'portrait']}
        onRequestClose={onRequestClose}
        onShow={this.handleShow}
      >
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={[styles.overlay, overlayStyle]}>
            {/*
              This is a workaround for the issue reported in https://github.com/facebook/react-native/issues/50442
              the bug causes the modal's children to be rendered in the top-left corner. Until a fix for this issue is released,
              we insert an empty View to force React Native to recalculate the layout.
              TODO: Remove this workaround once the bug is fixed.
              Related issue on GitLab: 11635
            */}
            {Platform.OS !== 'android' || isMounted ? children : <View />}
          </View>
        </TouchableWithoutFeedback>
      </ReactNativeModal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(33, 33, 33, 0.7)'
  }
});
