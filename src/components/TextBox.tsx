import * as React from 'react';
import { getTheme } from '../modules/theme';

import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputStatic,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  TextInputProps
} from 'react-native';

export interface TextBoxProperties {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  renderInput?: (props: TextBoxInputProps) => void;
  onEnter?: () => void;
  inputRef?: (value: any) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardType;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  editable?: boolean;
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

interface TextBoxInputProps extends TextInputProps {
  ref: (ref: any) => void;
}

export class TextBox extends React.Component<TextBoxProperties> {
  input: TextInputStatic | null = null;

  static defaultProps = {
    editable: true
  };

  renderInput = (props: TextInputProps) => <TextInput {...props} />;

  render() {
    const {
      label,
      style,
      editable,
      inputRef,
      onEnter,
      renderInput
    } = this.props;

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
      autoCapitalize: 'characters',
      ref: (input: any) => {
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16318
        this.input = input as TextInputStatic | null;
        if (inputRef) inputRef(input);
      },
      onSubmitEditing: () => {
        if (onEnter) onEnter();
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
