import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CognitoUserPool , AuthenticationDetails ,CognitoUser} from 'amazon-cognito-identity-js';

const AdminLogin = () => {

    const [user,setUser] = useState();
    const history = useHistory();

    function handleChange(e){
        const {id, value} = e.target;
        switch(id){
            case 'email':
                setUser({...user,email: value})
                break;

            case 'password':
                setUser({...user,password: value})
                break;
        }
    }

    function handlelogin(){

        const poolData =  {
            UserPoolId: 'us-east-1_pvEnRfhyY',
            ClientId: '2kenrdk6pprdpjdoqkma9p810h'
        }

        const userPool = new CognitoUserPool(poolData);

        const enteredDetails = {
            Username: user.email,
            Password : user.password
        }

        const authenticationdetails = new AuthenticationDetails(enteredDetails);

        const userDetails = {
            Username: user.email,
            Pool: userPool
        }

        const cognitoUser = new CognitoUser(userDetails);

        cognitoUser.authenticateUser(authenticationdetails,{
            onFailure: err=>{
                console.log(err);
                alert(err.message);
                localStorage.clear();
                history.push("/adminlogin");
            },
            onSuccess:data=>{
                // console.log(data.idToken.payload.cognito.username);
                console.log(data.accessToken.payload.username);
                localStorage.setItem('token',data.accessToken.jwtToken);
                localStorage.setItem('adminId',data.accessToken.payload.username);
                localStorage.setItem('isUserLoggedin',true);
                localStorage.setItem('isadmin',true);
                history.push("/");
                window.location.reload();
            }
        })

        // loginService.loginUser(user).then((response)=>{
        //     if(response.data.success === true && response.data.message === "Logged IN"){
        //         alert("Logged IN");
        //         localStorage.clear();
        //         localStorage.setItem("isUserLoggedin",true);
        //         localStorage.setItem("token",response.data.data.token);
        //         localStorage.setItem('UserId',response.data.data.id);
        //         localStorage.setItem("Role",response.data.data.role);
        //         history.push("/profile");
        //         window.location.reload();    
        //     }
        // }).catch((error) => {
        //     alert(error.response.data.message);
        //     history.push("/login");
        // });
    }

    return ( 
        <div className="row justify-content-center" >
    <div className="col-xl-3 col-md-4 col-sm-6 col-12">
        <h1 className="text-center mt-5">Admin Login</h1>
        <div className="mt-4">
            <div>
                <div className="form-group">
                    <input type="text" className="form-control" id="email" placeholder="Email" onChange={handleChange}/>
                    <small id="emailHelp" className="form-text text-danger"></small>
                </div>
                <div className="form-group ">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleChange}/>
                    <small id="passwordHelp" className="form-text text-danger"></small>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="btn btn-primary"  placeholder="Submit" onClick={handlelogin}>Submit</button>
                </div>
                <div className="text-center mt-5 ">
                    <p className="mb-sm-0">Forgot Password ?... <a href="#">Click Here</a></p>
                </div>    
                <div className="text-center">
                    <p>Don't Have an Account ?... <a href="/adminsignup">Register Here</a></p>
                </div>
            </div>
        </div>
    </div>
</div> );
}


 
export default AdminLogin;