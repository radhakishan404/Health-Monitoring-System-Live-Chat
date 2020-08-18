import React, { useState, useEffect } from "react";
import { fetchUserDetails, fetchUniquePatientByToken } from './api';
import { Redirect } from 'react-router-dom';
import Header from './include/Header';
import Loader from './include/Loader';
import Sidebar from './include/Sidebar';
import { Bar } from 'react-chartjs-2';

function Home(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isChartData, setChartData] = useState();

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const response = await fetchUserDetails();
            setData(response);

            const response2 = await fetchUniquePatientByToken();
            setChartData(response2.readingJson);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    if (!isLoading) {
        if (isData.data.type !== 'Patient') {
            return <Redirect to={'/patient_list'} />;
        }
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

            <Header />
            <Sidebar data={props} />

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Dashboard</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Readings Details</li>
                                </ul>
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
                                                <h4>No Record Found...</h4>
                                            :
                                            <h4>No Record Found...</h4>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;