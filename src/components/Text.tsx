import * as React from 'react';
import { Text as TextNative, StyleProp, TextStyle } from 'react-native';
import { getTheme } from '../modules/theme';

export interface TextProperties {
  style?: StyleProp<TextStyle>;
  bold: boolean;
  size: number;
  flex?: number;
  color: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  nativeID?: string;
}

const theme = getTheme();

export class Text extends React.Component<TextProperties> {
  static defaultProps = {
    bold: false,
    size: 14,
    color: theme.textColor1
  };

  render() {
    const {
      bold,
      color,
      size,
      style,
      flex,
      align,
      children,
      nativeID
    } = this.props;

    return (
      <TextNative
        nativeID={nativeID}
        style={[
          {
            color,
            flex,
            fontSize: size,
            textAlign: align,
            fontFamily: bold ? theme.fontFamily1 : theme.fontFamily2
          },
          style
        ]}
      >
        {children}
      </TextNative>
    );
  }
}
