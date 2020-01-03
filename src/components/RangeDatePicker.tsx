import * as React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatDate } from '../modules/format';
import { getTheme } from '../modules/theme';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Platform
} from 'react-native';
import { isTablet } from '../modules/layout';
export interface RangeDatePickerProperties {
  label: string;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onEndDateCancel?: () => void;
  style?: StyleProp<ViewStyle>;
  nativeID?: string;
  isDarkModeEnabled: boolean;
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
    this.setState(
      {
        showStartDateModal: false,
        showEndDateModal: true
      },
      () => {
        if (date > this.props.endDate) {
          this.props.onEndDateChange(date);
        }
        this.props.onStartDateChange(date);
      }
    );
  };

  handleStartDateCancel = () => {
    this.setState({
      showStartDateModal: false,
      showEndDateModal: true
    });
  };

  handleEndDateConfirm = (date: Date) => {
    this.setState(
      {
        showEndDateModal: false
      },
      () => {
        this.props.onEndDateChange(date);
      }
    );
  };

  handleEndDateCancel = () => {
    if (this.props.onEndDateCancel) {
      this.props.onEndDateCancel();
    }

    this.setState({
      showEndDateModal: false
    });
  };

  getStyles = () => {
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
        fontSize: isTablet() ? 15 : 12,
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

    return styles;
  };

  render() {
    const {
      label,
      startDate,
      endDate,
      style,
      nativeID,
      isDarkModeEnabled
    } = this.props;
    const { showStartDateModal, showEndDateModal } = this.state;

    const displayFormat = 'MMM D, YYYY';

    const displayText =
      formatDate(startDate, displayFormat) +
      ' - ' +
      formatDate(endDate, displayFormat);

    const styles = this.getStyles();

    return (
      <TouchableWithoutFeedback onPress={this.handleDatePickerPress}>
        <View nativeID={nativeID} style={[styles.container, style]}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{displayText}</Text>
          </View>
          <FontAwesome name="calendar" style={styles.icon} />

          {Platform.OS === 'ios' ? (
            showStartDateModal ? (
              <DateTimePickerModal
                date={startDate}
                isVisible={true}
                onConfirm={this.handleStartDateConfirm}
                onCancel={this.handleStartDateCancel}
                isDarkModeEnabled={isDarkModeEnabled}
              />
            ) : showEndDateModal ? (
              <DateTimePickerModal
                date={endDate}
                isVisible={true}
                onConfirm={this.handleEndDateConfirm}
                onCancel={this.handleEndDateCancel}
                isDarkModeEnabled={isDarkModeEnabled}
              />
            ) : null
          ) : (
            <>
              <DateTimePickerModal
                date={startDate}
                isVisible={showStartDateModal}
                onConfirm={this.handleStartDateConfirm}
                onCancel={this.handleStartDateCancel}
                isDarkModeEnabled={isDarkModeEnabled}
              />
              <DateTimePickerModal
                date={endDate}
                minimumDate={startDate}
                isVisible={showEndDateModal}
                onConfirm={this.handleEndDateConfirm}
                onCancel={this.handleEndDateCancel}
                isDarkModeEnabled={isDarkModeEnabled}
              />
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
