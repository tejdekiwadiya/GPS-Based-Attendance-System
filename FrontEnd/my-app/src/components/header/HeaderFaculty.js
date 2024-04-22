import React from "react";
import { Link } from "react-router-dom";
import logo from './../assets/favicon.jpg';
import './header.css';

export default function HeaderFaculty() {
    return (
        <div id="nav">
            <div className="navbar navbar-light bg-light navbar-expand-md px-3 nav-link">
                <Link to='/dashboard' className="navbar-brand" style={{ cursor: 'pointer' }}>
                    <img src={logo} alt="" width="50px" height="50px" />
                    <span className="logotext">GPS Based Attendance System</span>
                </Link>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="menu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mx-3">
                            <Link to="/dashboard" className="nav-link text-center">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/find" className="nav-link text-center">Find</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/profile" className="nav-link text-center">Profile</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link to="/" className="nav-link text-bg-danger rounded-3 text-center">Log Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}