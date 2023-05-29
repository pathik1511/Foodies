import React, { Component, useState } from 'react';

const PrivateNavbar = () => {

    function handlelogout(){
        localStorage.clear();
        window.location.reload();
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark" id="home-navbar" style={{backgroundColor: '#26262c'}}>
        <a className="navbar-brand" href="#">HalifaxFoodie</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="#navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
            <ul className="navbar-nav">
                <li><a className="nav-item nav-link" href="#">Restaurant</a></li>
                <li><a className="nav-item nav-link" href="#">Menu</a></li>
                <li><a className="nav-item nav-link" href="/chatRoom">ChatBot</a></li>
                <li><a className="nav-item nav-link" href="/order">Place Order</a></li>
            </ul>
            <div>
                <a className="navbar-nav nav-item nav-link" href="#" onClick={handlelogout} >Logout</a>
            </div>
        </div>
    </nav>
     );
}
 
export default PrivateNavbar;