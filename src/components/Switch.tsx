import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Switch as ReactNativeSwitch,
  View,
  ViewStyle
} from 'react-native';

import { getTheme } from '../modules/theme';

export interface SwitchProperties {
  label: string;
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export class Switch extends React.Component<SwitchProperties> {
  render() {
    const { label, value, onChange, style, disabled } = this.props;

    return (
      <TouchableWithoutFeedback
        disabled={disabled}
        onPress={() => {
          if (onChange) {
            onChange(!value);
          }
        }}
      >
        <View
          style={[styles.container, style, disabled ? styles.readonly : null]}
        >
          <Text style={[styles.label, disabled ? styles.readonly : null]}>
            {label}
          </Text>
          <ReactNativeSwitch
            disabled={disabled}
            value={value}
            onValueChange={onChange}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.borderColor1,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    color: theme.textColor2,
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    lineHeight: 16
  },
  readonly: {
    backgroundColor: theme.disabled
  }
});
