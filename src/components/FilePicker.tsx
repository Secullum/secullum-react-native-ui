import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';

export interface FilePickerProperties {
  label: string;
  onPress: () => void;
  icon: string;
  nativeID?: string;
}

export class FilePicker extends React.Component<FilePickerProperties> {
  static defaultProps = {
    icon: 'cloud-upload'
  };

  getStyles = () => {
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
        fontFamily: theme.fontFamily1,
        fontSize: isTablet() ? 15 : 12,
        color: theme.textColor3,
        width: 200,
        textAlign: 'center'
      }
    });

    return styles;
  };

  render() {
    const { label, onPress, icon, nativeID } = this.props;

    const theme = getTheme();

    const styles = this.getStyles();

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.container}
        onPress={onPress}
      >
        <FontAwesome name={icon} color={theme.textColor3} size={30} />
        <Text
          nativeID={nativeID}
          accessibilityLabel={nativeID}
          style={styles.text}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}
