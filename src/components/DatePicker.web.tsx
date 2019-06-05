import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';
import { formatDate } from '../modules/format';
import { ImageButton } from './ImageButton';

import { Calendar } from 'react-date-range';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';

import 'react-date-range/dist/styles.css';

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

  private calendarRef = React.createRef<HTMLDivElement>();

  componentWillMount() {
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
      this.setState({ showModal: false });
    }
  };

  handlePress = () => {
    this.setState({ showModal: true });
  };

  handleConfirm = (value: any) => {
    this.props.onChange(value);
    this.setState({ showModal: false });
  };

  getStyles = (): any => {
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
      clearIcon: {
        borderWidth: 0,
        marginLeft: 'auto'
      },
      calendar: {
        position: 'absolute',
        paddingTop: 20,
        marginLeft: -150
      }
    });

    return styles;
  };

  render() {
    const { label, value, clearable, style } = this.props;

    const styles = this.getStyles();

    const theme = getTheme();

    return (
      <>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={[styles.container, style]}>
            <View>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>
                {value != undefined
                  ? formatDate(value, 'dddd, DD/MM/YYYY')
                  : ''}
              </Text>
            </View>
            <View
              ref={ref => ref && ref.setNativeProps({ id: 'date-picker' })}
            />
            <ImageButton
              icon={value && clearable ? 'times' : 'calendar'}
              style={styles.clearIcon}
              iconColor={
                value && clearable ? theme.textColor1 : theme.textColor2
              }
              onPress={this.handlePress}
              hitBoxSize={30}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.state.showModal &&
          ReactDOM.createPortal(
            <div ref={this.calendarRef} style={styles.calendar}>
              <Calendar
                showMonthAndYearPickers={false}
                date={value}
                onChange={this.handleConfirm}
              />
            </div>,
            document.getElementById('date-picker') as Element
          )}
      </>
    );
  }
}
