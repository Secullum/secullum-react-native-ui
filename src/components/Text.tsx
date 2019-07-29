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
}

const theme = getTheme();

export class Text extends React.Component<TextProperties> {
  static defaultProps = {
    bold: false,
    size: 14,
    color: theme.textColor1
  };

  render() {
    const { bold, color, size, style, flex, align, children } = this.props;
    return (
      <TextNative
        style={[
          {
            color,
            flex,
            fontSize: size,
            textAlign: align,
            fontFamily: bold ? 'Lato-Bold' : 'Lato-Regular'
          },
          style
        ]}
      >
        {children}
      </TextNative>
    );
  }
}
