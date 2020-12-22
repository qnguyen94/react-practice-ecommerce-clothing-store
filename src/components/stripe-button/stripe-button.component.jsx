import React from 'react';

import { ReactComponent as Logo } from '../../assets/crown.svg'

import StripeCheckout from 'react-stripe-checkout'



export const StripeCheckoutButton = ({ price }) => {
    // Note: Stripe process price in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I13CKA9GT4KzdprgWB4dHYNL5ZTbp5Do04tx4m6ohyeuwn504ZtiJjsPI9AA2oaSgyaiJGhzFApTGGNDAStSXt100EyhBBiuP'

    // On Success Callback function
    const onToken = token => {
        console.log(token)
        alert('Payment Sucessful')
    }

    //  Link for props docs: https://www.npmjs.com/package/react-stripe-checkout
    return (
        <StripeCheckout 
            label='Pay Now'
            name='Practice eCommerce'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}