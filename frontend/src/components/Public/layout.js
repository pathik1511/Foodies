import React, { Component, useState } from 'react';
import { Switch,Route } from 'react-router';
import PublicHome from './home';
import UserLogin from './userlogin';
import PublicNavbar from './publicNavbar';
import UserSignup from './userSignup';
import AdminLogin from './adminLogin';
import AdminSignup from './adminSignup';

const PublicLayout = () => {



    return ( 
        <div>
            <div>
                <PublicNavbar></PublicNavbar>
            </div>
            <div>
                <div>
                    <Switch>
                        <Route path="/usersignup" component={UserSignup}>
                            <UserSignup></UserSignup>
                        </Route>
                        <Route path="/userlogin" component={UserLogin}>
                            <UserLogin></UserLogin>
                        </Route>
                        <Route path="/adminlogin" component={AdminLogin}>
                            <AdminLogin></AdminLogin>
                        </Route>
                        <Route path="/adminsignup" component={AdminSignup}>
                            <AdminSignup></AdminSignup>
                        </Route>
                        <Route path="/" component={PublicHome}>
                            <PublicHome></PublicHome>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
     );
}
 
export default PublicLayout;