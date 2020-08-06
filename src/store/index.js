import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import app from './reducers/app';
import user from './reducers/user';
import event from './reducers/eventReducer';
import kiosk from './reducers/kioskReducer';
import zone from './reducers/zoneReducer';
import tag from './reducers/tagReducer';
import location from './reducers/locationReducer';
import category from './reducers/categoryReducer';
import search from './reducers/searchReducer';
import venue from './reducers/venueReducer';
import userTransform from './transformers/userTransform';

const PURGE_STORAGE = false;

const rootReducer = combineReducers({
  app,
  user,
  event,
  kiosk,
  zone,
  tag,
  location,
  category,
  venue,
  search,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'user'],
  transforms: [userTransform],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(thunkMiddleware));

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, composedEnhancers);
export const persistor = persistStore(store);

PURGE_STORAGE && persistor.purge();
