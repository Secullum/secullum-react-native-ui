import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  View
} from 'react-native';

type Props = {
  width?: number | string,
  height?: number | string
}

export class Loading extends React.Component<Props> {
  getWidthAndHeight = () => {
    const dim = Platform.OS === 'web' ? 'window' : 'screen';
    const { width, height } = this.props;

    return {
      width: width ? width : Dimensions.get(dim).width,
      height: height ? height : Dimensions.get(dim).height
    };
  };

  render() {
    const { width, height } = this.getWidthAndHeight();

    return (
      <View style={[styles.backgroundView, { width, height }]}>
        <ActivityIndicator
          size="large"
          color="#aaa"
          style={[styles.indicator, { width, height }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundView: {
    zIndex: 9998,
    position: 'absolute',
    opacity: 0.6,
    backgroundColor: '#ccc',
    top: 0, // IE fix
    bottom: 0, // IE fix
    left: 0, // IE fix
    right: 0 // IE fix
  },
  indicator: {
    zIndex: 9999,
    position: 'absolute',
    justifyContent: 'space-around',
    top: 0, // IE fix
    bottom: 0, // IE fix
    left: 0, // IE fix
    right: 0 // IE fix
  }
});
