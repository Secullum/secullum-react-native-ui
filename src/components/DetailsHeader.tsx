import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card } from './Card';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import { getTestID } from '../modules/test';

export interface DetailsHeaderProperties {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftNativeID?: string;
  rightNativeID?: string;
}

export class DetailsHeader extends React.Component<DetailsHeaderProperties> {
  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      text: {
        fontFamily: theme.fontFamily1,
        fontSize: isTablet() ? 22 : 18,
        color: theme.textColor1,
        width: '80%',
        textAlign: 'center'
      },
      button: {
        height: isTablet() ? 28 : 24,
        width: isTablet() ? 28 : 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: theme.borderColor1,
        borderWidth: 1,
        borderRadius: 24
      },
      buttonPlaceholder: {
        height: isTablet() ? 28 : 24,
        width: isTablet() ? 28 : 24
      }
    });

    return styles;
  };

  renderButton = (
    type: 'left' | 'right',
    onPress: (() => void) | undefined,
    nativeID?: string
  ) => {
    const styles = this.getStyles();
    const theme = getTheme();

    if (onPress) {
      return (
        <TouchableOpacity
          testID={getTestID(nativeID)}
          style={styles.button}
          onPress={onPress}
        >
          <FontAwesome
            nativeID={nativeID}
            name={type === 'left' ? 'angle-left' : 'angle-right'}
            color={theme.textColor3}
            size={14}
          />
        </TouchableOpacity>
      );
    }

    return <View style={styles.buttonPlaceholder} />;
  };

  render() {
    const {
      text,
      textStyle,
      onLeftPress,
      onRightPress,
      leftNativeID,
      rightNativeID
    } = this.props;
    const styles = this.getStyles();

    return (
      <Card>
        <Card.Section style={styles.container}>
          {this.renderButton('left', onLeftPress, leftNativeID)}
          <Text style={[styles.text, textStyle]}>{text}</Text>
          {this.renderButton('right', onRightPress, rightNativeID)}
        </Card.Section>
      </Card>
    );
  }
}
