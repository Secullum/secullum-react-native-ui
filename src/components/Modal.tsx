import * as React from 'react';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { isEdgeToEdge } from '../modules/layout';

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
}

interface ModalState {
  isMounted: boolean;
}

type PaddingKey =
  | 'padding'
  | 'paddingVertical'
  | 'paddingHorizontal'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingStart'
  | 'paddingEnd';

// From the most specific to the most generic, in the order Yoga resolves each edge.
// paddingStart/End map to left/right in LTR, which is the only case we support.
const paddingSources: Record<
  'top' | 'bottom' | 'left' | 'right',
  PaddingKey[]
> = {
  top: ['paddingTop', 'paddingVertical', 'padding'],
  bottom: ['paddingBottom', 'paddingVertical', 'padding'],
  left: ['paddingStart', 'paddingLeft', 'paddingHorizontal', 'padding'],
  right: ['paddingEnd', 'paddingRight', 'paddingHorizontal', 'padding']
};

const resolvePadding = (
  style: ViewStyle,
  edge: keyof typeof paddingSources
) => {
  for (const key of paddingSources[edge]) {
    const value = style[key];

    if (typeof value === 'number') {
      return value;
    }

    // Percentages and 'auto' can't be added to an inset in dp. The safe area wins,
    // since it's the one that can't be missing. If both are needed, declare the
    // padding on the container instead.
    if (value != null) {
      return 0;
    }
  }

  return 0;
};

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
    const { children, visible, overlayStyle, onRequestClose } = this.props;
    const { isMounted } = this.state;

    return (
      <ReactNativeModal
        animationType={Platform.OS === 'ios' ? 'none' : 'fade'}
        transparent
        visible={visible}
        supportedOrientations={['landscape', 'portrait']}
        onRequestClose={onRequestClose}
        onShow={this.handleShow}
      >
        <SafeAreaInsetsContext.Consumer>
          {insets => {
            const flattenedOverlayStyle = StyleSheet.flatten([
              styles.overlay,
              overlayStyle
            ]);

            // sec-issues#14678: On edge-to-edge the modal window is the whole screen,
            // including the system bar areas, and React Native no longer applies
            // fitsSystemWindows to that window. The safe area is added to the padding
            // of the consumer that already declared it and is applied last, so that
            // no overlayStyle accidentally overrides it. On Android, when the navigation
            // bar moves to the side, the inset comes in from the left or right instead
            // of from the bottom.
            const safeAreaStyle =
              isEdgeToEdge() && insets
                ? {
                    paddingTop:
                      resolvePadding(flattenedOverlayStyle, 'top') + insets.top,
                    paddingBottom:
                      resolvePadding(flattenedOverlayStyle, 'bottom') +
                      insets.bottom,
                    paddingLeft:
                      resolvePadding(flattenedOverlayStyle, 'left') +
                      insets.left,
                    paddingRight:
                      resolvePadding(flattenedOverlayStyle, 'right') +
                      insets.right
                  }
                : null;

            return (
              <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={[flattenedOverlayStyle, safeAreaStyle]}>
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
            );
          }}
        </SafeAreaInsetsContext.Consumer>
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
