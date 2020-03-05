import * as React from 'react';
import { Appearance } from 'react-native-appearance';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ImageButton } from './ImageButton';
import { formatDate } from '../modules/format';
import { isTablet } from '../modules/layout';
import { getTheme } from '../modules/theme';

import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

export interface TimePickerProperties {
  label: string;
  value: string;
  clearable?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  style?: StyleProp<ViewStyle>;
  nativeID?: string;
}

export interface TimePickerState {
  showModal: boolean;
  isDarkModeEnabled: boolean;
}

export class TimePicker extends React.Component<
  TimePickerProperties,
  TimePickerState
> {
  static defaultProps = {
    clearable: true
  };

  state: TimePickerState = {
    showModal: false,
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

  componentWillUnmount() {
    this.appearanceSubscription.remove();
  }

  handlePress = () => {
    this.setState({ showModal: true });
  };

  handleConfirm = (value: Date) => {
    this.setState({ showModal: false }, () => {
      if (this.props.onChange) {
        this.props.onChange(formatDate(value, 'HH:mm'));
      }
    });
  };

  handleCancel = () => {
    this.setState({ showModal: false }, () => {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    });
  };

  handleClear = () => {
    if (this.props.onChange) {
      this.props.onChange('');
    }
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
        lineHeight: 22,
        minHeight: 22
      },
      readonly: {
        backgroundColor: theme.disabledColor
      },
      clearIcon: {
        borderWidth: 0,
        marginLeft: 'auto',
        height: 'auto',
        width: 'auto'
      }
    });

    return styles;
  };

  render() {
    const { label, value, clearable, style, disabled, nativeID } = this.props;
    const { showModal, isDarkModeEnabled } = this.state;

    const date = new Date();
    const hourRegex = /(\d{2}):(\d{2})/;
    const matches = hourRegex.exec(value);

    const styles = this.getStyles();
    const theme = getTheme();

    if (matches) {
      date.setHours(parseInt(matches[1], 10));
      date.setMinutes(parseInt(matches[2], 10));
    }

    return (
      <>
        <TouchableWithoutFeedback
          disabled={disabled}
          onPress={this.handlePress}
        >
          <View
            nativeID={nativeID}
            style={[styles.container, style, disabled ? styles.readonly : null]}
          >
            <View>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>

            {!disabled && (
              <ImageButton
                icon={value && clearable ? 'times' : 'clock-o'}
                style={styles.clearIcon}
                iconColor={
                  value && clearable ? theme.textColor1 : theme.textColor2
                }
                onPress={
                  value && clearable ? this.handleClear : this.handlePress
                }
                hitBoxSize={30}
              />
            )}

            {Platform.OS !== 'web' && (
              <DateTimePickerModal
                mode="time"
                date={date}
                isVisible={showModal}
                onConfirm={this.handleConfirm}
                onCancel={this.handleCancel}
                isDarkModeEnabled={isDarkModeEnabled}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}
