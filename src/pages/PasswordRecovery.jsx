import React from "react";
import { useState } from 'react';
import axios from 'axios';
import './pagestyle.css';
import { Link ,useNavigate} from "react-router-dom";
import Background from "./Background.jpg";
import validation from "./PasswordValidation"



function PasswordRecovery(){
    const [timerCount, setTimer]=React.useState(60);
    const [disable, setDisable] = useState(true);
    const [checked,setChecked]=useState(true);
    const [checked1,setChecked1]=useState(false);
    const [checked2,setChecked2]=useState(false);     
    const [checked3,setChecked3]=useState(false);     
    const [values,setValues]=useState({
        email:'',
        otp:'',
        password:'',
        confirmpassword:""
    });
    const navigate = useNavigate();
    const [errors,setErrors] = useState({})
    const handleInput = (e)=>{
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);
        if (!validationErrors.email){ 
            try{
                //alert(values.email);
                const res =await axios.post('https://localhost:8801/checkemail',values)
                if(res.data==="Success"){
                    setChecked(false);
                    setChecked1(true);
                }else{
                    //alert("Email is not registered!")
                }
            }catch(err){
                console.log('Registration Error')
            }
        }
    }

    const navigatetoOtp = async () => {
        try {
          const OTPresponse= await axios.post("https://localhost:8801/recoverotp",values)
          if(OTPresponse.status===200){
            //alert('The recover code was sent to your email box');
            setChecked1(false);
            setChecked2(true);
          }else{
            console.log('Something is wrong')
          }
        } catch (error) {
            console.error('Error:', error);
           // alert("An error occurred while sending the recovery email. Please try again later.");
        }
    }

    const HandleOtp = (e) => {
        e.preventDefault();
        setErrors(validation(values));
        if(values.otpinput !== ""){
            axios.post('https://localhost:8801/checkotp',values)
            .then(res=>{
                if(res.status=== 200){
                    //alert("Code verified. Please reset your password!")
                    setChecked3(true);
                    setChecked2(false);
                }else{
                    //alert("Verification Failed!")
                }
            })
            .catch(err => console.log("Error"))
        }else{
            ///alert("The code you have entered is not correct, try again or re-send the link");
        } 
    }

    const handlereset = async(e) => {
        e.preventDefault()
        setErrors(validation(values));
        if(values.password===values.confirmpassword && values.password!==''){
            const resetResponse= await axios.post("https://localhost:8801/updatePassword",values)
            if(resetResponse.status===200){
                //alert('Password recovered successfully')
                navigate("/")
            }
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
                                <div>
                                    <h3>Recovery</h3>
                                </div>   
                                { checked && (
                                <div>
                                    <div className="form-group mt-3">
                                        <label htmlFor='email'> <strong>Email:</strong> </label>
                                        <input onChange={handleInput} name='email' type='email' placeholder='Email' id="email" className="form-control mt-1 input-match-card"/>
                                        {errors.email &&<span className='text-danger'>{errors.email}</span>}
                                    </div>
                                     <button id="btnnext" type="submit" className="btn btn-primary"  onClick={handleSubmit}>Next</button>
                                </div>
                                )}
                                {checked1 && (
                                    <div>
                                        <button id="otpButton" className="btn btn-primary" onClick={navigatetoOtp}>Send OTP</button>
                                    </div>
                                )}
                                {checked2 && (
                                    <div>
                                    <form >
                                        <div className="form-group mt-3">
                                            <input id='otp' onChange={handleInput} name='otp' type='number' placeholder='Insert the 4 digit number ' className="form-control mt-1 input-match-card"/>
                                            {errors.otp && (<span className='text-danger'>{errors.otp}</span>)}
                                        </div>        
                                        <div>
                                            <button id="verifybtn" className="btn btn-primary" type="submit" onClick={HandleOtp}>
                                                Verify
                                            </button>
                                        </div>
                                        <div> 
                                            <br></br>
                                            <p>Didn't receive a code?</p> {""}
                                                <Link className="flex flex-row items-center" onClick={navigatetoOtp} style={{
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
                                )}
                                {checked3 &&(
                                    <div>
                                        <div>
                                            <input type='password' name="password" id="password" placeholder="Password" onChange={handleInput}/>
                                            {errors.password &&<span className='text-danger'>{errors.password}</span>}
                                        </div>
                                        <div>
                                            <input type='password' name="confirmpassword" id="confirmpassword" placeholder="Confirm Password" onChange={handleInput}/>
                                            {errors.confirmpassword &&<span className='text-danger'>{errors.confirmpassword}</span>}
                                        </div>
                                        <div>
                                            <button id="btnreset" className="btn btn-primary" onClick={handlereset}>Reset Password</button>
                                        </div>
                                    </div>
                                )}
                                <div className="d-grid gap-2 mt-3">
                                        <button> 
                                        <Link to="/">
                                            Return to Login Page        
                                        </Link>
                                    </button>
                                </div>
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