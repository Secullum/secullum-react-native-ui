import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card } from './Card';
import { getTheme } from '../modules/theme';
import { isTablet } from '../modules/layout';

export interface DetailsHeaderProperties {
  text: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

export class DetailsHeader extends React.Component<DetailsHeaderProperties> {
  renderButton = (
    type: 'left' | 'right',
    onPress: (() => void) | undefined
  ) => {
    if (onPress) {
      return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <FontAwesome
            name={type === 'left' ? 'angle-left' : 'angle-right'}
            color={theme.textColor3}
            size={14}
          />
        </TouchableOpacity>
      );
    }

    return <View style={styles.buttonPlaceholder} />;
  };

  render() {
    const { text, onLeftPress, onRightPress } = this.props;

    return (
      <Card>
        <Card.Section style={styles.container}>
          {this.renderButton('left', onLeftPress)}
          <Text style={styles.text}>{text}</Text>
          {this.renderButton('right', onRightPress)}
        </Card.Section>
      </Card>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: isTablet() ? 22 : 18,
    color: theme.textColor1,
    width: '80%',
    textAlign: 'center'
  },
  button: {
    height: isTablet() ? 28 : 24,
    width: isTablet() ? 28 : 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.borderColor1,
    borderWidth: 1,
    borderRadius: 24
  },
  buttonPlaceholder: {
    height: isTablet() ? 28 : 24,
    width: isTablet() ? 28 : 24
  }
});
