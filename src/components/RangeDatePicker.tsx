import * as React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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

export interface RangeDatePickerProperties {
  label: string;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
}

export interface RangeDatePickerState {
  showStartDateModal: boolean;
  showEndDateModal: boolean;
}

export class RangeDatePicker extends React.Component<
  RangeDatePickerProperties,
  RangeDatePickerState
> {
  state: RangeDatePickerState = {
    showStartDateModal: false,
    showEndDateModal: false
  };

  handleDatePickerPress = () => {
    this.setState({
      showStartDateModal: true
    });
  };

  handleStartDateConfirm = (date: Date) => {
    this.props.onStartDateChange(date);
    this.handleStartDateCancel();
  };

  handleStartDateCancel = () => {
    this.setState({
      showStartDateModal: false,
      showEndDateModal: true
    });
  };

  handleEndDateConfirm = (date: Date) => {
    this.props.onEndDateChange(date);
    this.handleEndDateCancel();
  };

  handleEndDateCancel = () => {
    this.setState({
      showEndDateModal: false
    });
  };

  render() {
    const { label, startDate, endDate, style } = this.props;
    const { showStartDateModal, showEndDateModal } = this.state;

    const displayFormat = 'MMM D, YYYY';

    const displayText =
      formatDate(startDate, displayFormat) +
      ' - ' +
      formatDate(endDate, displayFormat);

    return (
      <TouchableWithoutFeedback onPress={this.handleDatePickerPress}>
        <View style={[styles.container, style]}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{displayText}</Text>
          </View>
          <FontAwesome name="calendar" style={styles.icon} />
          <DateTimePicker
            date={startDate}
            isVisible={showStartDateModal}
            onConfirm={this.handleStartDateConfirm}
            onCancel={this.handleStartDateCancel}
          />
          <DateTimePicker
            date={endDate}
            isVisible={showEndDateModal}
            onConfirm={this.handleEndDateConfirm}
            onCancel={this.handleEndDateCancel}
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
