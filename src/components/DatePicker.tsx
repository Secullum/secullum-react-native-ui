import * as React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDate } from '../modules/format';
import { getTheme } from '../modules/theme';
import { ImageButton } from './ImageButton';

import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import { isTablet } from '../modules/layout';

export interface DatePickerProperties {
  label: string;
  value?: Date;
  clearable?: boolean;
  onChange: (value?: Date) => void;
  style?: StyleProp<ViewStyle>;
  nativeID?: string;
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

  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        paddingLeft: 16,
        paddingRight: 4,
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
        fontSize: isTablet() ? 15 : 12,
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
        marginLeft: 'auto'
      }
    });

    return styles;
  };

  render() {
    const { label, value, clearable, style } = this.props;

    const styles = this.getStyles();

    const theme = getTheme();

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={[styles.container, style]}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>
              {value != undefined ? formatDate(value, 'dddd, DD/MM/YYYY') : ''}
            </Text>
          </View>

          {Platform.OS !== 'web' && (
            <DateTimePicker
              date={value}
              isVisible={this.state.showModal}
              onConfirm={this.handleConfirm}
              onCancel={this.handleCancel}
            />
          )}

          <ImageButton
            icon={value && clearable ? 'times' : 'calendar'}
            style={styles.clearIcon}
            iconColor={value && clearable ? theme.textColor1 : theme.textColor2}
            onPress={value && clearable ? this.handleClear : this.handlePress}
            hitBoxSize={30}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
