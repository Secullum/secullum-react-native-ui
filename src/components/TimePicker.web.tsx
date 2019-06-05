import * as React from 'react';

import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  TextInputProps,
  TextInputKeyPressEventData
} from 'react-native';

import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import { isHour } from '../modules/validation';

export interface TextBoxInputProps extends TextInputProps {
  ref: (ref: TextInput) => void;
}

export interface TimePickerProperties {
  label: string;
  value: string;
  clearable?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export class TimePicker extends React.Component<TimePickerProperties> {
  private backspace = false;

  static defaultProps = {
    disabled: false
  };

  getStyles = (): any => {
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
        fontSize: isTablet() ? 15 : 12,
        lineHeight: 16
      },
      input: {
        color: theme.textColor1,
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        minHeight: 22,
        padding: 0,
        margin: 0,
        outline: '0'
      },
      readonly: {
        backgroundColor: theme.disabledColor
      }
    });

    return styles;
  };

  render() {
    const { label, style, disabled, value } = this.props;

    const styles = this.getStyles();

    return (
      <TouchableWithoutFeedback accessible={false} disabled={disabled}>
        <View
          style={[styles.container, style, !disabled ? null : styles.readonly]}
        >
          <Text style={styles.label}>{label}</Text>
          <TextInput
            value={value}
            style={styles.input}
            maxLength={5}
            onKeyPress={(nativeEvent: TextInputKeyPressEventData) => {
              if (nativeEvent.key === 'Backspace') {
                this.backspace = true;
              }
            }}
            onChangeText={(text: string) => {
              if (text.length === 2 && !this.backspace) {
                text += ':';
              }

              if (text.length === 3 && !text.includes(':')) {
                text = text.substr(0, 2) + ':' + text.substr(2);
              }

              if (text.length <= 2) {
                this.backspace = false;
              }

              if (isHour(text + '00:00'.substr(text.length))) {
                this.props.onChange(text);
              }
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
