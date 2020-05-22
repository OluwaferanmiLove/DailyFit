import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  StatusBar,
  Easing,
  ToastAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import BrowseCard from '../Components/Card/BrowseCard';
import ExerciseCard from '../Components/Card/ExerciseCard';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import TopBar from '../Components/TopBar/TopBar';
import TimeCard from '../Components/Card/TimeCard';
import DailyFitButton from '../Components/DailyFitButton/DailyFitButton';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import {colors} from '../../StaticData/colors';

function Browse({navigation}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textFocus, setTextFocus] = React.useState('goalNameRef');
  const [goalName, setGoalName] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [squat, setSquat] = React.useState(false);
  const [pullUps, setPullUps] = React.useState(false);
  const [pushUps, setPushUps] = React.useState(false);
  const [sitUps, setSitUps] = React.useState(false);
  const [jumpingJack, setJumpingJack] = React.useState(false);
  const [customGoal, setCustomGoal] = React.useState([]);

  const dispatch = useDispatch();
  const gender = useSelector(state => state.gender);
  const darkMode = useSelector(state => state.darkMode);

  const modeBackgroundColor = darkMode
    ? colors.darkModeBackgroundColor
    : colors.lightModeBackgroundColor;

  const timeCardTime = [5, 10, 15, 20, 25, 30, 35, 40, 50, 60];
  const handleCreateGoal = () => {
    if (
      (squat === false &&
        pullUps === false &&
        pushUps === false &&
        sitUps === false &&
        jumpingJack === false) ||
      time === null ||
      goalName === null
    ) {
      ToastAndroid.show('Error, fill all neccesary fields', 6000);
    } else {
      let exercise = [
        // eslint-disable-next-line prettier/prettier
        {name: jumpingJack ? 'jumping jack' : null, time: jumpingJack ? 60 : null},
        {name: jumpingJack ? 'rest' : null, time: jumpingJack ? 5 : null},
        {name: squat ? 'squat' : null, time: squat ? 60 : null},
        {name: squat ? 'rest' : null, time: squat ? 5 : null},
        {name: pullUps ? 'pull ups' : null, time: pullUps ? 60 : null},
        {name: pullUps ? 'rest' : null, time: pullUps ? 5 : null},
        {name: pushUps ? 'push ups' : null, time: pushUps ? 60 : null},
        {name: pushUps ? 'rest' : null, time: pushUps ? 5 : null},
        {name: sitUps ? 'sit ups' : null, time: sitUps ? 60 : null},
        {name: sitUps ? 'rest' : null, time: sitUps ? 5 : null},
        {name: 'strecth', time: 10},
      ];

      const storeCustomGoal = async () => {
        try {
          await AsyncStorage.setItem(
            'customGoal',
            JSON.stringify(
              customGoal.concat({
                goalName: goalName,
                exercise: exercise,
                time: time,
              }),
            ),
          );
        } catch (e) {
          console.warn(e.message);
        }
      };

      let stat = {
        goalName: goalName,
        exercise: exercise,
        daily: time,
        weekly: time * 6,
        monthly: time * 26,
      };

      let date = new Date();
      date.setDate(date.getDate() + 1);
      date.setHours(6);
      date.setMinutes(0);
      date.setMilliseconds(0);

      PushNotification.localNotification({
        /* Android Only Properties */
        id: 2,
        ticker: 'My Notification Ticker',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        vibrate: true,
        vibration: 300,
        tag: 'Goal created',
        group: 'Workout Notification',
        ongoing: false,
        priority: 'high',
        visibility: 'private',
        importance: 'high',
        allowWhileIdle: true,
        ignoreInForeground: false,
        /* iOS and Android properties */
        title: 'Goal created Succesfully',
        message: 'Your custom goal is created succesfully',
        playSound: true,
        soundName: 'default',
      });

      PushNotification.localNotificationSchedule({
        /* Android Only Properties */
        id: 3,
        ticker: 'My Notification Ticker',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        vibrate: true,
        vibration: 300,
        tag: 'Time for your workout',
        group: 'Goal Notification',
        ongoing: false,
        priority: 'high',
        visibility: 'private',
        importance: 'high',
        allowWhileIdle: true,
        ignoreInForeground: false,
        /* iOS and Android properties */
        title: 'Time for your workout',
        message: 'Its time to acheive your goal',
        playSound: true,
        soundName: 'default',
        number: 10,
        repeatType: 'time',
        repeatTime: 18000000,
        date: date,
      });

      const storeStatExpect = async () => {
        try {
          await AsyncStorage.setItem('statExpect', JSON.stringify(stat));
        } catch (e) {
          console.warn(e.message);
        }
      };

      storeCustomGoal();
      storeStatExpect();
      setCustomGoal(null);
      setModalVisible(false);
    }
  };

  const handleWorkout = (workout, level, time) => {
    dispatch({
      type: 'WORKOUT',
      payload: {goal: workout, level: level, time: time},
    });
    navigation.navigate('WorkoutNow');
  };

  const handleCustomWorkout = (workout, index, name, level, time) => {
    dispatch({
      type: 'CUSTOMWORKOUT',
      payload: {
        name: name,
        index: index,
        goal: workout,
        level: level,
        time: time,
      },
    });
    navigation.navigate('WorkoutNow');
  };

  const goalNameRef = React.useRef();

  React.useEffect(() => {
    const getCustomGoal = async () => {
      try {
        let customGoal = await AsyncStorage.getItem('customGoal');

        if (customGoal !== null) {
          setCustomGoal(JSON.parse(customGoal));
        } else {
          setCustomGoal(null);
        }
      } catch (e) {
        // error reading value
      }
    };
    getCustomGoal();
  }, [customGoal]);

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
        onSwipeComplete={({down}) => setModalVisible(false)}
        useNativeDriver={false}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.modalControl} />
          <ScrollView
            style={styles.modalContentScrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.modalContent}>
              <View>
                <Icon name={'ios-list-box'} size={100} color={'#b2b2b2'} />
              </View>
              <View>
                <Text style={styles.modalTitle}>Create your goal</Text>
              </View>
              <View style={styles.modalForm}>
                <TextInput
                  ref={goalNameRef}
                  style={styles.inputBar}
                  placeholder={'workout title e.g. My squat goal'}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  onFocus={() => setTextFocus('nameRef')}
                  blurOnSubmit={false}
                  borderColor={textFocus === 'nameRef' ? '#00b894' : '#494949'}
                  onChangeText={text => setGoalName(text)}
                />
                <Text style={styles.timeText}>
                  Select your Time(your daily goal in minutes)
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={50}
                  style={styles.modalFormScrollView}>
                  <View style={styles.modalFormTime}>
                    {timeCardTime.map((item, index) => {
                      return (
                        <TimeCard
                          key={`${index}`}
                          cardTitle={item}
                          cardDes={'I just love in being in a good shape'}
                          // eslint-disable-next-line prettier/prettier
                          backgroundColor={time === item ? '#026753' : '#e2e2e2'}
                          textColor={time === item ? '#ffffff' : '#4d4d4d'}
                          onPress={() => setTime(item)}
                        />
                      );
                    })}
                  </View>
                </ScrollView>
                <View style={styles.selectExerciseContainer}>
                  <Text style={styles.timeText}>Select your Exercise</Text>
                </View>
                <View style={styles.selectExercise}>
                  <TouchableWithoutFeedback
                    onPress={() => setJumpingJack(!jumpingJack)}>
                    <View style={styles.selectExerciseOptions}>
                      <Text style={styles.exerTitle}>Jumping Jack</Text>
                      <Icon
                        name={
                          jumpingJack
                            ? 'ios-checkmark-circle'
                            : 'ios-checkmark-circle-outline'
                        }
                        size={22}
                        color={jumpingJack ? '#026753' : '#b2b2b2'}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => setSquat(!squat)}>
                    <View style={styles.selectExerciseOptions}>
                      <Text style={styles.exerTitle}>Squat</Text>
                      <Icon
                        name={
                          squat
                            ? 'ios-checkmark-circle'
                            : 'ios-checkmark-circle-outline'
                        }
                        size={22}
                        color={squat ? '#026753' : '#b2b2b2'}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => setPullUps(!pullUps)}>
                    <View style={styles.selectExerciseOptions}>
                      <Text style={styles.exerTitle}>Pull ups</Text>
                      <Icon
                        name={
                          pullUps
                            ? 'ios-checkmark-circle'
                            : 'ios-checkmark-circle-outline'
                        }
                        size={22}
                        color={pullUps ? '#026753' : '#b2b2b2'}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => setPushUps(!pushUps)}>
                    <View style={styles.selectExerciseOptions}>
                      <Text style={styles.exerTitle}>Push ups</Text>
                      <Icon
                        name={
                          pushUps
                            ? 'ios-checkmark-circle'
                            : 'ios-checkmark-circle-outline'
                        }
                        size={22}
                        color={pushUps ? '#026753' : '#b2b2b2'}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => setSitUps(!sitUps)}>
                    <View style={styles.selectExerciseOptions}>
                      <Text style={styles.exerTitle}>Sit ups</Text>
                      <Icon
                        name={
                          sitUps
                            ? 'ios-checkmark-circle'
                            : 'ios-checkmark-circle-outline'
                        }
                        size={22}
                        color={sitUps ? '#026753' : '#b2b2b2'}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.butttonContainer}>
                  <TouchableWithoutFeedback onPress={handleCreateGoal}>
                    <View style={styles.daillFitButton}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#b20000ff', '#d30000', '#fd0000']}
                        style={styles.dailyfitbuttongradient}>
                        <Text style={styles.buttonText}>Create</Text>
                      </LinearGradient>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.topContainer}>
        <TopBar
          title={'Browse'}
          iconSize={30}
          iconColor={'#b2b2b2'}
          subText={'15 May 2020'}
        />
      </View>
      <View style={styles.createContainer}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <Icon
            name={'ios-add-circle'}
            size={65}
            color={'#00b894'}
            style={styles.createIcon}
          />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView style={styles.optionContainer}>
        <View style={styles.optionContainerStyle}>
          <View style={styles.options}>
            <Text style={styles.optionsTitle}>custom</Text>
            {customGoal === null ? (
              <Text>Set custom goal to see custom goals</Text>
            ) : (
              <>
                {customGoal.map((item, index) => {
                  return (
                    <View style={styles.optionsChild} key={`${index}`}>
                      <ExerciseCard
                        cardTitle={item.goalName}
                        exerciseLevel={'LEVEL'}
                        exerciseMin={`${item.time} min`}
                        backgroundColor={'#e2e2e2'}
                        textColor={'#494949'}
                        imageSource={
                          gender === 'male'
                            ? require('../../asset/buildMuscle.png')
                            : require('../../asset/customGoalFemale.png')
                        }
                        level={'Advanced'}
                        onPress={() =>
                          handleCustomWorkout(
                            'customGoal',
                            index,
                            item.goalName,
                            'Beginner',
                            item.time,
                          )
                        }
                      />
                    </View>
                  );
                })}
              </>
            )}
            <Text style={styles.optionsTitle}>Beginner</Text>
            {/* <View style={styles.optionsChild}>
                <BrowseCard
                  cardTitle={'30 days lose weight plan'}
                  iconName={'arrow-back'}
                  backgroundColor={'#d6303160'}
                />
              </View> */}
            <View style={styles.optionsChild}>
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
                level={'Beginner'}
                onPress={() => handleWorkout('loseWeight', 'Beginner', 15)}
              />
            </View>
            <View style={styles.optionsChild}>
              <ExerciseCard
                cardTitle={'Build Muscles'}
                exerciseLevel={'LEVEL'}
                backgroundColor={'#e2e2e2'}
                textColor={'#494949'}
                imageSource={
                  gender === 'male'
                    ? require('../../asset/buildMuscle.png')
                    : require('../../asset/buildMuscleFemale.png')
                }
                level={'Beginner'}
                onPress={() => handleWorkout('buildMuscles', 'Beginner', 15)}
              />
            </View>
            <View style={styles.optionsChild}>
              <ExerciseCard
                cardTitle={'Keep Fit'}
                exerciseLevel={'LEVEL'}
                backgroundColor={'#e2e2e2'}
                textColor={'#494949'}
                imageSource={
                  gender === 'male'
                    ? require('../../asset/keepFitMale.png')
                    : require('../../asset/keepFitFemale.png')
                }
                level={'Beginner'}
                onPress={() => handleWorkout('keepFit', 'Beginner', 15)}
              />
            </View>
            <Text style={styles.optionsTitle}>Intermidiate</Text>
            <View style={styles.optionsChild}>
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
                level={'Intermidiate'}
                onPress={() => handleWorkout('loseWeight', 'Intermidiate', 25)}
              />
            </View>
            <View style={styles.optionsChild}>
              <ExerciseCard
                cardTitle={'Build Muscles'}
                exerciseLevel={'LEVEL'}
                backgroundColor={'#e2e2e2'}
                textColor={'#494949'}
                imageSource={
                  gender === 'male'
                    ? require('../../asset/buildMuscle.png')
                    : require('../../asset/buildMuscleFemale.png')
                }
                level={'Intermidiate'}
                onPress={() =>
                  handleWorkout('buildMuscles', 'Intermidiate', 25)
                }
              />
            </View>
            <View style={styles.optionsChild}>
              <ExerciseCard
                cardTitle={'Keep Fit'}
                exerciseLevel={'LEVEL'}
                backgroundColor={'#e2e2e2'}
                textColor={'#494949'}
                imageSource={
                  gender === 'male'
                    ? require('../../asset/keepFitMale.png')
                    : require('../../asset/keepFitFemale.png')
                }
                level={'Intermidiate'}
                onPress={() => handleWorkout('keepFit', 'Intermidiate', 25)}
              />
            </View>
            <Text style={styles.optionsTitle}>Advanced</Text>
            <View style={styles.optionsChild}>
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
                level={'Advanced'}
                onPress={() => handleWorkout('loseWeight', 'Advanced', 35)}
              />
            </View>
            <View style={styles.optionsChild}>
              <ExerciseCard
                cardTitle={'Build Muscles'}
                exerciseLevel={'LEVEL'}
                backgroundColor={'#e2e2e2'}
                textColor={'#494949'}
                imageSource={
                  gender === 'male'
                    ? require('../../asset/buildMuscle.png')
                    : require('../../asset/buildMuscleFemale.png')
                }
                level={'Advanced'}
                onPress={() => handleWorkout('loseWeight', 'Advanced', 35)}
              />
            </View>
            <View style={styles.optionsChild}>
              <ExerciseCard
                cardTitle={'Keep Fit'}
                exerciseLevel={'LEVEL'}
                backgroundColor={'#e2e2e2'}
                textColor={'#494949'}
                imageSource={
                  gender === 'male'
                    ? require('../../asset/keepFitMale.png')
                    : require('../../asset/keepFitFemale.png')
                }
                level={'Advanced'}
                onPress={() => handleWorkout('loseWeight', 'Advanced', 35)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Browse;
