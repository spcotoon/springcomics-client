import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
import userReducer from './auth/userSlice';
import artistReducer  from './auth/artistSlice';
import comicSlice from './comic/comicSlice'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


const userPersistConfig = {
  key: 'user', 
  storage,
  whitelist: ['email', 'displayName', 'authority', 'isLoggedIn'],  
};

const artistPersistConfig = {
  key: 'artist', 
  storage,
  whitelist: ['email', 'displayName', 'authority', 'isLoggedIn'],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedArtistReducer = persistReducer(artistPersistConfig, artistReducer);


const store = configureStore({
  reducer: {
    user: persistedUserReducer, 
    artist: persistedArtistReducer, 
    comic: comicSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store); 
export { store, persistor };
