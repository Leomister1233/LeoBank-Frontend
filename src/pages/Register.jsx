import React from "react";
import { useState} from 'react';
import axios from 'axios';
import './pagestyle.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link} from "react-router-dom";
import validation from "./RegisterValidation";
import Background from "./Background.jpg";

function Register() {
    const [values,setValues]=useState({
        username:'',
        password:'',
        email:'',
        full_name:'',
        role:'',
        date_of_birth:'',
    });
    const [errors,setErrors] = useState({})
    const handleInput = (e)=>{
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    const [selectedOption,setSelectedOption]=useState('You are ?');
    const options=['Client','Admin']
    const onOptionsChangeHandler = (selectedOption)=>{
        setValues({...values,role:selectedOption})
        console.log("User selected Values -", selectedOption)
        setSelectedOption(selectedOption)
           
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validation(values));
        if(errors.username==="" && errors.password==="" && errors.email==="" && errors.full_name==="" && errors.date_of_birth===""){ 
            try{
                const registerresponse = await axios.post('https://localhost:8801/users',values)
                //console.log("Registration values",registerresponse )
                const emailresponse= await axios.post("https://localhost:8801/activation",values)
                alert('Please check you email box');
                //navigate('/accountactivation')
                window.location.reload();
            }
            catch(error)  {
                console.log("Registration Error",error);
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
                                <form onSubmit={handleSubmit} >
                                    <div>
                                        <h3>Register</h3>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="username"> <strong>Username:</strong> </label>
                                        <input onChange={handleInput} name='username' placeholder='Username' id='username' className="form-control mt-1"/>
                                        {errors.username &&<span className='text-danger'>{errors.username}</span>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor='password'> <strong>Password:</strong> </label>
                                        <input onChange={handleInput} name='password' type='password' 
                                        id='password'
                                        placeholder='******' className="form-control mt-1"/>
                                        {errors.password &&<span className='text-danger'>{errors.password}</span>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor='email'> <strong>Email:</strong> </label>
                                        <input onChange={handleInput} name='email' type='email' placeholder='Email'  id='email' className="form-control mt-1 input-match-card"/>
                                        {errors.email &&<span className='text-danger'>{errors.email}</span>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="full_name"> <strong>Full Name:</strong> </label>
                                        <input onChange={handleInput} name='full_name' placeholder='Full Name' id='full_name' className="form-control mt-1"/>
                                        {errors.full_name &&<span className='text-danger'>{errors.full_name}</span>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="date_of_birth"> <strong>Date of Birth:</strong> </label>
                                        <input onChange={handleInput} type="date" name='date_of_birth' placeholder='Date of Birth' id='date_of_birth' className="form-control mt-1"/>
                                        {errors.date_of_birth &&<span className='text-danger'>{errors.date_of_birth}</span>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <Dropdown onSelect={onOptionsChangeHandler} id='role' name='role'>
                                            <Dropdown.Toggle variant='primary' id='dropdown-primary'>
                                                {selectedOption}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {options.map((option,index) => {return <Dropdown.Item key={index} eventKey={option}>{option}
                                                </Dropdown.Item>})}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        {errors.role && <span className='text-danger'>{errors.role}</span>}
                                    </div>
                                    <button type="submit" className="btn btn-primary" id="register">Register</button>
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

export default Register;
