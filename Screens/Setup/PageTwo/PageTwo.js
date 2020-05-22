import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Question from '../../Components/Question/Question';
import Card from '../../Components/Card/Card';

function PageTwo({navigation}) {
  const [level, setlevel] = React.useState(null);

  const handleLevelBeginner = () => {
    level === 'Beginner' ? setlevel(null) : setlevel('Beginner');
  };

  const handleLevelIntermidiate = () => {
    level === 'Intermidiate' ? setlevel(null) : setlevel('Intermidiate');
  };

  const handleLevelAdvanced = () => {
    level === 'Advanced' ? setlevel(null) : setlevel('Advanced');
  };

  return (
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
        />
        <Card
          cardTitle={'intermidiate'}
          cardDes={'Newbie to workout, i will be taking slow'}
          onPress={handleLevelIntermidiate}
          backgroundColor={level === 'Intermidiate' ? '#ff7675' : '#e2e2e2'}
        />
        <Card
          cardTitle={'Advanced'}
          cardDes={'Bring it on, ready to break limit and stay fit'}
          onPress={handleLevelAdvanced}
          backgroundColor={level === 'Advanced' ? '#d63031' : '#e2e2e2'}
        />
      </View>
    </View>
  );
}

export default PageTwo;
