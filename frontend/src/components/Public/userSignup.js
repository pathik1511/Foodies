import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CognitoUserPool} from 'amazon-cognito-identity-js';


const UserSignup = () => {

    const history = useHistory();

    const [user,setUser] = useState();
    var cnferror = false;

    function signup(){
        
        const poolData =  {
            UserPoolId: 'us-east-1_KvBC1bV7e',
            ClientId: 'vnccvqhp7hkeom0f4coitb0jt'
        }

        const userPool = new CognitoUserPool(poolData);

        userPool.signUp(user.email,user.password,user.name,null,(err,data)=>{
            if(err){
                alert("Signup could not happen");
                console.log(err);
                history.push("/usersignup");
            }else{
                alert("User Signed UP");
            console.log(data);
            history.push("/userlogin");
            }
        })
    }


    function handleChange(e) {
        
        const {id, value} = e.target;

        switch(id){
            case 'name':
                setUser({...user, firstname: value})
                break;
            
            case 'lastname':
                setUser({...user, lastname: value})
                break;
            
            case 'email':
                setUser({...user,email: value})
                break;

            case 'password':
                setUser({...user,password: value})
                break;

            case 'cnfPassword':
                if(user.password==value){
                    console.log("reached here");
                    cnferror = false; 
                }else{
                    console.log("reached here yuhuasidj");
                    cnferror = true;
                }
                break;
            
            default:
                break;
        }
    }


    return ( <div className="row justify-content-center">
    <div className="col-md-6 col-sm-8">
        <h1 className="text-center mt-5">User Signup</h1>
        <div className="mt-4">
            <div>
                <div className=" form-group">
                    <input type="text" className="form-control" id="name" placeholder="Name" onBlur={handleChange} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="email" placeholder="Email" onBlur={handleChange} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password" placeholder="Password" onBlur={handleChange} onChange={handleChange}/>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="btn btn-primary" placeholder="Submit" disabled={cnferror}  onClick={signup}>Submit</button>
                </div>
            </div>
        </div>
    </div>
</div> );
}

 
export default UserSignup;