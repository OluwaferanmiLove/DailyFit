/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import TopBar from '../Components/TopBar/TopBar';
import {theme} from '../../StaticData/theme';
import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import LastWorkout from '../Components/LastWorkout/LastWorkout';
import Chart from '../Components/Chart/Chart';
import Icon from 'react-native-vector-icons/Ionicons';
import GoalChart from '../Components/Chart/GoalChart';
import GoalSlider from '../Components/GoalSlider';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from '../../StaticData/colors';

const {width, height} = Dimensions.get('window');

const selected = {
  borderBottomColor: '#0267535a',
  borderBottomWidth: 3,
};

const selectedTitle = {
  color: '#00b894',
};

const goalSelected = {
  color: '#026753',
};

function Home({navigation}) {
  const [selectedTab, setSelectedTab] = React.useState('stats');
  const [selectedGoal, setSelectedGoal] = React.useState('daily');
  const [statExpected, setStatExpected] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [day, setDay] = React.useState(null);
  const [prevDay, setPrevDay] = React.useState(null);
  const [graphTime, setGraphTime] = React.useState(null);
  const [graphData, setGraphData] = React.useState(null);
  const [allMin, setAllmin] = React.useState(null);
  const [allTimeLoseWeight, setAllTimeLoseWeight] = React.useState(null);
  const [allTimeBuildMuscle, setAllTimeBuildMuscle] = React.useState(null);
  const [allTimeKeepFit, setAllTimeKeepFit] = React.useState(null);
  const [timeLoseWeight, setTimeLoseWeight] = React.useState(null);
  const [timeBuildMuscle, setTimeBuildMuscle] = React.useState(null);
  const [timeKeepFit, setTimeKeepFit] = React.useState(null);
  const [progressDataNumbers, setProgressDataNumbers] = React.useState(null);
  const [dailyPercent, setDailyPercent] = React.useState(null);

  const workoutLevel = useSelector(state => state.workoutLevel);
  const workoutGoal = useSelector(state => state.workoutGoal);
  const workoutNums = useSelector(state => state.workoutNum);
  const darkMode = useSelector(state => state.darkMode);

  const modeBackgroundColor = darkMode
    ? colors.darkModeBackgroundColor
    : colors.lightModeBackgroundColor;

  React.useEffect(() => {
    const allDate = new Date();
    setDate(allDate.getDate());
    let nextDay = allDate.getDay();
    let day;
    let prevDay;
    switch (nextDay) {
      case 0:
        day = 'Sun';
        prevDay = 'Sat';
        break;
      case 1:
        day = 'Mon';
        prevDay = 'Sun';
        break;
      case 2:
        day = 'Tue';
        prevDay = 'Mon';
        break;
      case 3:
        day = 'Wed';
        prevDay = 'Tue';
        break;
      case 4:
        day = 'Thur';
        prevDay = 'Wed';
        break;
      case 5:
        day = 'Fri';
        prevDay = 'Thur';
        break;
      case 6:
        day = 'Sat';
        prevDay = 'Fri';
    }
    setDay(day);
    setPrevDay(prevDay);

    const getStatExpect = async () => {
      try {
        const statExpect = await AsyncStorage.getItem('statExpect');
        if (statExpect !== null) {
          let stats = JSON.parse(statExpect);
          setStatExpected(stats);
        } else {
          setStatExpected('no goal set yet');
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    const getGraphTime = async () => {
      try {
        let graphTime = await AsyncStorage.getItem('graphTime');
        if (graphTime !== null) {
          graphTime = JSON.parse(graphTime);
          setGraphTime(graphTime);
          graphTime = graphTime.slice(graphTime.length - 10, graphTime.length);
          setGraphData([
            graphTime[0].time,
            graphTime[1].time,
            graphTime[2].time,
            graphTime[3].time,
            graphTime[4].time,
            graphTime[5].time,
            graphTime[6].time,
            graphTime[7].time,
            graphTime[8].time,
            graphTime[9].time,
            0,
          ]);
          let allMin = 0;
          for (let i = 0; i <= graphTime.length - 1; i++) {
            allMin = allMin + graphTime[i].time;
            setAllmin(allMin);
          }
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    getStatExpect();
    getGraphTime();
  }, []);

  const goalLoseWeight = workoutGoal.loseWeight ? 'loseWeight' : null;
  const goalBuildMuscles = workoutGoal.buildMuscles ? 'buildMuscles' : null;
  const goalKeepFit = workoutGoal.keepFit ? 'keepFit' : null;

  React.useEffect(() => {
    const getAlTimeElapsedTime = async () => {
      try {
        let allTimeLoseWeight = await AsyncStorage.getItem(
          'loseWeightallTimeElapsedMinutes',
        );
        if (allTimeLoseWeight !== null) {
          setAllTimeLoseWeight(JSON.parse(allTimeLoseWeight));
        } else {
          setAllTimeLoseWeight(0);
        }
        let allTimeBuildMuscle = await AsyncStorage.getItem(
          'buildMusclesallTimeElapsedMinutes',
        );
        if (allTimeBuildMuscle !== null) {
          setAllTimeBuildMuscle(JSON.parse(allTimeBuildMuscle));
        } else {
          setAllTimeBuildMuscle(0);
        }
        let allTimeKeepFit = await AsyncStorage.getItem(
          'keepFitallTimeElapsedMinutes',
        );
        if (allTimeKeepFit !== null) {
          setAllTimeKeepFit(JSON.parse(allTimeKeepFit));
        } else {
          setAllTimeKeepFit(0);
        }
      } catch (e) {
        console.warn(e.message);
      }
    };
    getAlTimeElapsedTime();
  }, []);

  React.useEffect(() => {
    const getMinutes = async () => {
      try {
        let timeLoseWeight = await AsyncStorage.getItem(
          `${goalLoseWeight}${workoutLevel}elapsedMinutes`,
        );
        if (timeLoseWeight !== null) {
          setTimeLoseWeight(JSON.parse(timeLoseWeight));
        } else {
          setTimeLoseWeight(0);
        }
        let timeBuildMuscle = await AsyncStorage.getItem(
          `${goalBuildMuscles}${workoutLevel}elapsedMinutes`,
        );
        if (timeBuildMuscle !== null) {
          setTimeBuildMuscle(JSON.parse(timeBuildMuscle));
        } else {
          setTimeBuildMuscle(0);
        }
        let timeKeepFit = await AsyncStorage.getItem(
          `${goalKeepFit}${workoutLevel}elapsedMinutes`,
        );
        if (timeKeepFit !== null) {
          setTimeKeepFit(JSON.parse(timeKeepFit));
        } else {
          setTimeKeepFit(0);
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    getMinutes();
  }, []);

  React.useEffect(() => {
    if (statExpected !== null) {
      const progressDataNumbers = [
        (timeLoseWeight + timeBuildMuscle + timeKeepFit) / statExpected.daily,
        (allTimeLoseWeight + allTimeBuildMuscle + allTimeKeepFit) /
          statExpected.weekly,
        (allTimeLoseWeight + allTimeBuildMuscle + allTimeKeepFit) /
          statExpected.monthly,
      ];
      setProgressDataNumbers(progressDataNumbers);
    } else {
      setProgressDataNumbers(null);
    }
    if (statExpected !== null) {
      const dailyPercent = Math.floor(
        ((timeLoseWeight + timeBuildMuscle + timeKeepFit) /
          statExpected.daily) *
          100,
      );
      setDailyPercent(dailyPercent);
    } else {
      setDailyPercent(null);
    }
  }, [statExpected, timeLoseWeight, allTimeLoseWeight]);

  return (
    <SafeAreaView style={[styles.main, {backgroundColor: modeBackgroundColor}]}>
      <StatusBar
        translucent={true}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#ffffff00'}
      />
      <View style={styles.topMain}>
        <TopBar
          title={'My DailyFit Workout'}
          iconColor={'#b2b2b2'}
          subText={'15 May 2020'}
          onPressRightText={() => navigation.navigate('Notifications')}
        />
        <View style={styles.topMainNav}>
          <TouchableWithoutFeedback
            style={[
              styles.topMainNavChild,
              selectedTab === 'stats' ? selected : null,
            ]}
            onPress={() => setSelectedTab('stats')}>
            <Text
              style={[
                styles.topMainNavChildTitle,
                selectedTab === 'stats' ? selectedTitle : null,
              ]}>
              Stats
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={[
              styles.topMainNavChild,
              selectedTab === 'goals' ? selected : null,
            ]}
            onPress={() => setSelectedTab('goals')}>
            <Text
              style={[
                styles.topMainNavChildTitle,
                selectedTab === 'goals' ? selectedTitle : null,
              ]}>
              Goals
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {selectedTab === 'stats' ? (
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.lastWorkout}>
              <LastWorkout
                dateDayNum={date - 1}
                dateDayText={prevDay}
                workoutTime={'Last workout'}
                workoutTimeMin={
                  graphTime !== null ? graphTime[graphTime.length - 1].time : ''
                }
                workoutTitle={`${workoutLevel} Workout`}
                onPress={() => navigation.navigate('WorkoutNow')}
              />
            </View>
            <View style={styles.lastWorkout}>
              <LastWorkout
                dateDayNum={date}
                dateDayText={day}
                workoutTime={'Next workout'}
                workoutTimeMin={30}
                workoutTitle={`${workoutLevel} Workout`}
                onPress={() => navigation.navigate('MyPlan')}
              />
            </View>
            <View style={styles.chart}>
              <View style={styles.chartHeader}>
                <Text style={styles.statHeader}>Workout stat</Text>
                <View style={styles.chartHeaderTextMain}>
                  <Text style={styles.chartHeaderText}>{allMin}</Text>
                  <Text style={styles.chartHeaderRight}>Minutes</Text>
                </View>
                <View style={styles.chartSubTextMain}>
                  <Text style={styles.chartSubText}>{workoutNums}</Text>
                  <Text style={styles.chartSubRight}>Workouts</Text>
                </View>
              </View>
              <Chart
                dataNumbers={graphData !== null ? graphData : [1, 1, 1, 1, 1]}
                labels={[`Your ${workoutNums} last workouts`]}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.goals}>
              <View style={styles.goalsHeader}>
                <View style={styles.goalsHeaderText}>
                  <Text style={styles.goalsHeaderTxt}>
                    You are almost there
                  </Text>
                  <View style={styles.goalsHeaderDes}>
                    <Icon name={'md-trending-up'} size={20} color={'#ffffff'} />
                    <Text style={styles.goalsHeaderDesText}>
                      {dailyPercent !== null ? dailyPercent : 0}% of your today's goal
                    </Text>
                  </View>
                </View>
                <View style={styles.goalsHeaderImage}>
                  <Image
                    style={styles.goalsHeaderImageImg}
                    source={require('../../asset/goalPage.png')}
                  />
                </View>
              </View>
              <View style={styles.yourGoals}>
                <Text style={styles.yourGoalsTitle}>Your Goals</Text>
                <GoalChart
                  dataNumbers={progressDataNumbers !== null ? progressDataNumbers : [0,0,0]}
                  dataLabels={['Daily', 'Weekly', 'Monthly']}
                />
              </View>
              <View style={styles.goalsMainNav}>
                <TouchableWithoutFeedback
                  style={[styles.goalMainNavChild]}
                  onPress={() => setSelectedGoal('daily')}>
                  <Text
                    style={[
                      styles.goalMainNavChildTitle,
                      selectedGoal === 'daily' ? goalSelected : null,
                    ]}>
                    Daily
                  </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  style={[styles.goalMainNavChild, {marginLeft: 20}]}
                  onPress={() => setSelectedGoal('weekly')}>
                  <Text
                    style={[
                      styles.goalMainNavChildTitle,
                      selectedGoal === 'weekly' ? goalSelected : null,
                    ]}>
                    Weekly
                  </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  style={[styles.goalMainNavChild, {marginLeft: 20}]}
                  onPress={() => setSelectedGoal('monthly')}>
                  <Text
                    style={[
                      styles.goalMainNavChildTitle,
                      selectedGoal === 'monthly' ? goalSelected : null,
                    ]}>
                    Monthly
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {selectedGoal === 'daily' ? (
              <>
                {workoutGoal.loseWeight === true ? (
                  <GoalSlider
                    title={'Lose Weight'}
                    elapsedTime={timeLoseWeight}
                    goalTime={statExpected.daily}
                    minColor={'#ebeb00'}
                    thumbColor={'#ebeb00'}
                    sliderValue={(timeLoseWeight / statExpected.daily) * 100}
                  />
                ) : null}
                {workoutGoal.buildMuscles === true ? (
                  <GoalSlider
                    title={'Build Muscles'}
                    elapsedTime={timeBuildMuscle}
                    goalTime={statExpected.daily}
                    minColor={'#c61200'}
                    thumbColor={'#c61200'}
                    sliderValue={(timeBuildMuscle / statExpected.daily) * 100}
                  />
                ) : null}
                {workoutGoal.keepFit === true ? (
                  <GoalSlider
                    title={'Keep Fit'}
                    elapsedTime={timeKeepFit}
                    goalTime={statExpected.daily}
                    minColor={'#007ae2'}
                    thumbColor={'#007ae2'}
                    sliderValue={(timeKeepFit / statExpected.daily) * 100}
                  />
                ) : null}
              </>
            ) : null}
            {selectedGoal === 'weekly' ? (
              <>
                {workoutGoal.loseWeight === true ? (
                  <GoalSlider
                    title={'Lose Weight'}
                    elapsedTime={
                      allTimeLoseWeight === statExpected.weekly
                        ? allTimeLoseWeight - statExpected.weekly
                        : allTimeLoseWeight
                    }
                    goalTime={statExpected.weekly}
                    minColor={'#ebeb00'}
                    thumbColor={'#ebeb00'}
                    sliderValue={
                      (allTimeLoseWeight / statExpected.weekly) * 100
                    }
                  />
                ) : null}
                {workoutGoal.buildMuscles === true ? (
                  <GoalSlider
                    title={'Build Muscles'}
                    elapsedTime={
                      allTimeBuildMuscle === statExpected.weekly
                        ? allTimeBuildMuscle - statExpected.weekly
                        : allTimeBuildMuscle
                    }
                    goalTime={statExpected.weekly}
                    minColor={'#c61200'}
                    thumbColor={'#c61200'}
                    sliderValue={
                      (allTimeBuildMuscle / statExpected.weekly) * 100
                    }
                  />
                ) : null}
                {workoutGoal.keepFit === true ? (
                  <GoalSlider
                    title={'Keep Fit'}
                    elapsedTime={
                      allTimeKeepFit === statExpected.weekly
                        ? allTimeKeepFit - statExpected.weekly
                        : allTimeKeepFit
                    }
                    goalTime={statExpected.weekly}
                    minColor={'#007ae2'}
                    thumbColor={'#007ae2'}
                    sliderValue={(allTimeKeepFit / statExpected.weekly) * 100}
                  />
                ) : null}
              </>
            ) : null}
            {selectedGoal === 'monthly' ? (
              <>
                {workoutGoal.loseWeight === true ? (
                  <GoalSlider
                    title={'Lose Weight'}
                    elapsedTime={
                      allTimeLoseWeight === statExpected.monthly
                        ? allTimeLoseWeight - statExpected.monthly
                        : allTimeLoseWeight
                    }
                    goalTime={statExpected.monthly}
                    minColor={'#ebeb00'}
                    thumbColor={'#ebeb00'}
                    sliderValue={
                      (allTimeLoseWeight / statExpected.monthly) * 100
                    }
                  />
                ) : null}
                {workoutGoal.buildMuscles === true ? (
                  <GoalSlider
                    title={'Build Muscles'}
                    elapsedTime={
                      allTimeBuildMuscle === statExpected.monthly
                        ? allTimeBuildMuscle - statExpected.monthly
                        : allTimeBuildMuscle
                    }
                    goalTime={statExpected.monthly}
                    minColor={'#c61200'}
                    thumbColor={'#c61200'}
                    sliderValue={
                      (allTimeBuildMuscle / statExpected.monthly) * 100
                    }
                  />
                ) : null}

                {workoutGoal.keepFit === true ? (
                  <GoalSlider
                    title={'Keep Fit'}
                    elapsedTime={
                      allTimeKeepFit === statExpected.monthly
                        ? allTimeKeepFit - statExpected.monthly
                        : allTimeKeepFit
                    }
                    goalTime={statExpected.monthly}
                    minColor={'#007ae2'}
                    thumbColor={'#007ae2'}
                    sliderValue={(allTimeKeepFit / statExpected.monthly) * 100}
                  />
                ) : null}
              </>
            ) : null}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight,
  },
  topMain: {
    width: width,
    alignItems: 'center',
    // backgroundColor: 'green',
    marginTop: 10,
  },
  topMainNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width * 0.9,
  },
  topMainNavChild: {
    // backgroundColor: 'red',
    marginTop: height * 0.04,
    height: height * 0.05,
  },
  topMainNavChildTitle: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: theme.titleFontSize,
    fontWeight: theme.titleFontWeight,
    marginHorizontal: 10,
    color: '#b2b2b2',
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    marginBottom: 15,
  },
  lastWorkout: {
    marginLeft: width * 0.05,
    marginTop: height * 0.04,
  },
  chart: {
    marginTop: height * 0.03,
    width: width,
  },
  chartHeader: {
    marginLeft: width * 0.05,
    marginBottom: height * 0.02,
  },
  chartHeaderTextMain: {
    marginTop: height * 0.02,
    flexDirection: 'row',
    marginBottom: 5,
  },
  chartHeaderText: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 30,
    color: '#026753',
  },
  chartHeaderRight: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 30,
    marginLeft: 8,
    color: '#b2b2b2',
  },
  chartSubTextMain: {
    flexDirection: 'row',
  },
  chartSubText: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 16,
    fontWeight: '100',
    color: '#026753',
  },
  chartSubRight: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 16,
    marginLeft: 8,
    color: '#b2b2b2',
  },
  statHeader: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 16,
    color: '#b2b2b2',
  },
  goals: {
    marginTop: height * 0.08,
  },
  goalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#00b894',
    marginLeft: width * 0.05,
    width: width * 0.9,
    height: height * 0.1,
    borderRadius: 8,
  },
  goalsHeaderText: {
    marginLeft: 0,
  },
  goalsHeaderTxt: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 18,
    color: '#ffffff',
  },
  goalsHeaderDes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalsHeaderDesText: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 12,
    marginLeft: 8,
    color: '#ffffff',
  },
  goalsHeaderImage: {
    marginLeft: 0,
  },
  goalsHeaderImageImg: {
    height: 160,
    width: 120,
    resizeMode: 'contain',
    bottom: 30,
  },
  yourGoals: {
    marginTop: height * 0.05,
  },
  yourGoalsTitle: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 14,
    color: '#b2b2b2',
    marginLeft: width * 0.05,
  },
  goalsMainNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width * 0.9,
    marginLeft: width * 0.05,
  },
  goalMainNavChild: {
    // backgroundColor: 'red',
    marginTop: height * 0.04,
    height: height * 0.05,
  },
  goalMainNavChildTitle: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 20,
    fontWeight: theme.titleFontWeight,
    color: '#b2b2b2',
  },
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
  goalsProgressText: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00b894',
  },
});

export default Home;
