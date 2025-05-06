/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../auth/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

const setIsPreloadActionCreator = (isPreload) => {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
};

const asyncPreloadProcess = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const authUser = await api.users.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser.data.user));
    } catch {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
};

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
};