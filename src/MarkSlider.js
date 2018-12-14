import React from 'react';
import { View, Slider, Text, StyleSheet } from 'react-native';

export default class MarkedSlider extends React.PureComponent {
  static defaultProps = {
    min: 0,
    max: 1,
    maximumTrackTintColor: '#ddd',
    minimumTrackTintColor: '#1890ff',
    thumbTintColor: '#096dd9',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      width: 0,
    };
  }

  renderMarks() {
    const { marks } = this.props;
    if (!marks || !marks.length) {
      return null;
    }
    const { width } = this.state;
    const markWidth = width / marks.length;
    return (
        <View style={styles.marks}>
          {
            marks.map(mark => this.renderMark(mark, markWidth))
          }
        </View>
    );
  }

  renderMark = (mark, markWidth) => {
    const { minimumTrackTintColor, maximumTrackTintColor } = this.props;
    const { value } = this.state;
    const markStyle = [
      styles.mark,
      {
        width: markWidth,
        transform: [{ translateX: -markWidth / 2 }],
        color: value === mark.value ? minimumTrackTintColor : maximumTrackTintColor,
      },
      this.getMarkPosition(mark.value, markWidth),
    ];
    return (
        <Text style={markStyle} key={mark.value}>{mark.name}</Text>
    );
  };

  getMarkPosition = (value) => {
    const { min, max } = this.props;
    const { width } = this.state;
    if (value === min) {
      return {
        left: 5,
      };
    }
    if (value === max) {
      return {
        left: width - 5,
      };
    }
    return {
      left: width * (value - min) / (max - min),
    };
  };

  onLayout = ({ nativeEvent: e }) => {
    this.setState({ width: e.layout.width });
  };

  onChange = (value) => {
    const { onChange } = this.props;
    this.setState({
      value,
    });
    onChange && onChange(value);
  };

  render() {
    const {
      min,
      max,
      onAfterChange,
      marks,
      ...resetProps
    } = this.props;
    return (
        <View
            onLayout={this.onLayout}
            style={[styles.container, marks && marks.length ? styles.withMarks : null]}>
          <Slider
              minimumValue={min}
              maximumValue={max}
              onValueChange={this.onChange}
              onSlidingComplete={onAfterChange}
              {...resetProps}
          />
          {this.renderMarks()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  withMarks: {
    marginBottom: 44,
  },
  marks: {
    position: 'absolute',
    left: 0,
    top: 44,
    right: 0,
    flexDirection: 'row',
  },
  mark: {
    position: 'absolute',
    fontSize: 16,
    textAlign: 'center',
  },
});