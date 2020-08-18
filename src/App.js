import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import PatientList from "./PatientList";
import PatientDetails from "./PatientDetails";
import DoctorMessage from "./DoctorMessage";
import DoctorMessageList from "./DoctorMessageList";
import Readings from "./Readings";
import ReadingsAdd from "./ReadingsAdd";
import ReadingsEdit from "./ReadingsEdit";
import PatientMessageList from "./PatientMessageList";
import PatientMessage from "./PatientMessage";
import { fetchUserDetails } from './api';

import { AuthContext } from "./Auth";

function App(props) {
    const [authTokens, setAuthTokens] = useState(localStorage.getItem("tokens") || "");
    const [isData, setData] = useState([]);

    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetchUserDetails();
            setData(response);
        }
        if (localStorage.getItem("tokens") !== '') {
            fetchData();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/patient_list" component={PatientList} />
                <PrivateRoute path="/patient_details/:id" component={PatientDetails} />
                <PrivateRoute path="/doctor_message/:id" component={DoctorMessage} />
                <PrivateRoute path="/doctor_message_list" component={DoctorMessageList} />
                <PrivateRoute path="/readings" component={Readings} />
                <PrivateRoute path="/readings_add" component={ReadingsAdd} />
                <PrivateRoute path="/readings_edit/:id" component={ReadingsEdit} />
                <PrivateRoute path="/patient_message_list" component={PatientMessageList} />
                <PrivateRoute path="/patient_message/:id" component={PatientMessage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/forgotpassword" component={ForgotPassword} />
            </Router>
        </AuthContext.Provider>);
}

export default App;