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

import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { isEdgeToEdge } from '../modules/layout';

export interface ModalProperties {
  children: React.ReactNode;
  visible: boolean;
  overlayStyle?: StyleProp<ViewStyle>;
  onRequestClose?: () => void;
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
            // sec-issues#14678: No edge-to-edge a janela do modal é a tela inteira,
            // incluindo as áreas das barras do sistema, e o React Native deixa de
            // aplicar o fitsSystemWindows nessa janela. Sem reservar essas áreas aqui,
            // o conteúdo de qualquer modal desenha por baixo das barras.
            // Os quatro lados porque em paisagem a barra de navegação vai para a lateral.
            const safeAreaStyle =
              isEdgeToEdge() && insets
                ? {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right
                  }
                : null;

            return (
              <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={[styles.overlay, safeAreaStyle, overlayStyle]}>
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
