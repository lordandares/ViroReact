import { Navigation, Alert } from 'react-native-navigation';
import React from 'react';
import { Platform, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { createPages } from './src/navigation/navigator';
import App from './src/App';
import { store, persistor /* , storeCreator */ } from './src/store';
// import { initLocaleWithDefaultLanguage } from './src/utils/Translator';
import backgroundMessaging from './src/utils/backgroundMessaging';

const exceptionhandler = (error, isFatal) => {
  // TODO: Track JS exception
  if (isFatal) {
    Alert.alert('JS exception', 'Fatal JS exception produced', [
      {
        text: 'Close',
      },
    ]);
  }
};

setJSExceptionHandler(exceptionhandler, false);

setNativeExceptionHandler(errorString => {
  // TODO: Track native exception
  console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥'); // eslint-disable-line
  console.log('setNativeExceptionHandler', errorString); // eslint-disable-line
  console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥'); // eslint-disable-line
}, false);

// Configure locale
MapboxGL.setAccessToken(
  'pk.eyJ1Ijoicml5YWRoc2Vhc29uIiwiYSI6ImNrMHV0MDV4ajBoaHUzaXBkYWFoN2FtajUifQ.feKKiCzK_XhM59_7HaW3fA'
);

/**
 * Register app component
 */
const RNApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App store={store} />
    </PersistGate>
  </Provider>
);

Platform.OS === 'android' &&
  AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => backgroundMessaging); // <-- Add this line

Navigation.registerComponent('app', () => RNApp);

createPages(store, Provider);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
    },
  });
  Navigation.setRoot({
    root: {
      component: {
        name: 'app',
      },
    },
  });
});
