import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import isPreloadReducer from './isPreload/reducer';
import authReducer from './auth/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import filterReducer from './filter/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    auth: authReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    // threadDetail: threadsDetailReducer,
    filter: filterReducer,
  },
});

export default store;