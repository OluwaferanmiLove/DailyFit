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
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import DailyFitButton from '../Components/DailyFitButton/DailyFitButton';
import TopBar from '../Components/TopBar/TopBar';
import Question from '../Components/Question/Question';
import PlanCard from '../Components/Card/PlanCard';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import TopCard from '../Components/Card/TopCard';

function Signup({navigation}) {
  const [plan, setPlan] = React.useState('monthly');
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [textFocus, setTextFocus] = React.useState(null);

  const workoutLevel = useSelector(state => state.workoutLevel);
  const dispatch = useDispatch();

  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordAgainRef = React.useRef();

  const handlePlanMonthly = () => {
    setPlan('monthly');
  };

  const handlePlanYearly = () => {
    setPlan('yearly');
  };

  const handleSignup = () => {
    if (name === null && email === null && password === null) {
      console.warn('input not complet');
    } else {
      console.warn(name, email, password);
    }
  };

  React.useEffect(state => {
    nameRef.current.focus();
    console.warn({workoutLevel});
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
      <View style={styles.signupContainer}>
        <Question
          question={'Signup'}
          descriptionLnOne={'Choose your workout plan'}
          descriptionLnTwo={'You can choose to do this later'}
        />
        <View style={styles.planCard}>
          <TopCard
            cardTitle={'$3.99 every five month'}
            backgroundColor={plan === 'monthly' ? '#00b894ff' : '#e2e2e2'}
            textColor={plan === 'monthly' ? '#ffffff' : '#4d4d4d'}
            onPress={handlePlanMonthly}
          />
        </View>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <TextInput
            ref={nameRef}
            style={styles.inputBar}
            placeholder={'name'}
            onSubmitEditing={() => emailRef.current.focus()}
            onFocus={() => setTextFocus('nameRef')}
            blurOnSubmit={false}
            borderColor={textFocus === 'nameRef' ? '#00b894' : '#494949'}
            onChangeText={text => setName(text)}
          />
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
            onSubmitEditing={() => passwordAgainRef.current.focus()}
            onFocus={() => setTextFocus('passwordRef')}
            blurOnSubmit={false}
            borderColor={textFocus === 'passwordRef' ? '#00b894' : '#494949'}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <TextInput
            ref={passwordAgainRef}
            style={styles.inputBar}
            placeholder={'your password again'}
            onSubmitEditing={() => Keyboard.dismiss()}
            onFocus={() => setTextFocus('passwordAgainRef')}
            blurOnSubmit={false}
            borderColor={
              textFocus === 'passwordAgainRef' ? '#00b894' : '#494949'
            }
            secureTextEntry={true}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.butttonContainer}>
        <DailyFitButton buttonName={'Next'} onPress={handleSignup} />
        <View style={styles.buttton}>
          <Text style={styles.butttonQuestion}>Have an account? </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.butttonOption}>Signin</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Signup;
