import * as React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import { isTablet } from '../modules/layout';
import { getTheme } from '../modules/theme';

import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

interface Props {
  label?: string;
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  renderLabel?: () => React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  nativeID?: string;
}

export class CheckBox extends React.Component<Props> {
  getStyles = () => {
    const theme = getTheme();
    const { disabled } = this.props;

    const iconSize = isTablet() ? 24 : 20;

    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      icon: {
        color: disabled ? theme.disabledColor : theme.textColor1,
        width: isTablet() ? 28 : 24,
        fontSize: iconSize,
        height: iconSize,
        lineHeight: iconSize
      },
      label: {
        color: disabled ? theme.disabledColor : theme.textColor1,
        fontFamily: theme.fontFamily3,
        fontSize: isTablet() ? 15 : 12,
        flexShrink: 1
      }
    });
  };

  render() {
    const {
      label,
      value,
      onChange,
      disabled,
      style,
      labelStyle,
      renderLabel,
      nativeID
    } = this.props;

    const styles = this.getStyles();

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        disabled={disabled}
        onPress={() => {
          if (onChange) {
            onChange(!value);
          }
        }}
      >
        <Icons
          nativeID={nativeID}
          name={value ? 'check-square-o' : 'square-o'}
          style={styles.icon}
        />
        <Text style={[styles.label, labelStyle]}>
          {renderLabel ? renderLabel() : label}
        </Text>
      </TouchableOpacity>
    );
  }
}
