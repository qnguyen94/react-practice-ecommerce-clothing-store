import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect' 

import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions'

import './App.css';

import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component'
import SignInSignUpPage from './pages/sign-in-up/sign-in-up.component'
import CheckoutPage from './pages/checkout/checkout.component'


class App extends React.Component {

  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render(){
    return (
      <div>
        <Header />
        {/* Switch renders components as soon as there's a match and render no more */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={()=> this.props.currentUser ? 
            <Redirect to='/'/> : <SignInSignUpPage />
          } />
          <Route exact path='/checkout' component={CheckoutPage} /> 
        </Switch>
      </div>
    );
  }
}

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStatetoProps, mapDispatchToProps)(App);