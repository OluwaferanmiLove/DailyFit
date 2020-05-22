import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

function Question({question, descriptionLnOne, descriptionLnTwo}) {
  return (
    <View style={styles.topQusContainer}>
      <Text style={styles.topQus}>{question}</Text>
      <Text style={styles.topQusDescription}>{descriptionLnOne}</Text>
      <Text style={styles.topQusDescription}>{descriptionLnTwo}</Text>
    </View>
  );
}

export default Question;
