import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas'
import { userSagas } from './user/user.sagas'
import { cartSagas } from './cart/cart.sagas'

//Generator function that yield all sagas at one time
export default function* rootSaga(){
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
    ])
}

// all(sagaArray)
// In normal circumstance, 2nd function yield wait for 1st function yield to resolve.
// 'all' initialize all sagas at the same time and put them in separate task streams