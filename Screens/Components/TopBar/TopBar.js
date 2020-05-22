import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

function TopBar({
  leftText,
  onPressLeftText,
  rightText,
  onPressRightText,
  iconSize,
  iconColor,
  title,
  showDate = true,
}) {
  const darkMode = useSelector(state => state.darkMode);

  const date = new Date();
  let month;
  switch (date.getMonth()) {
    case 0:
      month = 'JAN';
      break;
    case 1:
      month = 'FEB';
      break;
    case 2:
      month = 'MAR';
      break;
    case 3:
      month = 'APR';
      break;
    case 4:
      month = 'MAY';
      break;
    case 5:
      month = 'JUN';
      break;
    case 6:
      month = 'JUL';
      break;
    case 7:
      month = 'AUG';
      break;
    case 8:
      month = 'SEP';
      break;
    case 9:
      month = 'OCT';
      break;
    case 10:
      month = 'NOV';
      break;
    case 11:
      month = 'DEC';
  }

  return (
    <View style={styles.topBarMain}>
      <TouchableWithoutFeedback onPress={onPressLeftText}>
        <Icon name={leftText} size={iconSize} color={iconColor} />
      </TouchableWithoutFeedback>
      <View style={styles.setupNav}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.sub}>
          {showDate ? (
            <Text style={[styles.subText, {color: darkMode ? '#b2b2b2' : '#585858'}]}>
              {date.getDate()} {month} {date.getFullYear()}
            </Text>
          ) : (
            <View />
          )}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onPressRightText} style={styles.icon}>
        <Icon name={rightText} size={iconSize} color={iconColor} />
      </TouchableWithoutFeedback>
    </View>
  );
}

export default TopBar;
