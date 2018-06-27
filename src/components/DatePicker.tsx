import * as React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatDate } from '../modules/format';
import { getTheme } from '../modules/theme';
import { ImageButton } from './ImageButton';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

export interface DatePickerProperties {
  label: string;
  value?: Date;
  clearable?: boolean;
  onChange: (value?: Date) => void;
  style?: StyleProp<ViewStyle>;
}

export interface DatePickerState {
  showModal: boolean;
}

export class DatePicker extends React.Component<
  DatePickerProperties,
  DatePickerState
> {
  static defaultProps = {
    clearable: true
  };

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

  handleClear = () => {
    this.props.onChange(undefined);
  };

  render() {
    const { label, value, clearable, style } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={[styles.container, style]}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>
              {value != undefined ? formatDate(value, 'dddd, DD/MM/YYYY') : ''}
            </Text>
          </View>
          <FontAwesome name="calendar" style={styles.calendarIcon} />
          <DateTimePicker
            date={value}
            isVisible={this.state.showModal}
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
          />
          {clearable && (
            <ImageButton
              icon="times"
              style={styles.clearIcon}
              onPress={this.handleClear}
            />
          )}
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
    lineHeight: 22,
    minHeight: 22
  },
  calendarIcon: {
    marginLeft: 'auto',
    color: theme.textColor2,
    fontSize: 22
  },
  clearIcon: {
    borderWidth: 0,
    marginLeft: 10,
    height: 'auto',
    width: 'auto'
  }
});
