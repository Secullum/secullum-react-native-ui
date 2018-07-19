import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

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
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
    backgroundColor: '#ccc'
  },
  indicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around'
  }
});
