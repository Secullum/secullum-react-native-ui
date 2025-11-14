import * as React from 'react';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTestID } from '../modules/test';

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
  onPress?: () => void;
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
        marginRight: 10,
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
        ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
        ...(icon ? { flex: 1 } : {})
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

  renderInput = (props: TextInputProps) => {
    const { nativeID, ...otherProps } = props;

    return (
      <TextInput
        nativeID={nativeID}
        testID={getTestID(nativeID)}
        {...otherProps}
      />
    );
  };

  render() {
    const {
      label,
      style,
      labelStyle,
      editable,
      inputRef,
      renderInput,
      icon,
      onPress,
      autoCapitalize,
      secureTextEntry
    } = this.props;

    const styles = this.getStyles();

    // Força primeira letra minúscula em campos de senha, a menos que autoCapitalize seja definido explicitamente.
    const capitalize =
      secureTextEntry && !autoCapitalize ? 'none' : autoCapitalize;

    const incomingProps: TextBoxInputProps = {
      nativeID: this.props.nativeID,
      testID: getTestID(this.props.nativeID),
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
      // We set a fixed color for the placeholder to prevent it from being affected by the device's theme.
      // Related issue on GitLab: 12074
      placeholderTextColor: getTheme().textColor3,
      secureTextEntry: secureTextEntry,
      multiline: this.props.multiline,
      editable: this.props.editable,
      keyboardType: this.props.keyboardType,
      maxLength: this.props.maxLength,
      onSubmitEditing: this.props.onSubmitEditing,
      autoCapitalize: capitalize,
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
        onPress={() => (onPress ? onPress() : this.focus())}
        ref={ref => {
          if (Platform.OS === 'web' && ref != null) {
            // @ts-ignore na web, a ref recebida é o próprio elemento DOM
            ref.tabIndex = -1;
          }
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
