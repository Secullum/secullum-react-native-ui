import * as React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatDate } from '../modules/format';
import { isTablet } from '../modules/layout';
import { getTheme } from '../modules/theme';
import { Delay } from './Delay';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Platform,
  Appearance
} from 'react-native';

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
  showEndDateModal: boolean;
  isDarkModeEnabled: boolean;
}

export class RangeDatePicker extends React.Component<
  RangeDatePickerProperties,
  RangeDatePickerState
> {
  state: RangeDatePickerState = {
    showStartDateModal: false,
    showEndDateModal: false,
    isDarkModeEnabled: Appearance.getColorScheme() === 'dark'
  };

  appearanceSubscription: any;

  componentDidMount() {
    this.appearanceSubscription = Appearance.addChangeListener(
      ({ colorScheme }) => {
        this.setState({ isDarkModeEnabled: colorScheme === 'dark' });
      }
    );
  }

  UNSAFE_componentWillUnmount() {
    this.appearanceSubscription.remove();
  }

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
        // When using RangeDatePicker on Android devices the end date modal were not being displayed, in order to avoid it,
        // the setTimeOut was implemented so as it will set a little delay (enough time to update the state) before execute other functions.
        // Related issue on gitlab: 3487
        setTimeout(() => {
          if (date > this.props.endDate) {
            this.props.onEndDateChange(date);
          }
          this.props.onStartDateChange(date);
        }, 1);
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

    const {
      showStartDateModal,
      showEndDateModal,
      isDarkModeEnabled
    } = this.state;

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

          {Platform.OS !== 'web' &&
            (showStartDateModal ? (
              <DateTimePickerModal
                date={startDate}
                isVisible={true}
                onConfirm={this.handleStartDateConfirm}
                onCancel={this.handleStartDateCancel}
                isDarkModeEnabled={isDarkModeEnabled}
                //@ts-ignore
                display={Platform.OS == 'ios' ? 'inline' : 'default'}
              />
            ) : showEndDateModal ? (
              <Delay wait={5}>
                <DateTimePickerModal
                  date={endDate}
                  isVisible={true}
                  onConfirm={this.handleEndDateConfirm}
                  onCancel={this.handleEndDateCancel}
                  isDarkModeEnabled={isDarkModeEnabled}
                  //@ts-ignore
                  display={Platform.OS == 'ios' ? 'inline' : 'default'}
                />
              </Delay>
            ) : null)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
