import React, { useState } from 'react';
import { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { signUpStart } from '../../redux/user/user.actions'

import './sign-up.styles.scss'

const SignUp = ({ signUpStart }) => {

    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(password !== confirmPassword){
            alert("Password don't match");
            return;
        }

        try {
            signUpStart({ displayName, email, password })
        } catch(error){
            console.log(error);
        }
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setCredentials({
            ...userCredentials,
            [name]: value
        });
    }

    

    return(
        <div className="sign-up">
            <h2 className="title"> I do not have an account </h2>
            <span>Sign up with your email and password</span>
            <form action="" className="sign-up form" onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange = {handleChange}
                    label='Display Name'
                    required />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange = {handleChange}
                    label='Email'
                    required />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange = {handleChange}
                    label='Password'
                    required />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange = {handleChange}
                    label='Confirm Password'
                    required />
                
                <CustomButton type='submit'>Sign Up</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userInfo => dispatch(signUpStart(userInfo))
})

export default connect(null, mapDispatchToProps)(SignUp);