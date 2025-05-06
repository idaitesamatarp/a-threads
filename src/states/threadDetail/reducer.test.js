/**
* test scenario for threadsReducer
*
* - threadsReducers function
*  - should return the initial state when given by unknown action
*  - should return the thread detail when given by GET_THREAD_DETAIL action
*  - should return the thread detail with the toggled like thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action
*  - should return the thread detail with the toggled dislike thread when given by TOGGLE_DOWN_VOTE_THREAD_DETAIL action
*  - should return the threads with the new comment when given by CREATE_COMMENT_THREAD_DETAIL action
*  - should return the thread detail with the toggled like comment thread when given by TOGGLE_UP_VOTE_COMMENT action
*  - should return the thread detail with the toggled dislike comment thread when given by TOGGLE_DOWN_VOTE_COMMENT action
*
*/

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';
import { ActionType as ActionTypeVote } from '../votes/action';

describe('talkReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given by GET_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.GET_THREAD_DETAIL,
      payload: {
        threadDetail: {
          'id': 'thread-7kpJyjMQ47Z25rgG',
          'title': 'Testing Reducer',
          'body': 'saya akan menguji reducer thread detail',
          'createdAt': '2025-05-01T13:55:52.266Z',
          'owner': {
            'id': 'user-jVNZrrewKBs777kB',
            'name': 'owner',
            'avatar': 'https://ui-avatars.com/api/?name=owner&background=random'
          },
          'category': 'redux',
          'comments': [],
          'upVotesBy': [],
          'downVotesBy': []
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the thread detail with the toggled like thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      'id': 'thread-7kpJyjMQ47Z25rgG',
      'title': 'Testing Reducer',
      'body': 'saya akan menguji reducer thread detail',
      'createdAt': '2025-05-01T13:55:52.266Z',
      'owner': {
        'id': 'user-jVNZrrewKBs777kB',
        'name': 'owner',
        'avatar': 'https://ui-avatars.com/api/?name=owner&background=random'
      },
      'category': 'redux',
      'comments': [],
      'upVotesBy': [],
      'downVotesBy': []
    };

    const action = {
      type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
      payload: {
        'threadId': 'thread-7kpJyjMQ47Z25rgG',
        'authUserId': 'user-jVNZrrewKBs777kB'
      },
    };

    // action for like thread
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [...initialState.upVotesBy, action.payload.authUserId],
    });

    // action for unlike thread
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the thread detail with the toggled dislike thread when given by TOGGLE_DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      'id': 'thread-7kpJyjMQ47Z25rgG',
      'title': 'Testing Reducer',
      'body': 'saya akan menguji reducer thread detail',
      'createdAt': '2025-05-01T13:55:52.266Z',
      'owner': {
        'id': 'user-jVNZrrewKBs777kB',
        'name': 'owner',
        'avatar': 'https://ui-avatars.com/api/?name=owner&background=random'
      },
      'category': 'redux',
      'comments': [],
      'upVotesBy': [],
      'downVotesBy': []
    };

    const action = {
      type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
      payload: {
        'threadId': 'thread-7kpJyjMQ47Z25rgG',
        'authUserId': 'user-jVNZrrewKBs777kB'
      },
    };

    // action for like thread
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [...initialState.downVotesBy, action.payload.authUserId],
    });

    // action for unlike thread
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the thread detail with the new comment when given by CREATE_COMMENT_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      'id': 'thread-7kpJyjMQ47Z25rgG',
      'title': 'Testing Reducer',
      'body': 'saya akan menguji reducer thread detail',
      'createdAt': '2025-05-01T13:55:52.266Z',
      'owner': {
        'id': 'user-jVNZrrewKBs777kB',
        'name': 'owner',
        'avatar': 'https://ui-avatars.com/api/?name=owner&background=random'
      },
      'category': 'redux',
      'comments': [],
      'upVotesBy': [],
      'downVotesBy': []
    };

    const action = {
      type: ActionType.CREATE_COMMENT_THREAD_DETAIL,
      payload: {
        'threadId': 'thread-7kpJyjMQ47Z25rgG',
        'authUserId': 'Thread yang bagus'
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [action.payload.content, ...initialState.comments]
      });
  });

  it('should return the thread detail with the toggled like comment thread when given by TOGGLE_UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      'id': 'thread-7kpJyjMQ47Z25rgG',
      'title': 'Testing Reducer',
      'body': 'saya akan menguji reducer thread detail',
      'createdAt': '2025-05-01T13:55:52.266Z',
      'owner': {
        'id': 'user-jVNZrrewKBs777kB',
        'name': 'owner',
        'avatar': 'https://ui-avatars.com/api/?name=owner&background=random'
      },
      'category': 'redux',
      'comments': [
        {
          'id': 'comment-eCCqwNDAwNRD5vri',
          'content': 'ini komen aja',
          'createdAt': '2025-05-01T14:20:53.833Z',
          'owner': {
            'id': 'user-AQ0V4znjznsaXs5N',
            'name': 'owner komen',
            'avatar': 'https://ui-avatars.com/api/?name=owner%20komen&background=random'
          },
          'upVotesBy': [],
          'downVotesBy': []
        }
      ],
      'upVotesBy': [],
      'downVotesBy': []
    };

    const action = {
      type: ActionTypeVote.TOGGLE_UP_VOTE_COMMENT,
      payload: {
        'commentId': 'comment-eCCqwNDAwNRD5vri',
        'authUserId': 'user-AQ0V4znjznsaXs5N',
      },
    };

    // action for like thread
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [...initialState.comments[0].upVotesBy, action.payload.authUserId]
        }
      ],
    });

    // action for unlike thread
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the thread detail with the toggled dislike comment thread when given by TOGGLE_DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      'id': 'thread-7kpJyjMQ47Z25rgG',
      'title': 'Testing Reducer',
      'body': 'saya akan menguji reducer thread detail',
      'createdAt': '2025-05-01T13:55:52.266Z',
      'owner': {
        'id': 'user-jVNZrrewKBs777kB',
        'name': 'owner',
        'avatar': 'https://ui-avatars.com/api/?name=owner&background=random'
      },
      'category': 'redux',
      'comments': [
        {
          'id': 'comment-eCCqwNDAwNRD5vri',
          'content': 'ini komen aja',
          'createdAt': '2025-05-01T14:20:53.833Z',
          'owner': {
            'id': 'user-AQ0V4znjznsaXs5N',
            'name': 'owner komen',
            'avatar': 'https://ui-avatars.com/api/?name=owner%20komen&background=random'
          },
          'upVotesBy': [],
          'downVotesBy': []
        }
      ],
      'upVotesBy': [],
      'downVotesBy': []
    };

    const action = {
      type: ActionTypeVote.TOGGLE_DOWN_VOTE_COMMENT,
      payload: {
        'commentId': 'comment-eCCqwNDAwNRD5vri',
        'authUserId': 'user-AQ0V4znjznsaXs5N',
      },
    };

    // action for like thread
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: [...initialState.comments[0].downVotesBy, action.payload.authUserId]
        }
      ],
    });

    // action for unlike thread
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});