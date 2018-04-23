import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';

import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

export interface ImageButtonProperties {
  icon: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export class ImageButton extends React.Component<ImageButtonProperties> {
  render() {
    const { icon, style, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={[styles.container, style]}
      >
        <FontAwesome name={icon} size={20} color={theme.textColor1} />
      </TouchableOpacity>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.borderColor1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    padding: 8
  }
});
