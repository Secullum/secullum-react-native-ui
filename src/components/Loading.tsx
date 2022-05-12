import * as React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

export class Loading extends React.Component {
  render() {
    return (
      <>
        <View style={styles.backgroundView} />
        <ActivityIndicator style={styles.indicator} size="large" color="#aaa" />
      </>
    );
  }
}

const styles = StyleSheet.create({
  backgroundView: {
    zIndex: 9998,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'space-around',
    top: 0, // IE fix
    bottom: 0, // IE fix
    left: 0, // IE fix
    right: 0 // IE fix
  }
});
