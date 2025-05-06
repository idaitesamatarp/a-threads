import toast from 'react-hot-toast';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  GET_LEADERBOARD: 'GET_LEADERBOARD',
};

const getLeaderboardActionCreator = (leaderboards) => {
  return {
    type: ActionType.GET_LEADERBOARD,
    payload: {
      leaderboards
    }
  };
};

function getLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const result = await api.leaderboards.getLeaderboards();
      dispatch(getLeaderboardActionCreator(result));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getLeaderboardActionCreator,
  getLeaderboards
};