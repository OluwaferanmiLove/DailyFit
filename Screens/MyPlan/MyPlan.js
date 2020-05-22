import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Notifier, Easing, NotifierComponents} from 'react-native-notifier';
import {ProgressChart} from 'react-native-chart-kit';
import store from '../../Redux/Store';

import DailyFitButton from '../Components/DailyFitButton/DailyFitButton';
import TopBar from '../Components/TopBar/TopBar';
import Question from '../Components/Question/Question';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import StatCard from '../Components/Card/StatCard';
import ExerciseCard from '../Components/Card/ExerciseCard';
import {colors} from '../../StaticData/colors';

const {width, height} = Dimensions.get('window');

function MyPlan({navigation}) {
  const [workoutNum, setWorkoutNum] = React.useState(0);
  const [allTimeMinutes, setAllTimeMinutes] = React.useState(0);

  const workoutGoal = useSelector(state => state.workoutGoal);
  const workoutLevel = useSelector(state => state.workoutLevel);
  const age = useSelector(state => state.age);
  const gender = useSelector(state => state.gender);
  const workoutTime = useSelector(state => state.workoutTime);
  const darkMode = useSelector(state => state.darkMode);

  const workoutNums = useSelector(state => state.workoutNum);

  const dispatch = useDispatch();

  const handleWorkout = (workout, level, time) => {
    dispatch({
      type: 'WORKOUT',
      payload: {goal: workout, level: level, time: time},
    });
    navigation.navigate('WorkoutNow');
  };

  const modeBackgroundColor = darkMode
    ? colors.darkModeBackgroundColor
    : colors.lightModeBackgroundColor;

  const modeHeaderColor = darkMode
    ? colors.darkModeHeaderColor
    : colors.lightModeHeaderColor;

  const modeStatCardBgColor = darkMode
    ? colors.darkModeStatCard
    : colors.lightModeStatCard;

  const scrollY = new Animated.Value(0);

  const HEADER_MAX_HEIGHT = height * 0.2;
  const HEADER_MIN_HEIGHT = height * 0.1;
  let animatedHeight = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  let minHeight = scrollY.interpolate({
    inputRange: [0, animatedHeight],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  let backgroundColor = scrollY.interpolate({
    inputRange: [0, animatedHeight],
    outputRange: [modeHeaderColor, darkMode ? '#000e09' : '#ffffff'],
    extrapolate: 'clamp',
  });

  React.useEffect(() => {
    const getStatExpect = async () => {
      try {
        let statExpected = await AsyncStorage.getItem('statExpect');
        if (statExpected !== null) {
          statExpected = JSON.parse(statExpected);
          dispatch({type: 'STATDATA', payload: statExpected});
        } else {
          dispatch({type: 'STATDATA', payload: 'no goals'});
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    getStatExpect();

    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(8);
    date.setMinutes(0);
    date.setMilliseconds(0);
    console.warn(store.getState(), date);
  });

  React.useEffect(() => {
    const getAllTimeMinutes = async () => {
      try {
        let allTimeMinutes = await AsyncStorage.getItem(
          'allTimeElapsedMinutes',
        );
        if (allTimeMinutes !== null) {
          setAllTimeMinutes(JSON.parse(allTimeMinutes));
        } else {
          setAllTimeMinutes(0);
        }
      } catch (e) {
        console.warn(e.message);
      }
    };
    getAllTimeMinutes();
    console.warn(allTimeMinutes);
  });

  return (
    <SafeAreaView style={[styles.main, {backgroundColor: modeBackgroundColor}]}>
      <StatusBar
        translucent={true}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#ffffff00'}
      />
      <Animated.View
        style={[styles.topOverlay, {minHeight}, {backgroundColor}]}
      />
      <View style={styles.homeContainer}>
        <View style={styles.statCardTopBar}>
          <TouchableWithoutFeedback
            style={styles.statCardNavIcon}
            onPress={() => navigation.navigate('Options')}>
            <Icon name={'ios-settings'} size={30} color={'#49494950'} />
          </TouchableWithoutFeedback>
          <Animated.View>
            <Text style={[styles.topBarText]}>My Plan</Text>
          </Animated.View>
          <TouchableWithoutFeedback
            style={styles.statCardNavIcon}
            onPress={() => navigation.navigate('Notifications')}>
            <Icon name={'ios-notifications'} size={30} color={'#49494980'} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView
            scrollEventThrottle={25}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}>
            <View style={styles.statCard}>
              <StatCard
                cardTitle={'Stats'}
                statFigOne={workoutNums}
                statFigTwo={allTimeMinutes}
                statFigOneDes={'Workout'}
                statFigTwoDes={'Minutes'}
                backgroundColor={modeStatCardBgColor}
                textColor={darkMode ? '#b2b2b2' : '#494949'}
                onPress={() => navigation.navigate('Stats')}
              />
            </View>
            <View style={styles.homeContent}>
              <Text style={styles.homeContentTitle}>My Workout Plan</Text>
              <View style={styles.exerciseCard}>
                {workoutGoal.loseWeight === true ? (
                  <>
                    <ExerciseCard
                      cardTitle={'Lose Weight'}
                      exerciseLevel={'LEVEL'}
                      backgroundColor={'#e2e2e2'}
                      textColor={'#494949'}
                      imageSource={
                        gender === 'male'
                          ? require('../../asset/loseWeight.png')
                          : require('../../asset/loseWeightFemale.png')
                      }
                      level={workoutLevel}
                      onPress={() =>
                        handleWorkout('loseWeight', workoutLevel, workoutTime)
                      }
                    />
                    <View style={styles.exerciseCardBorder} />
                  </>
                ) : (
                  <View />
                )}
                {workoutGoal.buildMuscles === true ? (
                  <>
                    <ExerciseCard
                      cardTitle={'Building Muscles'}
                      exerciseLevel={'LEVEL'}
                      backgroundColor={'#e2e2e2'}
                      textColor={'#494949'}
                      imageSource={
                        gender === 'male'
                          ? require('../../asset/buildMuscle.png')
                          : require('../../asset/buildMuscleFemale.png')
                      }
                      level={workoutLevel}
                      onPress={() =>
                        handleWorkout('buildMuscles', workoutLevel, workoutTime)
                      }
                    />
                    <View style={styles.exerciseCardBorder} />
                  </>
                ) : (
                  <View />
                )}
                {workoutGoal.keepFit === true ? (
                  <>
                    <ExerciseCard
                      cardTitle={'KeepFit'}
                      exerciseLevel={'LEVEL'}
                      backgroundColor={'#e2e2e2'}
                      textColor={'#494949'}
                      imageSource={
                        gender === 'male'
                          ? require('../../asset/keepFitMale.png')
                          : require('../../asset/keepFitFemale.png')
                      }
                      level={workoutLevel}
                      onPress={() =>
                        handleWorkout('keepFit', workoutLevel, workoutTime)
                      }
                    />
                    <View style={styles.exerciseCardBorder} />
                  </>
                ) : (
                  <View />
                )}
              </View>
            </View>
            {/* <Calendar
              markedDates={{
                '2020-05-16': {
                  marked: true,
                },
                '2020-05-17': {marked: true},
                '2020-05-18': {
                  marked: true,
                },
              }}
              // Specify style for calendar container element. Default = {}
              style={{
                height: 350,
              }}
              onDayPress={day => {
                console.warn('selected day', day);
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00b894',
                selectedDotColor: '#ffffff',
                arrowColor: '#00b894',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: 'grey',
                indicatorColor: 'blue',
                textDayFontFamily: 'monospace',
                textMonthFontFamily: 'monospace',
                textDayHeaderFontFamily: 'monospace',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12,
              }}
            /> */}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 0) => `rgba(178, 0, 0, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight,
    zIndex: 20002,
  },
  topOverlay: {
    width: width,
    backgroundColor: '#00b894',
    position: 'absolute',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  statCardTopBar: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
  },
  statCardNavIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffffb5',
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  topBarText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contentContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  statCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  homeContentTitle: {
    fontFamily: 'SFUIDisplay-Bold',
    alignSelf: 'flex-start',
    marginLeft: width * 0.05,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b2b2b2',
  },
  exerciseCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  exerciseCardBorder: {
    height: 2,
    width: width * 0.75,
    borderBottomWidth: 1,
    borderBottomColor: '#49494950',
  },
  exerciseCardCalender: {
    height: 300,
    width: width * 0.9,
    backgroundColor: '#49494950',
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default MyPlan;
