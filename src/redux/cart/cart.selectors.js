import { createSelector } from 'reselect';

// Input selector (does not use createSelector)
const selectCart = state => state.cart;

// Output selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)

// ==> Created a memoize selector

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity
        , 0)
        
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total + (cartItem.price * cartItem.quantity)
        , 0
    )
)