/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import store from '../../Redux/Store';
import {loseWeightBeginner} from '../../StaticData/StaticData.js';
import {loseWeightIntermidiate} from '../../StaticData/StaticData.js';
import {loseWeightAdvanced} from '../../StaticData/StaticData.js';
import {buildMusclesBeginner} from '../../StaticData/StaticData.js';
import {buildMusclesIntermidiate} from '../../StaticData/StaticData.js';
import {buildMusclesAdvanced} from '../../StaticData/StaticData.js';
import {keepFitBeginner} from '../../StaticData/StaticData.js';
import {keepFitIntermidiate} from '../../StaticData/StaticData.js';
import {keepFitAdvanced} from '../../StaticData/StaticData.js';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import DailyFitButton from '../Components/DailyFitButton/DailyFitButton';
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import TopBar from '../Components/TopBar/TopBar';
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from '../../StaticData/colors';

function WorkoutNow({navigation}) {
  const [day, setDay] = React.useState(null);
  const [workoutIndex, setWorkoutIndex] = React.useState(0);
  const [workoutLength, setWorkoutLength] = React.useState(null);
  const [workoutData, setWorkoutData] = React.useState({});
  const [customGoal, setCustomGoal] = React.useState(null);

  const dispatch = useDispatch();

  const workoutNowGoal = useSelector(state => state.workoutNowGoal);
  const workoutNowLevel = useSelector(state => state.workoutNowLevel);
  const workoutNowTime = useSelector(state => state.workoutNowTime);
  const workoutNowIndex = useSelector(state => state.workoutNowIndex);
  const darkModeColor = useSelector(state => state.darkMode);

  const modeBackgroundColor = darkModeColor
    ? colors.darkModeBackgroundColor
    : colors.lightModeBackgroundColor;

  const handleWorkout = () => {
    navigation.navigate('WorkoutCountDown');
  };

  React.useEffect(() => {
    const getDay = async () => {
      try {
        let day = await AsyncStorage.getItem(
          `${workoutNowGoal}${workoutNowLevel}day`,
        );
        day = JSON.parse(day);
        if (day !== null) {
          setDay(day);
          if (day === 1) {
            setWorkoutIndex(0);
          } else {
            setWorkoutIndex(day);
          }
        }
      } catch (e) {
        console.warn(e.message);
      }
    };

    getDay();
    let time = Math.floor(Math.random() * (60 - 35)) + 35;
    console.warn(store.getState(), workoutNowTime, workoutLength, workoutData);
  }, [workoutData, workoutLength, workoutNowTime]);

  React.useEffect(() => {
    const getCustomGoal = async () => {
      try {
        let customGoal = await AsyncStorage.getItem('customGoal');

        if (customGoal !== null) {
          setCustomGoal(JSON.parse(customGoal));
        } else {
          setCustomGoal(null);
        }
      } catch (e) {
        // error reading value
      }
    };
    getCustomGoal();
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

    <SafeAreaView style={[styles.main, {backgroundColor: modeBackgroundColor}]}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.imageContainer}>
        <Image
          source={require('../../asset/loseWeight.png')}
          style={styles.image}
        />
        <View style={styles.imageOverlay} />
      </View>
      <TopBar
        leftText={'ios-arrow-back'}
        iconSize={30}
        iconColor={'#ffffff'}
        onPressLeftText={() => navigation.goBack()}
        showDate={false}
      />
      <View style={styles.workoutInfo}>
        <View>
          <Text style={styles.workoutInfoTitle}>Day {day}</Text>
        </View>
        <View style={styles.workoutInfoSub}>
          <View>
            <Text style={styles.workoutInfoDes}>{workoutNowGoal} Workout</Text>
          </View>
          <View style={styles.levelIndicator}>
            <View
              style={styles.levelStep}
              backgroundColor={
                workoutNowLevel === 'Beginner' ||
                workoutNowLevel === 'Intermidiate' ||
                workoutNowLevel === 'Advanced'
                  ? '#00b894ff'
                  : '#e2e2e2'
              }
            />
            <View
              style={styles.levelStep}
              backgroundColor={
                workoutNowLevel === 'Intermidiate' ||
                workoutNowLevel === 'Advanced'
                  ? '#00b894ff'
                  : '#e2e2e2'
              }
            />
            <View
              style={styles.levelStep}
              backgroundColor={
                workoutNowLevel === 'Advanced' ? '#00b894ff' : '#e2e2e2'
              }
            />
          </View>
        </View>
      </View>
      <View style={styles.signupContainer}>
        {workoutNowGoal === 'customGoal' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.workoutList}>
              {customGoal === null ? (
                <Text style={{alignItems: 'center'}}>Loading...</Text>
              ) : (
                <>
                  {customGoal[workoutNowIndex].exercise.map((item, index) => {
                    dispatch({
                      type: 'WORKOUTDATA',
                      payload: customGoal[workoutNowIndex].exercise,
                    });
                    return (
                      <>
                        {item.name !== null ? (
                          <TouchableNativeFeedback
                            style={styles.workoutListChild}
                            key={`${index}`}>
                            <Icon
                              style={styles.optionsChildIcon}
                              name={
                                item.name === 'rest'
                                  ? 'ios-body'
                                  : 'ios-fitness'
                              }
                              size={30}
                            />
                            <View style={styles.optionsChilds}>
                              <View style={styles.optionsChildTexts}>
                                <Text style={styles.optionsChildText}>
                                  {item.name}
                                </Text>
                                <Text style={styles.optionsChildTextTime}>
                                  {'   '}
                                  {item.time} Sec
                                </Text>
                              </View>
                              <View>
                                <Text>Progress will be here</Text>
                              </View>
                            </View>
                          </TouchableNativeFeedback>
                        ) : (
                          <View />
                        )}
                      </>
                    );
                  })}
                </>
              )}
            </View>
          </ScrollView>
        ) : null}
        {workoutNowGoal === 'loseWeight' ? (
          <>
            <>
              {workoutNowLevel === 'Beginner' ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.workoutList}>
                    {loseWeightBeginner[workoutIndex].routine.map(
                      (item, index) => {
                        dispatch({
                          type: 'WORKOUTDATA',
                          payload: loseWeightBeginner[workoutIndex].routine,
                        });
                        return (
                          <TouchableNativeFeedback
                            style={styles.workoutListChild}
                            key={`${index}`}>
                            <Icon
                              style={styles.optionsChildIcon}
                              name={
                                item.name === 'rest'
                                  ? 'ios-body'
                                  : 'ios-fitness'
                              }
                              size={30}
                            />
                            <View style={styles.optionsChilds}>
                              <View style={styles.optionsChildTexts}>
                                <Text style={styles.optionsChildText}>
                                  {item.name}
                                </Text>
                                <Text style={styles.optionsChildTextTime}>
                                  {'   '}
                                  {item.time} Sec
                                </Text>
                              </View>
                              <View>
                                <Text>Progress will be here</Text>
                              </View>
                            </View>
                          </TouchableNativeFeedback>
                        );
                      },
                    )}
                  </View>
                </ScrollView>
              ) : (
                <>
                  <View />
                </>
              )}
            </>
            <>
              {workoutNowLevel === 'Intermidiate' ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.workoutList}>
                    {loseWeightIntermidiate[workoutIndex].routine.map(
                      (item, index) => {
                        dispatch({
                          type: 'WORKOUTDATA',
                          payload: loseWeightIntermidiate[workoutIndex].routine,
                        });
                        return (
                          <TouchableNativeFeedback
                            style={styles.workoutListChild}
                            key={`${index}`}>
                            <Icon
                              style={styles.optionsChildIcon}
                              name={
                                item.name === 'rest'
                                  ? 'ios-body'
                                  : 'ios-fitness'
                              }
                              size={30}
                            />
                            <View style={styles.optionsChilds}>
                              <View style={styles.optionsChildTexts}>
                                <Text style={styles.optionsChildText}>
                                  {item.name}
                                </Text>
                                <Text style={styles.optionsChildTextTime}>
                                  {'   '}
                                  {item.time} Sec
                                </Text>
                              </View>
                              <View>
                                <Text>Progress will be here</Text>
                              </View>
                            </View>
                          </TouchableNativeFeedback>
                        );
                      },
                    )}
                  </View>
                </ScrollView>
              ) : (
                <>
                  <View />
                </>
              )}
            </>
            {workoutNowLevel === 'Advanced' ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.workoutList}>
                  {loseWeightAdvanced[workoutIndex].routine.map(
                    (item, index) => {
                      dispatch({
                        type: 'WORKOUTDATA',
                        payload: loseWeightAdvanced[workoutIndex].routine,
                      });
                      return (
                        <TouchableNativeFeedback
                          style={styles.workoutListChild}
                          key={`${index}`}>
                          <Icon
                            style={styles.optionsChildIcon}
                            name={
                              item.name === 'rest' ? 'ios-body' : 'ios-fitness'
                            }
                            size={30}
                          />
                          <View style={styles.optionsChilds}>
                            <View style={styles.optionsChildTexts}>
                              <Text style={styles.optionsChildText}>
                                {item.name}
                              </Text>
                              <Text style={styles.optionsChildTextTime}>
                                {'   '}
                                {item.time} Sec
                              </Text>
                            </View>
                            <View>
                              <Text>Progress will be here</Text>
                            </View>
                          </View>
                        </TouchableNativeFeedback>
                      );
                    },
                  )}
                </View>
              </ScrollView>
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

        {workoutNowGoal === 'buildMuscles' ? (
          <>
            <>
              {workoutNowLevel === 'Beginner' ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.workoutList}>
                    {buildMusclesBeginner[workoutIndex].routine.map(
                      (item, index) => {
                        dispatch({
                          type: 'WORKOUTDATA',
                          payload: buildMusclesBeginner[workoutIndex].routine,
                        });
                        return (
                          <TouchableNativeFeedback
                            style={styles.workoutListChild}
                            key={`${index}`}>
                            <Icon
                              style={styles.optionsChildIcon}
                              name={
                                item.name === 'rest'
                                  ? 'ios-body'
                                  : 'ios-fitness'
                              }
                              size={30}
                            />
                            <View style={styles.optionsChilds}>
                              <View style={styles.optionsChildTexts}>
                                <Text style={styles.optionsChildText}>
                                  {item.name}
                                </Text>
                                <Text style={styles.optionsChildTextTime}>
                                  {'   '}
                                  {item.time} Sec
                                </Text>
                              </View>
                              <View>
                                <Text>Progress will be here</Text>
                              </View>
                            </View>
                          </TouchableNativeFeedback>
                        );
                      },
                    )}
                  </View>
                </ScrollView>
              ) : (
                <>
                  <View />
                </>
              )}
            </>
            <>
              {workoutNowLevel === 'Intermidiate' ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.workoutList}>
                    {buildMusclesIntermidiate[workoutIndex].routine.map(
                      (item, index) => {
                        dispatch({
                          type: 'WORKOUTDATA',
                          payload:
                            buildMusclesIntermidiate[workoutIndex].routine,
                        });
                        return (
                          <TouchableNativeFeedback
                            style={styles.workoutListChild}
                            key={`${index}`}>
                            <Icon
                              style={styles.optionsChildIcon}
                              name={
                                item.name === 'rest'
                                  ? 'ios-body'
                                  : 'ios-fitness'
                              }
                              size={30}
                            />
                            <View style={styles.optionsChilds}>
                              <View style={styles.optionsChildTexts}>
                                <Text style={styles.optionsChildText}>
                                  {item.name}
                                </Text>
                                <Text style={styles.optionsChildTextTime}>
                                  {'   '}
                                  {item.time} Sec
                                </Text>
                              </View>
                              <View>
                                <Text>Progress will be here</Text>
                              </View>
                            </View>
                          </TouchableNativeFeedback>
                        );
                      },
                    )}
                  </View>
                </ScrollView>
              ) : (
                <>
                  <View />
                </>
              )}
            </>
            {workoutNowLevel === 'Advanced' ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.workoutList}>
                  {buildMusclesAdvanced[workoutIndex].routine.map(
                    (item, index) => {
                      dispatch({
                        type: 'WORKOUTDATA',
                        payload: buildMusclesAdvanced[workoutIndex].routine,
                      });
                      return (
                        <TouchableNativeFeedback
                          style={styles.workoutListChild}
                          key={`${index}`}>
                          <Icon
                            style={styles.optionsChildIcon}
                            name={
                              item.name === 'rest' ? 'ios-body' : 'ios-fitness'
                            }
                            size={30}
                          />
                          <View style={styles.optionsChilds}>
                            <View style={styles.optionsChildTexts}>
                              <Text style={styles.optionsChildText}>
                                {item.name}
                              </Text>
                              <Text style={styles.optionsChildTextTime}>
                                {'   '}
                                {item.time} Sec
                              </Text>
                            </View>
                            <View>
                              <Text>Progress will be here</Text>
                            </View>
                          </View>
                        </TouchableNativeFeedback>
                      );
                    },
                  )}
                </View>
              </ScrollView>
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

        {workoutNowGoal === 'keepFit' ? (
          <>
            <>
              {workoutNowLevel === 'Beginner' ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.workoutList}>
                    {keepFitBeginner[workoutIndex].routine.map(
                      (item, index) => {
                        dispatch({
                          type: 'WORKOUTDATA',
                          payload: keepFitBeginner[workoutIndex].routine,
                        });
                        return (
                          <TouchableNativeFeedback
                            style={styles.workoutListChild}
                            key={`${index}`}>
                            <Icon
                              style={styles.optionsChildIcon}
                              name={
                                item.name === 'rest'
                                  ? 'ios-body'
                                  : 'ios-fitness'
                              }
                              size={30}
                            />
                            <View style={styles.optionsChilds}>
                              <View style={styles.optionsChildTexts}>
                                <Text style={styles.optionsChildText}>
                                  {item.name}
                                </Text>
                                <Text style={styles.optionsChildTextTime}>
                                  {'   '}
                                  {item.time} Sec
                                </Text>
                              </View>
                              <View>
                                <Text>Progress will be here</Text>
                              </View>
                            </View>
                          </TouchableNativeFeedback>
                        );
                      },
                    )}
                  </View>
                </ScrollView>
              ) : (
                <>
                  <View />
                </>
              )}
            </>
            <>
              {workoutNowLevel === 'Intermidiate' ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.workoutList}>
                    {keepFitIntermidiate[workoutIndex].routine.map(
                      (item, index) => {
                        dispatch({
                          type: 'WORKOUTDATA',
                          payload: keepFitIntermidiate[workoutIndex].routine,
                        });
                        return (
                          <TouchableNativeFeedback
                            style={styles.workoutListChild}
                            key={`${index}`}>
                            <Icon
                              style={styles.optionsChildIcon}
                              name={
                                item.name === 'rest'
                                  ? 'ios-body'
                                  : 'ios-fitness'
                              }
                              size={30}
                            />
                            <View style={styles.optionsChilds}>
                              <View style={styles.optionsChildTexts}>
                                <Text style={styles.optionsChildText}>
                                  {item.name}
                                </Text>
                                <Text style={styles.optionsChildTextTime}>
                                  {'   '}
                                  {item.time} Sec
                                </Text>
                              </View>
                              <View>
                                <Text>Progress will be here</Text>
                              </View>
                            </View>
                          </TouchableNativeFeedback>
                        );
                      },
                    )}
                  </View>
                </ScrollView>
              ) : (
                <>
                  <View />
                </>
              )}
            </>
            {workoutNowLevel === 'Advanced' ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.workoutList}>
                  {keepFitAdvanced[workoutIndex].routine.map((item, index) => {
                    dispatch({
                      type: 'WORKOUTDATA',
                      payload: keepFitAdvanced[workoutIndex].routine,
                    });
                    return (
                      <TouchableNativeFeedback
                        style={styles.workoutListChild}
                        key={`${index}`}>
                        <Icon
                          style={styles.optionsChildIcon}
                          name={
                            item.name === 'rest' ? 'ios-body' : 'ios-fitness'
                          }
                          size={30}
                        />
                        <View style={styles.optionsChilds}>
                          <View style={styles.optionsChildTexts}>
                            <Text style={styles.optionsChildText}>
                              {item.name}
                            </Text>
                            <Text style={styles.optionsChildTextTime}>
                              {'   '}
                              {item.time} Sec
                            </Text>
                          </View>
                          <View>
                            <Text>Progress will be here</Text>
                          </View>
                        </View>
                      </TouchableNativeFeedback>
                    );
                  })}
                </View>
              </ScrollView>
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
      </View>
      <View style={styles.butttonContainer}>
        <DailyFitButton buttonName={'Start'} onPress={handleWorkout} />
      </View>
    </SafeAreaView>
  );
}

export default WorkoutNow;
