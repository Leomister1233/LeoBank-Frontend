import { useState } from 'react'
import React from 'react'
import Background from "./Background.jpg";
import axios from 'axios';
import validation from "./PasswordValidation"

export const PasswordReset = ({email}) => {
   const [values,setValues]=useState({
      password:'',
      confirmpassword:'',
    }
   ) 
   const [errors,setErrors]=useState({}) 
  const handleInput = (e) =>{
      setValues(prev => ({
        ...prev,[e.target.name]:e.target.value
      }))
  }
  const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validation(values));
        if(values.password===values.confirmpassword && values.password!==''){
            axios.post("http:/localhost/updatePassword",{
                password:values.password,
                recipient_email:email
            })
        }

  }
  return (
    <div>
      <div>
      <div className="body" style={{backgroundImage : `url(${Background})`}}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className=" cold-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                     <form onSubmit={handleSubmit} >
                                        <div>
                                          <h3>Reset Password</h3>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor='password'> <strong>Password:</strong> </label>
                                            <input onChange={handleInput} name='password' type='password' placeholder='******' className="form-control mt-1"/>
                                            {errors.password &&<span className='text-danger'>{errors.password}</span>}
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor='Confirm password'> <strong>Confirm Password:</strong> </label>
                                            <input onChange={handleInput} name='confirmpassword' type='confirmpassword' placeholder='******' className="form-control mt-1"/>
                                            {errors.password &&<span className='text-danger'>{errors.password}</span>}
                                        </div>
                                        <button type="submit" className="btn btn-primary">Reset password</button>
                                    </form>
                                </div>
                          </div>     
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>   
  )
}
