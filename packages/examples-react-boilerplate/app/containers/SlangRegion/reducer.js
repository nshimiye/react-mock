/*
 *
 * SlangRegion reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({
  entities: {
    '1': { title: 'Heyo' },
  },
  idList: ['1'],
});

function slangRegionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default slangRegionReducer;
