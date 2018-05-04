import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
