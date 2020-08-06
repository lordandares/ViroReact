import { Alert, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { UrbanAirship /* , UACustomEvent */ } from 'urbanairship-react-native';

export const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    // We've the permission
    this.notificationListener = firebase.notifications().onNotification(async notification => {
      const channelId = new firebase.notifications.Android.Channel(
        '0',
        'riyadhseasons',
        firebase.notifications.Android.Importance.Max
      );

      firebase.notifications().android.createChannel(channelId);

      const notificationToBeDisplayed = createNotification({
        data: notification._android._notification._data,
        title: notification.title,
        body: notification.body,
      });

      if (Platform.OS === 'android') {
        notificationToBeDisplayed.android
          .setPriority(firebase.notifications.Android.Priority.Max)
          .android.setChannelId('0')
          .android.setVibrate(1000);
      }

      await firebase.notifications().displayNotification(notificationToBeDisplayed);
    });
  } else {
    // user doesn't have permission
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      Alert.alert(
        'Unable to access the Notification permission. Please enable the Notification Permission from the settings'
      );
    }
  }
};

export const createNotificationChannel = () => {
  // Build a android notification channel
  const channel = new firebase.notifications.Android.Channel(
    'localNotifications', // channelId
    'Local notifications', // channel name
    firebase.notifications.Android.Importance.Max
  ).setDescription('Used for getting reminder notification'); // channel description
  // Create the android notification channel
  firebase.notifications().android.createChannel(channel);
};

export const getNotificationsToken = () => {
  firebase
    .messaging()
    .getToken()
    .then(fcmToken => {
      if (fcmToken) {
        // eslint-disable-next-line
      } else {
        // eslint-disable-next-line
        console.warn('error getting token');
      }
    });

  UrbanAirship.addListener('register', event => {
    // eslint-disable-next-line
    console.log('Channel registration updated: ', event.channelId);
    // eslint-disable-next-line
    console.log('Registration token: ', event.registrationToken);
  });
  /* UrbanAirship.getTags().then(tags => {
    console.log('Tags: ', tags);
  });

  UrbanAirship.getChannelId().then(channelId => {
    // this.setState({ channelId: channelId });
    console.log('getChannel', channelId);
    if (channelId === 'e3d251da-839a-4854-b5be-74587e0e8635') {
      UrbanAirship.addTag('sports');
      UrbanAirship.addTag('cine');
    } else UrbanAirship.addTag('cine');
  }); */
  /*
  UrbanAirship.isUserNotificationsEnabled().then(enabled => {
    // this.setState({ notificationsEnabled: enabled });
    console.log('isUserNotificationsEnabled', enabled);
  });

  UrbanAirship.isLocationEnabled().then(enabled => {
    // this.setState({ locationEnabled: enabled });
    console.log('isLocationEnabled', enabled);
  });

  UrbanAirship.addListener('notificationResponse', response => {
    console.log('notificationResponse:', JSON.stringify(response));
  });

  UrbanAirship.addListener('pushReceived', notification => {
    console.log('pushReceived:', JSON.stringify(notification));
    // alert('pushReceived: ' + notification.alert);
  });

  UrbanAirship.addListener('deepLink', event => {
    console.log('deepLink:', JSON.stringify(event));
    // alert('deepLink: ' + event.deepLink);
  });
 */
  // UrbanAirship.addListener('registration', event => {
  //   console.log('registration:', JSON.stringify(event));
  //   // this.state.channelId = event.channelId;
  //   // this.setState(this.state);
  // });
  // UrbanAirship.addListener('notificationOptInStatus', event => {
  //   console.log('notificationOptInStatus:', JSON.stringify(event));
  // });
};

export const addTag = tag => UrbanAirship.addTag(tag);
export const removeTag = tag => UrbanAirship.removeTag(tag);
export const getTags = () => UrbanAirship.getTags();

export const enableNotifications = value => {
  UrbanAirship.setUserNotificationsEnabled(value);
};

export const scheduleLocalNotification = (message, title, notificationTime) => {
  // eslint-disable-next-line
  firebase
    .notifications()
    .scheduleNotification(createLocalNotification(message, title), {
      fireDate: notificationTime.valueOf(),
      // repeatInterval: 'day',
      exact: true,
    })
    .then(() => {
      // eslint-disable-next-line
      console.warn('Notification scheduled');
    });
};

const createNotification = ({ data, title, body }) =>
  new firebase.notifications.Notification({
    data, // notification._android._notification._data,
    sound: 'default',
    show_in_foreground: true,
    title, // : notification.title,
    body, // : notification.body,
  });

const createLocalNotification = (message, title) => {
  const notification = new firebase.notifications.Notification({ show_in_foreground: true })
    .setNotificationId('0') // Any random ID
    .setTitle(title)
    .setBody(message)
    .android.setPriority(firebase.notifications.Android.Priority.Max) // set priority in Android
    .android.setChannelId('localNotifications')
    .android.setAutoCancel(true);
  return notification;
};
