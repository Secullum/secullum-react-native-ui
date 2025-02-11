import * as React from 'react';
import {
  Text as TextNative,
  StyleProp,
  TextStyle,
  StyleSheet
} from 'react-native';
import { getTheme } from '../modules/theme';
import { getTestID } from '../modules/test';

export interface TextProperties {
  style?: StyleProp<TextStyle>;
  bold: boolean;
  size: number;
  flex?: number;
  color: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  nativeID?: string;
  children?: React.ReactNode;
}

const theme = getTheme();

export class Text extends React.Component<TextProperties> {
  getStyles = () => {
    const { bold, color, size, flex, align } = this.props;

    const theme = getTheme();

    const styles = StyleSheet.create({
      text: {
        color,
        flex,
        fontSize: size,
        textAlign: align,
        fontFamily: bold ? theme.fontFamily1 : theme.fontFamily2
      }
    });

    return styles;
  };

  static defaultProps = {
    bold: false,
    size: 14,
    color: theme.textColor1
  };

  render() {
    const { style, children, nativeID } = this.props;

    const textStyle = this.getStyles();

    return (
      <TextNative
        nativeID={nativeID}
        testID={getTestID(nativeID)}
        style={[textStyle.text, style]}
      >
        {children}
      </TextNative>
    );
  }
}
