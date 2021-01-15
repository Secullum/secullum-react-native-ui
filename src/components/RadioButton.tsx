import * as React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { getTheme } from '../modules/theme';

export interface RadioButtonProps {
  items: Array<{ label: string; value: number }>;
  value: number;
  onChange: (value: number) => void;
}

export class RadioButton extends React.Component<RadioButtonProps> {
  getStyles = () => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      radioContainer: {
        flexDirection: 'row',
        paddingVertical: 5
      },
      radioButtom: {
        height: 14,
        width: 14,
        borderRadius: 12,
        borderWidth: 1.2,
        borderColor: '#cfcfcf',
        alignItems: 'center',
        justifyContent: 'center',
        top: 5
      },
      radioMark: {
        height: 8,
        width: 8,
        borderRadius: 6,
        backgroundColor: theme.textColor2
      },
      labelRadioButtom: {
        flex: 1,
        fontSize: 16,
        color: theme.textColor1,
        alignSelf: 'flex-start',
        left: 10,
        fontFamily: theme.fontFamily1
      }
    });

    return styles;
  };

  render() {
    const { items, value, onChange } = this.props;

    const styles = this.getStyles();

    return (
      <View>
        {items.map(item => (
          <TouchableWithoutFeedback
            key={item.value}
            onPress={() => onChange(item.value)}
          >
            <View style={styles.radioContainer}>
              <View style={styles.radioButtom}>
                {item.value === value && <View style={styles.radioMark} />}
              </View>
              <Text style={styles.labelRadioButtom}>{item.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}
