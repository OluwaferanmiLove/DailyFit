import React from 'react';
import {View, SafeAreaView, Image, StatusBar} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';

function Splash({navigation}) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getDarkMode = async () => {
      try {
        let darkMode = await AsyncStorage.getItem('darkMode');
        if (darkMode !== null) {
          dispatch({type: 'COLORMODE', payload: JSON.parse(darkMode)});
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    getDarkMode();
  });

  React.useEffect(() => {
    const getPushNotificationSwitch = async () => {
      try {
        let pushNotificationSwitch = await AsyncStorage.getItem(
          'pushNotificationSwitch',
        );
        if (pushNotificationSwitch !== null) {
          dispatch({
            type: 'PUSHNOTIF',
            payload: JSON.parse(pushNotificationSwitch),
          });
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    getPushNotificationSwitch();
  });

  React.useEffect(() => {
    const getWorkoutNum = async () => {
      try {
        let workoutNum = await AsyncStorage.getItem('workoutNum');
        if (workoutNum !== null) {
          workoutNum = JSON.parse(workoutNum);
          dispatch({type: 'WORKOUTNUM', payload: workoutNum});
        } else {
          dispatch({type: 'WORKOUTNUM', payload: 0});
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    getWorkoutNum();
    // AsyncStorage.getAllKeys()
    //   .then(keys => AsyncStorage.multiGet(keys))
    //   .then(items => console.log(items))
    //   .catch(error => console.warn('error get all Items', error));
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar hidden={true} />
      <Image
        source={require('../../asset/splashImage.png')}
        style={styles.mainBackground}
      />
      <View style={styles.overlay} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../asset/splashLogo3.png')}
          style={styles.splashLogo}
        />
      </View>
    </SafeAreaView>
  );
}

export default Splash;
