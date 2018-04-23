import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDate } from '../modules/format';
import { getTheme } from '../modules/theme';

export interface TimePickerProperties {
  label: string;
  value: string;
  onChange: (value: string) => void;
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
    this.props.onChange(formatDate(value, 'HH:mm'));
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({ showModal: false });
  };

  render() {
    const date = new Date();
    const hourRegex = /(\d{2}):(\d{2})/;
    const matches = hourRegex.exec(this.props.value);

    if (matches) {
      date.setHours(parseInt(matches[1], 10));
      date.setMinutes(parseInt(matches[2], 10));
    }

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>{this.props.label}</Text>
            <Text style={styles.value}>{this.props.value}</Text>
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
  }
});
