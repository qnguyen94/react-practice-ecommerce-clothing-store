import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component'
import SignInSignUpPage from './pages/sign-in-up/sign-in-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  // Close subscription when component unmount, prevents memory leaks
  unsubscribeFromAuth = null;

  componentDidMount(){
    //Get auth from auth object
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        // Wait for create user operations
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
      else {
        this.setState({
          currentUser: userAuth
        })
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
        <Header currentUser={this.state.currentUser}/>
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

export default App;