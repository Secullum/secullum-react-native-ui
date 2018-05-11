import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
  message?: string | null;
  style?: StyleProp<TextStyle>;
}

class ErrorMessage extends React.Component<Props> {
  render() {
    const { message, style } = this.props;

    return <Text style={[styles.errorMessage, style]}>{message}</Text>;
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red'
  }
});

export default ErrorMessage;
