import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

interface Props {
  animating: boolean;
}

class Loading extends React.Component<Props> {
  render() {
    const { animating } = this.props;

    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" animating={animating} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default Loading;
