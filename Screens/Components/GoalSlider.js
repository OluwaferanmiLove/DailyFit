import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  Slider,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function GoalSlider({
  title,
  elapsedTime,
  goalTime,
  sliderValue,
  thumbColor,
  minColor,
}) {
  return (
    <View style={styles.goalsProgress}>
      <View style={styles.goalsProgressChild}>
        <View style={styles.goalsProgressChildText}>
          <Text style={styles.goalsProgressText}>{title}</Text>
          <View style={styles.goalsProgressTextSub}>
            <Text style={styles.goalsProgressText}>{elapsedTime} min</Text>
            <Text style={styles.goalsProgressTextTime}>/ {goalTime} min</Text>
          </View>
        </View>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={sliderValue}
        minimumTrackTintColor={minColor}
        thumbTintColor={thumbColor}
        maximumTrackTintColor={'#b2b2b2'}
        disabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  goalsProgress: {
    marginTop: height * 0.04,
    alignItems: 'center',
  },
  goalsProgressChild: {
    width: width * 0.9,
  },
  goalsProgressChildText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalsProgressTextSub: {
    flexDirection: 'row',
  },
  goalsProgressText: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00b894',
  },
  goalsProgressTextTime: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#b2b2b2',
  },
  slider: {
    width: width * 0.97,
  },
});

export default GoalSlider;
