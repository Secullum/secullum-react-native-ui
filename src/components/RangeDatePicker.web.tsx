import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatDate, getDateFnsLocale, getLocale } from '../modules/format';
import { getTheme } from '../modules/theme';
import { DateRange, SelectedRanges } from 'react-date-range';
import { Modal } from './Modal';
import { isTablet } from '../modules/layout';
import 'react-date-range/dist/styles.css';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

import '../../styles/RangeDatePicker.css';

export interface RangeDatePickerProperties {
  label: string;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onEndDateCancel?: () => void;
  style?: StyleProp<ViewStyle>;
  nativeID?: string;
}

export interface RangeDatePickerState {
  showStartDateModal: boolean;
  count: number;
}

interface PureDateRangeProperties {
  startDate: Date;
  endDate: Date;
  onChange: (ranges: SelectedRanges) => void;
}

function compareDates(date1: Date, date2: Date) {
  if (date1 instanceof Date && date2 instanceof Date) {
    return date1.getTime() === date2.getTime();
  }

  return date1 === date2;
}

class PureDateRange extends React.Component<{
  startDate: Date;
  endDate: Date;
  onChange: (ranges: SelectedRanges) => void;
}> {
  // Without this check, every time the parent re-renders it would
  // recreate the DateRange with the initial startDate value,
  // even if the date hasn't actually changed.
  // This causes the calendar to reset and the user loses the current
  // selection while interacting.
  // Related issue on GitLab 12293
  shouldComponentUpdate(nextProps: PureDateRangeProperties) {
    if (nextProps.onChange !== this.props.onChange) {
      return true;
    }

    return (
      !compareDates(nextProps.startDate, this.props.startDate) ||
      !compareDates(nextProps.endDate, this.props.endDate)
    );
  }

  render() {
    const { startDate, endDate, onChange } = this.props;
    const theme = getTheme();

    return (
      <DateRange
        locale={getDateFnsLocale()}
        showDateDisplay={false}
        ranges={[
          {
            startDate,
            endDate,
            key: 'selection'
          }
        ]}
        rangeColors={[theme.backgroundColor3]}
        onChange={onChange}
        weekdayDisplayFormat={getLocale() === 'pt' ? 'EEEEEE' : 'E'}
      />
    );
  }
}

export class RangeDatePicker extends React.Component<
  RangeDatePickerProperties,
  RangeDatePickerState
> {
  state: RangeDatePickerState = {
    showStartDateModal: false,
    count: 0
  };

  private calendarRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (event: MouseEvent) => {
    if (
      this.calendarRef.current &&
      !this.calendarRef.current.contains(event.target as Node)
    ) {
      this.setState({ showStartDateModal: false, count: 0 });
    }
  };

  handleDatePickerPress = () => {
    this.setState({
      showStartDateModal: true
    });
  };

  handleRangeDateConfirm = (ranges: SelectedRanges) => {
    if (this.state.count == 1) {
      this.props.onStartDateChange(ranges.selection.startDate);

      // Sometimes the parent component is not ready because the setState method
      // is async, so we wait a little.
      setTimeout(() => this.props.onEndDateChange(ranges.selection.endDate), 1);

      this.setState({ showStartDateModal: false, count: 0 });

      return;
    }

    this.props.onStartDateChange(ranges.selection.startDate);
    this.setState({ count: 1 });
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
      modalOverlay: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      label: {
        color: theme.textColor2,
        fontFamily: theme.fontFamily3,
        fontSize: isTablet() ? 15 : 12,
        lineHeight: 16
      },
      value: {
        color: theme.textColor1,
        fontFamily: theme.fontFamily1,
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
    const { label, startDate, endDate, style, nativeID } = this.props;
    const { showStartDateModal } = this.state;

    const displayFormat = 'MMM d, yyyy';

    const displayText =
      formatDate(startDate, displayFormat) +
      ' - ' +
      formatDate(endDate, displayFormat);

    const theme = getTheme();
    const styles = this.getStyles();

    return (
      <TouchableWithoutFeedback onPress={this.handleDatePickerPress}>
        <View nativeID={nativeID} style={[styles.container, style]}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{displayText}</Text>
          </View>
          <FontAwesome name="calendar" style={styles.icon} />
          <Modal
            visible={showStartDateModal}
            overlayStyle={styles.modalOverlay}
          >
            <div
              ref={this.calendarRef}
              style={{
                borderRadius: '5px',
                position: 'absolute',
                top: '50%',
                marginTop: '-150px',
                fontFamily: theme.fontFamily1
              }}
            >
              <PureDateRange
                startDate={startDate}
                endDate={endDate}
                onChange={this.handleRangeDateConfirm}
              />
            </div>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
