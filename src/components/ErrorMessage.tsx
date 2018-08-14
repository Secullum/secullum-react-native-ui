import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { getTheme } from '../modules/theme';

export interface Props {
  message?: string | null;
  style?: StyleProp<TextStyle>;
}

export class ErrorMessage extends React.Component<Props> {
  render() {
    const { message, style } = this.props;

    if (message == null) {
      return null;
    }

    return <Text style={[styles.errorMessage, style]}>{message}</Text>;
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  errorMessage: {
    color: theme.errorColor
  }
});
