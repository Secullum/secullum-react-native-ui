import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle
} from 'react-native';

export interface LinkProperties {
  text: string;
  style?: StyleProp<TextStyle>;
  onPress: () => void;
}

export class Link extends React.Component<LinkProperties> {
  render() {
    const { text, style, onPress } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={[styles.link, style]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  link: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: theme.textColor2
  }
});
