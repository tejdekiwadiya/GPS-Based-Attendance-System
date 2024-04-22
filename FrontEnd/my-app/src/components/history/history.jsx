import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'
import HeaderStudent from '../header/HeaderStudent';
import "./history.css";

export default function History() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    // const [download, setDownload] = useState([]);
    const [mode, setMode] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/user/history");
                if (response.data.message === 'Data Not Found') {
                    setMode('true');
                    setError("Data Not Found");
                }
                else {
                    // setDownload(response.data.data);
                    setData(response.data.data);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const renderCards = () => {
        return (
            <>
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
            </>)
    };

    const downloadButton = () => {
        if (data.length === 0) {
            setError("No data available to download.");
            return;
        }
        // Extracting only required fields from the data
        const excelData = data.map((item, index) => ({
            'Sr. No.': index + 1,
            'Enrollment': item.enrollment,
            'Name': item.name,
            'Date & Time': item.date_time,
            'Status': item.attendance
        }));

        // Creating Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Adding worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'MongoDB Data');

        // Generating Excel file and triggering download
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
            <HeaderStudent />
            <div className="container-download">
                <button className="button-download" onClick={downloadButton} disabled={mode} type="submit">Download Report</button>
            </div>
            {error ? <h3 className='container2 text-danger'>{error}</h3> : renderCards()}
        </>
    );
}
