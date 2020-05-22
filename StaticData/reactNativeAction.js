import React from 'react';
import PushNotificationAndroid from 'react-native-push-notification';
import {DeviceEventEmitter} from 'react-native';

(function({navigation}) {
  // Register all the valid actions for notifications here and add the action handler for each action
  PushNotificationAndroid.registerNotificationActions(['Yeah', 'Pass']);
  DeviceEventEmitter.addListener('notificationActionReceived', function(
    action,
  ) {
    console.log('Notification action received: ' + action);
    const info = JSON.parse(action.dataJSON);
    if (info.action == 'Yeah') {
      navigation.navigate('Browse')
    } else if (info.action == 'Reject') {
      // Do work pertaining to Reject action here
    }
    // Add all the required actions handlers
  });
})();
