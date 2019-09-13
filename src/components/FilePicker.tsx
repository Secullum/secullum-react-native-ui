import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';

export interface FilePickerProperties {
  label: string;
  onPress: () => void;
  icon?: string;
}

export class FilePicker extends React.Component<FilePickerProperties> {
  static defaultProps = {
    icon: 'cloud-upload'
  };

  render() {
    const { label, onPress, icon } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.container}
        onPress={onPress}
      >
        <FontAwesome name={icon} color={theme.textColor3} size={30} />
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    backgroundColor: theme.backgroundColor2,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    color: theme.textColor3,
    width: 200,
    textAlign: 'center'
  }
});
