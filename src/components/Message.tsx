import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from './Modal';
import { getTheme } from '../modules/theme';

export interface MessageProperties {
  message: string;
  visible: boolean;
  type?: 'info' | 'warning';
  onRequestClose: () => void;
}

export class Message extends React.Component<MessageProperties> {
  static defaultProps = {
    type: 'info'
  };

  render() {
    const { message, visible, type, onRequestClose } = this.props;

    return (
      <Modal
        visible={visible}
        onRequestClose={onRequestClose}
        overlayStyle={styles.overlay}
      >
        <View style={styles.container}>
          <FontAwesome
            name={type === 'warning' ? 'warning' : 'check-circle'}
            color={type === 'warning' ? theme.warningColor : theme.successColor}
            size={42}
          />
          <Text style={styles.text}>{message}</Text>
        </View>
      </Modal>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center'
  },
  container: {
    backgroundColor: theme.backgroundColor1,
    borderRadius: 6,
    padding: 16,
    width: 250,
    marginTop: 140,
    alignItems: 'center'
  },
  text: {
    color: theme.textColor1,
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5
  }
});
