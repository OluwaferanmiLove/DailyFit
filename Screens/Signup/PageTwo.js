import React from 'react';
import {Text, View, SafeAreaView, Image, TextInput} from 'react-native';
import styles from './styles';
import DailyFitButton from '../Components/DailyFitButton/DailyFitButton';
import TopBar from '../Components/TopBar/TopBar';
import Question from '../Components/Question/Question';
import PlanCard from '../Components/Card/PlanCard';

function Signup({navigation}) {
  const [plan, setPlan] = React.useState(null);

  const handleSetup = () => {};

  React.useEffect(state => {}, []);

  return (
    <View>
      <View style={styles.signupContainer}>
        <Question
          question={'Signup'}
          descriptionLnOne={'Choose your workout plan'}
          descriptionLnTwo={'You can choose to do this later'}
        />
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputBar} placeholder={'email'} />
          <TextInput style={styles.inputBar} placeholder={'passsword'} />
        </View>
      </View>
      <View style={styles.butttonContainer}>
        <DailyFitButton buttonName={'Next'} onPress={handleSetup} />
        <Text>Dont have an account? Signup</Text>
      </View>
    </View>
  );
}

export default Signup;
