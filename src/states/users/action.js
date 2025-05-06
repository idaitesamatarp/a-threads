import toast from 'react-hot-toast';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { textTransform } from '../../utils/textUtils';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

const receiveUsersActionCreator = (users) => {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

const registerUser = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.auth.register({ name, email, password })
        .then((result) => {
          toast.success(textTransform(result.message));
        }).catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error(`Oops, ${error.response.data.message}`);
    }
    dispatch(hideLoading());
  };
};

export {
  ActionType,
  receiveUsersActionCreator,
  registerUser,
};