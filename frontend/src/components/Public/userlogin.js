import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CognitoUserPool , AuthenticationDetails ,CognitoUser} from 'amazon-cognito-identity-js';

const UserLogin = () => {

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
            UserPoolId: 'us-east-1_KvBC1bV7e',
            ClientId: 'vnccvqhp7hkeom0f4coitb0jt'
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
                history.push("/userlogin");
            },
            onSuccess:data=>{
                // console.log(data.idToken.payload.cognito.username);
                console.log(data.accessToken.payload.username);
                localStorage.setItem('token',data.accessToken.jwtToken);
                localStorage.setItem('userId',data.accessToken.payload.username);
                localStorage.setItem('isUserLoggedin',true);
                localStorage.setItem('isadmin',false);
                history.push("/");
                window.location.reload();
                
            }
        })
    }

    return ( 
        <div className="row justify-content-center" >
    <div className="col-xl-3 col-md-4 col-sm-6 col-12">
        <h1 className="text-center mt-5">User Login</h1>
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
                    <p>Don't Have an Account ?... <a href="/usersignup">Register Here</a></p>
                </div>
            </div>
        </div>
    </div>
</div> );
}

 
export default UserLogin;