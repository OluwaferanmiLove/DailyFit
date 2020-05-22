import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styles from './styles';
import DailyFitButton from '../Components/DailyFitButton/DailyFitButton';

function SignInToShow({navigation, screen, onPress, action}) {
  return (
    <SafeAreaView style={styles.main}>
      <Image style={styles.image} source={require('../../asset/signin.png')} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Signin To View {screen}</Text>
      </View>
      <View style={styles.buttton}>
        <TouchableWithoutFeedback onPress={onPress}>
          <Text style={styles.butttonOption}>{action}</Text>
        </TouchableWithoutFeedback>
          {/* <DailyFitButton
            buttonName={'Signin'}
            onPress={() => navigation.navigate('Signin')}
          /> */}
      </View>
    </SafeAreaView>
  );
}

export default SignInToShow;
