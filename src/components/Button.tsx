import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle
} from 'react-native';
import { isTablet } from '../modules/layout';

export interface ButtonProperties {
  text: string;
  primary?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
}

export class Button extends React.Component<ButtonProperties> {
  static defaultProps = {
    primary: true
  };

  getStyles = (): any => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      touchable: {
        backgroundColor: theme.backgroundColor1,
        borderColor: theme.borderColor1,
        borderWidth: 1,
        borderRadius: 3,
        height: isTablet()?45:40,
        alignItems: 'center',
        justifyContent: 'center'
      },
      touchablePrimary: {
        backgroundColor: theme.backgroundColor3,
        borderWidth: 0
      },
      text: {
        fontFamily: 'Lato-Bold',
        fontSize: isTablet?18:13,
        paddingHorizontal: 11,
        color: theme.textColor1
      },
      textPrimary: {
        color: theme.textColor4
      }
    });

    return styles;
  };

  render() {
    const { text, primary, style, textStyle, onPress } = this.props;

    const styles = this.getStyles();

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.touchable, primary && styles.touchablePrimary, style]}
        onPress={onPress}
      >
        <Text style={[styles.text, primary && styles.textPrimary, textStyle]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}
