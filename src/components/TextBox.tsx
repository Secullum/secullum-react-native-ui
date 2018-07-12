import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  TextInputProps,
  ReturnKeyTypeOptions
} from 'react-native';

export interface TextBoxInputProps extends TextInputProps {
  ref: (ref: TextInput) => void;
}

export interface TextBoxProperties {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  renderInput?: (props: TextBoxInputProps) => JSX.Element;
  onSubmitEditing?: () => void;
  inputRef?: (value: TextInput) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardType;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  editable?: boolean;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: ReturnKeyTypeOptions;
}

export class TextBox extends React.Component<TextBoxProperties> {
  input: TextInput | null = null;

  static defaultProps = {
    editable: true
  };

  renderInput = (props: TextInputProps) => <TextInput {...props} />;

  render() {
    const { label, style, editable, inputRef, renderInput } = this.props;

    const incomingProps: TextBoxInputProps = {
      value: this.props.value,
      onChangeText: this.props.onChange,
      onBlur: this.props.onBlur,
      style: [
        styles.input,
        this.props.inputStyle,
        this.props.editable ? null : styles.readonly
      ],
      underlineColorAndroid: 'transparent',
      secureTextEntry: this.props.secureTextEntry,
      multiline: this.props.multiline,
      editable: this.props.editable,
      keyboardType: this.props.keyboardType,
      maxLength: this.props.maxLength,
      returnKeyType: this.props.returnKeyType,
      onSubmitEditing: this.props.onSubmitEditing,
      ref: (input: TextInput) => {
        this.input = input;
        if (inputRef) inputRef(input);
      }
    };

    return (
      <TouchableWithoutFeedback
        disabled={!editable}
        onPress={() => {
          if (this.input) {
            this.input.focus();
          }
        }}
      >
        <View
          style={[styles.container, style, editable ? null : styles.readonly]}
        >
          <Text style={styles.label}>{label}</Text>
          {renderInput
            ? renderInput(incomingProps)
            : this.renderInput(incomingProps)}
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
    backgroundColor: theme.disabledColor
  }
});
