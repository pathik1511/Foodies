import React, { Component, useState } from 'react';

const PublicNavbar = () => {

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark" id="home-navbar" style={{backgroundColor: '#26262c'}}>
        <a className="navbar-brand" href="#">halifaxFoodie</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="#navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
            <ul className="navbar-nav">
                <li><a className="nav-item nav-link" href="/adminlogin">Admin</a></li>
                <li><a className="nav-item nav-link" href="/userlogin">User</a></li>
                <li><a className="nav-item nav-link" href="#">Contact Us</a></li>
            </ul>
            <div className="dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: '#fff'}}>
                Signup
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/usersignup">User Signup</a>
                    <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/adminsignup" >Admin Signup</a>
                    </div>
            </div>
        </div>
    </nav> 
     );
}
 
export default PublicNavbar;