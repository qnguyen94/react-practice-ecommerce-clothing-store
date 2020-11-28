import { UserActionTypes } from './user.types'

// Must provide an initial state for store reducer
const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return { //Must return a different object to trigger rerender
                ...state, // All other value remain same
                currentUser: action.payload // Change states based on actions
            }
        default:
            return state;
    }
}

export default userReducer;