import toast from "react-hot-toast";
import api from "../../utils/api";

const ActionType = {
  GET_THREADS: 'GET_THREADS',
  CREATE_THREADS: 'CREATE_THREADS',
  SHOW_THREADS: 'SHOW_THREADS',
};

const getAllThreadsActionCreator = (threads) => {
  return {
    type: ActionType.GET_THREADS,
    payload: {
      threads
    }
  }
}

const createThreadActionCreator = (thread) => {
  return {
    type: ActionType.CREATE_THREADS,
    payload: {
      thread
    }
  }
}

const showThreadActionCreator = (threadId) => {
  return {
    type: ActionType.SHOW_THREADS,
    payload: {
      threadId
    }
  }
}

function createThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.threads.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
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
  showThreadActionCreator,
  createThread
};