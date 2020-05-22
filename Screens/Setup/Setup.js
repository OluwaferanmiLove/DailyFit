/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Keyboard,
  TextInput,
  Easing,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import DailyFitButton from '../Components/DailyFitButton/DailyFitButton';
import TopBar from '../Components/TopBar/TopBar';
import Question from '../Components/Question/Question';
import Card from '../Components/Card/Card';
import {setUp, skip} from '../../Redux';
import AgeCard from '../Components/Card/AgeCard';
import TimeCard from '../Components/Card/TimeCard.js';
import store from '../../Redux/Store';
import PushNotification from 'react-native-push-notification';
import {Notifier, NotifierComponents} from 'react-native-notifier';

function Setup({navigation}) {
  const [page, setPage] = React.useState(1);
  const [loseWeight, setLoseWeight] = React.useState(false);
  const [buildMuscles, setBuildMuscles] = React.useState(false);
  const [keepFit, setKeepFit] = React.useState(false);
  const [level, setlevel] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [textFocus, setTextFocus] = React.useState(null);
  const [time, setTime] = React.useState(null);

  const workoutGoal = useSelector(state => state.workoutGoal);
  const setuped = useSelector(state => state.workoutGoal);

  const dispatch = useDispatch();

  const ageRef = React.useRef();

  const TOTAL_PAGE = 3;

  const handlePaging = () => {
    if (page < TOTAL_PAGE) {
      setPage(page + 1);
    }
  };

  const handleBacking = () => {
    if (page === 1) {
      navigation.goBack();
    } else if (page < 2 || TOTAL_PAGE) {
      setPage(page - 1);
    }
  };

  const handleLevelBeginner = () => {
    level === 'Beginner' ? setlevel(null) : setlevel('Beginner');
  };

  const handleLevelIntermidiate = () => {
    level === 'Intermidiate' ? setlevel(null) : setlevel('Intermidiate');
  };

  const handleLevelAdvanced = () => {
    level === 'Advanced' ? setlevel(null) : setlevel('Advanced');
  };

  let date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(6);
  date.setMinutes(0);
  date.setMilliseconds(0);

  const handleSetup = () => {
    if (
      (loseWeight === false && buildMuscles === false && keepFit === false) ||
      level === null ||
      age == null ||
      gender == null ||
      time === null
    ) {
      Notifier.showNotification({
        title: 'Error, go back and check',
        description: 'Hey!, fill and select all necessary place',
        duration: 5000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        hideOnPress: true,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    } else {
      let goal = {
        loseWeight: loseWeight,
        buildMuscles: buildMuscles,
        keepFit: keepFit,
      };

      const storeSetup = async () => {
        try {
          await AsyncStorage.setItem('goal', JSON.stringify(goal));
          await AsyncStorage.setItem('level', level);
          await AsyncStorage.setItem('age', age);
          await AsyncStorage.setItem('gender', gender);
          await AsyncStorage.setItem('time', JSON.stringify(time));
        } catch (e) {
          console.warn(e.message);
        }
      };

      let stat = {
        goal: goal,
        daily: time,
        weekly: time * 6,
        monthly: time * 26,
      };

      const storeStatExpect = async () => {
        try {
          await AsyncStorage.setItem('statExpect', JSON.stringify(stat));
        } catch (e) {
          console.warn(e.message);
        }
      };

      const storeSetuped = async () => {
        try {
          await AsyncStorage.setItem('setuped', 'true');
        } catch (e) {
          console.warn(e.message);
        }
      };

      PushNotification.localNotification({
        /* Android Only Properties */
        id: 0,
        ticker: 'My Notification Ticker',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        vibrate: true,
        vibration: 300,
        tag: 'Setup Succesfully',
        group: 'Workout Notification',
        ongoing: false,
        priority: 'high',
        visibility: 'private',
        importance: 'high',
        allowWhileIdle: true,
        ignoreInForeground: false,
        /* iOS and Android properties */
        title: 'Setup Succesfully',
        message:
          'You are set successfully you have a 7 days trial after that you can register',
        playSound: true,
        soundName: 'default',
        number: 10,
      });

      storeStatExpect();
      storeSetuped();
      dispatch({type: 'SETUP', payload: {goal, level, age, gender, time}});
      storeSetup();
      PushNotification.localNotificationSchedule({
        /* Android Only Properties */
        id: 1,
        ticker: 'My Notification Ticker',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        bigText: 'Hey are you ready to workout today? start now',
        vibrate: true,
        vibration: 300,
        tag: 'Workout Reminder',
        group: 'Workout Notification',
        ongoing: false,
        priority: 'high',
        visibility: 'private',
        importance: 'high',
        allowWhileIdle: true,
        ignoreInForeground: false,
        /* iOS and Android properties */
        title: 'Ready for your workout',
        message: 'Hey are you ready to workout today? start now',
        playSound: true,
        soundName: 'default',
        number: 10,
        repeatType: 'time',
        repeatTime: 18000000,
        date: date,
      });
      PushNotification.cancelLocalNotifications({id: '0'});
      dispatch({type: 'SETUPED'});
    }
  };

  React.useEffect(state => {
    const storeDay = async () => {
      try {
        await AsyncStorage.multiSet([
          ['loseWeightBeginnerday', JSON.stringify(1)],
          ['loseWeightIntermidiateday', JSON.stringify(1)],
          ['loseWeightAdvancedday', JSON.stringify(1)],
          ['buildMusclesBeginnerday', JSON.stringify(1)],
          ['buildMusclesIntermidiateday', JSON.stringify(1)],
          ['buildMusclesAdvancedday', JSON.stringify(1)],
          ['keepFitBeginnerday', JSON.stringify(1)],
          ['keepFitIntermidiateday', JSON.stringify(1)],
          ['keepFitAdvancedday', JSON.stringify(1)],
        ]);
        console.warn('done');
      } catch (e) {
        console.warn(e.message);
      }
    };

    const storeGraphTime = async () => {
      try {
        await AsyncStorage.setItem(
          'graphTime',
          JSON.stringify([
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
            {
              // eslint-disable-next-line prettier/prettier
            date: `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`,
              time: 0,
            },
          ]),
        );
      } catch (e) {
        console.warn(e.message);
      }
    };

    const getSetup = async () => {
      try {
        let goal = await AsyncStorage.getItem('goal');
        let workoutLevel = await AsyncStorage.getItem('level');
        let workoutAge = await AsyncStorage.getItem('age');
        let wrkoutGender = await AsyncStorage.getItem('gender');
        let workoutTime = await AsyncStorage.getItem('time');

        if (goal !== null) {
          goal = JSON.parse(goal);
          setLoseWeight(goal.loseWeight);
          setBuildMuscles(goal.buildMuscles);
          setKeepFit(goal.keepFit);
        } else {
          setLoseWeight(null);
          setBuildMuscles(null);
          setKeepFit(null);
        }

        if (workoutLevel !== null) {
          setlevel(workoutLevel);
        } else {
          setlevel(null);
        }

        if (workoutAge !== null) {
          setAge(workoutAge);
        } else {
          setAge(null);
        }

        if (wrkoutGender !== null) {
          setGender(wrkoutGender);
        } else {
          setGender(null);
        }

        if (workoutTime !== null) {
          setTime(JSON.parse(workoutTime));
        } else {
          setTime(null);
        }
      } catch (e) {
        // error reading value
      }
    };

    storeDay();
    storeGraphTime();
    getSetup();

    console.warn(store.getState());
  }, []);

  React.useEffect(() => {
    const storeCustomGoal = async () => {
      try {
        await AsyncStorage.setItem('customGoal', JSON.stringify([]));
      } catch (e) {
        console.warn(e.message);
      }
    };
    storeCustomGoal();
  });

  return (
    <SafeAreaView style={styles.main}>
      <TopBar
        leftText={'ios-arrow-back'}
        iconSize={30}
        onPressLeftText={handleBacking}
        leftIconColor={'#49494950'}
        showDate={false}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../asset/textLogo.png')}
          style={styles.welcomeLogo}
        />
      </View>
      {page === 1 ? (
        <View style={styles.qusContainer}>
          <Question
            question={'What is your goal?'}
            descriptionLnOne={'Whatever your plan is we have the perfect'}
            descriptionLnTwo={'plan for you'}
          />
          <View style={styles.qusCard}>
            <Text style={styles.qusCardInstruction}>
              You can Select more than one
            </Text>
            <Card
              cardTitle={'Lose weight'}
              cardDes={'I will like to shed some weight'}
              backgroundColor={loseWeight === true ? '#00b894ff' : '#e2e2e2'}
              textColor={loseWeight === true ? '#ffffff' : '#4d4d4d'}
              onPress={() => setLoseWeight(!loseWeight)}
            />
            <Card
              cardTitle={'Build muscles'}
              cardDes={'I just want muscles i wil like to flex'}
              backgroundColor={buildMuscles === true ? '#00b894ff' : '#e2e2e2'}
              textColor={buildMuscles === true ? '#ffffff' : '#4d4d4d'}
              onPress={() => setBuildMuscles(!buildMuscles)}
            />
            <Card
              cardTitle={'Keep Fit'}
              cardDes={'I just love in being in a good shape'}
              backgroundColor={keepFit === true ? '#00b894ff' : '#e2e2e2'}
              textColor={keepFit === true ? '#ffffff' : '#4d4d4d'}
              onPress={() => setKeepFit(!keepFit)}
            />
          </View>
        </View>
      ) : (
        <View />
      )}
      {page === 2 ? (
        <View style={styles.qusContainer}>
          <Question
            question={'What is your workout level?'}
            descriptionLnOne={'We will use your answer to provide a very'}
            descriptionLnTwo={'suitable for your workout schedule'}
          />
          <View style={styles.qusCard}>
            <Card
              cardTitle={'Beginner'}
              cardDes={
                'i have a little experience will like to take it to the next step'
              }
              onPress={handleLevelBeginner}
              backgroundColor={level === 'Beginner' ? '#00b894ff' : '#e2e2e2'}
              textColor={level === 'Beginner' ? '#ffffff' : '#4d4d4d'}
            />
            <Card
              cardTitle={'Intermidiate'}
              cardDes={'Newbie to workout, i will be taking slow'}
              onPress={handleLevelIntermidiate}
              backgroundColor={level === 'Intermidiate' ? '#ff7675' : '#e2e2e2'}
              textColor={level === 'Intermidiate' ? '#ffffff' : '#4d4d4d'}
            />
            <Card
              cardTitle={'Advanced'}
              cardDes={'Bring it on, ready to break limit and stay fit'}
              onPress={handleLevelAdvanced}
              backgroundColor={level === 'Advanced' ? '#d63031' : '#e2e2e2'}
              textColor={level === 'Advanced' ? '#ffffff' : '#4d4d4d'}
            />
          </View>
        </View>
      ) : (
        <View />
      )}
      {page === 3 ? (
        <View style={styles.qusContainer}>
          <Question
            question={'A little personal details?'}
            descriptionLnOne={'Whatever your goal is we have the perfect'}
            descriptionLnTwo={'plan for you'}
          />
          <View style={styles.qusCard}>
            <Text style={styles.qusCardInstruction}>Enter your age</Text>
            <TextInput
              ref={ageRef}
              style={styles.inputBar}
              placeholder={'Age'}
              onFocus={() => setTextFocus('ageRef')}
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
              borderColor={textFocus === 'ageRef' ? '#00b894' : '#494949'}
              onChangeText={text => setAge(text)}
              maxLength={2}
              value={age}
              keyboardType={'numeric'}
            />
            <Text style={styles.qusCardInstruction}>Select your gender</Text>
            <View style={styles.planCard}>
              <AgeCard
                cardTitle={'MALE'}
                backgroundColor={gender === 'male' ? '#00b894ff' : '#e2e2e2'}
                textColor={gender === 'male' ? '#ffffff' : '#4d4d4d'}
                onPress={() => setGender('male')}
              />
              <AgeCard
                cardTitle={'FEMALE'}
                backgroundColor={gender === 'female' ? '#00b894ff' : '#e2e2e2'}
                textColor={gender === 'female' ? '#ffffff' : '#4d4d4d'}
                onPress={() => setGender('female')}
              />
            </View>
            <Text style={styles.qusCardInstruction}>
              Select your workout duration (in minutes)
            </Text>
            <View style={styles.timeCard}>
              <TimeCard
                cardTitle={'5 - 15'}
                cardDes={'I just love in being in a good shape'}
                backgroundColor={time === 15 ? '#00b894ff' : '#e2e2e2'}
                textColor={time === 15 ? '#ffffff' : '#4d4d4d'}
                onPress={() => setTime(15)}
              />
              <TimeCard
                cardTitle={'15 - 30'}
                cardDes={'I just love in being in a good shape'}
                backgroundColor={time === 30 ? '#00b894ff' : '#e2e2e2'}
                textColor={time === 30 ? '#ffffff' : '#4d4d4d'}
                onPress={() => setTime(30)}
              />
              <TimeCard
                cardTitle={'30+'}
                cardDes={'I just love in being in a good shape'}
                backgroundColor={time === 45 ? '#00b894ff' : '#e2e2e2'}
                textColor={time === 45 ? '#ffffff' : '#4d4d4d'}
                onPress={() => setTime(45)}
              />
            </View>
          </View>
        </View>
      ) : (
        <View />
      )}
      <View style={styles.butttonContainer}>
        <DailyFitButton
          buttonName={page < TOTAL_PAGE ? 'Next' : 'Get Started'}
          onPress={page < TOTAL_PAGE ? handlePaging : handleSetup}
        />
      </View>
    </SafeAreaView>
  );
}

export default Setup;
