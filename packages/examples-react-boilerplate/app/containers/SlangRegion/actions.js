/*
 *
 * SlangRegion actions
 *
 */

import { DEFAULT_ACTION, FETCH_SLANG_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchSlangList(language = navigator.language) {
  return {
    type: FETCH_SLANG_LIST,
    payload: { language },
  };
}
