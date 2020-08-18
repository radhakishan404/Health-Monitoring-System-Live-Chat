import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from 'react-router-dom';
import { fetchDoctorMessageData } from './api';
import Header from './include/Header';
import Loader from './include/Loader';
import Sidebar from './include/Sidebar';
import * as myConstClass from './constants';
import { useForm } from "react-hook-form";

function DoctorMessage(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setData] = useState([]);
    const [isMessage, setMessage] = useState("");
    const userToken = localStorage.getItem('tokens');

    const { register, handleSubmit, errors } = useForm();

    let id = props.match.params.id;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        setInterval(() => {
            async function fetchData() {
                const response = await fetchDoctorMessageData(id);
                setData(response);
                setIsLoading(false);
                if (isLoading) {
                    function scrollToBottom() {
                        if (messagesEndRef.current) {
                            messagesEndRef && messagesEndRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
                        }
                    }

                    scrollToBottom();
                }
            }
            fetchData();
        }, 1000);
    }, []);

    function sendMessage() {
        setIsLoading(true);
        fetch(myConstClass.BASE_URL + '/sendMessage.php', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: isMessage,
                to_id: id,
                userToken: userToken
            })
        }).then((Response) => Response.json())
            .then((result) => {
                if (result.status) {
                    async function fetchData() {
                        const response = await fetchDoctorMessageData(id);
                        setData(response);
                        setIsLoading(false);
                    }
                    fetchData();
                } else {
                    setIsLoading(false);
                }
            }).catch(e => {
                setIsLoading(false);
            });
    }

    function messageUpdate(value) {
        setMessage(value);
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

            <div className="page-wrapper" style={{ minHeight: window.innerHeight + 'px', }}>
                <div className="chat-main-row">
                    <div className="chat-main-wrapper">
                        {
                            !isLoading
                                ?
                                <div className="col-lg-9 message-view task-view">
                                    <div className="chat-window">
                                        <div className="fixed-header">
                                            <div className="navbar">
                                                <div className="user-details mr-auto">
                                                    <div className="user-info float-left">
                                                        <span>{isData.patientDetails.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-contents">
                                            <div className="chat-content-wrap">
                                                <div className="chat-wrap-inner">
                                                    <div className="chat-box">
                                                        <div className="chats" id="scrollChat">
                                                            {
                                                                isData.patientChat.length > 0
                                                                    ?
                                                                    isData.patientChat.map(function (data) {
                                                                        return (
                                                                            <div className="chat" key={data.id}>
                                                                                {
                                                                                    data.to_id === id && data.message !== ''
                                                                                        ?
                                                                                        <div className="chat chat-right">
                                                                                            <div className="chat-body">
                                                                                                <div className="chat-bubble">
                                                                                                    <div className="chat-content">
                                                                                                        <p>{data.message}</p>
                                                                                                        <span className="chat-time">{data.created}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        :
                                                                                        <div className="chat chat-left">
                                                                                            <div className="chat-body">
                                                                                                <div className="chat-bubble">
                                                                                                    <div className="chat-content">
                                                                                                        <p>{data.message}</p>
                                                                                                        <span className="chat-time">{data.created}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                }
                                                                            </div>
                                                                        )
                                                                    })
                                                                    :
                                                                    <h4>Start chat by sending the first message.</h4>
                                                            }
                                                        </div>
                                                        <div ref={messagesEndRef} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-footer">
                                            <div className="message-bar">
                                                <div className="message-inner">
                                                    <div className="message-area">
                                                        <div className="input-group">
                                                            <form onSubmit={handleSubmit(sendMessage)} style={{ width: "100%" }}>
                                                                <div className="form-group row">
                                                                    <div className="col-md-12" style={{ display: "flex" }}>
                                                                        <textarea className="form-control" rows="5" placeholder="Type message..." onChange={(e) => messageUpdate(e.target.value)}></textarea>
                                                                        <span className="input-group-append">
                                                                            <button className="btn btn-custom" type="submit"><i className="fa fa-send"></i></button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <h5>Loading...</h5>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DoctorMessage;