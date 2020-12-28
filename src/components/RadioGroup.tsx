import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';

export interface RadioGroupProperties {
  items: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
  disabled?: Array<string>;
}

export class RadioGroup extends React.Component<RadioGroupProperties> {
  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        borderColor: theme.borderColor1,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: theme.backgroundColor2,
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      item: {
        paddingVertical: isTablet() ? 10 : 5,
        borderColor: theme.borderColor1,
        flex: 1,
        alignItems: 'center'
      },
      itemText: {
        fontFamily: 'Roboto',
        fontSize: isTablet() ? 16 : 12,
        lineHeight: isTablet() ? 20 : 16
      },
      selectedItem: {
        backgroundColor: theme.backgroundColor3
      },
      selectedItemText: {
        color: theme.textColor4
      },
      readonly: {
        backgroundColor: theme.disabledColor
      }
    });

    return styles;
  };

  render() {
    const { items, value, onChange, disabled } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        {items.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            disabled={disabled && disabled.includes(item.value)}
            onPress={() => onChange(item.value)}
          >
            <View
              style={[
                styles.item,
                { borderRightWidth: index === items.length - 1 ? 0 : 1 },
                item.value === value ? styles.selectedItem : null,
                disabled && disabled.includes(item.value)
                  ? styles.readonly
                  : null
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  item.value === value ? styles.selectedItemText : null
                ]}
              >
                {item.label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}
