import React, { Component, useState } from 'react';

const AdminPrivateNavbar = () => {

    function handlelogout() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" id="home-navbar" style={{ backgroundColor: '#26262c' }}>
            <a className="navbar-brand" href="#">HalifaxFoodie</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="#navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
                <ul className="navbar-nav">
                    <li><a className="nav-item nav-link" href="/uploadRecipe">Upload Recipe</a></li>
                    <li><a className="nav-item nav-link" href="/giveFeedback">Give Feedback</a></li>
                    <li><a className="nav-item nav-link" href="/visualize">Visualize</a></li>
                    <li><a className="nav-item nav-link" href="/wordCloud">Word Cloud</a></li>
                    <li><a className="nav-item nav-link" href="/adminChat">Chat</a></li>
                </ul>
                <div>
                    <a className="navbar-nav nav-item nav-link" href="#" onClick={handlelogout} >Logout</a>
                </div>
            </div>
        </nav>
            );
}

            export default AdminPrivateNavbar;