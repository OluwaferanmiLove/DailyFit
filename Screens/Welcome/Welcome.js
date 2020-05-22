import React from 'react';
import {Text, View, SafeAreaView, Image, StatusBar} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';
import DailyFitButton from '../Components/DailyFitButton/DailyFitButton';
import AsyncStorage from '@react-native-community/async-storage';

function Welcome() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const storeDay = async () => {
      try {
        await AsyncStorage.setItem('day', JSON.stringify(1));
      } catch (e) {
        console.warn(e.message);
      }
    };

    storeDay();
  });

  const onBoard = () => {
    const storeOnboard = async () => {
      try {
        await AsyncStorage.setItem('onBoarded', 'true');
      } catch (e) {
        console.warn(e.message);
      }
    };

    storeOnboard();
    dispatch({type: 'ONBOARD', payload: true});
  };

  return (
    <SafeAreaView style={styles.main}>
      <Image
        source={require('../../asset/welcomeImage.png')}
        style={styles.mainBackground}
      />
      <View style={styles.overlay} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../asset/textLogo.png')}
          style={styles.welcomeLogo}
        />
      </View>
      <View style={styles.WelcomeContainer}>
        <Image
          source={require('../../asset/welcome.png')}
          style={styles.WelcomeImage}
        />
        <Text style={styles.WelcomeText}>
          The last three or four reps is what makes the muscle grow. This area
          of pain divides a champion from someone who is not a champion.
        </Text>
        <Text style={styles.WelcomeTextAuthor}>-Arnold Schwarzenegger-</Text>
      </View>
      <View style={styles.butttonContainer}>
        <DailyFitButton buttonName={'Get Started'} onPress={onBoard} />
      </View>
    </SafeAreaView>
  );
}

export default Welcome;
