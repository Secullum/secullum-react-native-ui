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
}

export class TextBox extends React.Component<TextBoxProperties> {
  input: TextInputStatic | null = null;

  render() {
    const {
      label,
      value,
      onChange,
      secureTextEntry,
      multiline,
      keyboardType,
      style
    } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.input) {
            this.input.focus();
          }
        }}
      >
        <View style={[styles.container, style]}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.input}
            underlineColorAndroid="transparent"
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            keyboardType={keyboardType}
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
    minHeight: 22
  }
});
