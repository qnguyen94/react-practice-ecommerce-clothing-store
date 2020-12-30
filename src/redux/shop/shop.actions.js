import shopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTION_START
})

export const fetchCollectionsSuccess = collectionMap => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
})

export const fetchCollectionsError = error => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: error
})

// This will be called within component
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');

        // Switch redux state to isFetching 
        dispatch(fetchCollectionsStart());

        collectionRef
            .get()
            .then(snapshot => {
                return convertCollectionsSnapshotToMap(snapshot);
            })
            .then( collectionMap => { dispatch(fetchCollectionsSuccess(collectionMap)) } ) // After call success, switch isFetching to false
        .catch(error => dispatch(fetchCollectionsError(error.message)))
    }
}