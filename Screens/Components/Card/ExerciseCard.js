import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

function ExerciseCard({
  cardTitle,
  exerciseLevel,
  onPress,
  backgroundColor,
  textColor,
  imageSource,
  level,
  exerciseMin,
}) {
  const styles = StyleSheet.create({
    qusCard: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: height * 0.18,
      width: width * 0.89,
      borderRadius: 10,
      marginVertical: 10,
      overflow: 'hidden',
    },
    imageSource: {
      position: 'absolute',
      height: height * 0.22,
      width: width * 0.9,
      marginVertical: 15,
      resizeMode: 'cover',
    },
    imageOverlay: {
      position: 'absolute',
      height: height * 0.18,
      width: width * 0.9,
      marginVertical: 10,
      backgroundColor: '#000000b2',
    },
    qusCardTextTitle: {
      fontFamily: 'SFUIDisplay-Bold',
      alignSelf: 'flex-start',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
      marginTop: 150 / 2,
      marginBottom: 4,
      marginLeft: 20,
    },
    exerciseDetails: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    exerciseDetailsContents: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginLeft: 20,
      marginRight: 20,
    },
    levelIndicator: {
      flex: 1,
      flexDirection: 'row',
      marginLeft: 10,
      marginTop: 5,
    },
    levelStep: {
      backgroundColor: '#00b894',
      height: 10,
      width: 10,
      borderRadius: 5,
      marginHorizontal: 3,
    },
    statFigure: {
      fontFamily: 'SFUIDisplay-Bold',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ffffff',
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.qusCard} backgroundColor={backgroundColor}>
        <Image style={styles.imageSource} source={imageSource} />
        <View style={styles.imageOverlay} />
        <Text style={styles.qusCardTextTitle} color={textColor}>
          {cardTitle}
        </Text>
        <View style={styles.exerciseDetails}>
          <View style={styles.exerciseDetailsContents}>
            <Text style={styles.statFigure} color={textColor}>
              {exerciseLevel}
            </Text>
            <View style={styles.levelIndicator}>
              <View
                style={styles.levelStep}
                backgroundColor={
                  level === 'Beginner' ||
                  level === 'Intermidiate' ||
                  level === 'Advanced'
                    ? '#00b894ff'
                    : '#e2e2e2'
                }
              />
              <View
                style={styles.levelStep}
                backgroundColor={
                  level === 'Intermidiate' || level === 'Advanced'
                    ? '#00b894ff'
                    : '#e2e2e2'
                }
              />
              <View
                style={styles.levelStep}
                backgroundColor={level === 'Advanced' ? '#00b894ff' : '#e2e2e2'}
              />
            </View>
            <Text style={styles.statFigure} color={textColor}>
              {exerciseMin}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ExerciseCard;
