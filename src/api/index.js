import * as myConstClass from '../constants';

export const fetchUserDetails = async () => {
    const userToken = localStorage.getItem('tokens');
    const res = await fetch(myConstClass.BASE_URL + '/getUserDetails.php', {
        method: "POST",
        body: JSON.stringify({ userToken: userToken }),
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        }
    });
    const body = await res.json();
    return body;
}

export const fetchPatientList = async (keyword) => {
    const userToken = localStorage.getItem('tokens');
    const res = await fetch(myConstClass.BASE_URL + '/getPatientList.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ userToken: userToken, search: keyword }),
    });
    const body = await res.json();
    return body;
}

export const fetchUniquePatient = async (id) => {
    const userToken = localStorage.getItem('tokens');
    const res = await fetch(myConstClass.BASE_URL + '/getUniquePatient.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ userToken: userToken, id: id }),
    });
    const body = await res.json();
    return body;
}

export const fetchUniquePatientByToken = async () => {
    const userToken = localStorage.getItem('tokens');
    const res = await fetch(myConstClass.BASE_URL + '/getUniquePatientByToken.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ userToken: userToken }),
    });
    const body = await res.json();
    return body;
}


export const fetchDoctorMessageData = async (id) => {
    const userToken = localStorage.getItem('tokens');
    const res = await fetch(myConstClass.BASE_URL + '/getDcotorMessageData.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ userToken: userToken, id: id }),
    });
    const body = await res.json();
    return body;
}

export const fetchPatientMessageData = async (id) => {
    const userToken = localStorage.getItem('tokens');
    const res = await fetch(myConstClass.BASE_URL + '/getPatientMessageData.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ userToken: userToken, id: id }),
    });
    const body = await res.json();
    return body;
}

export const fetchPatientReadings = async () => {
    const userToken = localStorage.getItem('tokens');
    const res = await fetch(myConstClass.BASE_URL + '/fetchPatientReadings.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ userToken: userToken }),
    });
    const body = await res.json();
    return body;
}
export const fetchUniquePatientReadings = async (id) => {
    const userToken = localStorage.getItem('tokens');
    const res = await fetch(myConstClass.BASE_URL + '/fetchUniquePatientReadings.php', {
        method: "POST",
        header: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify({ userToken: userToken, id: id }),
    });
    const body = await res.json();
    return body;
}