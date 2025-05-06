/**
 * skenario test
 *
 * - toggleUpVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { getLeaderboardActionCreator, getLeaderboards } from './action';
import toast from 'react-hot-toast';

const fakeLeaderboardsResponse = [
  {
    'user': {
      'id': 'user-1',
      'name': 'Name 1',
      'email': 'name-1@dicoding.com',
      'avatar': 'https://ui-avatars.com/api/?name=Name%201&background=random'
    },
    'score': 100
  },
  {
    'user': {
      'id': 'user-2',
      'name': 'Name 2',
      'email': 'nam2@dicoding.com',
      'avatar': 'https://ui-avatars.com/api/?name=Name%202&background=random'
    },
    'score': 78
  },
  {
    'user': {
      'id': 'user-3',
      'name': 'Name 3',
      'email': 'name3@dicoding.com',
      'avatar': 'https://ui-avatars.com/api/?name=Name%203&background=random'
    },
    'score': 55
  }
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('getLeaderboards thunk', () => {
  beforeEach(() => {
    api.leaderboards._getLeaderboards = api.leaderboards.getLeaderboards;
  });

  afterEach(() => {
    api.leaderboards.getLeaderboards = api.leaderboards._getLeaderboards;

    // delete backup data
    delete api.leaderboards._getLeaderboards;
  });

  // ... backup and restore

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.leaderboards.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await getLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(getLeaderboardActionCreator(fakeLeaderboardsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.leaderboards.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    vi.mock('react-hot-toast', () => ({
      default: {
        error: vi.fn(),
      },
    }));

    // action
    await getLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
