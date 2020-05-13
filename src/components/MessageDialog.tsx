import * as React from 'react';
import ReactNativeModal from 'react-native-web-modal';

import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import { Button } from '../components/Button';
import { Space } from '../components/Space';

export interface MessageDialogProperties {
  message: string;
  visible: boolean;
  type?: 'info' | 'warning' | 'question' | 'success';
  nativeID?: string;
  okButton?: {
    text: string;
    onPress: () => void;
    customStyle?: object;
    textStyle?: object;
    primary?: boolean;
    nativeID?: string;
  };
  cancelButton?: {
    text: string;
    onPress: () => void;
    customStyle?: object;
    textStyle?: object;
    primary?: boolean;
    nativeID?: string;
  };
}

export class MessageDialog extends React.Component<MessageDialogProperties> {
  static defaultProps = {
    type: 'info'
  };

  getIconName = () => {
    const { type } = this.props;

    switch (type) {
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'question':
        return 'question';
      case 'success':
      default:
        return 'check-circle';
    }
  };

  render() {
    const {
      message,
      visible,
      type,
      nativeID,
      okButton,
      cancelButton
    } = this.props;
    const iconName = this.getIconName();

    return (
      <ReactNativeModal animationType="fade" transparent visible={visible}>
        <View style={[styles.overlay]} nativeID={nativeID}>
          <View style={styles.container}>
            <FontAwesome
              name={iconName}
              color={
                type === 'warning' ? theme.warningColor : theme.successColor
              }
              size={isTablet() ? 52 : 42}
            />
            <Text style={styles.text}>{message}</Text>
            <Space />
            <View style={styles.botoesAcao}>
              {cancelButton && (
                <Button
                  text={cancelButton.text}
                  onPress={cancelButton.onPress}
                  style={cancelButton.customStyle}
                  textStyle={cancelButton.textStyle}
                  primary={cancelButton.primary}
                  nativeID={cancelButton.nativeID}
                />
              )}
              {okButton && (
                <Button
                  text={okButton.text}
                  onPress={okButton.onPress}
                  style={okButton.customStyle}
                  textStyle={okButton.textStyle}
                  primary={okButton.primary}
                  nativeID={okButton.nativeID}
                />
              )}
            </View>
          </View>
        </View>
      </ReactNativeModal>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  botoesAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(33, 33, 33, 0.7)',
    alignItems: 'center'
  },
  text: {
    color: theme.textColor1,
    fontFamily: 'Lato-Bold',
    fontSize: isTablet() ? 25 : 16,
    textAlign: 'center',
    marginTop: isTablet() ? 15 : 5,
    width: '100%'
  },
  container: {
    backgroundColor: theme.backgroundColor1,
    borderRadius: 6,
    padding: isTablet() ? 25 : 16,
    width: isTablet() ? 350 : 250,
    marginTop: isTablet() ? 250 : 140,
    alignItems: 'center'
  }
});
