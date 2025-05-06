import toast from 'react-hot-toast';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  GET_THREAD_DETAIL: 'thread-detail/GET',
  CLEAR_THREAD_DETAIL: 'thread-detail/CLEAR',
  CREATE_COMMENT_THREAD_DETAIL: 'thread-detail/CREATE_COMMENT',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'thread-detail/TOGGLE_UP_VOTE',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'thread-detail/TOGGLE_DOWN_VOTE',
};

const getThreadDetailActionCreator = (threadDetail) => {
  return {
    type: ActionType.GET_THREAD_DETAIL,
    payload: {
      threadDetail
    }
  };
};

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpVoteThreadDetailActionCreator({ threadId, authUserId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      authUserId
    },
  };
}

function toggleDownVoteThreadDetailActionCreator({ threadId, authUserId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      authUserId
    },
  };
}

const createComentThreadActionCreator = ({ threadId, content }) => {
  return {
    type: ActionType.CREATE_COMMENT_THREAD_DETAIL,
    payload: {
      threadId,
      content,
    }
  };
};

function getThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearThreadDetailActionCreator());

    try {
      const result = await api.threads.showThread(threadId);
      dispatch(getThreadDetailActionCreator(result.data.detailThread));
    } catch (error) {
      toast.error(`Oops, ${error.message}`);
    }
    dispatch(hideLoading());
  };
}

function toggleUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth } = getState();

    dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, authUserId: auth.id }));

    try {
      await api.votes.upVoteThread(threadId);
      toast.success('You liked this thread.');
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, authUserId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

function toggleDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth } = getState();
    dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, authUserId: auth.id }));

    try {
      await api.votes.downVoteThread(threadId);
      toast.success('You disliked this thread.');
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, authUserId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

function toggleNeutralVoteThreadDetail(threadId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth } = getState();
    voteType === 'Like'
      ? dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, authUserId: auth.id }))
      : dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, authUserId: auth.id }));

    try {
      await api.votes.neutralVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      voteType === 'Like'
        ? dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, authUserId: auth.id }))
        : dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, authUserId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

function createComment(content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { threadDetail } = getState();

      const result = await api.comments.createComment(threadDetail.id, content);
      dispatch(createComentThreadActionCreator({ threadId: threadDetail.id, content: result.data.comment }));
    } catch (error) {
      toast.error(`Oops, ${error.response.data.message}`);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getThreadDetailActionCreator,
  getThreadDetail,
  createComment,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleUpVoteThreadDetail,
  toggleDownVoteThreadDetail,
  toggleNeutralVoteThreadDetail
};