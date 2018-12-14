import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MarkSlider from 'react-native-mark-slider';

export default class App extends Component {
  state = {
    value: 0,
  };

  render() {
    const marks = [
      { name: '0℃', value: 0 },
      { name: '16℃', value: 16 },
      { name: '30℃', value: 30 },
    ];
    return (
        <View style={styles.container}>
          <MarkSlider
              step={1}
              max={30}
              marks={marks}
              onChange={value => this.setState({ value })}
          />
          <View style={{ alignItems: 'center' }}>
            <Text>滑块值：{this.state.value}</Text>
          </View>
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
