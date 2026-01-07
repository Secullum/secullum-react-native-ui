import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from './Modal';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import { getTestID } from '../modules/test';

export interface MessageProperties {
  message: string;
  visible: boolean;
  type?: 'info' | 'warning';
  onRequestClose?: () => void;
  nativeID?: string;
  textStyle?: StyleProp<TextStyle>;
  animation?: 'none' | 'fade' | 'slide';
}

export class Message extends React.Component<MessageProperties> {
  static defaultProps = {
    type: 'info'
  };

  getStyles = () => {
    const theme = getTheme();

    return StyleSheet.create({
      overlay: {
        alignItems: 'center'
      },
      container: {
        backgroundColor: theme.backgroundColor1,
        borderRadius: 6,
        padding: isTablet() ? 25 : 16,
        width: isTablet() ? 350 : 250,
        marginTop: isTablet() ? 250 : 140,
        alignItems: 'center'
      },
      text: {
        color: theme.textColor3,
        fontFamily: theme.fontFamily1,
        fontSize: isTablet() ? 25 : 16,
        textAlign: 'center',
        marginTop: isTablet() ? 15 : 5,
        width: '100%'
      }
    });
  };

  render() {
    const {
      message,
      visible,
      type,
      onRequestClose,
      nativeID,
      textStyle,
      animation
    } = this.props;

    const styles = this.getStyles();
    const theme = getTheme();

    return (
      <Modal
        visible={visible}
        onRequestClose={onRequestClose}
        overlayStyle={styles.overlay}
        animation={animation || 'fade'}
      >
        <View nativeID={nativeID} style={styles.container}>
          <FontAwesome
            name={type === 'warning' ? 'warning' : 'check-circle'}
            color={type === 'warning' ? theme.warningColor : theme.successColor}
            size={isTablet() ? 52 : 42}
          />
          <Text style={[styles.text, textStyle]} testID={getTestID(nativeID)}>
            {message}
          </Text>
        </View>
      </Modal>
    );
  }
}
