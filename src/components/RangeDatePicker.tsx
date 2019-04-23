import * as React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatDate, getLocale } from '../modules/format';
import { getTheme } from '../modules/theme';
import { DateRange, SelectedRanges } from 'react-date-range';
import * as ReactDOM from 'react-dom';

import 'react-date-range/dist/styles.css';
import { pt, es, enUS } from 'react-date-range/dist/locale';

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

if (Platform.OS === 'web') {
  require('../../styles/RangeDatePicker.css');
}

export interface RangeDatePickerProperties {
  label: string;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onEndDateCancel?: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface RangeDatePickerState {
  showStartDateModal: boolean;
  showEndDateModal: boolean;
  count: number;
}

export class RangeDatePicker extends React.Component<
  RangeDatePickerProperties,
  RangeDatePickerState
> {
  state: RangeDatePickerState = {
    showStartDateModal: false,
    showEndDateModal: false,
    count: 0
  };

  private ref = React.createRef<HTMLDivElement>();

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (event: MouseEvent) => {
    if (this.ref.current && !this.ref.current.contains(event.target as Node)) {
      this.setState({ showStartDateModal: false, count: 0 });
    }
  };

  handleDatePickerPress = () => {
    this.setState({
      showStartDateModal: true
    });
  };

  handleStartDateConfirm = (date: Date) => {
    if (date > this.props.endDate) {
      this.props.onEndDateChange(date);
    }

    this.props.onStartDateChange(date);
    this.handleStartDateCancel();
  };

  handleRangeDateConfirm = (ranges: SelectedRanges) => {
    if (this.state.count == 1) {
      this.props.onStartDateChange(ranges.selection.startDate);

      // This timeout is becouse the setState method is async and sometimes
      // the component is not ready.
      setTimeout(() => this.props.onEndDateChange(ranges.selection.endDate), 1);
      this.setState({ showStartDateModal: false, count: 0 });

      return;
    }
    this.props.onStartDateChange(ranges.selection.startDate);
    this.setState({ count: 1 });
  };

  handleStartDateCancel = () => {
    this.setState({
      showStartDateModal: false,
      showEndDateModal: true
    });
  };

  handleEndDateConfirm = (date: Date) => {
    this.props.onEndDateChange(date);

    this.setState({
      showEndDateModal: false
    });
  };

  handleEndDateCancel = () => {
    if (this.props.onEndDateCancel) {
      this.props.onEndDateCancel();
    }

    this.setState({
      showEndDateModal: false
    });
  };

  getCalendarLocale = () => {
    switch (getLocale()) {
      case 'pt':
        return pt;
      case 'es':
        return es;
      default:
        return enUS;
    }
  };

  getStyles = (): any => {
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
    const { label, startDate, endDate, style } = this.props;
    const { showStartDateModal, showEndDateModal } = this.state;

    const displayFormat = 'MMM D, YYYY';

    const displayText =
      formatDate(startDate, displayFormat) +
      ' - ' +
      formatDate(endDate, displayFormat);

    const styles = this.getStyles();

    return (
      <TouchableWithoutFeedback onPress={this.handleDatePickerPress}>
        <View style={[styles.container, style]}>
          <View nativeID={'range-date-picker'}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{displayText}</Text>
          </View>
          <FontAwesome name="calendar" style={styles.icon} />

          {Platform.OS === 'web' ? (
            showStartDateModal &&
            ReactDOM.createPortal(
              <div
                ref={this.ref}
                style={{
                  position: 'fixed',
                  paddingTop: '50px',
                  marginLeft: '-10px'
                }}
              >
                <DateRange
                  locale={this.getCalendarLocale()}
                  showDateDisplay={false}
                  showMonthAndYearPickers={false}
                  ranges={[
                    {
                      startDate: startDate,
                      endDate: endDate,
                      key: 'selection'
                    }
                  ]}
                  onChange={this.handleRangeDateConfirm}
                />
              </div>,
              document.getElementById('range-date-picker') as Element
            )
          ) : Platform.OS === 'ios' ? (
            showStartDateModal ? (
              <DateTimePicker
                date={startDate}
                isVisible={true}
                onConfirm={this.handleStartDateConfirm}
                onCancel={this.handleStartDateCancel}
              />
            ) : showEndDateModal ? (
              <DateTimePicker
                date={endDate}
                isVisible={true}
                onConfirm={this.handleEndDateConfirm}
                onCancel={this.handleEndDateCancel}
              />
            ) : null
          ) : (
            <>
              <DateTimePicker
                date={startDate}
                isVisible={showStartDateModal}
                onConfirm={this.handleStartDateConfirm}
                onCancel={this.handleStartDateCancel}
              />
              <DateTimePicker
                date={endDate}
                minimumDate={startDate}
                isVisible={showEndDateModal}
                onConfirm={this.handleEndDateConfirm}
                onCancel={this.handleEndDateCancel}
              />
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
