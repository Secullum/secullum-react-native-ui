import * as React from 'react';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  KeyboardType,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
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
  autoFocus?: boolean;
  label?: string;
  icon?: string;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
  onKeyPress?: (nativeEvent: TextInputKeyPressEventData) => void;
  onBlur?: () => void;
  renderInput?: (props: TextBoxInputProps) => JSX.Element;
  onSubmitEditing?: () => void;
  inputRef?: (value: TextInput) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardType;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  editable?: boolean;
  autoCorrect?: boolean;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: ReturnKeyTypeOptions;
  blurOnSubmit?: boolean;
  nativeID?: string;
  selection?: { start: number; end?: number };
}

export class TextBox extends React.Component<TextBoxProperties> {
  input: TextInput | null = null;

  static defaultProps = {
    editable: true,
    autoCorrect: false,
    blurOnSubmit: true
  };

  getStyles = () => {
    const theme = getTheme();
    const { icon } = this.props;

    const styles = StyleSheet.create({
      container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: theme.borderColor1,
        borderRadius: 3,
        ...(icon ? { flexDirection: 'row' } : {})
      },
      icon: {
        color: theme.textColor2,
        fontSize: isTablet() ? 21 : 19,
        paddingRight: 10,
        alignSelf: 'center',
        minHeight: 22
      },
      label: {
        color: theme.textColor2,
        fontFamily: theme.fontFamily3,
        fontSize: isTablet() ? 15 : 12,
        lineHeight: 16
      },
      input: {
        color: theme.textColor1,
        fontFamily: this.props.value ? theme.fontFamily1 : theme.fontFamily3,
        fontWeight: 'normal',
        fontSize: 16,
        minHeight: 22,
        padding: 0,
        margin: 0,
        ...(Platform.OS === 'web' ? { outline: 'none' } : {})
      },
      readonly: {
        backgroundColor: theme.disabledColor
      }
    });

    return styles;
  };

  focus = () => {
    if (this.input && this.props.editable) {
      this.input.focus();
    }
  };

  renderInput = (props: TextInputProps) => <TextInput {...props} />;

  render() {
    const {
      label,
      style,
      labelStyle,
      editable,
      inputRef,
      renderInput,
      icon
    } = this.props;

    const styles = this.getStyles();

    const incomingProps: TextBoxInputProps = {
      nativeID: this.props.nativeID,
      autoFocus: this.props.autoFocus,
      value: this.props.value,
      onChangeText: this.props.onChange,
      onBlur: this.props.onBlur,
      style: [
        styles.input,
        this.props.inputStyle,
        this.props.editable ? null : styles.readonly
      ],
      underlineColorAndroid: 'transparent',
      //@ts-ignore: no Android < 6 essa é a prop que deixa o underline transparente. https://stackoverflow.com/questions/40478246/remove-underline-in-inputtext-in-react-native
      borderWidth: 0,
      placeholder: this.props.placeholder,
      secureTextEntry: this.props.secureTextEntry,
      multiline: this.props.multiline,
      editable: this.props.editable,
      keyboardType: this.props.keyboardType,
      maxLength: this.props.maxLength,
      onSubmitEditing: this.props.onSubmitEditing,
      autoCapitalize: this.props.autoCapitalize,
      autoCorrect: this.props.autoCorrect,
      returnKeyType:
        Platform.OS === 'ios' &&
        this.props.keyboardType === 'numeric' &&
        this.props.returnKeyType === 'next'
          ? 'done'
          : this.props.returnKeyType,
      ref: (input: TextInput) => {
        this.input = input;
        if (inputRef) inputRef(input);
      },
      selection: this.props.selection,
      onKeyPress: (event: any) => {
        if (!this.props.onKeyPress) {
          return;
        }

        this.props.onKeyPress(
          Platform.OS === 'web' ? event : event.nativeEvent
        );
      }
    };

    return (
      <TouchableWithoutFeedback
        accessible={false}
        onPress={() => {
          this.focus();
        }}
      >
        <View
          style={[styles.container, style, editable ? null : styles.readonly]}
        >
          {icon ? (
            <FontAwesome name={icon} style={styles.icon} />
          ) : (
            <Text style={[styles.label, labelStyle]}>{label}</Text>
          )}
          {renderInput
            ? renderInput(incomingProps)
            : this.renderInput(incomingProps)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
