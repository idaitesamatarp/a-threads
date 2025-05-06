import toast from 'react-hot-toast';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { textTransform } from '../../utils/textUtils';

const ActionType = {
  SET_AUTH_USER: 'auth-user/SET',
  UNSET_AUTH_USER: 'auth-user/UNSET'
};

const setAuthUserActionCreator = (authUser) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
};

const unsetAuthUserActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
};

const asyncSetAuthUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.auth.login({ email, password })
        .then((result) => {
          toast.success(textTransform(result.message));
          api.putAccessToken(result.data.token);
        }).catch((err) => {
          toast.error(err.response.data.message);
        });

      const authUser = await api.users.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser.data.user));
    } catch (error) {
      Promise.reject(error);
    }

    dispatch(hideLoading());
  };
};

const asyncUnsetAuthUser = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
    dispatch(hideLoading());
    toast.success('Sign Out Successfully. ');
  };
};

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
