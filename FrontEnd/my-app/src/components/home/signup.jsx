import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css"

export default function SignUp() {
    const navigate = new useNavigate();
    const [enrollment, setEnrollment] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [classs, setClasss] = useState('');
    const [department, setDepartment] = useState('');
    const [mac, setMac] = useState('');
    const [usertype, setUsertype] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMacAddress = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/setmac');
                const macAddress = response.data.message;
                setMac(macAddress);
            } catch (error) {
                console.error('Error fetching MAC address:', error);
            }
        };
        fetchMacAddress();
    }, []);

    const data = { enrollment, name, password, email, phone, classs, department, mac, usertype }

    const valid = async (e) => {
        setTimeout(() => {
            setError('');
        }, 5000)
        try {
            const response = await axios.post("http://localhost:3001/user/signup", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.message === 'Empty Input Fields') {
                setError(response.data.message);
            }
            else if (response.data.message === 'Invalid Enrollment input') {
                setError(response.data.message);
            }
            else if (response.data.message === 'Invalid name input') {
                setError(response.data.message);
            }
            else if (response.data.message === 'Invalid email input') {
                setError(response.data.message);
            }
            else if (response.data.message === 'Invalid phone input') {
                setError(response.data.message);
            }
            else if (response.data.message === 'User Already Exists') {
                setError(response.data.message);
            }
            else if (response.data.message === 'Mac Address Already Used') {
                setError(response.data.message);
            }
            else if (response.data.status === 'SUCCESS') {
                setError(response.data.message);
                console.log("Data Saved");
            }
            else if (response.data.status === 'ERROR') {
                setError("Internal Server Error");
                console.warn(response.data.message);
            }
            else {
                console.log("Contact To Developer");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='formclass'>
                <div className="form">
                    <h1 className='heading'>Sign Up</h1>

                    <h5 className={`error ${error ? 'error-visible' : ''}`}>{error}</h5>

                    <input className='inputclass' type="text" placeholder="Enrollment/Code" onChange={(e) => setEnrollment(e.target.value)} />
                    <input className='inputclass' type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    <input className='inputclass' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input className='inputclass' type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input className='inputclass' type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                    <input className='inputclass text-uppercase' type="text" placeholder="Class" onChange={(e) => setClasss(e.target.value)} />
                    <input className='inputclass text-uppercase' type="text" placeholder="Department" onChange={(e) => setDepartment(e.target.value)} />
                    <input className='inputclass' type="text" placeholder="MAC Address" value={mac} disabled />
                    <div className='selection'>
                        <label className="container">
                            <input className='inputclass' type="radio" name="userType" value="Student" onClick={(e) => setUsertype(e.target.value)} />
                            Student
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">
                            <input className='inputclass' type="radio" name="userType" value="Faculty" onClick={(e) => setUsertype(e.target.value)} />
                            Faculty
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className='button'>
                        <button className='btn' onClick={valid}>SignUp</button>
                        <button className='btn' onClick={(e) => navigate('/')}>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
};