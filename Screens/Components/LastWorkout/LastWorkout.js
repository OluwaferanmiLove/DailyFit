import React from 'react';
import {Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../../StaticData/theme';

const {width, height} = Dimensions.get('window');

function LastWorkout({
  workoutTime,
  dateDayNum,
  dateDayText,
  workoutTitle,
  workoutTimeMin,
  onPress,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.lastWorkout}>
        <View style={styles.calender}>
          <Text style={styles.dateDayNum}>{dateDayNum}</Text>
          <Text style={styles.dateDayText}>{dateDayText}</Text>
        </View>
        <View style={styles.lastWorkoutDetails}>
          <View style={styles.lastWorkoutDetailsHead}>
            <Text style={styles.title}>{workoutTime}</Text>
            <Text style={styles.titleTime}>{workoutTimeMin} min</Text>
          </View>
          <Text style={styles.lastWorkoutTitle}>{workoutTitle}</Text>
        </View>
        <Icon
          style={styles.icon}
          name={'ios-arrow-forward'}
          size={25}
          color={'#b2b2b2'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  lastWorkout: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
  },
  calender: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b894',
    height: 80,
    width: 65,
    borderRadius: 5,
  },
  dateDayNum: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  dateDayText: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 13,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  lastWorkoutDetails: {
    marginLeft: 20,
  },
  title: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 14,
    color: '#00b894',
    fontWeight: 'bold',
  },
  lastWorkoutDetailsHead: {
    flexDirection: 'row',
  },
  titleTime: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#b2b2b2',
  },
  lastWorkoutTitle: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 18,
    color: '#026753',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: '24%',
  },
});

export default LastWorkout;
