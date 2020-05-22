import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from '@react-native-community/picker';

import styles from './styles';
import TopBar from '../Components/TopBar/TopBar';

function Notifications({navigation}) {
  const [notifications, setNotifications] = React.useState([]);
  React.useEffect(state => {
    PushNotification.getDeliveredNotifications(notification => {
      setNotifications(notification);
    });
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.statCardTopBar}>
        <TopBar title={'Notifications'} iconSize={30} iconColor={'#b2b2b2'} />
        <View style={styles.topBarBorder} />
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.options}>
          {notifications.map((item, index) => {
            return (
              <View style={styles.optionsChild} key={`${index}`}>
                <TouchableNativeFeedback style={styles.optionsChildStyle}>
                  <Text style={styles.optionsTitle}>{item.title}</Text>
                  <Text style={styles.optionsChildText}>{item.body}</Text>
                </TouchableNativeFeedback>
                <View style={styles.optionsChildBorder} />
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Notifications;
