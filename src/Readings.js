import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchPatientReadings } from './api';
import Header from './include/Header';
import Loader from './include/Loader';
import Sidebar from './include/Sidebar';
import * as myConstClass from './constants';

function Readings(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const response = await fetchPatientReadings();
            setData(response);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    function deletePatient(id) {
        setIsLoading(true);
        fetch(myConstClass.BASE_URL + '/deleteReadings.php', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                userToken: localStorage.getItem('tokens')
            })
        }).then((Response) => Response.json())
            .then((result) => {
                if (result.status) {
                    setIsLoading(false);
                    props.history.push({
                        pathname: "/readings",
                        state: {
                            success: "Readings deleted successfully"
                        }
                    });
                    async function fetchData() {
                        const response = await fetchPatientReadings();
                        setData(response);
                        setIsLoading(false);
                    }
                    fetchData();
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
                                    <li className="breadcrumb-item active">Readings</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <Link to={'/readings_add'} className="btn add-btn"><i className="fa fa-plus"></i> Add New Readings</Link>
                            </div>
                        </div>
                    </div>
                    {
                        props.location.state
                            ?
                            props.location.state.success
                                ?
                                <div className="alert alert-success alert-dismissible" role="alert">
                                    <button type="button" className="close" data-dismiss="alert">
                                    </button> {props.location.state.success}
                                </div>
                                :
                                null
                            :
                            null
                    }
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
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped custom-table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Blood Sugar</th>
                                        <th>Blood Pressure</th>
                                        <th>Heart Rate</th>
                                        <th>Temprature</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {

                                    !isLoading
                                        ?
                                        <tbody>
                                            {
                                                isData.data.map(function (data) {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>{data.count}</td>
                                                            <td>{data.updated}</td>
                                                            <td>{data.blood_sugar}</td>
                                                            <td>{data.blood_pressure}</td>
                                                            <td>{data.heart_rate}</td>
                                                            <td>{data.temprature}</td>
                                                            <td className="text-right">
                                                                <div className="dropdown dropdown-action">
                                                                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                                                    <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end">
                                                                        <Link className="dropdown-item border-0 btn-transition btn passData" to={'/readings_edit/' + data.id} title="Edit"><i className="fa fa-pencil"></i> Edit</Link>
                                                                        <Link className="dropdown-item border-0 btn-transition btn passData" title="Delete" onClick={() => { if (window.confirm('Are you sure you want to delete this?')) { deletePatient(data.id) }; }}><i className="fa fa-trash"></i> Delete</Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        :
                                        null
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Readings;