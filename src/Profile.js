import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as myConstClass from './constants';
import { fetchUserDetails } from './api';
import Header from './include/Header';
import Loader from './include/Loader';
import Sidebar from './include/Sidebar';

function Profile(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const response = await fetchUserDetails();
            setData(response);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const { register, handleSubmit, errors, watch } = useForm();

    function updateProfile(data) {
        data['userToken'] = localStorage.getItem('tokens');
        setIsLoading(true);
        fetch(myConstClass.BASE_URL+'/ProfileUpdate.php', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((Response) => Response.json())
            .then((result) => {
                if (result.status) {
                    setIsSuccess(true);
                    setIsLoading(false);
                    setIsError(false);
                    setErrorMsg('');
                    setSuccessMsg(result.message);
                } else {
                    setIsLoading(false);
                    setIsError(true);
                    setErrorMsg(result.message);
                    setSuccessMsg('');
                }
            }).catch(e => {
                setIsLoading(false);
                setIsError(true);
                setErrorMsg("Unable to update. Try again after some time.");
                console.log(e);
            });
    }

    return (
        <div className="main-wrapper">
            {
                isLoading
                    ?
                    <Loader />
                    :
                    null
            }
            <Header data={props} />
            <Sidebar data={props} />

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Profile</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Profile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">User Info</h4>
                                </div>
                                <div className="card-body">
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
                                    {
                                        isSuccess
                                            ?
                                            <div className="alert alert-success alert-dismissible" role="alert">
                                                <button type="button" className="close" data-dismiss="alert">
                                                </button>
                                                {successMsg}
                                            </div>
                                            :
                                            null
                                    }
                                    <form onSubmit={handleSubmit(updateProfile)}>
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <div className="form-group row">
                                                    <div className="col-sm-4">
                                                        <label>Name <em>*</em></label>
                                                        <input ref={register({ required: "This field is required" })} className="form-control" name="name" defaultValue={!isLoading ? isData.data.name : ''} />
                                                        {errors.name && <label className="error">{errors.name.message}</label>}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label>Mobile <em>*</em></label>
                                                        <input ref={register({
                                                            required: "This field is required",
                                                            pattern: {
                                                                value: /^[0-9]*$/i,
                                                                message: "Please enter valid mobile number"
                                                            },
                                                        })} className="form-control" name="mobile" defaultValue={!isLoading ? isData.data.mobile : ''} />
                                                        {errors.mobile && <label className="error">{errors.mobile.message}</label>}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label>Email <em>*</em></label>
                                                        <input ref={register({
                                                            required: "This field is required",
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: "Please enter valid email address"
                                                            }
                                                        })} className="form-control" name="username" type="username" placeholder="Email Address" defaultValue={!isLoading ? isData.data.email : ''} />
                                                        {errors.username && <label className="error">{errors.username.message}</label>}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-sm-6">
                                                        <label>Address</label>
                                                        <textarea ref={register} className="form-control" name="address" defaultValue={!isLoading ? isData.data.address : ''}></textarea>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label>Description</label>
                                                        <textarea ref={register} className="form-control" name="description" defaultValue={!isLoading ? isData.data.description : ''}></textarea>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-sm-4">
                                                        <label>City</label>
                                                        <input ref={register} className="form-control" name="city" defaultValue={!isLoading ? isData.data.city : ''} />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label>State</label>
                                                        <input ref={register} className="form-control" name="state" defaultValue={!isLoading ? isData.data.state : ''} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h6 className="panel-title"><i className="icon-office"></i>Change Password</h6>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="form-group">
                                                        <div className="row">
                                                            <div className="col-sm-4">
                                                                <label>Old Password </label>
                                                                <input ref={register} type="password" className="form-control" name="old_password" id="old-password" />
                                                                <span className="help-block">Leave blank if you don't want to change password</span>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <label>New Password </label>
                                                                <input ref={register} type="password" className="form-control" name="password" id="password" />

                                                            </div>
                                                            <div className="col-sm-4">
                                                                <label>Retype New Password </label>
                                                                <input ref={register({
                                                                    validate: (value) => {
                                                                        return value === watch('password') || "Passwords don't match."
                                                                    }
                                                                })} type="password" className="form-control" name="password2" id="password2" />
                                                                {errors.password2 && <label className="error">{errors.password2.message}</label>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-actions text-right">
                                                <button type="submit" name="update" id="update" className="btn btn-danger"><i className="icon-signup"></i>Update Profile</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile;