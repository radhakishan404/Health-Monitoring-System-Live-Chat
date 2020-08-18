import React, { useState, useEffect } from "react";
import { fetchUniquePatient } from './api';
import { Link } from 'react-router-dom';
import Header from './include/Header';
import Loader from './include/Loader';
import Sidebar from './include/Sidebar';
import { Bar } from 'react-chartjs-2';

function PatientDetails(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isChartData, setChartData] = useState();

    useEffect(() => {
        setIsLoading(true);
        const id = props.match.params.id;
        async function fetchData() {
            const response = await fetchUniquePatient(id);
            setData(response);
            setChartData(response.readingJson)
            setIsLoading(false);
        }
        fetchData();
    }, []);

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
                                <h3 className="page-title">Patient</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/patient_list'}>Patient List</Link></li>
                                    <li className="breadcrumb-item active">Patient Details</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    {
                                        !isLoading
                                            ?
                                            <div className="profile-view">
                                                <div className="profile-basic">
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="profile-info-left">
                                                                <h3 className="user-name m-t-0">{isData.userData.name}</h3>
                                                                <h5 className="company-role m-t-0 mb-0">{isData.userData.type}</h5>
                                                                <div className="staff-id">{isData.patientData!==null?isData.patientData.description:''}</div>
                                                                <div className="staff-msg"><Link to={'/doctor_message/' + isData.userData.id} className="btn btn-custom">Send Message</Link></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7">
                                                            <ul className="personal-info">
                                                                <li>
                                                                    <span className="title">Phone:</span>
                                                                    <span className="text"><a href={'tel:' + isData.userData.mobile}>{isData.userData.mobile}</a></span>
                                                                </li>
                                                                <li>
                                                                    <span className="title">Email:</span>
                                                                    <span className="text"><a href={'mailto:' + isData.userData.email}>{isData.userData.email}</a></span>
                                                                </li>
                                                                <li>
                                                                    <span className="title">Address:</span>
                                                                    <span className="text">{isData.patientData!==null?isData.patientData.address:''}</span>
                                                                </li>
                                                                <li>
                                                                    <span className="title">City:</span>
                                                                    <span className="text">{isData.patientData!==null?isData.patientData.city:''}</span>
                                                                </li>
                                                                <li>
                                                                    <span className="title">State:</span>
                                                                    <span className="text">{isData.patientData!==null?isData.patientData.state:''}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="col-md-12">
                                                <h4>Loading...</h4>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Patients Readings</h3>
                                    {
                                        !isLoading
                                            ?
                                            isChartData.length !== 0
                                                ?
                                                <Bar data={isChartData} />
                                                :
                                                null
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PatientDetails;