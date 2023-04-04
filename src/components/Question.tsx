import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import { Button } from './Button';
import { Space } from './Space';

import {
  Modal as ReactNativeModal,
  StyleSheet,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';

export interface QuestionProperties {
  message: string;
  visible: boolean;
  nativeID?: string;
  okButton: {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    nativeID?: string;
  };
  cancelButton: {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    nativeID?: string;
  };
}

export class Question extends React.Component<QuestionProperties> {
  getStyles = () => {
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
        color: theme.questionTextColor,
        fontFamily: theme.fontFamily1,
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
      },
      icon: {
        color: theme.textColor3,
        fontSize: isTablet() ? 52 : 42
      }
    });

    return styles;
  };

  render() {
    const { message, visible, nativeID, okButton, cancelButton } = this.props;
    const styles = this.getStyles();
    return (
      <ReactNativeModal animationType="fade" transparent visible={visible}>
        <View style={[styles.overlay]} nativeID={nativeID}>
          <View style={styles.container}>
            <FontAwesome name={'question-circle'} style={styles.icon} />
            <Text style={styles.text}>{message}</Text>
            <Space />
            <View style={styles.botoesAcao}>
              <Button
                text={cancelButton.text}
                onPress={cancelButton.onPress}
                style={[
                  { flex: 1, marginRight: isTablet() ? 13 : 8 },
                  cancelButton.style
                ]}
                textStyle={cancelButton.textStyle}
                primary={false}
                nativeID={cancelButton.nativeID}
              />
              <Button
                text={okButton.text}
                onPress={okButton.onPress}
                style={[
                  { flex: 1, marginLeft: isTablet() ? 13 : 8 },
                  okButton.style
                ]}
                textStyle={okButton.textStyle}
                primary={true}
                nativeID={okButton.nativeID}
              />
            </View>
          </View>
        </View>
      </ReactNativeModal>
    );
  }
}
