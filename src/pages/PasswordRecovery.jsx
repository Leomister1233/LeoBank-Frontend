import React from "react";
import { useState } from 'react';
import axios from 'axios';
import './pagestyle.css';
import { Link, useNavigate } from "react-router-dom";
import validation from "./EmailValidation";
import Background from "./Background.jpg";


function PasswordRecovery(){
    const [values,setValues]=useState({
        email:''
    });
    const [errors,setErrors] = useState({})
    const handleInput = (e)=>{
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(values));
        if(errors.email!==''){ 
            axios.post('http://localhost:8801/checkemail',values)
            .then(res => {
                if(res.data==="Success"){
                    alert('Email exists!')
                    navigatetoOtp(values.email)
                }else{
                    alert("Email is not registered!")
                }
            })
            .catch(err => console.log("Registration Error",err));
        }
    }

    const navigatetoOtp = async () => {
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        console.log(OTP);
        try {
            const [sendEmailResponse, recoveryResponse]=await Promise.all([
                 axios.post("http://localhost:8801/send_recovery_email", {
                recipient_email: values.email,
                OTP
             }),
             axios.post("http://localhost:8801/recovery",{
                recipient_email: values.email,
                OTP
            })])
            if(recoveryResponse.data!=="ERROR"){
                    alert('Recovery email sent successfully');
                    navigate("/otp");
            }else{
                axios.post("http://localhost:8801/updateOtp",{
                    OTP,
                    recipient_email:values.email
                })
                alert('An Recovery email has already been sent to your mailbox')
                navigate("/otp");
            }  
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while sending the recovery email. Please try again later.");
        }
    }

    return (
        <div className="body" style={{backgroundImage : `url(${Background})`}}>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className=" cold-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div>
                            <form onSubmit={handleSubmit} >
                                        <div>
                                        <h3>Recovery</h3>
                                        </div>
                                       
                                    <div className="form-group mt-3">
                                        <label htmlFor='email'> <strong>Email:</strong> </label>
                                        <input onChange={handleInput} name='email' type='email' placeholder='Email' className="form-control mt-1 input-match-card"/>
                                        {errors.email &&<span className='text-danger'>{errors.email}</span>}
                                    </div>
                                        <button type="submit" className="btn btn-primary">Register</button>
                                        <div className="d-grid gap-2 mt-3">
                                            <button> 
                                                <Link to="/">
                                                    Return to Login Page        
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

    );
}
export default PasswordRecovery;