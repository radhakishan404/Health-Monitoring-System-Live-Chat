import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import { useForm } from "react-hook-form";
import * as myConstClass from './constants';

function ForgotPassword(props) {

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const { register, handleSubmit, errors } = useForm();

    function postSubmit(data) {
        setIsLoading(true);
        fetch(myConstClass.BASE_URL+'/ForgotPassword.php', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.username,
                type: data.type,
            })
        }).then((Response) => Response.json())
            .then((result) => {
                if (result.status) {
                    props.history.push({
                        pathname: "/login",
                        state: {
                            pass: result.new_password
                        }
                    });
                } else {
                    setIsLoading(false);
                    setIsError(true);
                    setErrorMsg(result.message);
                }
            }).catch(e => {
                setIsLoading(false);
                setIsError(true);
                setErrorMsg("Something went wrong try again");
                console.log(e);
            });
    }

    return (
        <div className="account-page">
            {
                localStorage.getItem('tokens') ? <Redirect to='/' /> : ''
            }
            {
                isLoading ?
                    <div className="gif-loader">
                        <img src="https://www.voya.ie/Interface/Icons/LoadingBasketContents.gif" alt="loader" />
                    </div>
                    : null
            }
            <div className="main-wrapper">
                <div className="account-content">
                    <div className="container">
                        <div className="account-logo">
                            <img src={logo} width="100" alt="Health Monitoring System Logo" />
                        </div>
                        <div className="account-box">
                            <div className="account-wrapper">
                                <h3 className="account-title">Forgot Password?</h3>
                                <p className="account-subtitle">Enter your email to get a new password</p>
                                {
                                    isError
                                        ?
                                        <div className="alert alert-danger alert-dismissible" role="alert">
                                            <button type="button" className="close" data-dismiss="alert">
                                            </button>
                                            {errorMsg}
                                        </div>
                                        :
                                        null
                                }
                                <form onSubmit={handleSubmit(postSubmit)}>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input ref={register({
                                            required: "This field is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Please enter valid email address"
                                            }
                                        })} className="form-control" name="username" type="username" placeholder="Email Address" />
                                        {errors.username && <label className="error">{errors.username.message}</label>}
                                    </div>

                                    <div className="form-group">
                                        <label>Type</label>
                                        <select ref={register} className="form-control" name="type">
                                            <option value="Doctor">Doctor</option>
                                            <option value="Patient">Patient</option>
                                        </select>
                                    </div>

                                    <div className="form-group text-center">
                                        <button className="btn btn-primary account-btn" type="submit" >Reset </button>
                                    </div>
                                    <div className="account-footer">
                                        <p>Remember your password?<Link to={'/login'}>Login</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;