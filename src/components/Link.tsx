import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle
} from 'react-native';
import { getTestID } from '../modules/test';

export interface LinkProperties {
  text: string;
  style?: StyleProp<TextStyle>;
  onPress: () => void;
  nativeID?: string;
}

export class Link extends React.Component<LinkProperties> {
  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      link: {
        fontFamily: theme.fontFamily2,
        fontSize: 14,
        color: theme.textColor2
      }
    });

    return styles;
  };

  render() {
    const { text, style, onPress, nativeID } = this.props;

    const styles = this.getStyles();

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} testID={getTestID(nativeID)}>
        <Text nativeID={nativeID} style={[styles.link, style]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
