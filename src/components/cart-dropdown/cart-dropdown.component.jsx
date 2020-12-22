import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './cart-dropdown.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { createStructuredSelector } from 'reselect';

const CartDropDown = ({ cartItems, history, dispatch }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? 
                cartItems.map(cartItem=> 
                    <CartItem key={cartItem.id} item={cartItem} />   
                ) :
                <span className="empty-message">Your Cart Is Empty</span>
            }
        </div>
        <CustomButton onClick={()=> {
            dispatch(toggleCartHidden());
            history.push('/checkout');
        }}>CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropDown));