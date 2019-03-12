import { takeLatest, put } from 'redux-saga/effects';
import { Faker, uid, FakerGenerator } from 'react-mock';
// import { take, call, put, select } from 'redux-saga/effects';

import { FETCH_SLANG_LIST } from './constants';

const schema = {
  description: Faker.lorem.sentence(),
  createdAt: Faker.date.past(),
  favoredCount: Faker.random.number(),
  isPublic: Faker.random.boolean(),
  author: {
    id: uid.next(),
    name: Faker.name.findName(),
    picture: Faker.internet.avatar(),
  },
};

export function* fetchSlangListSaga({ payload }) {
  try {
    // const user = yield call(Api.fetchUser, action.payload.userId);

    console.log('[SAGA] fetchSlangListSaga', payload, FakerGenerator.next(3, schema));

    yield put({
      type: 'FETCH_SLANG_LIST_SUCCEEDED',
      payload: { entities: {}, idList: [] },
    });
  } catch (e) {
    yield put({
      type: 'FETCH_SLANG_LIST_FAILED',
      payload: { message: e.message },
    });
  }
}

// Individual exports for testing
export default function* slangRegionSaga() {
  yield takeLatest(FETCH_SLANG_LIST, fetchSlangListSaga);
}
