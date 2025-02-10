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
import { getTestID } from '../modules/test';

export interface QuestionProperties {
  message: string;
  visible: boolean;
  nativeID?: string;
  textStyle?: StyleProp<TextStyle>;
  buttonOrder: 'ok,cancel' | 'cancel,ok';
  okButton: QuestionButtonProperties;
  cancelButton: QuestionButtonProperties;
}

export interface QuestionButtonProperties {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  nativeID?: string;
}

export class Question extends React.Component<QuestionProperties> {
  static defaultProps = {
    buttonOrder: 'cancel,ok'
  };

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
    const {
      message,
      textStyle,
      visible,
      nativeID,
      buttonOrder,
      okButton,
      cancelButton
    } = this.props;

    const styles = this.getStyles();

    const [leftButtonProps, rightButtonProps] =
      buttonOrder === 'ok,cancel'
        ? [okButton, cancelButton]
        : [cancelButton, okButton];

    return (
      <ReactNativeModal animationType="fade" transparent visible={visible}>
        <View style={[styles.overlay]} nativeID={nativeID}>
          <View style={styles.container}>
            <FontAwesome name={'question-circle'} style={styles.icon} />
            <Text 
                style={[styles.text, textStyle]}
                nativeID={nativeID + '-mensagem'}
                testID={getTestID(nativeID + '-mensagem')}
              >
                {message}
              </Text>
            <Space />
            <View style={styles.botoesAcao}>
              <Button
                text={leftButtonProps.text}
                onPress={leftButtonProps.onPress}
                style={[
                  { flex: 1, marginRight: isTablet() ? 13 : 8 },
                  leftButtonProps.style
                ]}
                textStyle={leftButtonProps.textStyle}
                primary={buttonOrder === 'ok,cancel'}
                nativeID={leftButtonProps.nativeID}
              />
              <Button
                text={rightButtonProps.text}
                onPress={rightButtonProps.onPress}
                style={[
                  { flex: 1, marginLeft: isTablet() ? 13 : 8 },
                  rightButtonProps.style
                ]}
                textStyle={rightButtonProps.textStyle}
                primary={buttonOrder === 'cancel,ok'}
                nativeID={rightButtonProps.nativeID}
              />
            </View>
          </View>
        </View>
      </ReactNativeModal>
    );
  }
}
