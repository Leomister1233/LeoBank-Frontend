import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Link ,useNavigate  } from 'react-router-dom';
import validation from "./OtpValidation";
//import { RecoveryContext } from "../App";


export const Otp = ({email}) => {
    const [timerCount, setTimer]=React.useState(60);
    const [errors,setErrors] = useState({})
    const [values,setValues]= useState({
        otp:''
    });
    const [disable, setDisable] = useState(true);
    
    const handleInput = (e)=>{
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    const navigate= useNavigate();
    const resendOTP = (e) => { 
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        console.log(OTP);
        e.preventDefault();
        values.otp='';
        if(values.otp === ""){
            axios.post("http://localhost:8801/send_recovery_email", {
                OTP,
                recipient_email: email,
            })
            axios.post("http://localhost:8801/updateOtp",{
                OTP,
                recipient_email:email
            })
        }
    }    

    const HandleOtp = (e) => {
        e.preventDefault();
        setErrors(validation(values));
        if(values.otpinput !== ""){
            axios.post('http://localhost:8801/checkotp', {
                otp:values.otp
            })
            .then(res=>{
                if(res.data==="Success"){
                    alert("Code verified. Please reset your password!")
                    navigate('/passwordreset')
                }else{
                    alert("Verification Failed!")
                }
            })
            .catch(err => console.log("Error"))
        }else{
            alert("The code you have entered is not correct, try again or re-send the link");
        } 
    }

    React.useEffect(()=>{
      let interval= setInterval(()=> {
        setTimer((lastTimerCount) => {
          lastTimerCount <= 1 && clearInterval(interval);
          if(lastTimerCount <= 1) setDisable(false);
          if(lastTimerCount <=0) return lastTimerCount;
          return lastTimerCount - 1;
        });
      }, 1000)
      return () => clearInterval(interval);
    }, [disable]);


    return (
        <div className="body">
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className=" cold-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div>
                            <form >
                                <div>
                                    <h3>Verify Email</h3>
                                </div>
                                <div className="form-group mt-3">
                                        <input id='otp' onChange={handleInput} name='otp' type='number' placeholder='Insert the 4 digit number ' className="form-control mt-1 input-match-card"/>
                                </div>        
                                <div>
                                    <button className="btn btn-primary" type="submit" onClick={HandleOtp}>
                                        Verify Email
                                    </button>
                                </div>
                               
                                <div> 
                                    <br></br>
                                    <p>Didn't receive a code?</p> {""}
                                        <Link className="flex flex-row items-center" onclick={resendOTP} style={{
                                                color:disable ? "gray" : "blue",
                                                cursor:disable ? "none" : "pointer",
                                                textDecorationLine: disable ? "none": "underline",
                                            }} 
                                            >
                                                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP" }
                                        </Link>
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
