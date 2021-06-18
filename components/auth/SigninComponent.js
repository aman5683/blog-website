import { useEffect, useState } from 'react';
import React from 'react'
import Link from 'next/link'
import {signin,authenticate, isAuth} from '../../actions/auth'
import Router from 'next/router';
import LoginGoogle from './LoginGoogle'
const SigninComponent = () => {
    const [values, setValues] = useState({
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
        const user={email,password}
        signin(user)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    if(isAuth()&& isAuth().role==1){
                        Router.push(`/admin`)
                    }else{
                        Router.push(`/user`)
                    }
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

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
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
                    <button className="btn btn-primary">Signin</button>
                </div>
            </form>
        );
    };

    return <React.Fragment>
        {showError()}
        {showLoading()}
        {showMessage()}
        <LoginGoogle/>
        {showForm && signinForm()}
        <br/>
        <Link href="/auth/password/forgot">
            <a className="btn btn-outline-danger btn-sm">Forgot Password</a>
        </Link>
        </React.Fragment>;
};

export default SigninComponent;