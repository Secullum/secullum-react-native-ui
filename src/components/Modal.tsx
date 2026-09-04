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

type ChavePadding =
  | 'padding'
  | 'paddingVertical'
  | 'paddingHorizontal'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingStart'
  | 'paddingEnd';

// Da mais específica para a mais genérica, na ordem em que o Yoga resolve cada lado.
const origensPadding: Record<
  'top' | 'bottom' | 'left' | 'right',
  ChavePadding[]
> = {
  top: ['paddingTop', 'paddingVertical', 'padding'],
  bottom: ['paddingBottom', 'paddingVertical', 'padding'],
  left: ['paddingStart', 'paddingLeft', 'paddingHorizontal', 'padding'],
  right: ['paddingEnd', 'paddingRight', 'paddingHorizontal', 'padding']
};

const resolverPadding = (
  estilo: ViewStyle,
  lado: keyof typeof origensPadding
) => {
  for (const chave of origensPadding[lado]) {
    const valor = estilo[chave];

    if (typeof valor === 'number') {
      return valor;
    }

    // Porcentagem e 'auto' não somam com o inset em dp. Vence a reserva, que é o
    // que não pode faltar; quem precisar dos dois declara o padding no container.
    if (valor != null) {
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
            const estiloOverlay = StyleSheet.flatten([
              styles.overlay,
              overlayStyle
            ]);

            // sec-issues#14678: No edge-to-edge a janela do modal é a tela inteira,
            // incluindo as áreas das barras do sistema, e o React Native deixa de
            // aplicar o fitsSystemWindows nessa janela. A reserva soma ao padding que o
            // consumidor já declarou e é aplicada por último, para que nenhum
            // overlayStyle a desligue sem querer. Os quatro lados são reservados porque
            // em paisagem a barra de navegação vai para a lateral, e o inset deixa de
            // vir em bottom para vir em left ou right.
            const areaSegura =
              isEdgeToEdge() && insets
                ? {
                    paddingTop:
                      resolverPadding(estiloOverlay, 'top') + insets.top,
                    paddingBottom:
                      resolverPadding(estiloOverlay, 'bottom') + insets.bottom,
                    paddingLeft:
                      resolverPadding(estiloOverlay, 'left') + insets.left,
                    paddingRight:
                      resolverPadding(estiloOverlay, 'right') + insets.right
                  }
                : null;

            return (
              <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={[estiloOverlay, areaSegura]}>
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
