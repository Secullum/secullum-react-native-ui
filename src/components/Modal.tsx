import * as React from 'react';
import ReactNativeModal from 'react-native-web-modal';

import {
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
}

export class Modal extends React.Component<ModalProperties> {
  render() {
    const { children, visible, overlayStyle, onRequestClose } = this.props;

    return (
      <ReactNativeModal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={[styles.overlay, overlayStyle]}>{children}</View>
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
