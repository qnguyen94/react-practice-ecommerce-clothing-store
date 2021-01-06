
// import react lazy
// potential bug: codes run synchronously will break because page is now load asynchronously
//  FIX: use react suspense
import React, { useEffect, lazy, Suspense } from 'react';
import ErrorBoundary from './components/error-boundary/error-boundary.component'


import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';



// No longer use normal import for pages

import Header from './components/header/header.component';
import { GlobalStyle } from './global.styles';
import Spinner from './components/spinner/spinner.component'

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

// Delare a const the dynamically import and load lazy
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // React Router interact with React Lazy automatically and lazy load any components returned form the lazy import function
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        {/* Wrap everything inside Error Boundary */}
        <ErrorBoundary>
        {/* Wrap the lazy loaded component around Suspence */}
        {/* Takes in a fallback component that will be rendered when the lazy component is loaded */}
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
