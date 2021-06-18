import { useEffect, useState } from 'react';
import React from 'react'
import {isAuth, signup,preSignup} from '../../actions/auth'
import Router from 'next/router';
import Link from 'next/link'
import LoginGoogle from './LoginGoogle';
const SignupComponent = () => {
    const [values, setValues] = useState({
        name: 'aman',
        email: 'aman@gmail.com',
        password: 'aaaaaa',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    
    useEffect(()=>{
        isAuth() && Router.push(`/`);
    },[])

    const { name, email, password, error, loading, message, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values,loading:true,error:false})
        const user={name,email,password}
        preSignup(user)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                setValues({
                    ...values,
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    loading:false,
                    message:data.message,
                    showForm:false
            })
            }
        })
        };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');


    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                    />
                </div>

                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
        );
    };

    return <React.Fragment>
        {showError()}
        {showLoading()}
        {showMessage()}
        <LoginGoogle/>
        {showForm && signupForm()}
        {showForm && <Link href="/auth/password/forgot">
            <a className="btn btn-outline-danger btn-sm">Forgot Password</a>
        </Link>}
        </React.Fragment>;
};

export default SignupComponent;