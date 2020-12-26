import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles'


// This component takes in a component along with its props
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    )
}

export default WithSpinner