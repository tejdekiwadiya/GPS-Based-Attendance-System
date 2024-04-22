import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./home.css"
export default function SignIn() {

    // const history = useHistory();
    const navigate = new useNavigate();
    const [enrollment, setEnrollment] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState('');
    const [mac, setMac] = useState('');
    const [error, setError] = useState('');

    // console.log(enrollment, password, usertype)

    const data = { enrollment, password, mac, usertype }

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

    const vaild = async (e) => {
        setTimeout(() => {
            setError('');
        }, 5000)
        try {
            const response = await axios.post("http://localhost:3001/user/signin", data);
            if (response.data.message === 'Empty Input Fields') {
                setError(response.data.message);
            }
            else if (response.data.message === 'Invalid Enrollment input') {
                setError(response.data.message);
            }
            else if (response.data.message === 'Password Not Matched') {
                setError(response.data.message);
            }
            else if (response.data.message === 'MAC Address Not Matched') {
                setError(response.data.message);
            }
            else if (response.data.message === "User Type Not Matched") {
                setError(response.data.message);
            }
            else if (response.data.message === 'User Not Found') {
                setError(response.data.message);
            }
            else if (response.data.status === '302') {
                // setError(response.data.message);
                // console.log(response.data.data);
                navigate('/dashboard');
            }
            else {
                // navigate('/signup');
                setError('Contact To Developer');
            }
        }
        catch (err) {
            console.log(e);
        }
    }


    return (
        <>
            <div className='formclass'>
                <div className="form">
                    <h1 className='heading'>Sign In</h1>

                    <h5 className={`error ${error ? 'error-visible' : ''}`}>{error}</h5>

                    <input className='inputclass' type="text" placeholder="Enrollment/Code" onChange={(e) => setEnrollment(e.target.value)} />
                    <input className='inputclass' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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
                        <button className='btn' onClick={vaild}>Login</button>
                        <button className='btn' onClick={(e) => navigate('/signup')}>SignUp</button>
                    </div>
                </div>
            </div>
        </>
    );
};