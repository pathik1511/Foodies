import React , { useState }  from 'react';
import PrivateRoutes from './private';
import PublicRoutes from './public';
import "../../node_modules/jquery/dist/jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap"

const Routes = () => {
    if(localStorage.getItem("isUserLoggedin") === 'true' )
    {
        return <PrivateRoutes/>;
    }else{
        localStorage.clear();
        console.log("reached here")
        return <PublicRoutes/>;
    }
}
export default Routes;