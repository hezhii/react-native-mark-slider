import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MarkSlider from 'react-native-mark-slider';

export default class App extends Component {
  render() {
    const marks = [
      { name: '0℃', value: 0 },
      { name: '16℃', value: 16 },
      { name: '100℃', value: 30 },
    ];
    return (
        <View style={styles.container}>
          <MarkSlider
              step={1}
              max={30}
              marks={marks}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
