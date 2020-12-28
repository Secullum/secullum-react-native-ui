import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { getTheme } from '../modules/theme';

export interface Props {
  message?: string | null;
  style?: StyleProp<TextStyle>;
  nativeID?: string;
}

export class ErrorMessage extends React.Component<Props> {
  render() {
    const { message, style, nativeID } = this.props;

    if (!message) {
      return null;
    }

    return (
      <Text nativeID={nativeID} style={[styles.errorMessage, style]}>
        {message}
      </Text>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  errorMessage: {
    fontFamily: 'Roboto',
    color: theme.errorColor
  }
});
