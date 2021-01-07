import React from 'react';

import {
    ErrorImageOverlay,
    ErrorImageContainer,
    ErrorImageText
} from './error-boundary.styles'

// Use either one or two signalling life cycle methods
// Wrap this component around any component that need to watch for error
class ErrorBoundary extends React.Component{
    constructor(){
        super();

        this.state = {
            hasErrored: false
        }
    }

    // Catch any error that thrown in any of the children component of this component
    // Error is caught before error is thrown
    static getDerivedStateFromError(error){
        // Process error

        // Process error

        // Return a state object that will be set locally
        return { hasErrored: true }
    }

    componentDidCatch(error, info){
        console.log(error);
        console.log(info);
    }

    render(){

        // Render error message when error is caught
        if(this.state.hasErrored)   {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='./images/404.png'/>
                    <ErrorImageText>OOPS ! WE TRIPPED UP! LOOKS LIKE THERE'S NOTHING HERE...</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        
        // Otherwise, return the chilren component wrapped inside this error boundary component, as normal
        return this.props.children;
    }

}

export default ErrorBoundary;