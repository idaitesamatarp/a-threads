/**
 * skenario test
 *
 * - toggleUpVoteThread thunk
 *  - should dispatch action correctly when toggled like thread success
 *  - should dispatch action and call alert correctly when toggled like thread failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import api from '../../utils/api';
import { toggleDownVoteThread, toggleDownVoteThreadActionCreator, toggleUpVoteThread, toggleUpVoteThreadActionCreator } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';

const threadId = 'thread-1';
const authUserId = 'users-1';

const fakeAuthData = {
  'id': authUserId,
  'name': 'Users',
  'email': 'users@example.com',
  'avatar': 'https://generated-image-url.jpg'
};

const fakeUpVoteResponse = {
  'id': 'vote-1',
  'userId': authUserId,
  'threadId': threadId,
  'voteType': 1
};

const fakeDownVoteResponse = {
  'id': 'vote-1',
  'userId': authUserId,
  'threadId': threadId,
  'voteType': -1
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('toggleUpVoteThread thunk', () => {
  beforeEach(() => {
    vi.mock('react-hot-toast', () => ({
      default: {
        success: vi.fn(),
        error: vi.fn(),
      },
    }));

    api.votes._upVoteThread = api.votes.upVoteThread;
  });

  afterEach(() => {
    api.votes.upVoteThread = api.votes._upVoteThread;

    delete api.votes._upVoteThread;

    vi.clearAllMocks();
  });

  it('should dispatch action correctly when toggled like thread success', async () => {
    // arrange
    // stub implementation
    api.votes.upVoteThread = () => Promise.resolve(fakeUpVoteResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ auth: fakeAuthData }));

    // action
    await toggleUpVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThreadActionCreator({ threadId, authUserId }));
    expect(toast.success).toHaveBeenCalledWith('You liked this thread.');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when toggled like thread failed', async () => {
    // arrange
    // stub implementation
    api.votes.upVoteThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ auth: fakeAuthData }));

    // action
    await toggleUpVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('toggleDownVoteThread thunk', () => {
  beforeEach(() => {
    vi.mock('react-hot-toast', () => ({
      default: {
        success: vi.fn(),
        error: vi.fn(),
      },
    }));

    api.votes._downVoteThread = api.votes.downVoteThread;
  });

  afterEach(() => {
    api.votes.downVoteThread = api.votes._downVoteThread;

    delete api.votes._downVoteThread;

    vi.clearAllMocks();
  });

  it('should dispatch action correctly when toggled dislike thread success', async () => {
    // arrange
    // stub implementation
    api.votes.downVoteThread = () => Promise.resolve(fakeDownVoteResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ auth: fakeAuthData }));

    // action
    await toggleDownVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThreadActionCreator({ threadId, authUserId }));
    expect(toast.success).toHaveBeenCalledWith('You disliked this thread.');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when toggled dislike thread failed', async () => {
    // arrange
    // stub implementation
    api.votes.downVoteThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ auth: fakeAuthData }));

    // action
    await toggleDownVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});