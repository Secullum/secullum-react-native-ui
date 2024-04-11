import * as React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDate } from '../modules/format';
import { isTablet } from '../modules/layout';
import { getTheme } from '../modules/theme';
import { ImageButton } from './ImageButton';
import { getTestID } from '../modules/test';

import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Appearance
} from 'react-native';

export interface DatePickerProperties {
  label: string;
  value?: Date;
  clearable?: boolean;
  onChange: (value?: Date) => void;
  onCancel?: () => void;
  style?: StyleProp<ViewStyle>;
  nativeID?: string;
  disabled?: boolean;
}

export interface DatePickerState {
  showModal: boolean;
  isDarkModeEnabled: boolean;
}

export class DatePicker extends React.Component<
  DatePickerProperties,
  DatePickerState
> {
  static defaultProps = {
    clearable: true
  };

  state: DatePickerState = {
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
      this.props.onChange(value);
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
        fontFamily: theme.fontFamily3,
        fontSize: isTablet() ? 15 : 12,
        lineHeight: 16
      },
      value: {
        color: theme.textColor1,
        fontFamily: theme.fontFamily1,
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
      },
      readonly: {
        backgroundColor: theme.disabledColor
      }
    });

    return styles;
  };

  render() {
    const { label, value, clearable, style, nativeID, disabled } = this.props;
    const { showModal, isDarkModeEnabled } = this.state;
    const styles = this.getStyles();
    const theme = getTheme();

    return (
      <TouchableWithoutFeedback disabled={disabled} onPress={this.handlePress}>
        <View
          nativeID={nativeID}
          testID={getTestID(nativeID)}
          style={[styles.container, style, disabled ? styles.readonly : null]}
        >
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>
              {value ? formatDate(value, 'cccc, dd/MM/yyyy') : ''}
            </Text>
          </View>

          {!disabled && (
            <ImageButton
              icon={value && clearable ? 'times' : 'calendar'}
              style={styles.clearIcon}
              iconColor={
                value && clearable ? theme.textColor1 : theme.textColor2
              }
              onPress={value && clearable ? this.handleClear : this.handlePress}
              hitBoxSize={30}
            />
          )}

          {Platform.OS !== 'web' && (
            <DateTimePickerModal
              date={value || undefined}
              isVisible={showModal}
              onConfirm={this.handleConfirm}
              onCancel={this.handleCancel}
              isDarkModeEnabled={isDarkModeEnabled}
              //@ts-ignore
              display={Platform.OS == 'ios' ? 'inline' : 'default'}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
