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
import styles from './styles';
import DailyFitButton from '../Components/DailyFitButton/DailyFitButton';
import TopBar from '../Components/TopBar/TopBar';
import Question from '../Components/Question/Question';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

function Signin({navigation}) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [textFocus, setTextFocus] = React.useState(null);

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSignup = () => {
    if (email === null && password === null) {
      console.warn('input not complet');
    } else {
      console.warn(email, password);
    }
  };

  React.useEffect(state => {
    emailRef.current.focus();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.imageContainer}>
        <Image source={require('../../asset/image.png')} style={styles.image} />
        <View style={styles.imageOverlay} />
        <Image
          source={require('../../asset/splashLogo3.png')}
          style={styles.imageLogo}
        />
      </View>
      <TopBar
        leftText={'ios-arrow-back'}
        iconSize={30}
        rightText={'x'}
        onPressLeftText={() => navigation.goback()}
        showDate={false}
      />
      <KeyboardAvoidingView style={styles.signupContainer}>
        <Question
          question={'Signin'}
          descriptionLnOne={'Enter your Details to'}
          descriptionLnTwo={'signin'}
        />
        <View  style={styles.inputContainer}>
          <TextInput
            ref={emailRef}
            style={styles.inputBar}
            placeholder={'email'}
            onSubmitEditing={() => passwordRef.current.focus()}
            onFocus={() => setTextFocus('emailRef')}
            blurOnSubmit={false}
            borderColor={textFocus === 'emailRef' ? '#00b894' : '#494949'}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            ref={passwordRef}
            style={styles.inputBar}
            placeholder={'passsword'}
            onSubmitEditing={() => Keyboard.dismiss()}
            onFocus={() => setTextFocus('passwordRef')}
            blurOnSubmit={false}
            borderColor={textFocus === 'passwordRef' ? '#00b894' : '#494949'}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttton}>
          <Text style={styles.butttonQuestion}>Forgot Password? </Text>
          <TouchableWithoutFeedback>
            <Text style={styles.butttonOption}>Reset Now</Text>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.butttonContainer}>
        <DailyFitButton buttonName={'Next'} onPress={handleSignup} />
        <View style={styles.buttton}>
          <Text style={styles.butttonQuestion}>Don't have an account? </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.butttonOption}>Signup</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Signin;
