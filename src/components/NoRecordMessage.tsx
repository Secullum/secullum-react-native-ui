import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { isTablet } from '../modules/layout';
import { Space } from './Space';

interface NoRecordMessageProps {
  visible: boolean;
  message: string;
}

export class NoRecordMessage extends React.Component<NoRecordMessageProps> {
  getStyles = () => {
    return StyleSheet.create({
      text: {
        fontSize: isTablet() ? 28 : 18,
        color: '#969696',
        textAlign: 'center'
      },
      icon: { color: '#969696' },
      view: { alignItems: 'center', marginTop: 25 }
    });
  };
  render() {
    const { visible, message } = this.props;

    if (!visible) {
      return <></>;
    }

    const styles = this.getStyles();

    return (
      <View style={styles.view}>
        <FontAwesome
          name={'exclamation-triangle'}
          size={isTablet() ? 80 : 60}
          style={styles.icon}
        />
        <Space height={5} />
        <Text style={styles.text}>{message}</Text>
      </View>
    );
  }
}
