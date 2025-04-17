import api from "../../utils/api";

const ActionType = {
  CREATE_COMMENTS: 'CREATE_COMMENTS',
}

const createCommentActionCreator = (comment) => {
  return {
    type: ActionType.CREATE_COMMENTS,
    payload: {
      comment
    }
  }
}

const createComment = (threadId, content = "") => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.comments.createComment(threadId, content);
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      toast.error(`Oops, ${error.response.data.message}`);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  createCommentActionCreator,
  createComment
}