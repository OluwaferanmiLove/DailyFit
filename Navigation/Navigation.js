import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import {NotifierWrapper} from 'react-native-notifier';

import Welcome from '../Screens/Welcome/Welcome';
import Splash from '../Screens/Splash/Splash';
import WorkoutNow from '../Screens/WorkoutNow/WorkoutNow';
import Setup from '../Screens/Setup/Setup';
import Signup from '../Screens/Signup/Signup';
import Signin from '../Screens/Signin/Signin';
import Options from '../Screens/Options/Options';
import MyPlan from '../Screens/MyPlan/MyPlan';
import Browse from '../Screens/Browse/Browse';
import Notifications from '../Screens/Notifications/Notifications';
import Workout from '../Screens/Workout/Workout';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../Screens/MyPlan/Home';
import WorkoutCountDown from '../Screens/WorkoutCountDown/WorkoutCountDown';

import {colors} from '../StaticData/colors';
const Tab = createBottomTabNavigator();

function TabNav() {
  const darkMode = useSelector(state => state.darkMode);

  const modeBackgroundColor = darkMode
    ? colors.darkModeBackgroundColor
    : colors.lightModeBackgroundColor;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'MyPlan') {
            iconName = focused ? 'ios-fitness' : 'ios-fitness';
            size = focused ? 28 : 24;
          } else if (route.name === 'Browse') {
            iconName = focused ? 'ios-browsers' : 'ios-browsers';
            size = focused ? 28 : 24;
          } else if (route.name === 'Stats') {
            iconName = focused ? 'ios-stats' : 'ios-stats';
            size = focused ? 28 : 24;
          } else if (route.name === 'Options') {
            iconName = focused ? 'ios-options' : 'ios-options';
            size = focused ? 28 : 24;
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#00b894',
        inactiveTintColor: '#cccccc',
        style: {backgroundColor: modeBackgroundColor, paddingTop: 5},
      }}>
      <Tab.Screen name={'MyPlan'} component={MyPlan} />
      <Tab.Screen name={'Browse'} component={Browse} />
      <Tab.Screen name={'Stats'} component={Home} />
      <Tab.Screen name={'Options'} component={Options} />
    </Tab.Navigator>
  );
}

const AppStack = createStackNavigator();

function Navigation() {
  const dispatch = useDispatch();
  const appLoading = useSelector(state => state.appLoading);
  const onBoarded = useSelector(state => state.onBoarded);
  const setuped = useSelector(state => state.setuped);
  React.useEffect(() => {
    const getOnboarded = async () => {
      try {
        const onBoarded = await AsyncStorage.getItem('onBoarded');
        if (onBoarded !== null) {
          dispatch({type: 'ONBOARD', payload: true});
        } else {
          dispatch({type: 'ONBOARD', payload: false});
        }
      } catch (e) {
        dispatch({type: 'ONBOARD', payload: e.message});
      }
    };

    const getSetuped = async () => {
      try {
        const setUped = await AsyncStorage.getItem('setuped');
        if (setUped !== null) {
          dispatch({type: 'SETUPED', payload: true});
        }
      } catch (e) {
        dispatch({type: 'SETUPED', payload: e.message});
      }
    };

    const getSetup = async () => {
      try {
        let goal = await AsyncStorage.getItem('goal');
        let workoutLevel = await AsyncStorage.getItem('level');
        let workoutAge = await AsyncStorage.getItem('age');
        let workoutGender = await AsyncStorage.getItem('gender');
        let workoutTime = await AsyncStorage.getItem('time');

        if (
          goal !== null &&
          workoutLevel !== null &&
          workoutAge !== null &&
          workoutTime !== null
        ) {
          goal = JSON.parse(goal);
          workoutTime = JSON.parse(workoutTime);
          dispatch({
            type: 'SETUP',
            payload: {
              goal: goal,
              level: workoutLevel,
              age: workoutAge,
              gender: workoutGender,
              time: workoutTime,
            },
          });
        }
      } catch (e) {
        // error reading value
      }
      dispatch({type: 'APPLOADING'});
    };

    getSetup();
    getSetuped();
    getOnboarded();
  }, []);

  return appLoading === true ? (
    <Splash />
  ) : (
    <NotifierWrapper>
      <NavigationContainer>
        <AppStack.Navigator headerMode={'none'}>
          {onBoarded === false ? (
            <AppStack.Screen name={'Welcome'} component={Welcome} />
          ) : (
            <>
              {setuped === false ? (
                <AppStack.Screen name={'Setup'} component={Setup} />
              ) : (
                <>
                  <AppStack.Screen name={'HomeApp'} component={TabNav} />
                  <AppStack.Screen
                    name={'Notifications'}
                    component={Notifications}
                  />
                  <AppStack.Screen name={'Workout'} component={Workout} />
                  <AppStack.Screen name={'Signup'} component={Signup} />
                  <AppStack.Screen name={'Signin'} component={Signin} />
                  <AppStack.Screen name={'WorkoutNow'} component={WorkoutNow} />
                  <AppStack.Screen
                    name={'WorkoutCountDown'}
                    component={WorkoutCountDown}
                  />
                </>
              )}
            </>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </NotifierWrapper>
  );
}

export default Navigation;
