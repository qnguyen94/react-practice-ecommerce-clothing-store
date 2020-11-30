import { createSelector } from 'reselect';

// Input selector (does not use createSelector)
const selectCart = state => state.cart;

// Output selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)

// ==> Created a memoize selector

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity
        , 0)
        
)