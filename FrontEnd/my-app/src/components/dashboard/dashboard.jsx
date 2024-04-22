import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import "./dashboard.css";
import HeaderFaculty from '../header/HeaderFaculty';
import HeaderStudent from '../header/HeaderStudent';
import data from './../assets/data.json';

export default function DashBoard() {
    const [usertype, setUsertype] = useState('');
    const [mode, setMode] = useState(false);
    const [mode1, setMode1] = useState(false);
    const [error, setError] = useState(null);
    const [userCoords, setUserCoords] = useState(null);
    const [targetCoords, setTargetCoords] = useState({ latitude: 0, longitude: 0 }); // Define targetCoords state variable
    const [isInRange, setIsInRange] = useState(false);

    useEffect(() => {
        setUsertype(data.usertype);
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setUserCoords({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    const latitude = parseFloat(position.coords.latitude.toFixed(6));
                    const longitude = parseFloat(position.coords.longitude.toFixed(6));
                    console.log(`Your Latitude and Longitude is: ${latitude.toFixed(6)}, ${longitude}`);
                },
                error => {
                    console.error('Error getting user position:', error);
                    setError('Error getting user position. Please allow location access.');
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setError('Geolocation is not supported by this browser.');
        }
    };

    const attendance = async () => {
        try {
            const response = await axios.post("http://localhost:3001/user/dashboardAttendance");
            if (response.data.status === 'SUCCESS') {
                setMode(true);
                alert("Attendance Marked");
            } else {
                setError('Failed to mark attendance.');
            }
        } catch (err) {
            console.error('Error marking attendance:', err);
            setError('Error marking attendance. Please try again later.');
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    //Rajkot Bashed Location
    useEffect(() => {
        setTargetCoords({ // Move the initialization of targetCoords here
            latitude: 22.29001,
            longitude: 70.76711
        });
    }, []);
    
    //Marwadi Bashed Location
    // useEffect(() => {
    //     setTargetCoords({ // Move the initialization of targetCoords here
    //         latitude: 22.3674,
    //         longitude: 70.7972
    //     });
    // }, []);

    useEffect(() => {
        const getDistance = (lat1, lon1, lat2, lon2) => {
            const earthRadius = 6378137;
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = earthRadius * c;
            return distance;
        };

        const toRadians = (deg) => {
            return deg * (Math.PI / 180);
        };

        if (userCoords) {
            const distance = getDistance(userCoords.latitude, userCoords.longitude, targetCoords.latitude, targetCoords.longitude);
            setIsInRange(distance <= 500);
        }
    }, [userCoords, targetCoords]);

    function Student() {
        return (
            <>
                <HeaderStudent />
                <div className="container1">
                    {isInRange ? (
                        <button className="button-28" type="submit" onClick={attendance} disabled={mode}>
                            Mark Attendance
                        </button>
                    ) : (
                        <button className="btn btn-danger" type="submit">
                            Your Attendance Not Taking
                            <span className="btn btn-outline-light p-2 m-2" type="submit" onClick={(e) => { alert('You are not in Campus Area') }}>
                                Why!
                            </span>
                        </button>
                    )}
                </div>
            </>
        );
    }

    function Faculty() {
        const [data, setData] = useState([]);
        const [download, setDownload] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get("http://localhost:3001/user/historyall");
                    if (response.data.message === 'Data Not Found') {
                        setError("Data Not Found");
                        setMode1(true);
                    } else {
                        setDownload(response.data.data);
                        setData(response.data.data);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Error fetching data. Please try again later.');
                }
            };

            fetchData();
        }, []);

        const downloadButton = () => {
            const excelData = download.map((item, index) => ({
                'Sr. No.': index + 1,
                'Enrollment': item.enrollment,
                'Name': item.name,
                'Date & Time': item.date_time,
                'Status': item.attendance
            }));

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'MongoDB Data');

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const excelUrl = URL.createObjectURL(excelBlob);

            const link = document.createElement('a');
            link.href = excelUrl;
            link.setAttribute('download', 'Report.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const renderCards = () => {
            return (
                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100">
                                <table>
                                    <thead>
                                        <tr className="table100-head">
                                            <th className="column1">Sr. No.</th>
                                            <th className="column2">Enrollment</th>
                                            <th className="column3">Name</th>
                                            <th className="column4">Date & Time</th>
                                            <th className="column5">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <td className="column1">{index + 1}</td>
                                                <td className="column2">{item.enrollment}</td>
                                                <td className="column3">{item.name}</td>
                                                <td className="column4">{item.date_time}</td>
                                                <td className="column5">{item.attendance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <>
                <HeaderFaculty />
                <div className="container-download">
                    <button className="button-download" onClick={downloadButton} disabled={mode1} type="submit">Download Report</button>
                </div>
                {error ? <h3 className='container2 text-danger'>{error}</h3> : renderCards()}
            </>
        );
    }

    return (
        <>
            {usertype === 'Student' ? <Student /> : <Faculty />}
        </>
    );
}
