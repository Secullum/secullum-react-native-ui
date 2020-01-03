import * as React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
  isDarkModeEnabled: boolean;
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

  static defaultProps = {
    clearable: true
  };

  handlePress = () => {
    this.setState({ showModal: true });
  };

  handleConfirm = (value: Date) => {
    this.setState({ showModal: false }, () => {
      this.props.onChange(value);
    });
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
    const {
      label,
      value,
      clearable,
      style,
      nativeID,
      isDarkModeEnabled
    } = this.props;

    const styles = this.getStyles();

    const theme = getTheme();

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View nativeID={nativeID} style={[styles.container, style]}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>
              {value != undefined ? formatDate(value, 'dddd, DD/MM/YYYY') : ''}
            </Text>
          </View>

          {Platform.OS !== 'web' && (
            <DateTimePickerModal
              date={value}
              isVisible={this.state.showModal}
              onConfirm={this.handleConfirm}
              onCancel={this.handleCancel}
              isDarkModeEnabled={isDarkModeEnabled}
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
