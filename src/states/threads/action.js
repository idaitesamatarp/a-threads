import toast from 'react-hot-toast';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  GET_THREADS: 'threads/GET',
  CREATE_THREAD: 'thread/CREATE',
};

const getAllThreadsActionCreator = (threads) => {
  return {
    type: ActionType.GET_THREADS,
    payload: {
      threads
    }
  };
};

const createThreadActionCreator = (thread) => {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    }
  };
};

function createThread({ title, body, category }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();

      const result = await api.threads.createThread({ title, body, category });
      dispatch(createThreadActionCreator({ ...result.data.thread, user: auth }));
    } catch (error) {
      toast.error(`Oops, ${error.response.data.message}`);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getAllThreadsActionCreator,
  createThreadActionCreator,
  createThread
};