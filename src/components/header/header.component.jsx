import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils'

import './header.styles.scss'

const Header = ({ currentUser }) => (
    <div className="header">
        <Link className='logo-container' to="/">
            <Logo className="logo" />
        </Link>

        <div className="options">
            <Link className="option" to='/shop'>SHOP</Link>
            <Link className="option" to='/contact'>CONTACT</Link>
            {
                currentUser ?
                <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div> //Functional component that sign out from google auth
                :
                <Link className="option" to='/signin'>SIGN IN</Link>
            }
        </div>
    </div>
)


// 'state' here will be state passed in by redux store
// local component props now receives 'currentUser' from store
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);