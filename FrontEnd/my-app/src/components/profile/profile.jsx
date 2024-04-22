import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import data from './../assets/data.json';
import HeaderFaculty from '../header/HeaderFaculty';
import HeaderStudent from '../header/HeaderStudent';
import "./profile.css";

export default function UserProfile() {

    const navigator = useNavigate();
    const [enrollment, setEnrollment] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [classs, setClasss] = useState('');
    const [department, setDepartment] = useState('');
    const [mac, setMac] = useState('');
    const [updated, setUpdated] = useState('');
    const [usertype, setUsertype] = useState('');
    const [edit, setEdit] = useState(true);

    useEffect(() => {
        setEnrollment(data.enrollment);
        setName(data.name);
        setClasss(data.classs);
        setDepartment(data.department);
        setEmail(data.email);
        setMac(data.mac);
        setPhone(data.phone);
        setUsertype(data.usertype);
    }, []);

    const updated_data = { enrollment, name, email, phone, classs, department }

    const update = async () => {
        try {
            const response = await axios.post("http://localhost:3001/user/update", updated_data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.message === 'Empty Input Fields' || response.data.message === 'Invalid Enrollment input' || response.data.message === 'Invalid name input' || response.data.message === 'Invalid email input' || response.data.message === 'Invalid phone input') {
                setUpdated(<div className="d-flex justify-content-between align-items-center mb-3" >
                    <h3 className="text-danger">{response.data.message}</h3></div>);
            }
            else if (response.data.status === '200') {
                setUpdated(<div className="d-flex justify-content-between align-items-center mb-3" >
                    <h2 className="text-success">{response.data.message}</h2></div>);
                setTimeout((() => {
                    navigator('/');
                }), 4000)
            }
            else if (response.data.status === 'ERROR') {
                setUpdated(<div className="d-flex justify-content-between align-items-center mb-3" >
                    <h2 className="text-danger">{response.data.message}</h2></div>);
                console.warn(response.data.message);
            }
            else {
                console.log("Contact To Developer");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    function Navbar() {
        if (usertype === 'Student') {
            return <HeaderStudent />;
        }
        else {
            return <HeaderFaculty />;
        }
    }
    const handleEdit = (e) => {
        setEdit((prevEdit) => !prevEdit);
    };

    return (
        <>
            <Navbar />

            <div className="profile">
                <div className="profileclass">
                    <div className="container rounded bg-white mb-5">
                        <div className="row">

                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img className="rounded-circle mt-5" width="150px" alt='image1' src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">{name}</span><span className="text-black-50"></span>{email}<span> </span></div>
                            </div>

                            <div className="col-md-8 border-right">
                                {/* <div className="border-right"> */}
                                <div className="p-3 py-5">
                                    {updated}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h3 className="text-right">Profile Settings<br /><span className="labels fs-6 pb-1 text-danger">After Every Change User Automatically Logged Out</span></h3>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="labels fs-6 pb-1">Name</label>
                                            <input
                                                type="text"
                                                className='form-control'
                                                placeholder='Name'
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={edit}
                                                value={name}
                                            /></div>
                                        <div className="col-md-6">
                                            <label className="labels fs-6 pb-1">Enrollment</label>
                                            <input
                                                type="text"
                                                className='form-control'
                                                placeholder="Enrollment"
                                                value={enrollment}
                                                onChange={(e) => setEnrollment(e.target.value)}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label className="labels fs-6 pb-1 pt-3">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder='Email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={edit}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="labels fs-6 pb-1 pt-3">Phone</label>
                                            <input
                                                type="text"
                                                className='form-control'
                                                placeholder="Phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                disabled={edit}
                                            /></div>
                                        <div className="col-md-6">
                                            <label className="labels fs-6 pb-1 pt-3">Class</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Class"
                                                value={classs}
                                                onChange={(e) => setClasss(e.target.value)}
                                                disabled={edit}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="labels fs-6 pb-1 pt-3">Department</label>
                                            <input
                                                type="text"
                                                className='form-control'
                                                placeholder="Department"
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                disabled={edit}
                                            /></div>
                                        <div className="col-md-6">
                                            <label className="labels fs-6 pb-1 pt-3">User Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="User Type"
                                                value={usertype}
                                                onChange={(e) => setClasss(e.target.value)}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label className="labels fs-6 pb-1 pt-3">MAC Address</label>
                                            <input
                                                type="text"
                                                className='form-control'
                                                placeholder="MAC Address"
                                                value={mac}
                                                // onChange={(e) => setMac(e.target.value)}
                                                disabled={true}
                                            /></div>
                                    </div>

                                    <div className="row pt-3 text-center">
                                        <div className="col-md-6  pb-1 pt-3">
                                            <button
                                                onClick={handleEdit}
                                                className="btn btn-outline-warning p-2 form-control"
                                                type="button"
                                            >
                                                Edit
                                            </button>
                                        </div>

                                        <div className="col-md-6  pb-1 pt-3">
                                            <button
                                                onClick={update}
                                                className="btn btn-outline-success p-2 form-control"
                                                type="button"
                                            >
                                                Update Profile
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};