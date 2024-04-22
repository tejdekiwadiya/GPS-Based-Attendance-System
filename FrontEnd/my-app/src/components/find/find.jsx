import React, { useState } from 'react';
import HeaderFaculty from '../header/HeaderFaculty'
import axios from 'axios';
import * as XLSX from 'xlsx'

export default function Find() {
    const [find, setFind] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState(false); // Changed from string to boolean

    const result = async () => {
        setData([]);
        if (!find) {
            setError("Please enter valid enrollment");
            setData([]);
        }
        else {
            try {
                const response = await axios.get(`http://localhost:3001/user/find/${find}`);
                if (response.data.message === 'Please enter valid enrollment') {
                    setError(response.data.message);
                }
                else if (response.data.message === 'User Data Not Found') {
                    setError(response.data.message);
                    setData([]); // Clear existing data if no results found
                }
                else {
                    setData(response.data.data);
                    setError(null); // Clear any existing error
                    setMode(false); // Reset mode
                }
            } catch (error) {
                setError("An error occurred while fetching data. Please try again later.");
                console.log(error);
            }
        }
    }

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

    const downloadButton = () => {
        if (data.length === 0) {
            setError("No data available to download");
            return;
        }

        const excelData = data.map((item, index) => ({
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

    return (
        <>
            <HeaderFaculty />
            <div className="row pt-4">
                <div className="col-md-5 mx-auto">
                    <div className="input-group">
                        <input className="form-control border-end-0 border" type="search" placeholder="Enter Enrollment" onChange={(e) => setFind(e.target.value)} />
                        <span className="input-group-append">
                            <button className="btn btn-outline-secondary bg-white border border-start-4 rounded-0" type="button" onClick={result}>
                                <big>&#128270;</big>
                            </button>
                            <button className={`btn btn-outline-secondary bg-white border-start-0 rounded-start-0 border ${mode ? 'disabled' : ''}`} type="button" onClick={downloadButton}>
                                <big>📃</big>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            {error && <h3 className='container2 text-danger'>{error}</h3>}
            {renderCards()}
        </>
    );
}
