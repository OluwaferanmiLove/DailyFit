import React from 'react';
import {Text} from 'react-native';
import styles from './styles';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

function DailyFitButton({buttonName, onPress, disabled}) {
  return (
    <TouchableNativeFeedback
      style={styles.dailyfitbutton}
      onPress={onPress}
      disabled={disabled}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#b20000ff', '#d30000', '#fd0000']}
        style={styles.dailyfitbuttongradient}>
        <Text style={styles.dailyfitbuttonText}>{buttonName}</Text>
      </LinearGradient>
    </TouchableNativeFeedback>
  );
}

export default DailyFitButton;
