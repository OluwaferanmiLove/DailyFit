import React from 'react';
import {Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../../StaticData/theme';
import {ProgressChart} from 'react-native-chart-kit';
import {useSelector, useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

function GoalChart({dataNumbers, dataLabels}) {
  const darkMode = useSelector(state => state.darkMode);
  const progressdata = {
    labels: dataLabels, // optional
    data: dataNumbers,
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) =>
      darkMode
        ? `rgba(0, 247, 159, ${opacity})`
        : `rgba(0, 83, 103, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.chart}>
      <ProgressChart
        data={progressdata}
        width={width}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lastWorkout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GoalChart;
