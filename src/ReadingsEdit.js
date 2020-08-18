import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { fetchUniquePatientReadings } from './api';
import Header from './include/Header';
import Loader from './include/Loader';
import Sidebar from './include/Sidebar';
import * as myConstClass from './constants';

function Readings(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const id = props.match.params.id;

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const response = await fetchUniquePatientReadings(id);
            setData(response);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const { register, handleSubmit, errors } = useForm();

    function postSubmit(data) {
        setIsLoading(true);
        fetch(myConstClass.BASE_URL + '/addReadings.php', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                blood_pressure: data.blood_pressure, 
                blood_sugar: data.blood_sugar, 
                temprature: data.temprature, 
                heart_rate: data.heart_rate, 
                userToken: localStorage.getItem('tokens')
            })
        }).then((Response) => Response.json())
            .then((result) => {
                if (result.status) {
                    props.history.push({
                        pathname: "/readings",
                        state: {
                            success: "Readings updated successfully"
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
                setErrorMsg("Not able to connect with API try again after sometime.");
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
                                <h3 className="page-title">Readings</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/readings'}>Readings</Link></li>
                                    <li className="breadcrumb-item active">Edit Readings</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <Link to={'/readings'} className="btn add-btn"><i class="fa fa-arrow-left"></i> Back to Readings</Link>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <form onSubmit={handleSubmit(postSubmit)}>
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
                                    <div class="card-header">
                                        <h4 class="card-title mb-0">Readings Info</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group row">
                                            <div class="col-md-4">
                                                <label>Blood Sugar <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[0-9]*$/i,
                                                        message: "Please enter valid number"
                                                    },
                                                })} className="form-control" name="blood_sugar" type="text" placeholder="Blood Sugar" defaultValue={!isLoading ? isData.data.blood_sugar : ''} />
                                                {errors.blood_sugar && <label className="error">{errors.blood_sugar.message}</label>}
                                            </div>
                                            <div class="col-md-4">
                                                <label>Blood Pressure <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[0-9]*$/i,
                                                        message: "Please enter valid number"
                                                    },
                                                })} className="form-control" name="blood_pressure" type="text" placeholder="Blood Pressure" defaultValue={!isLoading ? isData.data.blood_pressure : ''} />
                                                {errors.blood_pressure && <label className="error">{errors.blood_pressure.message}</label>}
                                            </div>
                                            <div class="col-md-4">
                                                <label>Heart Rate <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[0-9]*$/i,
                                                        message: "Please enter valid number"
                                                    },
                                                })} className="form-control" name="heart_rate" type="text" placeholder="Heart Rate" defaultValue={!isLoading ? isData.data.heart_rate : ''}/>
                                                {errors.heart_rate && <label className="error">{errors.heart_rate.message}</label>}
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-md-4">
                                                <label>Temprature <em>*</em></label>
                                                <input ref={register({
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[0-9]*$/i,
                                                        message: "Please enter valid number"
                                                    },
                                                })} className="form-control" name="temprature" type="text" placeholder="Temprature" defaultValue={!isLoading ? isData.data.temprature : ''}/>
                                                {errors.temprature && <label className="error">{errors.temprature.message}</label>}
                                            </div>
                                        </div>
                                        <div class="form-actions text-right">
                                            <button type="submit" class="btn btn-danger">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Readings;