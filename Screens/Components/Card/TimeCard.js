import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function TimeCard({cardTitle, cardDes, onPress, backgroundColor, textColor}) {
  const styles = StyleSheet.create({
    qusCard: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 70,
      width: width * 0.22,
      borderRadius: 7,
      marginHorizontal: 15,
    },
    qusCardTextTitle: {
      fontFamily: 'SFUIDisplay-Bold',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: textColor,
    },
    qusCardTextDescription: {
      fontFamily: 'SFUIDisplay-Light',
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

export default TimeCard;
