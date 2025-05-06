import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { getAllThreadsActionCreator } from '../threads/action';
import toast from 'react-hot-toast';

function populateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const allUsers = await api.users.getAllUsers();
      const allThreads = await api.threads.getAllThreads();
      const threadList = allThreads.data.threads.map((thread) => ({
        ...thread,
        user: allUsers.data.users.find((user) => user.id === thread.ownerId),
      }));
      dispatch(getAllThreadsActionCreator(threadList));
    } catch (error) {
      toast.error(`Oops, ${error.response.data.message}`);
    }
    dispatch(hideLoading());
  };
}

export { populateUsersAndThreads };