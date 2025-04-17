import toast from 'react-hot-toast';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { textTransform } from '../../utils/textTransform';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
}

const setAuthUserActionCreator = (authUser) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

const unsetAuthUserActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

const asyncSetAuthUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.auth.login({ email, password })
        .then((result) => {
          toast.success(textTransform(result.message));
          api.putAccessToken(result.data.token);
        }).catch((err) => {
          toast.error(err.message);
        });
      const authUser = await api.users.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser.data.user));
    } catch (error) {
      toast.error(`Oops, ${error.response.data.message}`);
    }

    dispatch(hideLoading());
  };
}

const asyncUnsetAuthUser = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
    dispatch(hideLoading());
    toast.success("Sign Out Successfully. ");
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
