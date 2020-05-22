import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

function BrowseCard({
  cardTitle,
  iconName,
  onPress,
  backgroundColor,
  textColor,
}) {
  const styles = StyleSheet.create({
    browseCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 50,
      width: width * 0.85,
      borderRadius: 12,
      paddingLeft: 15,
    },
    qusCardTextTitle: {
      fontFamily: 'SFUIDisplay-Medium',
      fontSize: 18,
      fontWeight: '900',
      textAlign: 'center',
      color: textColor,
      marginLeft: 10,
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
      <View style={styles.browseCard} backgroundColor={backgroundColor}>
        <Icon name={iconName} />
        <Text style={styles.qusCardTextTitle} color={textColor}>
          {cardTitle}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default BrowseCard;
