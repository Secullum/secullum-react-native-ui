import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { getTheme } from '../modules/theme';

export interface RadioGroupProperties {
  items: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}

export class RadioGroup extends React.Component<RadioGroupProperties> {
  getStyles = (): any => {
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
        paddingVertical: 5,
        borderColor: theme.borderColor1,
        flex: 1,
        alignItems: 'center'
      },
      itemText: {
        fontFamily: 'Lato-Bold',
        fontSize: 12,
        lineHeight: 16
      },
      selectedItem: {
        backgroundColor: theme.backgroundColor3
      },
      selectedItemText: {
        color: theme.textColor4
      }
    });

    return styles;
  };

  render() {
    const { items, value, onChange } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.container}>
        {items.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onChange(item.value)}
          >
            <View
              style={[
                styles.item,
                { borderRightWidth: index === items.length - 1 ? 0 : 1 },
                item.value === value ? styles.selectedItem : null
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
