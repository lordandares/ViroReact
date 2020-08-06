import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { isIOS } from './platformUtils';

export const getCurrentPosition = () =>
  new Promise(async (resolve, reject) => {
    if (!isIOS) {
      try {
        const permissionResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (permissionResult !== PermissionsAndroid.RESULTS.GRANTED) {
          return reject(Error('Location permission denied.'));
        }
      } catch (error) {
        return reject(error);
      }
    }

    Geolocation.getCurrentPosition(
      position => {
        if (position && position.coords && position.coords.latitude && position.coords.longitude) {
          return resolve(position.coords);
        }
        return reject(Error('No valid location data.'));
      },
      error => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  });

const degreesToRadians = degrees => (degrees * Math.PI) / 180;

const EARTH_RADIUS_MILES = 3958.8;

export const distanceInMilesBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const radiansLat1 = degreesToRadians(lat1);
  const radiansLat2 = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radiansLat1) * Math.cos(radiansLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_MILES * c;
};
