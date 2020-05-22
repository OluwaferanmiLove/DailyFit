import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Easing,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import {TouchableNativeFeedback, Switch} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

import styles from './styles';
import TopBar from '../Components/TopBar/TopBar';
import Card from '../Components/Card/Card';
import TimeCard from '../Components/Card/TimeCard';
import LinearGradient from 'react-native-linear-gradient';
import {NotifierComponents, Notifier} from 'react-native-notifier';
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from '../../StaticData/colors';
import PushNotification from 'react-native-push-notification';

function Options({navigation}) {
  const darkModeColor = useSelector(state => state.darkMode);
  const pushNotificationSwitchBool = useSelector(state => state.pushNotificationSwitch);
  const [darkMode, setDarkMode] = React.useState(pushNotificationSwitchBool);
  const [goalReset, setGoalReset] = React.useState(false);
  const [pushNotificationSwitch, setPushNotificationSwitch] = React.useState(
    false,
  );
  const [loseWeight, setLoseWeight] = React.useState(false);
  const [buildMuscles, setBuildMuscles] = React.useState(false);
  const [keepFit, setKeepFit] = React.useState(false);
  const [level, setlevel] = React.useState(null);
  const [time, setTime] = React.useState(null);

  const modeBackgroundColor = darkModeColor
    ? colors.darkModeBackgroundColor
    : colors.lightModeBackgroundColor;

  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    if (darkMode === false) {
      const storeDarkMode = async () => {
        try {
          await AsyncStorage.setItem('darkMode', JSON.stringify(true));
        } catch (e) {
          console.warn(e.message);
        }
      };

      storeDarkMode();
      dispatch({type: 'COLORMODE', payload: true});
      setDarkMode(!darkMode);
    } else {
      const storeDarkMode = async () => {
        try {
          await AsyncStorage.setItem('darkMode', JSON.stringify(false));
        } catch (e) {
          console.warn(e.message);
        }
      };

      storeDarkMode();
      dispatch({type: 'COLORMODE', payload: false});
      setDarkMode(!darkMode);
    }
  };

  let dateOne = new Date();
  dateOne.setDate(dateOne.getDate() + 1);
  dateOne.setHours(6);
  dateOne.setMinutes(0);
  dateOne.setMilliseconds(0);

  let dateTwo = new Date();
  dateTwo.setDate(dateTwo.getDate() + 1);
  dateTwo.setHours(8);
  dateTwo.setMinutes(0);
  dateTwo.setMilliseconds(0);

  const toggleNotification = () => {
    if (pushNotificationSwitch === false) {
      PushNotification.localNotification({
        /* Android Only Properties */
        id: 5,
        ticker: 'My Notification Ticker',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        vibrate: true,
        vibration: 300,
        tag: 'Notification Activated',
        group: 'Goal Notification',
        ongoing: false,
        priority: 'high',
        visibility: 'private',
        importance: 'high',
        allowWhileIdle: true,
        ignoreInForeground: false,
        /* iOS and Android properties */
        title: 'Notification Activated',
        message: 'Your notification has been activated',
        playSound: true,
        soundName: 'default',
        number: 10,
      });
      
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
        date: dateOne,
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
        date: dateOne,
      });

      PushNotification.localNotificationSchedule({
        /* Android Only Properties */
        id: 4,
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
        date: dateTwo,
      });
      setPushNotificationSwitch(!pushNotificationSwitch);
      const storePushNotificationSwitch = async () => {
        try {
          await AsyncStorage.setItem(
            'pushNotificationSwitch',
            JSON.stringify(true),
          );
        } catch (e) {
          console.warn(e.message);
        }
      };

      storePushNotificationSwitch();
    } else {
      PushNotification.cancelAllLocalNotifications();
      PushNotification.localNotification({
        /* Android Only Properties */
        id: 5,
        ticker: 'My Notification Ticker',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        vibrate: true,
        vibration: 300,
        tag: 'Notification Deactivated',
        group: 'Goal Notification',
        ongoing: false,
        priority: 'high',
        visibility: 'private',
        importance: 'high',
        allowWhileIdle: true,
        ignoreInForeground: false,
        /* iOS and Android properties */
        title: 'Notification Deactivated',
        message: 'Your notification has been deactivated',
        playSound: true,
        soundName: 'default',
        number: 10,
      });
      setPushNotificationSwitch(!pushNotificationSwitch);
      const storePushNotificationSwitch = async () => {
        try {
          await AsyncStorage.setItem(
            'pushNotificationSwitch',
            JSON.stringify(false),
          );
        } catch (e) {
          console.warn(e.message);
        }
      };

      storePushNotificationSwitch();
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

  const handleSetup = () => {
    if (
      (loseWeight === false && buildMuscles === false && keepFit === false) ||
      level === null ||
      time === null
    ) {
      ToastAndroid.show('Error, fill all fields or drag down to exit', 6000);
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

      storeStatExpect();
      dispatch({type: 'SETUP', payload: {goal, level, time}});
      storeSetup();
      setGoalReset(!goalReset);

      PushNotification.localNotification({
        /* Android Only Properties */
        id: 4,
        ticker: 'My Notification Ticker',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        vibrate: true,
        vibration: 300,
        tag: 'Goal Rest',
        group: 'Workout Notification',
        ongoing: false,
        priority: 'high',
        visibility: 'private',
        importance: 'high',
        allowWhileIdle: true,
        ignoreInForeground: false,
        /* iOS and Android properties */
        title: 'Goal Reset Succesfull',
        message: 'Your goal has been modified succesfully',
        playSound: true,
        soundName: 'default',
      });
    }
  };

  React.useEffect(() => {}, []);

  return (
    <SafeAreaView style={[styles.main, {backgroundColor: modeBackgroundColor}]}>
      <StatusBar
        translucent={true}
        barStyle={darkModeColor ? 'light-content' : 'dark-content'}
        backgroundColor={'#ffffff00'}
      />
      <Modal
        isVisible={false}
        onBackdropPress={() => setDarkMode(false)}
        swipeDirection={['up', 'down', 'left', 'right']}
        onSwipeComplete={({down}) => setDarkMode(false)}
        useNativeDriver={false}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.modalControl} />
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImage}
              source={require('../../asset/premium.png')}
            />
            <Text style={styles.modalImageInfo}>
              Signup for $3.99/5 month only to
            </Text>
            <Text style={styles.modalImageInfo}>
              unlock all premium features
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={goalReset}
        onBackdropPress={() => setGoalReset(false)}
        swipeDirection={'down'}
        onSwipeComplete={({down}) => setGoalReset(false)}
        useNativeDriver={false}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.modalControl} />
          <ScrollView
            style={styles.modalContentScrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.modalContent}>
              <View>
                <Icon name={'ios-create'} size={100} color={'#b2b2b2'} />
              </View>
              <View>
                <Text style={styles.modalTitle}>Edit your goal</Text>
              </View>
              <View style={styles.modalForm}>
                <Text style={styles.timeText}>Select your Goal</Text>
                <Card
                  cardTitle={'Lose weight'}
                  cardDes={'I will like to shed some weight'}
                  backgroundColor={
                    loseWeight === true ? '#00b894ff' : '#e2e2e2'
                  }
                  textColor={loseWeight === true ? '#ffffff' : '#4d4d4d'}
                  onPress={() => setLoseWeight(!loseWeight)}
                />
                <Card
                  cardTitle={'Build muscles'}
                  cardDes={'I just want muscles i wil like to flex'}
                  backgroundColor={
                    buildMuscles === true ? '#00b894ff' : '#e2e2e2'
                  }
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
              <Text style={styles.timeText}>Select your Time</Text>
              <View style={styles.modalFormTime}>
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
              <View style={styles.modalForm}>
                <Text style={styles.timeText}>Select your Experience</Text>
                <Card
                  cardTitle={'Beginner'}
                  cardDes={
                    'i have a little experience will like to take it to the next step'
                  }
                  onPress={handleLevelBeginner}
                  backgroundColor={
                    level === 'Beginner' ? '#00b894ff' : '#e2e2e2'
                  }
                  textColor={level === 'Beginner' ? '#ffffff' : '#4d4d4d'}
                />
                <Card
                  cardTitle={'Intermidiate'}
                  cardDes={'Newbie to workout, i will be taking slow'}
                  onPress={handleLevelIntermidiate}
                  backgroundColor={
                    level === 'Intermidiate' ? '#ff7675' : '#e2e2e2'
                  }
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
              <View style={styles.butttonContainer}>
                <TouchableWithoutFeedback onPress={handleSetup}>
                  <View style={styles.daillFitButton}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#b20000ff', '#d30000', '#fd0000']}
                      style={styles.dailyfitbuttongradient}>
                      <Text style={styles.buttonText}>Reset</Text>
                    </LinearGradient>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.topContainer}>
        <TopBar
          title={'Options/Settings'}
          iconSize={30}
          iconColor={'#b2b2b2'}
          subText={'15 May 2020'}
        />
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.options}>
          <Text style={styles.optionsTitle}>My Plan</Text>
          <View style={styles.optionsChild}>
            <TouchableNativeFeedback
              style={styles.optionsChildStyle}
              onPress={() => navigation.navigate('Signup')}>
              <View style={styles.optionsTitleStyle}>
                <Icon name={'ios-fitness'} size={25} color={'#ccccccff'} />
                <Text
                  style={[
                    styles.optionsChildText,
                    {color: darkModeColor ? '#b2b2b2' : '#585858'},
                  ]}>
                  Signup now for premium features
                </Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.optionsChildBorder} />
          </View>
          <View style={styles.optionsChild}>
            <TouchableNativeFeedback
              style={styles.optionsChildStyle}
              onPress={() => setGoalReset(!goalReset)}>
              <View style={styles.optionsTitleStyle}>
                <Icon name={'ios-create'} size={25} color={'#ccccccff'} />
                <Text
                  style={[
                    styles.optionsChildText,
                    {color: darkModeColor ? '#b2b2b2' : '#585858'},
                  ]}>
                  Reset my goals
                </Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.optionsChildBorder} />
          </View>
          <Text style={styles.optionsTitle}>Customize</Text>
          <View style={styles.optionsChild}>
            <TouchableNativeFeedback style={styles.optionsChildStyle}>
              <View style={styles.optionsTitleStyle}>
                <Icon name={'ios-contrast'} size={25} color={'#ccccccff'} />
                <Text
                  style={[
                    styles.optionsChildText,
                    {color: darkModeColor ? '#b2b2b2' : '#585858'},
                  ]}>
                  Dark mode
                </Text>
              </View>
              <View style={styles.optionsToggleStyle}>
                <Switch
                  trackColor={{false: '#edeff3', true: '#00b894'}}
                  thumbColor={'#f4f3f4'}
                  onValueChange={toggleDarkMode}
                  value={darkMode}
                />
              </View>
            </TouchableNativeFeedback>
            <View style={styles.optionsChildBorder} />
          </View>
          <View style={styles.optionsChild}>
            <TouchableNativeFeedback style={styles.optionsChildStyle}>
              <View style={styles.optionsTitleStyle}>
                <Icon
                  name={'ios-notifications'}
                  size={25}
                  color={'#ccccccff'}
                />
                <Text
                  style={[
                    styles.optionsChildText,
                    {color: darkModeColor ? '#b2b2b2' : '#585858'},
                  ]}>
                  Push Notification
                </Text>
              </View>
              <View style={styles.optionsToggleStyle}>
                <Switch
                  trackColor={{false: '#edeff3', true: '#00b894'}}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleNotification}
                  value={pushNotificationSwitch}
                />
              </View>
            </TouchableNativeFeedback>
            <View style={styles.optionsChildBorder} />
          </View>
          {/* <View style={styles.optionsChild}>
            <TouchableNativeFeedback style={styles.optionsChildStyle}>
              <View style={styles.optionsTitleStyle}>
                <Icon name={'ios-clock'} size={25} color={'#ccccccff'} />
                <Text
                  style={[
                    styles.optionsChildText,
                    {color: darkModeColor ? '#b2b2b2' : '#585858'},
                  ]}>
                  Clock template
                </Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.optionsChildBorder} />
          </View> */}
          <Text style={styles.optionsTitle}>About</Text>
          <View style={styles.optionsChild}>
            <TouchableNativeFeedback style={styles.optionsChildStyle}>
              <View style={styles.optionsTitleStyle}>
                <Icon
                  name={'ios-information-circle'}
                  size={25}
                  color={'#ccccccff'}
                />
                <Text
                  style={[
                    styles.optionsChildText,
                    {color: darkModeColor ? '#b2b2b2' : '#585858'},
                  ]}>
                  DailyFit
                </Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.optionsChildBorder} />
          </View>
          <View style={styles.optionsChild}>
            <TouchableNativeFeedback style={styles.optionsChildStyle}>
              <View style={styles.optionsTitleStyle}>
                <Icon name={'ios-contact'} size={25} color={'#ccccccff'} />
                <Text
                  style={[
                    styles.optionsChildText,
                    {color: darkModeColor ? '#b2b2b2' : '#585858'},
                  ]}>
                  Contact us
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Options;
