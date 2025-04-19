import toast from "react-hot-toast";
import api from "../../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

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

function toggleUpVoteCommentActionCreator({ threadId, commentId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      commentId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ threadId, commentId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      commentId,
    },
  };
}

function toggleNeutralVoteCommentActionCreator({ threadId, commentId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      commentId,
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
      toast.success("You liked this thread.");
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
      toast.success("You disliked this thread.");
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
    voteType === "Like"
      ? dispatch(toggleUpVoteThreadActionCreator({ threadId, authUserId: auth.id }))
      : dispatch(toggleDownVoteThreadActionCreator({ threadId, authUserId: auth.id }))

    try {
      await api.votes.neutralVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      voteType === "Like"
        ? dispatch(toggleUpVoteThreadActionCreator({ threadId, authUserId: auth.id }))
        : dispatch(toggleDownVoteThreadActionCreator({ threadId, authUserId: auth.id }))
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
  toggleNeutralVoteCommentActionCreator,
  toggleUpVoteThread,
  toggleDownVoteThread,
  toggleNeutralVoteThread
}
