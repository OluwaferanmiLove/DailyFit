import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function Card({cardTitle, cardDes, onPress, backgroundColor, textColor}) {
  const styles = StyleSheet.create({
    qusCard: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 95,
      width: width * 0.8,
      borderRadius: 10,
      marginVertical: 20,
    },
    qusCardTextTitle: {
      fontFamily: 'SFUIDisplay-Bold',
      fontSize: 20,
      textTransform: 'uppercase',
      color: textColor,
      marginBottom: 4,
    },
    qusCardTextDescription: {
      fontFamily: 'SFUIDisplay-Light',
      fontSize: 12,
      color: textColor,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.qusCard} backgroundColor={backgroundColor}>
        <Text style={styles.qusCardTextTitle} color={textColor}>
          {cardTitle}
        </Text>
        <Text style={styles.qusCardTextDescription} color={textColor}>
          {cardDes}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Card;
