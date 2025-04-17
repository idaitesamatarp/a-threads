import toast from "react-hot-toast";
import api from "../../utils/api";

const ActionType = {
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
  TOGGLE_NEUTRAL_VOTE_THREAD: 'TOGGLE_NEUTRAL_VOTE_THREAD',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'TOGGLE_NEUTRAL_VOTE_COMMENT',
};

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
    },
  };
}

function toggleNeutralVoteThreadActionCreator({ threadId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
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

function asyncToogleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { auth } = getState();
    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: auth.id }));

    try {
      await api.votes.upVoteThread(threadId);
      toast.success("You liked this thread !");
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeTalkActionCreator({ threadId, userId: auth.id }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralVoteThreadActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleNeutralVoteCommentActionCreator,
  asyncToogleUpVoteThread,
}
