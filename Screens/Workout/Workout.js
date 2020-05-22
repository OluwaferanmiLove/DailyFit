import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import store from '../../Redux/Store';
import {loseWeightBeginner} from '../../StaticData/StaticData.js';
import {loseWeightIntermidiate} from '../../StaticData/StaticData.js';
import {loseWeightAdvanced} from '../../StaticData/StaticData.js';
import styles from './styles';
import {loseWeight} from '../../StaticData/StaticData.js';
import BrowseCard from '../Components/Card/BrowseCard';
import WorkoutCard from '../Components/Card/WorkoutCard';

function Workout({navigation}) {
  const [workout, setWorkout] = React.useState(null);
  const dispatch = useDispatch();
  const workoutNowGoal = useSelector(state => state.workoutNowGoal);
  const workoutNowLevel = useSelector(state => state.workoutNowLevel);
  const workoutNowTime = useSelector(state => state.workoutNowTime);

  const handleWorkoutNow = () => {
    navigation.navigate('WorkoutNow');
  };

  let day = 3;
  React.useEffect(() => {
    let time = Math.floor(Math.random() * (60 - 35)) + 35;
    let step = Math.floor(time % 10);
    setWorkout(workoutNowGoal + workoutNowLevel);
    console.warn(store.getState(), workoutNowTime, time, step, workout);
  }, []);

  return (
    // <View>
    //   {workoutNowGoal === 'loseWeight' ? (
    //     <>
    //       {workoutNowLevel === 'Advanced' ? (
    //         <>
    //           <View>
    //             <Text style={{fontSize: 18}}>
    //               {loseWeightAdvanced[day - 1].day}
    //             </Text>
    //             <Text style={{fontSize: 18}}>
    //               <Text>{loseWeightAdvanced[day - 1].routine}</Text>
    //             </Text>
    //           </View>
    //         </>
    //       ) : (
    //         <>
    //           <View />
    //         </>
    //       )}
    //     </>
    //   ) : (
    //     <>
    //       <View />
    //     </>
    //   )}
    // </View>

    <SafeAreaView style={styles.main}>
      <View style={styles.statCardTopBar}>
        <Text style={styles.topBarText}>Workout</Text>
        <View style={styles.topBarBorder} />
      </View>
      <ScrollView style={styles.optionContainer}>
        <View style={styles.optionContainerStyle}>
          <View style={styles.options}>
            {workoutNowGoal === 'loseWeight' ? (
              <>
                <>
                  {workoutNowLevel === 'Beginner' ? (
                    <>
                      <View>
                        <Text style={{fontSize: 18, fontFamily: 'SFUIDisplay-Bold',}}>
                          {loseWeightBeginner[day - 1].day}
                        </Text>
                        <Text style={{fontSize: 18, fontFamily: 'SFUIDisplay-Bold',}}>
                          <Text>{loseWeightBeginner[day - 1].routine}</Text>
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View />
                    </>
                  )}
                </>
                <>
                  {workoutNowLevel === 'Intermidiate' ? (
                    <>
                      <View>
                        <Text style={{fontSize: 18, fontFamily: 'SFUIDisplay-Bold',}}>
                          {loseWeightIntermidiate[day - 1].day}
                        </Text>
                        <Text style={{fontSize: 18, fontFamily: 'SFUIDisplay-Bold',}}>
                          <Text>{loseWeightIntermidiate[day - 1].routine}</Text>
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View />
                    </>
                  )}
                </>
                {workoutNowLevel === 'Advanced' ? (
                  <>
                    {loseWeightAdvanced[day - 1].routine.map((item, index) => {
                      return (
                        <View>
                          <Text key={`${index}`} style={{fontSize: 18, fontFamily: 'SFUIDisplay-Bold',}}>
                            Workout - {item}
                          </Text>
                        </View>
                      );
                    })}

                    <View>
                      <Text style={{fontSize: 18, fontFamily: 'SFUIDisplay-Bold',}}>
                        <Text>{loseWeightAdvanced[day - 1].routine}</Text>
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View />
                  </>
                )}
              </>
            ) : (
              <>
                <View />
              </>
            )}
            <View style={styles.optionsChild}>
              <WorkoutCard
                cardTitle={'5 AM'}
                iconName={'arrow-back'}
                backgroundColor={'#d6303160'}
                onPress={handleWorkoutNow}
              />
            </View>
            <View style={styles.optionsChild}>
              <WorkoutCard
                cardTitle={'10 AM'}
                iconName={'arrow-back'}
                backgroundColor={'#d6303160'}
              />
            </View>
            <View style={styles.optionsChild}>
              <WorkoutCard
                cardTitle={'10 AM'}
                iconName={'arrow-back'}
                backgroundColor={'#d6303160'}
              />
            </View>
            <View style={styles.optionsChild}>
              <WorkoutCard
                cardTitle={'10 AM'}
                iconName={'arrow-back'}
                backgroundColor={'#d6303160'}
              />
            </View>
            <View style={styles.optionsChild}>
              <WorkoutCard
                cardTitle={'10 AM'}
                iconName={'arrow-back'}
                backgroundColor={'#d6303160'}
              />
            </View>
            <View style={styles.optionsChild}>
              <WorkoutCard
                cardTitle={'10 AM'}
                iconName={'arrow-back'}
                backgroundColor={'#d6303160'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Workout;
