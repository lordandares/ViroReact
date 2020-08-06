// import firebase from 'react-native-firebase';
import moment from 'moment';
import { scheduleLocalNotification } from './pushNotificationsUtils';

export default async message => {
  // handle your message

  // console.log('BACKGROUND MESSAGE', message);
  const msg = message.data['com.urbanairship.push.ALERT'];
  scheduleLocalNotification(msg, 'Riyadh Seassons', moment());

  return Promise.resolve();
};
