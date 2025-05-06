import toast from 'react-hot-toast';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
  TOGGLE_NEUTRAL_VOTE_THREAD: 'TOGGLE_NEUTRAL_VOTE_THREAD',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'TOGGLE_NEUTRAL_VOTE_COMMENT',
};

function toggleUpVoteThreadActionCreator({ threadId, authUserId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      authUserId
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, authUserId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      authUserId
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, authUserId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      authUserId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, authUserId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      authUserId
    },
  };
}

function toggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth } = getState();

    dispatch(toggleUpVoteThreadActionCreator({ threadId, authUserId: auth.id }));

    try {
      await api.votes.upVoteThread(threadId);
      toast.success('You liked this thread.');
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleUpVoteThreadActionCreator({ threadId, authUserId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

function toggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth } = getState();
    dispatch(toggleDownVoteThreadActionCreator({ threadId, authUserId: auth.id }));

    try {
      await api.votes.downVoteThread(threadId);
      toast.success('You disliked this thread.');
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleDownVoteThreadActionCreator({ threadId, authUserId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

function toggleNeutralVoteThread(threadId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth } = getState();
    voteType === 'Like'
      ? dispatch(toggleUpVoteThreadActionCreator({ threadId, authUserId: auth.id }))
      : dispatch(toggleDownVoteThreadActionCreator({ threadId, authUserId: auth.id }));

    try {
      await api.votes.neutralVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      voteType === 'Like'
        ? dispatch(toggleUpVoteThreadActionCreator({ threadId, authUserId: auth.id }))
        : dispatch(toggleDownVoteThreadActionCreator({ threadId, authUserId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

function toggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth, threadDetail } = getState();

    dispatch(toggleUpVoteCommentActionCreator({ commentId, authUserId: auth.id }));

    try {
      await api.votes.upVoteComment(threadDetail.id, commentId);
      toast.success('You liked this comment.');
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleUpVoteCommentActionCreator({ commentId, authUserId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

function toggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth, threadDetail } = getState();
    dispatch(toggleDownVoteCommentActionCreator({ commentId, authUserId: auth.id }));

    try {
      await api.votes.downVoteComment(threadDetail.id, commentId);
      toast.success('You disliked this comment.');
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleDownVoteCommentActionCreator({ commentId, authUserId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

function toggleNeutralVoteComment(commentId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth, threadDetail } = getState();
    voteType === 'Like'
      ? dispatch(toggleUpVoteCommentActionCreator({ commentId, authUserId: auth.id }))
      : dispatch(toggleDownVoteCommentActionCreator({ commentId, authUserId: auth.id }));

    try {
      await api.votes.neutralVoteComment(threadDetail.id, commentId);
    } catch (error) {
      toast.error(error.message);
      voteType === 'Like'
        ? dispatch(toggleUpVoteCommentActionCreator({ commentId, authUserId: auth.id }))
        : dispatch(toggleDownVoteCommentActionCreator({ commentId, authUserId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleUpVoteThread,
  toggleDownVoteThread,
  toggleNeutralVoteThread,
  toggleUpVoteComment,
  toggleDownVoteComment,
  toggleNeutralVoteComment,
};
