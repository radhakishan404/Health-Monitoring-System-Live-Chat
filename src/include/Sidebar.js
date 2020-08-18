import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchUserDetails } from '../api';

function Sidebar(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const response = await fetchUserDetails();
            setData(response);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">

                    {
                        !isLoading
                            ?
                            isData.data.type === 'Patient'
                                ?
                                <ul>
                                    <li className={props.data.location.pathname === '/' ? 'active' : ''}>
                                        <Link to={'/'}><i className="fa fa-dashboard"></i> <span>Dashboard</span></Link>
                                    </li>
                                    <li className={props.data.location.pathname === '/readings' ? 'active' : props.data.location.pathname === '/readings_add' ? 'active' : props.data.match.path === '/readings_edit/:id' ? 'active' : null}>
                                        <Link to={'/readings'}><i className="fa fa-book"></i> <span>Readings</span></Link>
                                    </li>
                                    <li className={props.data.location.pathname === '/patient_message_list' ? 'active' : props.data.match.path === '/patient_message/:id' ? 'active' : ''}>
                                        <Link to={'/patient_message_list'}><i className="fa fa-inbox"></i> <span>Message Box</span></Link>
                                    </li>
                                </ul>
                                :
                                null
                            :
                            null
                    }
                    {
                        !isLoading
                            ?
                            isData.data.type === 'Doctor'
                                ?
                                <ul>
                                    <li className={props.data.location.pathname === '/doctor_message_list' ? 'active' : props.data.match.path === '/doctor_message/:id' ? 'active' : ''}>
                                        <Link to={'/doctor_message_list'}><i className="fa fa-inbox"></i> <span>Message Box</span></Link>
                                    </li>
                                    <li className={props.data.location.pathname === '/patient_list' ? 'active' : props.data.match.path === '/patient_details/:id' ? 'active' : ''}>
                                        <Link to={'/patient_list'}><i className="fa fa-users"></i> <span>Patient List</span></Link>
                                    </li>
                                </ul>
                                :
                                null
                            :
                            null
                    }
                </div>
            </div>
        </div >
    )
}

export default Sidebar;