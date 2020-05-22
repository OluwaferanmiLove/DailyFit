import React from 'react';
import {Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../../StaticData/theme';
import {LineChart} from 'react-native-chart-kit';

const {width, height} = Dimensions.get('window');

function Chart({dataNumbers, labels}) {
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `rgba(0, 103, 83, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataNumbers,
        color: (opacity = 1) => `rgba(0, 103, 83, ${opacity})`,
      },
    ],
  };
  return (
    <View style={styles.chart}>
      <LineChart
        data={data}
        width={width}
        height={220}
        chartConfig={chartConfig}
        withDots={false}
        withInnerLines={false}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Chart;
