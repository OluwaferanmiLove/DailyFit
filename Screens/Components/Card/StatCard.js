import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

function StatCard({
  cardTitle,
  statFigOne,
  statFigOneDes,
  statFigTwo,
  statFigTwoDes,
  statFigThree,
  statFigThreeDes,
  onPress,
  backgroundColor,
  textColor,
}) {
  const darkMode = useSelector(state => state.darkMode);
  const styles = StyleSheet.create({
    qusCard: {
      alignItems: 'center',
      justifyContent: 'center',
      height: height * 0.13,
      width: width * 0.75,
      borderRadius: 10,
      marginVertical: 20,
    },
    qusCardTextTitle: {
      fontFamily: 'SFUIDisplay-Bold',
      fontSize: 20,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: textColor,
      marginBottom: 4,
    },
    stats: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    statsContents: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    statFigure: {
      fontFamily: 'SFUIDisplay-Bold',
      fontSize: 30,
      fontWeight: 'bold',
      color: darkMode ? '#b2b2b2' : '#00b894',
    },
    qusCardTextDescription: {
      fontFamily: 'SFUIDisplay-Light',
      fontSize: 12,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.qusCard} backgroundColor={backgroundColor}>
        <Text style={styles.qusCardTextTitle} color={textColor}>
          {cardTitle}
        </Text>
        <View style={styles.stats}>
          <View style={styles.statsContents}>
            <Text style={styles.statFigure} color={textColor}>
              {statFigOne}
            </Text>
            <Text style={styles.qusCardTextDescription} color={textColor}>
              {statFigOneDes}
            </Text>
          </View>
          <View style={styles.statsContents}>
            <Text style={styles.statFigure} color={textColor}>
              {statFigTwo}
            </Text>
            <Text style={styles.qusCardTextDescription} color={textColor}>
              {statFigTwoDes}
            </Text>
          </View>
          {/* <View style={styles.statsContents}>
            <Text style={styles.statFigure} color={textColor}>
              {statFigThree}
            </Text>
            <Text style={styles.qusCardTextDescription} color={textColor}>
              {statFigThreeDes}
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default StatCard;
