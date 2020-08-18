import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import { fetchUserDetails } from '../api';
import * as myConstClass from '../constants';

function Header(props) {
    const [isLoading, setIsLoading] = useState([false]);
    const [isData, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const response = await fetchUserDetails();
            if (response.status) {
                setData(response);
            } else {
                signOut();
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    function onClick(e) {
        e.preventDefault();
    }

    function signOut(e) {
        localStorage.clear();
        return (
            <Redirect to={'/login'} />
        )
    }


    return (
        <div className="header">
            {
                !localStorage.getItem('tokens') ? <Redirect to='/login' /> : ''
            }
            <div className="header-left">
                <div className="page-title-box" >
                    <h3>
                        {
                            !isLoading
                                ?
                                isData.data.type + " Panel"
                                :
                                null
                        }
                    </h3>
                </div>
            </div>

            <Link id="toggle_btn" to="/" onClick={onClick}>
                <span className="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </Link>

            <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars"></i></a>

            <ul className="nav user-menu">
                <li className="nav-item dropdown has-arrow main-drop">
                    <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                        <span className="user-img">
                            <img src="assets/img/profiles/avatar-21.jpg" alt="" />
                            <span className="status online"></span>
                        </span>
                        <span></span>
                    </a>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={'/profile'} >My Profile</Link>
                        <Link className="dropdown-item" to={'/'} onClick={signOut}>Logout</Link>
                    </div>
                </li>
            </ul>
            <div className="dropdown mobile-user-menu">
                <Link className="nav-link dropdown-toggle" to={'/'} onClick={(event) => event.preventDefault()} data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></Link>
                <div className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item" to={'/profile'} >My Profile</Link>
                    <Link className="dropdown-item" to={'/'} onClick={signOut}>Logout</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;