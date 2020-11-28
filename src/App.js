import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'

import './App.css';

import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component'
import SignInSignUpPage from './pages/sign-in-up/sign-in-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {

  // Close subscription when component unmount, prevents memory leaks
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    //Get auth from auth object
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        // Wait for create user operations
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
      else {
        setCurrentUser(userAuth);
      }
    })
  }

  // Close subscription when component unmount, prevents memory leaks
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        {/* Switch renders components as soon as there's a match and render no more */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);