import { ActionType } from './action';

function leaderboardsReducer(leaderboards = [], action = {}) {
  switch (action.type) {
  case ActionType.GET_LEADERBOARD:
    return action.payload.leaderboards;
  default:
    return leaderboards;
  }
}

export default leaderboardsReducer;