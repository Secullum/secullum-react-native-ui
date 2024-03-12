import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { getTheme } from '../modules/theme';

export interface Props {
  message?: string | null;
  style?: StyleProp<TextStyle>;
  nativeID?: string;
}

export class ErrorMessage extends React.Component<Props> {
  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      errorMessage: {
        fontFamily: theme.fontFamily3,
        color: theme.errorColor
      }
    });

    return styles;
  };

  render() {
    const { message, style, nativeID } = this.props;
    const styles = this.getStyles();

    if (!message) {
      return null;
    }

    return (
      <Text
        nativeID={nativeID}
        testID={nativeID}
        style={[styles.errorMessage, style]}
      >
        {message}
      </Text>
    );
  }
}
