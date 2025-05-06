import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import isPreloadReducer from './isPreload/reducer';
import authReducer from './auth/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import filterReducer from './filter/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    filter: filterReducer,
    auth: authReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;