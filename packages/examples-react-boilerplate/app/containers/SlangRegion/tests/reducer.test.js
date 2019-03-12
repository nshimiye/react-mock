import { fromJS } from 'immutable';
import slangRegionReducer from '../reducer';

describe('slangRegionReducer', () => {
  it('returns the initial state', () => {
    expect(slangRegionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
