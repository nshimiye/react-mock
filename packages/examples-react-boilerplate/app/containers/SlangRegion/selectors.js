import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the slangRegion state domain
 */

const selectSlangRegionDomain = state => state.get('slangRegion', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SlangRegion
 */

const makeSelectSlangRegion = () =>
  createSelector(selectSlangRegionDomain, substate => substate.toJS());

export default makeSelectSlangRegion;
export { selectSlangRegionDomain };
