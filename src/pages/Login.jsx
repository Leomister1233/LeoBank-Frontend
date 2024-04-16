import React from "react";
import { useState } from 'react';
import axios from 'axios';
import './pagestyle.css';
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValidation";
import Background from "./Background.jpg";
import SecureLs from 'secure-ls';

function Login(){
    const [values,setValues]=useState({
        username:'',
        password:''
    });
    const ls= new SecureLs({encodingType:'des', isCompression:false , encryptionSecret:'themisterkey1234'});
    const navigate = useNavigate();
    const [errors,setErrors] = useState({})
   // const [submitStatus, setSubmitStatus] = useState(''); 
    const handleInput = (e)=>{
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setErrors(validation(values));
        if (errors.username === "" & errors.password === "") {
           const loginresponse =await axios.post('https://localhost:8801/login', values)
           const loginValidation = await axios.post("https://localhost:8801/loginconfirmation",values)
            if(loginresponse.data==="Success" && loginValidation.data.message==="Account validated"){
                alert('Login successful')
                const encodedUsername = encodeURIComponent(values.username);
                const encodedPassword = encodeURIComponent(values.password);
                try{
                    const  response = await fetch(`https://localhost:8801/api/checkid?username=${encodedUsername}&password=${encodedPassword}`)

                    if(!response.ok){
                        console.log("error")
                    }
                    const data =await response.json();
                    console.log("Data received from fetch:",data);

                    if(data && data.length > 0){
                        const userId=data[0].user_id;
                        //alert(userId)
                        if(userId===20000){
                            ls.set('Usermaster',userId);
                            navigate('/home',{ state: { username: values.username , password: values.password } });
                        }else{
                            ls.set('Usermaster',userId);
                            navigate('/homeusers',{ state: { username: values.username , password: values.password } });
                        }
                        
                    }
                    else{
                        throw new Error("User Data not o found")
                    }

                }
                catch(err){
                    console.log("An error occurred");
                    alert('An error occurred')
                }
            }else{
                alert('Error , Username or Password are incorrect')
            }
        }
    }
    return(
        <div className="body" style={{backgroundImage : `url(${Background})`}}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className=" cold-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                     <form onSubmit={handleSubmit} >
                                        <div>
                                          <h3>Login</h3>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="Username"> <strong>Name:</strong> </label>
                                            <input onChange={handleInput} name='username' placeholder='UserName' id='username' className="form-control mt-1"/>
                                            {errors.username &&<span className='text-danger'>{errors.username}</span>}
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor='password'> <strong>Password:</strong> </label>
                                            <input onChange={handleInput} name='password' type='password' placeholder='******' className="form-control mt-1"/>
                                            {errors.password &&<span className='text-danger'>{errors.password}</span>}
                                        </div>
                                        <button type="submit" className="btn btn-primary">Login</button>

                                        <div className="d-grid gap-2 mt-3">
                                            <button> 
                                                <Link to="/register">
                                                    Don't have an account yet? Register here!
                                                </Link>
                                            </button>
                                        </div>
                                        <div className="d-grid gap-2 mt-3">
                                            <button> 
                                                <Link to="/passwordrecovery">
                                                    Forgot Password?
                                                </Link>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                          </div>     
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}
export default Login