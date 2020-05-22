import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

function AgeCard({cardTitle, cardDes, onPress, backgroundColor, textColor}) {
  const styles = StyleSheet.create({
    qusCard: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 105,
      width: width * 0.36,
      borderRadius: 10,
      marginHorizontal: 20,
    },
    qusCardTextTitle: {
      fontFamily: 'SFUIDisplay-Bold',
      fontSize: 20,
      textAlign: 'center',
      color: textColor,
    },
    qusCardTextDescription: {
      fontFamily: 'SFUIDisplay-Bold',
      fontSize: 12,
      color: textColor,
      textAlign: 'center',
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.qusCard} backgroundColor={backgroundColor}>
        <Text style={styles.qusCardTextTitle} color={textColor}>
          {cardTitle}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AgeCard;
