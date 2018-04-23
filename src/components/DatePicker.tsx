import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatDate } from '../modules/format';
import { getTheme } from '../modules/theme';

export interface DatePickerProperties {
  label: string;
  value: Date;
  onChange: (value: Date) => void;
}

export interface DatePickerState {
  showModal: boolean;
}

export class DatePicker extends React.Component<
  DatePickerProperties,
  DatePickerState
> {
  state: DatePickerState = {
    showModal: false
  };

  handlePress = () => {
    this.setState({ showModal: true });
  };

  handleConfirm = (value: Date) => {
    this.props.onChange(value);
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>{this.props.label}</Text>
            <Text style={styles.value}>
              {formatDate(this.props.value, 'dddd, DD/MM/YYYY')}
            </Text>
          </View>
          <FontAwesome name="calendar" style={styles.icon} />
          <DateTimePicker
            date={this.props.value}
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
  icon: {
    marginLeft: 'auto',
    color: theme.textColor2,
    fontSize: 22
  }
});
