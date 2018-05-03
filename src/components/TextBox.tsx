import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputStatic,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

export interface TextBoxProperties {
  label: string;
  value: string;
  onChange: (value: string) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardType;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
  maxLength?: number;
}

export class TextBox extends React.Component<TextBoxProperties> {
  input: TextInputStatic | null = null;

  static defaultProps = {
    editable: true
  };

  render() {
    const {
      label,
      value,
      onChange,
      secureTextEntry,
      multiline,
      keyboardType,
      style,
      editable,
      maxLength
    } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.input) {
            this.input.focus();
          }
        }}
      >
        <View
          style={[styles.container, style, editable ? {} : styles.readonly]}
        >
          <Text style={[styles.label, style, editable ? {} : styles.readonly]}>
            {label}
          </Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            style={[styles.input, style, editable ? {} : styles.readonly]}
            underlineColorAndroid="transparent"
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            editable={editable}
            keyboardType={keyboardType}
            maxLength={maxLength}
            ref={input => {
              // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16318
              this.input = input as TextInputStatic | null;
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.borderColor1,
    borderRadius: 3
  },
  label: {
    color: theme.textColor2,
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    lineHeight: 16
  },
  input: {
    color: theme.textColor1,
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    minHeight: 22,
    padding: 0,
    margin: 0
  },
  readonly: {
    backgroundColor: '#dddddd'
  }
});
