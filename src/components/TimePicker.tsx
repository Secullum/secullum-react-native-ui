import * as React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDate } from '../modules/format';
import { getTheme } from '../modules/theme';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

export interface TimePickerProperties {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export interface TimePickerState {
  showModal: boolean;
}

export class TimePicker extends React.Component<
  TimePickerProperties,
  TimePickerState
> {
  state: TimePickerState = {
    showModal: false
  };

  handlePress = () => {
    this.setState({ showModal: true });
  };

  handleConfirm = (value: Date) => {
    if (this.props.onChange) {
      this.props.onChange(formatDate(value, 'HH:mm'));
    }

    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { label, value, style, disabled } = this.props;

    const date = new Date();
    const hourRegex = /(\d{2}):(\d{2})/;
    const matches = hourRegex.exec(value);

    if (matches) {
      date.setHours(parseInt(matches[1], 10));
      date.setMinutes(parseInt(matches[2], 10));
    }

    return (
      <TouchableWithoutFeedback disabled={disabled} onPress={this.handlePress}>
        <View
          style={[styles.container, style, disabled ? styles.readonly : null]}
        >
          <View>
            <Text style={[styles.label, disabled ? styles.readonly : null]}>
              {label}
            </Text>
            <Text style={[styles.value, disabled ? styles.readonly : null]}>
              {value}
            </Text>
          </View>
          <DateTimePicker
            mode="time"
            date={date}
            isVisible={this.state.showModal}
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
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
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: theme.textColor2,
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    lineHeight: 16
  },
  value: {
    color: theme.textColor1,
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 22
  },
  readonly: {
    backgroundColor: theme.disabled
  }
});
