import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Question from '../../Components/Question/Question';
import Card from '../../Components/Card/Card';

const SetupContext = React.createContext();

function PageOne() {
  const [loseWeight, setLoseWeight] = React.useState(false);
  const [buildMuscles, setBuildMuscles] = React.useState(false);
  const [keepFit, setKeepFit] = React.useState(false);

  const handleLoseWeight = () => {
    loseWeight === false ? setLoseWeight(true) : setLoseWeight(false);
  };

  const handleBuildMuscles = () => {
    buildMuscles === false ? setBuildMuscles(true) : setBuildMuscles(false);
  };

  const handleKeepFit = () => {
    keepFit === false ? setKeepFit(true) : setKeepFit(false);
  };

  return (
    <SetupContext.Provider value={(loseWeight, buildMuscles, keepFit)}>
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
            onPress={handleLoseWeight}
          />
          <Card
            cardTitle={'Build muscles'}
            cardDes={'I just want muscles i wil like to flex'}
            backgroundColor={buildMuscles === true ? '#00b894ff' : '#e2e2e2'}
            textColor={buildMuscles === true ? '#ffffff' : '#4d4d4d'}
            onPress={handleBuildMuscles}
          />
          <Card
            cardTitle={'Keep Fit'}
            cardDes={'I just love in being in a good shape'}
            backgroundColor={keepFit === true ? '#00b894ff' : '#e2e2e2'}
            textColor={keepFit === true ? '#ffffff' : '#4d4d4d'}
            onPress={handleKeepFit}
          />
        </View>
      </View>
    </SetupContext.Provider>
  );
}

export default PageOne;
