/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CountDown from 'react-native-countdown-component';
import store from '../../Redux/Store';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {ProgressChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from '../../StaticData/colors';

const {width, height} = Dimensions.get('window');

function WorkoutCountDown({navigation}) {
  const [timeRunning, setTimeRunning] = React.useState(false);
  const [workoutIndex, setWorkoutIndex] = React.useState(0);
  const [forwardDisabled, setForwardDisabled] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const [prevTime, setPrevTime] = React.useState(null);
  const [day, setDay] = React.useState(null);
  const [graphTime, setGraphTime] = React.useState(null);

  const dispatch = useDispatch();
  const workoutData = useSelector(state => state.workoutData);
  const statExpected = useSelector(state => state.statExpected);
  const workoutNowGoal = useSelector(state => state.workoutNowGoal);
  const workoutNowLevel = useSelector(state => state.workoutNowLevel);
  const darkMode = useSelector(state => state.darkMode);

  const modeBackgroundColor = darkMode
    ? colors.darkModeBackgroundColor
    : colors.lightModeBackgroundColor;

  let workoutDataLength = workoutData.length;

  const handleWorkoutPaging = () => {
    if (workoutIndex < workoutDataLength - 1) {
      setWorkoutIndex(workoutIndex + 1);
    } else {
      setForwardDisabled(true);
    }
  };

  const date = new Date();

  const handleWorkoutBacking = () => {
    if (workoutIndex === 0) {
      navigation.goBack();
    } else {
      if (workoutIndex < workoutDataLength) {
        setWorkoutIndex(workoutIndex - 1);
        setForwardDisabled(false);
      }
    }
  };

  const handleOnFinish = () => {
    if (workoutIndex === workoutDataLength - 1) {
      const storeMinutes = async () => {
        try {
          await AsyncStorage.setItem(
            `${workoutNowGoal}${workoutNowLevel}elapsedMinutes`,
            JSON.stringify(prevTime + Math.floor(totalTime / 60)),
          );
          await AsyncStorage.setItem(
            `${workoutNowGoal}allTimeElapsedMinutes`,
            JSON.stringify(prevTime + Math.floor(totalTime / 60)),
          );
          await AsyncStorage.setItem(
            'allTimeElapsedMinutes',
            JSON.stringify(prevTime + Math.floor(totalTime / 60)),
          );
        } catch (e) {
          console.warn(e.message);
        }
      };

      const storeGraphTime = async () => {
        try {
          await AsyncStorage.setItem(
            'graphTime',
            JSON.stringify(
              graphTime.concat({
                // eslint-disable-next-line prettier/prettier
              date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
                time: Math.floor(totalTime / 60),
              }),
            ),
          );
          console.warn(
            'done',
            `${date.getFullYear()} - ${date.getMonth() +
              1} - ${date.getDate()}`,
          );
        } catch (e) {
          console.warn(e.message);
        }
      };

      storeMinutes();
      storeGraphTime();
      setModalVisible(true);
    } else {
      const storeWorkoutNum = async () => {
        try {
          let workoutNum = await AsyncStorage.getItem('workoutNum');
          workoutNum = JSON.parse(workoutNum);
          await AsyncStorage.setItem(
            'workoutNum',
            JSON.stringify(workoutNum + 1),
          );
          dispatch({type: 'WORKOUTNUM', payload: workoutNum + 1});
        } catch (e) {
          console.warn(e.message);
        }
      };
      storeWorkoutNum();
      setWorkoutIndex(workoutIndex + 1);
    }
  };

  const data = (prevTime + Math.floor(totalTime / 60)) / statExpected.daily;
  const progressdata = {
    data: [data > 1 ? 1 : data],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `rgba(2, 103, 83, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  React.useEffect(() => {
    const getGraphTime = async () => {
      try {
        let graphTime = await AsyncStorage.getItem('graphTime');
        if (graphTime !== null) {
          setGraphTime(JSON.parse(graphTime));
          console.warn(graphTime);
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    const getDay = async () => {
      try {
        let day = await AsyncStorage.getItem(
          `${workoutNowGoal}${workoutNowLevel}day`,
        );
        if (day !== null) {
          day = JSON.parse(day);
          setDay(day);
        }
        console.warn(day);
      } catch (e) {
        console.warn(e.message);
      }
    };

    let totalTime = 0;
    for (let i = 0; i <= workoutDataLength - 1; i++) {
      totalTime = totalTime + workoutData[i].time;
      setTotalTime(totalTime);
    }

    const getMinutes = async () => {
      try {
        let time = await AsyncStorage.getItem(
          `${workoutNowGoal}${workoutNowLevel}elapsedMinutes`,
        );
        if (time !== null) {
          time = JSON.parse(time);
          setPrevTime(time);
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    getMinutes();

    const storeDay = async () => {
      if (prevTime + Math.floor(totalTime / 60) > statExpected.daily) {
        try {
          await AsyncStorage.setItem(
            `${workoutNowGoal}${workoutNowLevel}day`,
            JSON.stringify(day + 1),
          );
          await AsyncStorage.setItem(
            `${workoutNowGoal}${workoutNowLevel}elapsedMinutes`,
            JSON.stringify(
              prevTime + Math.floor(totalTime / 60) - statExpected.daily,
            ),
          );
          await AsyncStorage.setItem(
            `${workoutNowGoal}${workoutNowLevel}allTimeElapsedMinutes`,
            JSON.stringify(prevTime + Math.floor(totalTime / 60)),
          );
          setPrevTime(
            prevTime + Math.floor(totalTime / 60) > statExpected.daily,
          );
          console.warn('done');
        } catch (e) {
          console.warn(e.message);
        }
      }
    };

    getGraphTime();
    getDay();
    storeDay();

    // console.warn(workoutData[workoutIndex], workoutDataLength);
    // console.warn(workoutData[workoutIndex].time);
    console.warn(prevTime);
  }, [prevTime]);

  return (
    <SafeAreaView style={[styles.main, {backgroundColor: modeBackgroundColor}]}>
      <StatusBar
        translucent={true}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#ffffff00'}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection={'down'}
        onSwipeComplete={({down}) => {
          setModalVisible(false);
          navigation.navigate('MyPlan');
        }}
        useNativeDriver={false}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.modalTopBG} />
          <View style={styles.modalControl} />
          <View style={styles.modalContent}>
            <Text style={styles.modalContentTitle}>Welldone</Text>
            <Text style={styles.modalContentSub}>
              Remain{' '}
              {statExpected.daily - (Math.floor(totalTime / 60) + prevTime)} min
              acheive your daily goal
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressContainerContent}>
              <ProgressChart
                data={progressdata}
                width={260}
                height={220}
                strokeWidth={13}
                radius={90}
                chartConfig={chartConfig}
                hideLegend={false}
              />
              <View style={styles.progressTextContainer}>
                <Icon name={'ios-fitness'} size={40} />
                <Text style={styles.progressText}>
                  {Math.floor(totalTime / 60) + prevTime} Minutes
                </Text>
                <Text style={styles.progressText}>Today</Text>
              </View>
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('Browse');
            }}>
            <View style={styles.progressButton}>
              <Text style={styles.progressButtonText}>Continue</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('MyPlan');
            }}>
            <View style={styles.progressButton}>
              <Text style={styles.progressButtonText}>Okay</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      <View style={styles.workoutLengthIndicator}>
        {workoutData.map((item, index) => {
          return (
            <View
              key={`indicator-${index}`}
              style={[
                styles.workoutIndicator,
                {
                  width: width / workoutDataLength - 2,
                  backgroundColor:
                    index === workoutIndex ? '#00b894' : '#b2b2b2',
                },
              ]}
            />
          );
        })}
      </View>
      <View style={styles.workoutContainer}>
        <View style={styles.workoutTitleContainer}>
          <TouchableOpacity onPress={handleWorkoutBacking}>
            <Icon name={'ios-arrow-back'} color={'#878787'} size={30} />
          </TouchableOpacity>
          <Text style={[styles.workoutTitle, {color: darkMode ? '#b2b2b2' : '#585858'}]}>
            {workoutData[workoutIndex].name}
          </Text>
          <Text style={[styles.workoutTitleNumber, {color: darkMode ? '#b2b2b2' : '#585858'}]}>
            {workoutIndex + 1} / {workoutDataLength}
          </Text>
        </View>
        <View>
          <CountDown
            until={workoutData[workoutIndex].time}
            size={45}
            onFinish={handleOnFinish}
            digitStyle={{backgroundColor: modeBackgroundColor}}
            digitTxtStyle={{
              color: timeRunning ? '#1CC625' : '#1CC62550',
              fontWeight: '100',
              fontFamily: 'SFUIDisplay-Medium',
            }}
            timeToShow={['M', 'S']}
            timeLabels={{m: null, s: null}}
            separatorStyle={{color: timeRunning ? '#1CC625' : '#1CC62550'}}
            showSeparator
            running={timeRunning}
          />
        </View>
        <View style={styles.controlContainer}>
          <TouchableOpacity onPress={() => setTimeRunning(!timeRunning)}>
            <Icon
              name={timeRunning ? 'ios-pause' : 'ios-play'}
              color={'#878787'}
              size={50}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleWorkoutPaging}
            disabled={forwardDisabled}>
            <Icon name={'ios-arrow-forward'} color={'#878787'} size={50} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight + 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    width: width * 0.9,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginTop: height * 0.05,
    overflow: 'hidden',
  },
  modalControl: {
    height: 4,
    width: '50%',
    backgroundColor: '#dddddd',
    borderRadius: 3,
    marginTop: '4%',
  },
  modalTopBG: {
    height: '50%',
    width: width,
    backgroundColor: '#00b894',
    position: 'absolute',
  },
  modalContent: {
    alignItems: 'center',
    marginTop: '6%',
  },
  modalContentTitle: {
    fontFamily: 'SFUIDisplay-Medium',
    color: '#ffffff',
    fontSize: 30,
  },
  modalContentSub: {
    fontFamily: 'SFUIDisplay-Light',
    color: '#ffffff',
    fontSize: 14,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '50%',
    marginTop: 30,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  progressContainerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 50,
  },
  progressTextContainer: {
    alignItems: 'center',
    position: 'absolute',
  },
  progressText: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 16,
  },
  progressButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '85%',
    marginVertical: 10,
    backgroundColor: '#026753',
    borderRadius: 8,
  },
  progressButtonText: {
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Bold',
    color: '#ffffff',
  },
  workoutLengthIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width,
  },
  workoutIndicator: {
    height: 3,
    marginHorizontal: 3,
    borderRadius: 10,
  },
  workoutContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  workoutTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  workoutTitleNumber: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 18,
    alignItems: 'center',
  },
  workoutTitle: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 22,
    alignItems: 'center',
    textTransform: 'capitalize',
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: width / 2,
  },
});

export default WorkoutCountDown;
