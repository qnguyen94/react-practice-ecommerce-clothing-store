//All saga code related to shop

// take Every: Listen for every action of a specific type
// call: used with yield, defer the call of a function to saga. used to invoke method inside a generator function
// put: effect for creating action (replace dispatch) (used with yield)
import { takeLatest, call, put, all } from 'redux-saga/effects';
import shopActionTypes from './shop.types';

// Functionalities
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import {
    fetchCollectionsSuccess,
    fetchCollectionsError
} from './shop.actions'

export function* fetchCollectionAsync(){
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
    
        // call(function, argumentsOfFunction)
        // 'yield' in case call takes longer than expected
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        // yield a put(dispatch)
        yield put(fetchCollectionsSuccess(collectionsMap));
    }
    catch(error) {
        yield put(fetchCollectionsError(error.message))
    }

}

export function* fetchCollectionStart(){
    // yield takeEvery or takeLatest.
    // First argument. Action Type
    // Second argument: Generator function that run in response to the listener
    yield takeLatest(shopActionTypes.FETCH_COLLECTION_START,
        fetchCollectionAsync
    );
}

export function* shopSagas(){
    yield all([
        call(fetchCollectionStart)
    ])
}